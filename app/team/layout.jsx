import localFont from 'next/font/local'

const copixel = localFont({
  src: '../../public/fonts/Copixel-Display.otf',
  variable: '--font-copixel',
  display: 'swap',
})

export default function TeamLayout({ children }) {
  return (
    <div className={`${copixel.variable} font-copixel`}>
      {children}
    </div>
  )
}
