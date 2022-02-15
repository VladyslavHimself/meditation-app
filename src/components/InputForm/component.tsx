import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';

interface IInputForm {
 title: string, 
}

export const InputForm = ({ title }: IInputForm ):JSX.Element => (
  <Flex align={'center'} justifyContent={'center'} w={"100vw"} h={'100vh'}>
    <Box boxShadow={'xl'} border='.1px solid teal' rounded='lg' p={'100px 50px'}>
      <Flex align={'center'} justifyContent={'center'} flexDirection={'column'} >
        <Text textTransform={'uppercase'} mb='10px'>{ title }</Text>
        
        <Box>
          <Text>E-mail</Text>
          <Input type={'email'}/>
        </Box>

        <Box>
          <Text>Password</Text>
          <Input type={'password'}/>
        </Box>

        <Button mt={'5px'}>Login</Button>
      </Flex>
    </Box>
  </Flex>
);
