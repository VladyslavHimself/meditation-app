import { Box, Button, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
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
    <Box background={'#3880ff'} w={'100%'} h={'50px'} display='flex' justifyContent={'center'}>
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'90%'} h={'inherit'}>
        <Text fontSize='xl' color='white' fontWeight='bold'>Meditation</Text>
        <Flex justifyContent='space-around' alignItems='center'>
          <Text fontSize='m' color='white' pr='10px'>{user?.email}</Text>
          <Button onClick={onLogoutHandler}>Logout</Button>
        </Flex>
      </Flex>
    </Box>
  )
};

export default Dashboard;