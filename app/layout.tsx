import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'アプリポータル',
  description: 'マイアプリポータルサイト',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gray-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
