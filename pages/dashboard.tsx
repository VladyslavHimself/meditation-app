import { Box, Flex, Text} from '@chakra-ui/react';
import { onAuthStateChanged, User } from 'firebase/auth';
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

  const activitiesMotion = {
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * .2,
        duration: 1,
        type: 'spring'
      }
    }),

    hidden: { opacity: 0, x: 100}
  };

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

// #TODO: Export to a separate service
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
              <Text className={classes['header-text']} fontSize={'5xl'}  color={'white'}>Welcome back, Vladyslav</Text>  
            </motion.div>
            <Flex className={classes.activities}>

              {
                activities.map((({ id, title, href, image, isDisabled }: IActivity, i) => (
                  <motion.div
                   key={id}
                   variants={activitiesMotion}
                   initial='hidden'
                   animate='visible'
                   custom={i}
                  >
                    <Link  href={href} passHref={true}>
                      <Box p={'10px'}>    
                        <ActivityBox title={title} image={image} isDisabled={isDisabled} />
                        </Box>
                    </Link>
                  </motion.div>
                    
                  )
                ))
              }
            </Flex>
            <Box className={classes['courses-button']} ml={'50px'} mt={'5px'}>
              <GenButton type={'main'}>Explore courses</GenButton>
            </Box>
          </Flex>

        </Flex>
      </BackgroundLayout>
    ) : <NotAuthorized />
  )
};

export default Dashboard;