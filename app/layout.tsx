import FileViewerProvider from "@/components/FileViewer/FileViewerProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <FileViewerProvider>{children}</FileViewerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
