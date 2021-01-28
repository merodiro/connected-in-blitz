import { ReactNode } from 'react'
import { Head } from 'blitz'
import Navbar from '../components/Navbar'

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Head>
        <title>{title || 'connected-in'}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="grid flex-1">{children}</div>
    </div>
  )
}

export default Layout
