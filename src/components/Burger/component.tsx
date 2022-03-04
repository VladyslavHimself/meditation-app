import React, { useState } from 'react';
import classes from './styles.module.scss';
import burgerIcon from '../../assets/burger.svg';
import crossIcon from '../../assets/cross.svg';
import profileIcon from '../../assets/account.svg';
import settingsIcon from '../../assets/systems.svg';
import logoutIcon from '../../assets/exit.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Flex } from '@chakra-ui/react';
import { signOut } from '@firebase/auth';
import router from 'next/router';
import { auth } from '../../firebase-config';

export const Burger = ():JSX.Element => {

  const [isBurgerOpen, setIsBurgerOpen] = useState<boolean>(false);

  const toggleBurger = () => {
    setIsBurgerOpen(prevState => !prevState);
  }

  const onLogoutHandler = (): void => {
    signOut(auth);
    router.push('/');
  };

  return (
    <Flex className={classes.burger} justifyContent={'center'} alignItems={'center'}>
      {
        !isBurgerOpen ?
          <Button onClick={toggleBurger} variant={'unstyled'}>
            <Image src={burgerIcon}  alt={'burger'} />
          </Button>
          :
          <>
            <div className={classes['burger-popup']}>
              <Button w={'60px'} h={'60px'} variant={'unstyled'} onClick={toggleBurger}>
                <Link href={'#'}>
                  <Image src={crossIcon} alt={'close'} />
                </Link>
              </Button>

              <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                <Link href={'/profile'}>
                  <Image src={profileIcon} alt={'close'} />
                </Link>
              </Button>

              <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                <Link href={'/settings'}>
                  <Image src={settingsIcon} alt={'close'} />
                </Link>
              </Button>

              <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'} onClick={onLogoutHandler}>
                <Link href={'#'}>
                  <Image src={logoutIcon} alt={'close'} />
                </Link>
              </Button>
            </div>
          </>
      }
    </Flex>
  )
}