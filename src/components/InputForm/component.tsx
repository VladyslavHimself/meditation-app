import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import React from 'react';
import { InputField } from '../../Ui/InputField/component';

interface IInputForm {
 title: string,
 children: React.ReactNode,
}
export const InputForm = ({ title, children }: IInputForm ): JSX.Element => (
  <Flex align={'center'} justifyContent={'center'} w={"100vw"} h={'100vh'}>
    <Box boxShadow={'xl'} border='.1px solid teal' rounded='lg' p={'100px 50px'}>
      <Flex align={'center'} justifyContent={'center'} flexDirection={'column'} >
        <Text textTransform={'uppercase'} mb='10px'>{ title }</Text>
        { children }
      </Flex>
    </Box>
  </Flex>
);
