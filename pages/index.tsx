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
    <InputForm title='Meditation'>
        <InputField name={'E-mail'} />
        <InputField name={'Password'} type={'password'}/>
        
        <Flex w={'100%'} justifyContent={'space-between'}>
          <Button mt={'5px'}> Login </Button>
          <Button mt={'5px'} onClick={onRegisterHandler}> Register </Button>
        </Flex>
    </InputForm>
  )
}

export default Home;
