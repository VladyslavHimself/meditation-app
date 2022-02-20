import React from 'react';
import { Line } from 'react-chartjs-2';
import { Flex } from '@chakra-ui/react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { stringify } from 'querystring';

const mockData = {
  labels: [1,2,3],
  datasets: [{
    data: [1,2,3],
    label: 'minutes',
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',

  }]
};

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
      
      <Flex w='500px' h='250px' ml='25px' flexDirection='column' justifyContent='center' alignItems='center' boxShadow={'2xl'} padding='25px' paddingBottom='70px' paddingTop='70px' borderRadius='10px' backgroundColor={'#e0f0ff'}>
        <Line options={options} data={mockData} />
      </Flex>
      
    </>
  )
};
