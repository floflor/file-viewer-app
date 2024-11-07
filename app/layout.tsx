import FileViewerProvider from "@/components/FileViewer/FileViewerProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FileViewerProvider>{children}</FileViewerProvider>
      </body>
    </html>
  );
}
