import { Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const NotAuthorized = () => {
  return (
    <Flex w='100%' h='100vh' justifyContent='center' alignItems='center'>
      <Text fontSize='2rem' fontWeight='bold' fontFamily='monospace'>Not authorized</Text>  
    </Flex>
  );
};