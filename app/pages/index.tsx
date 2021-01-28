import Layout from 'app/core/layouts/Layout'
import { BlitzPage } from 'blitz'

const Home: BlitzPage = () => {
  return (
    <main className="flex items-center justify-center h-full text-2xl tracking-wide text-gray-600 uppercase md:text-5xl font-extralight">
      <h1>Connected-in</h1>
    </main>
  )
}

Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
