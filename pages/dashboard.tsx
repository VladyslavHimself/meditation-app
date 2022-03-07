import { Box, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../src/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { NotAuthorized } from '../src/components/NotAuthorized/component';
import { ActivityBox } from '../src/components/ActivityBox/component';
import medGirlImage from '../src/assets/meditation-girl.svg';
import workGuyImage from '../src/assets/work-guy.svg';
import chillGuyImage from '../src/assets/chill-guy.svg';
import { GenButton } from '../src/Ui/GenButton/component';
import { BackgroundLayout } from '../src/Layouts/BackgroundLayout/component';
import { Navbar } from '../src/components/Navbar/component';
import { motion } from 'framer-motion';

interface IChartData {
  labels: string[];
  datasets: {
      data: number[];
      label: string;
      borderColor: string;
      backgroundColor: string;
  }[];
}

interface IActivity { 
  id: number,
  title: string,
  image: any,
  href: string,
  isDisabled: boolean,
}

const Dashboard: NextPage = () => {

  const pMotion = {
    'hidden': {
      x: -50,
      opacity: 0
    },

    'visible': {
      x: 0,
      opacity: 1,
    }
  }

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
    // #TODO: Export to a separate service
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

  // TODO: Do separate hook
  onAuthStateChanged(auth, (currentUser): void => {
    currentUser && setUser(currentUser);
  });


  const activities: IActivity[] = [
    {
      id: 1,
      title: 'Focus on your mind',
      image: medGirlImage,
      href: '/timerSettings',
      isDisabled: false,
    },

    {
      id: 2,
      title: 'Focus on your work',
      image: workGuyImage,
      href: '#',
      isDisabled: true,
    },

    {
      id: 3,
      title: 'Focus on your hobby',
      image: chillGuyImage,
      href: '#',
      isDisabled: true,
    },
  ]

  return (
    user ? (
      <BackgroundLayout>
        <Navbar />
        <Flex justifyContent={'center'}>
          <Flex flexDirection={'column'}>
            <motion.div
              initial={pMotion.hidden}
              animate={pMotion.visible}
              transition={{
                delay: .5,
                duration: 1.7,
                type: 'spring'
              }}
            >
              <Text fontSize={'5xl'} color={'white'}>Welcome back, Vladyslav</Text>  
            </motion.div>
            <Flex className="activities">

              {
                activities.map((({ id, title, href, image, isDisabled }: IActivity) => (
                    <Link key={id} href={href} passHref={true}>
                      <Box p={'10px'}>
                        <ActivityBox title={title} image={image} isDisabled={isDisabled} />
                        </Box>
                    </Link>
                  )
                ))
              }
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


  /* <motion.div
    initial={{
      y: 200,
      opacity: 0,
    }}
    animate={{
      y: 0,
      opacity: 1,
    }}
    transition={{
      duration: .8,
      type: 'spring'
    }}
  > */

  // </motion.div>