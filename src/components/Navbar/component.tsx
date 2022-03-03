import React from 'react';

import { Flex, Box } from '@chakra-ui/react';
import { Burger } from '../Burger/component';

export const Navbar = (): JSX.Element => (
  <Flex
    className="navigation"
    w={'100vw'}
    h={'150px'}
    alignItems={'center'}
    justifyContent={'flex-start'}
    flexDirection={'column'}
  >
    <Box
      className='navbar'
      mt={'25px'}
      w={'95%'}
    >
      <Burger />
    </Box>
  </Flex>
)
