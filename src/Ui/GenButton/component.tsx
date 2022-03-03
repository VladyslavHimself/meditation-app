import React from 'react';
import { Button } from '@chakra-ui/react';
import classes from './styles.module.scss';

interface IProps extends React.HTMLAttributes<HTMLElement>{
  children: React.ReactNode,
  type: 'light' | 'main' | 'accent',
  isRound?: boolean
}

export const GenButton = ({ children, type, isRound }: IProps ): JSX.Element => {

  if (type === 'light') {
    return (
      <Button
        className={classes.button}
        borderRadius='30px'
        backgroundColor={'#888DF0'}
        color={'#f4f4f4'}
        h={'50px'}
        p={'0px 44px'}
      >
        { children }
      </Button>
    );

  } else if (type === 'main') {
    return (
      <Button
        className={classes.button}
        borderRadius='30px'
        backgroundColor={'#231773'}
        color={'#f4f4f4'}
        h={'50px'}
        p={'0px 44px'}
      >
        { children }
      </Button>
    );
  } else if (type === 'accent') {
    return (
      <Button
        className={classes.button}
        borderRadius='30px'
        backgroundColor={'#F08888'}
        color={'#f4f4f4'}
        h={'50px'}
        p={'0px 20px'}
      >
        { children }
      </Button>
    );
  }

  return <p>no button</p>
}