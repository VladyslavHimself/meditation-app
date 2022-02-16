import { Box, Flex, Button } from '@chakra-ui/react';
import React from 'react';

interface INavigation {
  children: React.ReactNode;
}

export const Navigation = ({children}: INavigation): JSX.Element => {
  return (
    <Box background={'#5260ff'} w={'100%'} h={'50px'} display='flex' justifyContent={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'90%'} h={'inherit'}>
        {children}
      </Flex>
    </Box>
  )
};
