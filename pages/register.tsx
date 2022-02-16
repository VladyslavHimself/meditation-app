import { Button, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputForm } from '../src/components/InputForm/component';
import { InputField } from '../src/Ui/InputField/component';

const Home: NextPage = () => {

  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');

  const onRegisterHandler = () => {
    router.push('/register');
  }

  return (
    <InputForm title='Register'>
        <InputField
         name={'E-mail'}
         inputValue={email}
         setInputValue={setEmail} 
        />
        
        <InputField
         name={'Password'}
         type={'password'}
         inputValue={password}
         setInputValue={setPassword} 
        />

        <InputField
         name={'Repeat password'}
         type={'password'}
         inputValue={repeatPass}
         setInputValue={setRepeatPass} 
        />
        
        <Flex w={'100%'} justifyContent={'center'}>
          <Button mt={'5px'} onClick={onRegisterHandler}> Sign Up </Button>
        </Flex>
    </InputForm>
  )
}

export default Home;
