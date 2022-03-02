import React from 'react';
import { Button } from '@chakra-ui/react';
import classes from './styles.module.scss';

interface IProps {
  children: React.ReactNode,
}

export const GenButton = ({ children }: IProps ): JSX.Element => (
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