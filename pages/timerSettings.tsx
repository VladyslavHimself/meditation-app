import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import BackgroundLayout from '../src/Layouts/BackgroundLayout';
import {Text, Flex, Box, Input } from '@chakra-ui/react';
import { GenButton } from '../src/Ui/GenButton/component';
import { Navbar } from '../src/components/Navbar/component';
import { useRouter } from 'next/router';
import classes from '../src/scss/timerSettings.module.scss';

const TimerSettings: NextPage = () => {

  const [timerValue, setTimerValue] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    console.log(timerValue);
  }, [timerValue])

  const onTimerChangeHandler = (e: any) => {
    setTimerValue(e.target.value);
  }

  const onConfirmTimeHandler = () => {
    if (isNaN(timerValue)) {
      throw new Error('Meditation is not a number!');
    } else {
      router.push(`/meditate?time=${timerValue}`);
    }
  }

  return (
    <BackgroundLayout>
      <Navbar />
      <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Text className={classes['header-text']} fontSize={'5xl'} color={'white'}>How much time you want to spent?</Text>
        <div className="timer-settings">
          <Flex className="timer-settings__config" alignItems={'flex-end'} height={'100px'}>
            <Input value={timerValue} onChange={(e: any) => onTimerChangeHandler(e)} w={'100px'} fontSize={'4xl'} border={'none'} borderBottom={'1px solid black'} />
            <Text fontSize={'4xl'} lineHeight={'1'}>minutes</Text>
          </Flex>
          <Box marginTop={'30px'} display={'flex'} justifyContent={'center'}>
            <GenButton type={'light'} onClickHandler={onConfirmTimeHandler}>Next</GenButton>
          </Box>
        </div>
      </Flex>
    </BackgroundLayout>
  )
}

export default TimerSettings;