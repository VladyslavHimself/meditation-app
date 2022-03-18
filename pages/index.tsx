import { Button, Flex, Text } from '@chakra-ui/react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InputForm } from '../src/components/InputForm/component';
import { auth } from '../src/firebase-config';
import { useAuthStateChecker } from '../src/hooks/useAuthStateChecker/useAuthStateChecker';
import { InputField } from '../src/Ui/InputField/component';

const Home: NextPage = () => {

  

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any>({});

  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);

  const router = useRouter();

  const onRegisterHandler = () => {
    router.push('/register');
  }


  useEffect(() => {
    window.addEventListener('load', async () => {
      if ('serviceWorker' in navigator) {
        try {
          const reg = await navigator.serviceWorker.register('./sw.js');
          console.log('[SW]: Success', reg);
        } catch (error) {
          console.log('[SW]: Service worker are not enabled');
        }
      }
    });
  },[])


  const onLoginHandler = async () => {
    try {
      setIsLoadingLogin(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoadingLogin(false);
      router.push('/dashboard');
     } catch (e: any) {   
        setIsLoadingLogin(false);
        setIsWrongPassword(true);
        setPassword('');
     }
  }

  useAuthStateChecker(auth, setUser);

  useEffect(() => {
    if (user?.uid) {
      localStorage.setItem('email', user.email);
      router.push('/dashboard');
    }
  }, [router, user]);

  return (
    <>
      <InputForm title='Meditation'>
          <InputField
          name={'E-mail'}
          inputValue={email}
          setInputValue={setEmail} 
          />

          <InputField
          name={'Password'}
          inputValue={password}
          setInputValue={setPassword} 
          type={'password'}
          />
          
          <Flex w={'100%'} justifyContent={'space-between'}>
            <Button mt={'5px'} onClick={onLoginHandler} isLoading={isLoadingLogin}> Login </Button>
            <Button mt={'5px'} onClick={onRegisterHandler}> Register </Button>
          </Flex>
          { isWrongPassword ? <Text fontSize='sm' color='red.300'>Wrong e-mail or password!</Text> : undefined }
      </InputForm>
    </>
  )
}

export default Home;
