import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Form from "../blocks/Form";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (

        <div className="flex bg-black justify-center items-center min-h-screen ">
          <Form />
        </div>

    
  )
}
