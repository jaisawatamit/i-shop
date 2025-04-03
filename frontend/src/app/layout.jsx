import "@/app/globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ReduxProvider>
          <ToastContainer autoClose={500} />
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}