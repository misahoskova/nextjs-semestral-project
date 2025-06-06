import '@/app/globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="cs">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
