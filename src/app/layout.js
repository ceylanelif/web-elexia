import { Inter } from 'next/font/google'
import "@/styles/reset.css"
import '@/styles/global.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Providers } from '@/lib/provider'
import 'semantic-ui-css/semantic.min.css'
import '../styles/semantic-ui-custom.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Welcome to ELEXIA !',
  description: 'Elexia: Everything need to rise!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>

      <body className="container">
       <Providers>
       <Header/>
       <main>{children}</main> 
       <Footer/>
       </Providers>
      </body>

    </html>
  )
}
