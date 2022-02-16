import React, { useState } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface IInputField {
  name: string,
  type?: React.HTMLInputTypeAttribute,
  inputValue: any,
  setInputValue: any,
};

export const InputField = ({ name, type, setInputValue, inputValue }: IInputField ): JSX.Element => {

  return (
    <Box>
      <Text>{ name }</Text>
      <Input type={type} value={inputValue} onChange={ (e) => {setInputValue(e.target.value)}} />
    </Box>
  )
};
