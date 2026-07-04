import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Christian Homeschool Lesson Helper",
  description: "A local parent-facing homeschool lesson preparation MVP."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">Lesson Helper</Link>
          <nav aria-label="Main navigation">
            <Link href="/history">History</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </header>
        <main className="page-shell">{children}</main>
      </body>
    </html>
  );
}
