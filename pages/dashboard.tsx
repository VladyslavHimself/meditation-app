import { Box, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../src/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { NotAuthorized } from '../src/components/NotAuthorized/component';
import { Burger } from '../src/components/Burger/component';
import { ActivityBox } from '../src/components/ActivityBox/component';
import medGirlImage from '../src/assets/meditation-girl.svg';
import workGuyImage from '../src/assets/work-guy.svg';
import chillGuyImage from '../src/assets/chill-guy.svg';
import { GenButton } from '../src/Ui/GenButton/component';
import { BackgroundLayout } from '../src/Layouts/BackgroundLayout/component';
import { Navigation } from '../src/components/Navigation/component';
import { Navbar } from '../src/components/Navbar/component';


interface IChartData {
  labels: string[];
  datasets: {
      data: number[];
      label: string;
      borderColor: string;
      backgroundColor: string;
  }[];
}

const Dashboard: NextPage = () => {

  const router = useRouter(); 
  const [user, setUser] = useState<User>();
  const [meditationData, setMeditationData] = useState<IChartData>({
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

       setMeditationData({
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
      <BackgroundLayout>
        <Navbar />
        <Flex justifyContent={'center'}>
          <Flex flexDirection={'column'}>
            <Text fontSize={'5xl'} color={'white'}>Welcome back, Vladyslav</Text>
            <Flex className="activities">
              <Link href={'/timerSettings'}>
                <Box p={'10px'}><ActivityBox title='Focus on your mind' image={medGirlImage}/></Box>
              </Link>

              <Link href={'/'}>
                <Box p={'10px'}><ActivityBox title='Focus on your work' image={workGuyImage}/></Box>
              </Link>

              <Link href={'/'}>
                <Box p={'10px'}><ActivityBox title='Focus on your hobby' image={chillGuyImage}/></Box>
              </Link>
            </Flex>
            <Box ml={'50px'} mt={'5px'}>
              <GenButton type={'main'}>Explore courses</GenButton>
            </Box>
          </Flex>

        </Flex>
      </BackgroundLayout>
    ) : <NotAuthorized />
  )
};

export default Dashboard;


// ------------ OLD UI ------------- //
//
// <Navigation>
//   <Text fontSize='xl' color='white' fontWeight='bold'>Meditation</Text>
//   <Flex justifyContent='space-around' alignItems='center'>
//     <Text fontSize='m' color='white' pr='10px' display='flex' alignItems='center'>
//       <Image src={userIcon} width='35px' height='35px' alt='logout-icon'></Image>
//       <Text ml={'5px'}>{user?.email}</Text>
//     </Text>
//     <Button mr='10px' background={'#3880ff'} color={'#fff'}>
//       <Image src={settingsIcon} width='20px' height='20px' alt='settings-icon'></Image>
//       <Text ml={'5px'}>Settings</Text>
//     </Button>
//     <Button onClick={onLogoutHandler} variant='solid'>
//       <Image src={logoutIcon} width='20px' height='20px' alt='logout-icon'></Image>
//       <Text ml={'5px'}>Logout</Text>
//     </Button>
//   </Flex>
// </Navigation>
//
// <Container maxW='container.xl' mt='25px' display='flex' justifyContent='space-evenly' alignItems='center'>
//   <Box w='250px' h='270px' display='flex' backgroundColor='#3171e0' borderRadius='12px'>
//     <QuickMeditate />
//   </Box>
//   <LineChart title={'Meditation monitoring'} data={meditationData} />
// </Container>