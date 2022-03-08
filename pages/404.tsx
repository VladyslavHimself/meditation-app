import { Flex, Text } from '@chakra-ui/react';
import { NextPage } from 'next';
import React from 'react';
import BackgroundLayout from '../src/Layouts/BackgroundLayout';

const NotFound: NextPage = () => {
  return (
    <BackgroundLayout>
      <Flex w='100%' h='100vh' justifyContent={'center'} align='center'>
        <Text fontSize='3xl' fontWeight='bold'>404. Page not found :(</Text>
      </Flex>
    </BackgroundLayout>
  )
}

export default NotFound;