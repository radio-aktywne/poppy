# Output

`emiweb` sends the output using WebSockets to the listener.
You need to provide some info about it using environmental variables:

- `EMIWEB_TARGET_HOST` - address of the host where the target server is running
- `EMIWEB_TARGET_PORT` - port at which the target server is listening
