import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kushagra Srivastava | Aspiring Software Engineer",
  description:
    "Backend-focused software engineer building reliable AI systems and fast web experiences. BS/MS CS at Arizona State University.",
  keywords: [
    "Kushagra Srivastava",
    "Software Engineer",
    "Backend Engineer",
    "ASU",
    "AI Systems",
    "Portfolio",
    "FastAPI",
    "GCP",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
