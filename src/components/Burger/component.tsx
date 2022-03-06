import React, { useState } from 'react';
import classes from './styles.module.scss';
import burgerIcon from '../../assets/burger.svg';
import crossIcon from '../../assets/cross.svg';
import dashboardIcon from '../../assets/dashboard.svg';
import settingsIcon from '../../assets/systems.svg';
import logoutIcon from '../../assets/exit.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Flex } from '@chakra-ui/react';
import { signOut } from '@firebase/auth';
import router from 'next/router';
import { auth } from '../../firebase-config';
import { motion } from 'framer-motion';

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
    <motion.div className={classes.burger}
      whileHover={{
        scale: 1.1
      }}
    >
      
      {
        !isBurgerOpen ?
          <Button onClick={toggleBurger} variant={'unstyled'}>
            <Image src={burgerIcon}  alt={'burger'} />
          </Button>
          :
          <>
            <motion.div className={classes['burger-popup']}
              animate={{
                height: '450px'
              }}

              whileTap={{
                height: '100px',
              }}
            >
              <Button w={'60px'} h={'60px'} variant={'unstyled'} onClick={toggleBurger}>
                <Link href={'#'}>
                  <Image src={crossIcon} alt={'close'} />
                </Link>
              </Button>

              <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                <Link href={'/dashboard'}>
                  <Image src={dashboardIcon} alt={'dashboard'} />
                </Link>
              </Button>

              <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'}>
                <Link href={'/settings'}>
                  <Image src={settingsIcon} alt={'settings'} />
                </Link>
              </Button>

              <Button mt={'50px'} w={'60px'} h={'60px'} variant={'unstyled'} onClick={onLogoutHandler}>
                <Link href={'#'}>
                  <Image src={logoutIcon} alt={'logout'} />
                </Link>
              </Button>
            </motion.div>
          </>
      }
    </motion.div>
  )
}