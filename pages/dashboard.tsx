import { Box, Button, Container, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LineChart } from '../src/components/LineChart/component';
import { Navigation } from '../src/components/Navigation/component';
import { QuickMeditate } from '../src/components/QuickMeditate/component';
import { auth, db } from '../src/firebase-config';
import burgerIcon from '../src/assets/burger.svg';
import crossIcon from '../src/assets/cross.svg';
import profileIcon from '../src/assets/account.svg';
import settingsIcon from '../src/assets/systems.svg';
import logoutIcon from '../src/assets/exit.svg';
import Image from 'next/image';
import Link from 'next/link'
import { collection, getDocs } from 'firebase/firestore';
import { NotAuthorized } from '../src/components/NotAuthorized/component';
import classes from '../src/scss/dashboard.module.scss';
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


  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(true);

  const toggleBurger = () => {
    setIsBurgerOpen(prevState => !prevState);
  }

  return (
    user ? (
     <div className={classes.dashboard}>
       <div className={classes.mountains} />

       <Flex className={classes.menu} justifyContent={'center'} alignItems={'center'}>
         { !isBurgerOpen ?
           <Button onClick={toggleBurger} variant={'unstyled'}>
             <Image src={burgerIcon}  alt={'burger'} />
           </Button>
           :
           <>
             <div className={classes['menu-popup']}>
               <Button w={'60px'} h={'60px'} variant={'unstyled'} onClick={toggleBurger}>
                 <Link href={'#'}>
                   <Image src={crossIcon} alt={'close'} />
                 </Link>
               </Button>

               <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                 <Link href={'#'}>
                   <Image src={profileIcon} alt={'close'} />
                 </Link>
               </Button>

               <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                 <Link href={'#'}>
                   <Image src={settingsIcon} alt={'close'} />
                 </Link>
               </Button>

               <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                 <Link href={'#'}>
                   <Image src={logoutIcon} alt={'close'} />
                 </Link>
               </Button>
             </div>
           </>
         }
       </Flex>
     </div>
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