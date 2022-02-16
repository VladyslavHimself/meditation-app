import { Button, Flex } from '@chakra-ui/react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { InputForm } from '../src/components/InputForm/component';
import { auth } from '../src/firebase-config';
import { InputField } from '../src/Ui/InputField/component';

const Home: NextPage = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<any>({});

  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);

  const router = useRouter();

  const onRegisterHandler = () => {
    router.push('/register');
  }

  const onLoginHandler = async () => {
    try {
      setIsLoadingLogin(true);
      const user = await signInWithEmailAndPassword(auth, email, password);
      await setIsLoadingLogin(false);
      router.push('/dashboard');
     } catch (error) {
       console.log(error);
     }
  }

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log(user);
  });

  useEffect(() => {
    if (user?.uid) {
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
      </InputForm>
    </>
  )
}

export default Home;
