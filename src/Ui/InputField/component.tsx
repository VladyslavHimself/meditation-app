import React from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface IInputField {
  name: string,
  type?: React.HTMLInputTypeAttribute,
};

export const InputField = ({ name, type }: IInputField ): JSX.Element => (
  <Box>
    <Text>{ name }</Text>
    <Input type={type} />
  </Box>
);
