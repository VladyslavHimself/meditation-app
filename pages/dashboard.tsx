import { Box, Button, Container, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LineChart } from '../src/components/LineChart/component';
import { Navigation } from '../src/components/Navigation/component';
import { QuickMeditate } from '../src/components/QuickMeditate/component';
import { auth } from '../src/firebase-config';

import settingsIcon from '../src/assets/settings.svg';
import logoutIcon from '../src/assets/logout.svg';
import userIcon from '../src/assets/user.svg';
import Image from 'next/image';

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
            <Text fontSize='m' color='white' pr='10px' display='flex' alignItems='center'>
              <Image src={userIcon} width='35px' height='35px' alt='logout-icon'></Image>
              <Text ml={'5px'}>{user?.email}</Text>
            </Text>
            <Button mr='10px' background={'#3880ff'} color={'#fff'}>
              <Image src={settingsIcon} width='20px' height='20px' alt='settings-icon'></Image>
              <Text ml={'5px'}>Settings</Text>
            </Button>
            <Button onClick={onLogoutHandler} variant='solid'>
              <Image src={logoutIcon} width='20px' height='20px' alt='logout-icon'></Image>
              <Text ml={'5px'}>Logout</Text>
            </Button>
          </Flex>
      </Navigation>

      <Container maxW='container.xl' mt='25px' display='flex' justifyContent='space-evenly' alignItems='center'>
        <Box w='250px' h='270px' display='flex' backgroundColor='#3171e0' borderRadius='12px'>
          <QuickMeditate />
        </Box>
        <LineChart title={'Meditation monitoring'} data={undefined} />
      </Container>
    </>
  )
};

export default Dashboard;