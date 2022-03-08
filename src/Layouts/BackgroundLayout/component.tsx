import React from 'react';
import classes from './styles.module.scss';

interface IProps {
  children: React.ReactNode
}

export const BackgroundLayout = ({ children }: IProps ): JSX.Element => (
  <div className={classes.wrapper}>
    <div className={classes.mountains} />
    {children}
  </div>
);