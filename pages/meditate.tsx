import React, { useEffect, useState } from 'react';

import { NextPage } from 'next';
import Image from 'next/Image';

import BackgroundLayout from '../src/Layouts/BackgroundLayout';

import { Navbar } from '../src/components/Navbar/component';

import {Flex, Text, Input, Box} from '@chakra-ui/react';
import { GenButton } from '../src/Ui/GenButton/component';

import classes from '../src/scss/meditate.module.scss';

import pauseIcon from '../src/assets/pause.svg';
import { useRouter } from 'next/router';

const Meditate: NextPage = () => {

  const [timerValue, setTimerValue] = useState<number>(0);

  useEffect(() => {
    const currentUrl = window.location.search;
    const data: string = currentUrl && new URLSearchParams(currentUrl).get('time')!;
    data && setTimerValue(+data);
  }, [timerValue]);

  return (
    <BackgroundLayout>
      <Navbar />
      <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Text fontSize={'5xl'} color={'white'}>Keep calm & focus in your breate...</Text>
        <div className={classes.timer}>
          <div className={classes['circular-progress']}>
            <div className={classes['value-container']}>{ timerValue }</div>
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