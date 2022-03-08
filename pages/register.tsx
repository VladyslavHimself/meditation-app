import { Button, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { InputForm } from '../src/components/InputForm/component';
import { InputField } from '../src/Ui/InputField/component';
import { auth } from '../src/firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register: NextPage = () => {

  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPass, setRepeatPass] = useState<string>('');

  const onRegisterHandler = async () => {
    if (password === repeatPass) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push('/');
       } catch (error) {
         console.log(error);
       }
    } else {
      alert('Passwords does not match');
    }
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
          <Button mt={'5px'} onClick={onRegisterHandler}>Sign Up</Button>
        </Flex>
    </InputForm>
  )
}

export default Register;
