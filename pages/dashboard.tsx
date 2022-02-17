import { Box, Button, Container, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Navigation } from '../src/components/Navigation/component';
import { QuickMeditate } from '../src/components/QuickMeditate/component';
import { auth } from '../src/firebase-config';

const Dashboard: NextPage = () => {

  const router = useRouter();

  const [user, setUser] = useState<any>();

  onAuthStateChanged(auth, (currentUser): void => {
    setUser(currentUser);
  });

  const onLogoutHandler = (): void => {
    signOut(auth);
    router.push('/');
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

      <Container maxW='container.xl' mt='25px'>
        <Box w='250px' h='270px' display='flex' backgroundColor='#3171e0' borderRadius='12px'>
          <QuickMeditate />
        </Box>
      </Container>
    </>
  )
};

export default Dashboard;