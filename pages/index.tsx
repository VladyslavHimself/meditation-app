import type { NextPage } from 'next';
import { ChakraProvider } from '@chakra-ui/react'

const Home: NextPage = () => {
  return (
    <ChakraProvider>
      <h1>hello world</h1>
    </ChakraProvider>
  )
}

export default Home;
