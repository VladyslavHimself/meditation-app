import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/Image';
import BackgroundLayout from '../src/Layouts/BackgroundLayout';
import { Navbar } from '../src/components/Navbar/component';
import { Flex, Text } from '@chakra-ui/react';
import { GenButton } from '../src/Ui/GenButton/component';
import classes from '../src/scss/meditate.module.scss';
import pauseIcon from '../src/assets/pause.svg';
import { QuickMeditate } from '../src/components/QuickMeditate/component';
import { Timer } from '../src/services/Timer/timer.service';

const Meditate: NextPage = () => {

  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, switchTimer] = useState<boolean>(true);


  const time = new Timer();

  useEffect(() => {
    const currentUrl = window.location.search;
    const data: string = currentUrl && new URLSearchParams(currentUrl).get('time')!;
    data && setMinutes(+data);
  }, []);


  useEffect(() => {
    if (isTimerRunning) {
      minutes <= 0 && seconds <= 0 ? console.log('stop med')
      : time.tick(seconds, minutes, setSeconds, setMinutes);
    }

  }, [minutes, seconds, isTimerRunning]);

  return (
    <BackgroundLayout>
      <Navbar />
      <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Text fontSize={'5xl'} color={'white'}>Keep calm & focus in your breate...</Text>
        <div className={classes.timer}>
          <div className={classes['circular-progress']}>
            <div className={classes['value-container']}>
              { minutes.toString().length > 1 ? minutes : `0${minutes}` }
               :
              { seconds.toString().length > 1 ? seconds : `0${seconds}` }
            </div>
          </div>
        </div>

        <div className={classes['timer-controllers']}>
          <GenButton type='light' isRound>
            <Image src={pauseIcon} alt='pause' />
          </GenButton>
          <GenButton type='accent'>Force Save</GenButton>
        </div>
      </Flex>
    </BackgroundLayout>
  )
}

export default Meditate;