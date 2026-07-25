import type { Metadata } from "next";
import AuthSessionProvider from "@/components/session-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zylora — B2B Client Portal & Analytics Dashboard",
  description:
    "A premium white-label B2B client portal and automated analytics dashboard for digital marketing agencies and enterprise corporate brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthSessionProvider>{children}</AuthSessionProvider>
      </body>
    </html>
  );
}
