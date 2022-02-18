type DataCallback = (ArrayBuffer) => Promise<void>;

export class AudioRecorder {
  private recorder: MediaRecorder;
  private readonly timeslice: number;

  constructor(timeslice: number = 1000) {
    this.timeslice = timeslice;
  }

  async start(): Promise<void> {
    if (this.recorder !== undefined) return;
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.recorder = new MediaRecorder(stream);
    this.recorder.addEventListener("dataavailable", (data) =>
      this.onDataAvailable(data)
    );
    this.recorder.start(this.timeslice);
  }

  stop(): void {
    if (this.recorder === undefined) return;
    this.recorder.stop();
    this.recorder.stream.getTracks().forEach((track) => track.stop());
    this.recorder = undefined;
  }

  onData(callback: DataCallback): void {
    this.dataCallback = callback;
  }

  isRecording(): boolean {
    return this.recorder === undefined
      ? false
      : this.recorder.state === "recording";
  }

  private dataCallback: DataCallback = async () => {};

  private async onDataAvailable(e: BlobEvent) {
    const data = await e.data.arrayBuffer();
    await this.dataCallback(data);
  }
}
