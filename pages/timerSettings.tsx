import React from 'react';
import { NextPage } from 'next';
import BackgroundLayout from '../src/Layouts/BackgroundLayout';
import {Text, Flex, Box, Input } from '@chakra-ui/react';
import { GenButton } from '../src/Ui/GenButton/component';
import { Navbar } from '../src/components/Navbar/component';

const TimerSettings: NextPage = () => {

  return (
    <BackgroundLayout>
      <Navbar />
      <Flex alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
        <Text fontSize={'5xl'} color={'white'}>How much time you want to spent?</Text>
        <div className="timer-settings">
          <Flex className="timer-settings__config" alignItems={'flex-end'} height={'100px'}>
            <Input w={'100px'} fontSize={'4xl'} border={'none'} borderBottom={'1px solid black'} />
            <Text fontSize={'4xl'} lineHeight={'1'}>minutes</Text>
          </Flex>
          <Box marginTop={'30px'} display={'flex'} justifyContent={'center'}>
            <GenButton type={'light'}>Start</GenButton>
          </Box>
        </div>
      </Flex>
    </BackgroundLayout>
  )
}

export default TimerSettings;