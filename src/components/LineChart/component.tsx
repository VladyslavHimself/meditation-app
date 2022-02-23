import React from 'react';
import { Line } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


interface IProps {
  title: string,
  data: any
}

export const LineChart = ({ title, data }: IProps): JSX.Element => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  
  return (
    <>
      
      <Flex w='500px' h='250px' ml='25px' flexDirection='column' justifyContent='center' alignItems='center' boxShadow={'lg'} padding='25px' paddingBottom='70px' paddingTop='70px' borderRadius='10px' backgroundColor={'#e0f0ff'}>
        <Line options={options} data={data} />
      </Flex>
      
    </>
  )
};
