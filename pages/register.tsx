import { Button, Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { InputForm } from '../src/components/InputForm/component';
import { InputField } from '../src/Ui/InputField/component';

const Home: NextPage = () => {

  const router = useRouter();

  const onRegisterHandler = () => {
    router.push('/register');
  }

  return (
    <InputForm title='Register'>
        <InputField name={'E-mail'} />
        <InputField name={'Password'} type={'password'}/>
        <InputField name={'Repeat password'} type={'password'}/>
        
        <Flex w={'100%'} justifyContent={'center'}>
          <Button mt={'5px'} onClick={onRegisterHandler}> Sign Up </Button>
        </Flex>
    </InputForm>
  )
}

export default Home;
