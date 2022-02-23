import { Flex, Button, Text } from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { Timer } from '../../services/Timer/timer.service';
import { v4 as uuidv4 } from 'uuid';


export const QuickMeditate = (): JSX.Element => {

  const [minutes, setMinutes] = useState<number>(5);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false)

  const timer = new Timer();

  const convertTimeToTTformat = (time: number): string | number => {
    if (time < 10) {
      return `0${time}`;
    } else if (time >= 10) {
      return time;
    };
    return time;
  }

  const onResumeTimerHandler = () => {
    
    if (isTimerStarted) {
      setIsTimerStarted(false);
      setTimeout(() => {
        setMinutes(5);
        setSeconds(0);
      }, 1000);
    } else {
      setIsTimerStarted(true);
    }
  };

  const connectToFirestoreAndSaveMeditation = () => {
    const callback = async () => {
      await setDoc(doc(db, localStorage.getItem('email')!, 'Total_data', 'meditations', uuidv4()), {
        createdAt: new Date(),
        minutes: 5,
      });
    };

    callback();
  } 

  useEffect(() => {
    if (isTimerStarted) {
     minutes <= 0 && seconds <= 0 ? connectToFirestoreAndSaveMeditation()
     : timer.tick(seconds, minutes, setSeconds, setMinutes);
    }
  }, [minutes, seconds, isTimerStarted])

  return (
    <Flex w='inherit' h='inherit'  boxShadow={'lg'} justifyContent='space-evenly' alignItems='center' flexDirection='column'>
      <Button borderRadius='100px' w='150px' h='150px' onClick={onResumeTimerHandler}>Quick Meditate!</Button>
      <Text color='white' fontSize='2xl'>
        {convertTimeToTTformat(minutes)} 
        : 
        {convertTimeToTTformat(seconds)}
        </Text>
    </Flex>
  )
};
