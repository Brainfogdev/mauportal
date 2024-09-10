import 'tailwindcss/tailwind.css';
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NuqiGold Portal',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
{children}
      </body>
    </html>
  );
}
