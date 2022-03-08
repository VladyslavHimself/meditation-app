import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/Image';
import BackgroundLayout from '../src/Layouts/BackgroundLayout';
import { Navbar } from '../src/components/Navbar/component';
import { Flex, Text } from '@chakra-ui/react';
import { GenButton } from '../src/Ui/GenButton/component';
import classes from '../src/scss/meditate.module.scss';
import pauseIcon from '../src/assets/pause.svg';
import { Timer } from '../src/services/Timer/timer.service';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '../src/firebase-config';
import { v4 as uuidv4 } from 'uuid';
import resumeIcon from '../src/assets/play.svg';

const Meditate: NextPage = () => {
  const [initialTime, setInitialTime] = useState<number>();
  const [minutes, setMinutes] = useState<number>(1);
  const [seconds, setSeconds] = useState<number>(0);
  const [isTimerRunning, switchTimer] = useState<boolean>(true);

  const progressBarRef = useRef<any>(null);
  const [progressValue, setProgressValue] = useState<number>(70);
  const [progressEndValue, setProgressEndValue] = useState<number>(0);

  const time = new Timer();

  useEffect(() => {
    const currentUrl = window.location.search;
    const data: string = currentUrl && new URLSearchParams(currentUrl).get('time')!;
    data && setInitialTime(+data);
    data && setMinutes(+data);
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      minutes <= 0 && seconds <= 0 ? saveAndAlertUserComposition()
      : time.tick(seconds, minutes, setSeconds, setMinutes);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minutes, seconds, isTimerRunning]);

  const saveAndAlertUserComposition = () => {
    alertUserAboutFinish();
    saveDataToFirestore(initialTime);
  }

  const saveDataToFirestore = (inputMinutes: number = 0) => {
    const callback = async () => {
      await setDoc(doc(db, localStorage.getItem('email')!, 'Total_data', 'meditations', uuidv4()), {
        createdAt: new Date(),
        minutes: inputMinutes,
      });
    };

    callback();
  }

  const alertUserAboutFinish = () => {
    alert('Your activity has finished');
  }

  const onForceSaveClickHandler = () => {
    saveDataToFirestore(minutes)
    switchTimer(false);
    setMinutes(0);
    setSeconds(0);
  }

  const onPauseTimerHandler = () => {
    switchTimer((prevState) => !prevState);
  }

  useEffect(() => {
    progressBarRef.current.style.background = `conic-gradient(
       #4B50BF ${progressValue * 3.6}deg,
       transparent ${progressEndValue * 3.6}deg
    )`;
    
  }, [seconds])


  return (
    <BackgroundLayout>
      <Navbar />
      <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Text className={classes['header-text']}fontSize={'5xl'} color={'white'}>
          Keep calm & focus in your breate...
        </Text>
        <div className={classes.timer}>
          <div className={classes['circular-progress']} ref={progressBarRef}>
            <div className={classes['value-container']}>
              { minutes.toString().length > 1 ? minutes : `0${minutes}` }
               :
              { seconds.toString().length > 1 ? seconds : `0${seconds}` }
            </div>
          </div>
        </div>

        <div className={classes['timer-controllers']}>
          <GenButton type='light' onClickHandler={onPauseTimerHandler} isRound>
            { isTimerRunning ? <Image src={pauseIcon} alt='pause' /> : <Image src={resumeIcon} alt='resume' />}
          </GenButton>
          <GenButton type='accent' onClickHandler={onForceSaveClickHandler}>
            Force Save
          </GenButton>
        </div>
      </Flex>
    </BackgroundLayout>
  )
}

export default Meditate;
