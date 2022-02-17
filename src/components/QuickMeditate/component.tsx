import { Flex, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

export const QuickMeditate = (): JSX.Element => {

  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(5);
  const [isTimerRun, setIsTimerRun] = useState<boolean>(false);

  const convertTimeToTTformat = (time: number): string | number => {
    if (time < 10) {
      return `0${time}`;
    } else if (time >= 10) {
      return time;
    };

    return time;
  }

  const onResumeTimerHandler = () => {
    setIsTimerRun(prevState => !prevState);
  }

  useEffect(() => {
    // #TODO timer for fast meditation;  
  }, [isTimerRun]);

  return (
    <Flex w='inherit' h='inherit' justifyContent='space-evenly' alignItems='center' flexDirection='column'>
      <Button borderRadius='100px' w='150px' h='150px' onClick={onResumeTimerHandler}>Quick Meditate!</Button>
      <Text color='white' fontSize='2xl'>
        {convertTimeToTTformat(minutes)} 
        : 
        {convertTimeToTTformat(seconds)}
        </Text>
    </Flex>
  )
};
