import { Box, Button, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { Navigation } from '../src/components/Navigation/component';
import { auth } from '../src/firebase-config';

const Dashboard: NextPage = () => {

  const [user, setUser] = useState<any>();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const onLogoutHandler = () => {
    signOut(auth);
  }

  return (
    <>
      <Navigation>
        <Text fontSize='xl' color='white' fontWeight='bold'>Meditation</Text>
          <Flex justifyContent='space-around' alignItems='center'>
            <Text fontSize='m' color='white' pr='10px'>{user?.email}</Text>
            <Button mr='10px' background={'#3880ff'} color={'#fff'}> [+] Add meditation</Button>
            <Button onClick={onLogoutHandler} variant='solid'>Logout</Button>
          </Flex>
      </Navigation>

      <Box>
        <Text>Hello world</Text>
      </Box>
    </>
  )
};

export default Dashboard;