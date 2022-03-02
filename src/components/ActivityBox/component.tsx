import React from 'react';
import { Box, Button, Container, Flex, Text} from '@chakra-ui/react';
import Image from 'next/image'

import classes from './styles.module.scss';


interface IProps {
  title: string,
  image: any,
}

export const ActivityBox = ( { title, image }: IProps ): JSX.Element => (
  <Flex className={classes.activity} justifyContent={'flex-end'} alignItems={'flex-end'}>
    <Text className={classes.activity__text} fontSize={'24px'} color={'white'} w={'150px'}>{ title }</Text>
    <Image className={classes.activity__image} src={image} alt="girl meditate" />
  </Flex>
);