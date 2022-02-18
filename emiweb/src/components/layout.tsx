import Head from "next/head";
import styles from "./layout.module.css";
import { ReactNode } from "react";

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="description" content="emission web ui" />
      </Head>
      <main>{children}</main>
    </div>
  );
}
