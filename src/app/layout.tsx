import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { Header } from "@/components/header/Header"
import { Footer } from "@/components/footer/Footer"
import { Comfortaa, Mukta } from "next/font/google"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const mukta = Mukta({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${comfortaa.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
