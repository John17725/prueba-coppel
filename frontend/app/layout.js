import 'bootstrap/dist/css/bootstrap.css'
import 'sweetalert2/src/sweetalert2.scss'
import '../styles/globals.css'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
