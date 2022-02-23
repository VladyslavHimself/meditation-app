import { Box, Button, Container, Flex, Text} from '@chakra-ui/react';
import { NextOrObserver, onAuthStateChanged, signOut, User } from 'firebase/auth';
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
import { collection, DocumentData, FirestoreDataConverter, getDocs, QuerySnapshot } from 'firebase/firestore';
import { NotAuthorized } from '../src/components/NotAuthorized/component';

const Dashboard: NextPage = () => {
  const router = useRouter(); 
  const [user, setUser] = useState<User>();
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

      const userEmail: string = localStorage.getItem('email')!;
      
      const meditationListCollectionRef = collection(db, userEmail, 'Total_data', 'meditations');
      const unsortedData = await getDocs(meditationListCollectionRef);
      const userMeditations: { id: string }[] = unsortedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      
      const formatDate = () => {
        const dates: Date[] = userMeditations.map((data: any) => new Date(data.createdAt?.seconds * 1000));
        
        const formatDate: string[] = dates.map((date: any) => {
          const unformatDate = new Date(date);
          const month = unformatDate.getUTCMonth() + 1;
          const day = unformatDate.getUTCDate();
          const year = unformatDate.getUTCFullYear();

          return `${day}/${month}/${year}`;
        });

        return [...formatDate];
      };

       setData({
        labels: formatDate(),
        datasets: [{
          data: [...userMeditations.map((data: any) => data.minutes)],
          label: 'minutes',
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }]
      });
    };

    getMeditations();
  }, []);

  onAuthStateChanged(auth, (currentUser): void => {
    currentUser && setUser(currentUser);
  });

  const onLogoutHandler = (): void => {
    signOut(auth);
    router.push('/');
  };

  return (
    user ? (
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
    ) : <NotAuthorized />
    
  )
};

export default Dashboard;