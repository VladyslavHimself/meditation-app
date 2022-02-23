import { Box, Button, Container, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LineChart } from '../src/components/LineChart/component';
import { Navigation } from '../src/components/Navigation/component';
import { QuickMeditate } from '../src/components/QuickMeditate/component';
import { auth, db } from '../src/firebase-config';
import settingsIcon from '../src/assets/settings.svg';
import logoutIcon from '../src/assets/logout.svg';
import userIcon from '../src/assets/user.svg';
import Image from 'next/image';
import { collection, getDocs, Query } from 'firebase/firestore';
import { decode } from 'querystring';


const Dashboard: NextPage = () => {
  const router = useRouter(); 
  const [user, setUser] = useState<any>();
  const [data, setData] = useState<any>({
    labels: ['empty'],
    datasets: [{
      data: [0],
      label: 'minutes',
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }]
  });

  useEffect(() => {


    const getMeditations = async () => {
      
      const meditationCollectionRef = collection(db, localStorage.getItem('email')!, 'Total_data', 'meditations');
      const data = await getDocs(meditationCollectionRef);
      const userData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const formatDate = () => {
        const dates = userData.map((data: any) => new Date(data.createdAt?.seconds * 1000));
        
        const formatedDates = dates.map((date: any) => {
          const datee = new Date(date);
          const month = datee.getUTCMonth() + 1;
          const day = datee.getUTCDate();
          const year = datee.getUTCFullYear();

          const data = `${day}/${month}/${year}`;

          return data;
        })

        return [...formatedDates];
      }

       setData({
        labels: formatDate(),
        datasets: [{
          data: [...userData.map((data: any) => data.minutes)],
          label: 'minutes',
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      });
    };

    getMeditations();
    
  }, []);

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
        <LineChart title={'Meditation monitoring'} data={data} />
      </Container>
    </>
  )
};

export default Dashboard;