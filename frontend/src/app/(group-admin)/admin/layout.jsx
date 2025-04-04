import { Geist, Geist_Mono } from "next/font/google";
import  SideBar  from "@/componants/admin/SideBar";
import Header  from "@/componants/admin/Header";
import { ToastContainer } from "react-toastify";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "admin",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                   <ToastContainer position="top-right" autoClose={500} />
                <div className="grid grid-cols-5">
                    <SideBar />
                    <div className="col-span-4">
                         <Header/>
                        {children}
                    </div>
                </div>

            </body>
        </html>
    );
}
