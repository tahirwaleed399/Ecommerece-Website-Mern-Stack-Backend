import { Box, Heading, HStack, Text } from "@chakra-ui/react";
import React from "react";
// import { Chart as ChartJS, CategoryScale, LinearScale ,PointElement , LineElement} from 'chart.js';
import { Line } from "react-chartjs-2";
import { useGetAllOrdersQuery } from "../../Redux/OrdersApi/OrdersApi";
import Loader from "../Common/Loader";

// ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement);
import "chart.js/auto";
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const Stats = () => {
  let { data, isLoading } = useGetAllOrdersQuery();
  let categorizedData: any = {};
  let totalSales :number = 0;
  let ordersProcessingPending:any = [];
  if (data) {
    const { orders } = data;
    ordersProcessingPending = orders.filter((order:any)=> order.orderStatus.toLowerCase() === 'processing')
    totalSales=   orders.reduce((total: any, order: any) => total + order.totalPrice, 0);
    categorizedData = orders.reduce((groupedData: any, order: any) => {
      let month = months[new Date(order.createdAt).getMonth()];

      if (!groupedData[month]) groupedData[month] = [];
      groupedData[month].push(order.totalPrice);
      return groupedData;
    }, {});

    for (let month in categorizedData) {
      console.log(categorizedData[month]);
      categorizedData[month] = categorizedData[month].reduce(
        (total: number, amount: number) => {
          return total + amount;
        },
        0
      );
    }
  }
  return (
    <Box className="py-20 ">
      <Heading className="text-center mb-5"> Store Statistics </Heading>
      {/* {
    JSON.stringify(data.orders.reduc)
} */}
      {!isLoading ? (
        <>
        <Box className="flex justify-around flex-wrap">

            
            <Box>
                <Heading fontSize={'20px'} className='mb-3'>Total Sales : </Heading>
            <Box h='200px' w='200px' rounded={'full'} bg='#d63031' className="grid place-items-center">
            <Text color='white' fontSize={'25px'}>Rs : {totalSales}</Text>
            </Box>
            </Box>   <Box>
                <Heading fontSize={'20px'} className='mb-3'>Total Orders : </Heading>
            <Box h='200px' w='200px' rounded={'full'} bg='#0984e3' className="grid place-items-center">
            <Text color='white' fontSize={'25px'}>{data.orders.length}</Text>
            </Box>
            </Box>   <Box>
                <Heading fontSize={'20px'} className='mb-3'>Orders Processing Pending : </Heading>
            <Box h='200px' w='200px' rounded={'full'} bg='#00b894' className="grid place-items-center">
            <Text color='white' fontSize={'25px'}>{ordersProcessingPending.length}</Text>
            </Box>
            </Box>  
        </Box>
        <Box>
          <Line
            datasetIdKey="id"
            data={
              {
                labels: months.map((month: string) => month),
                datasets: [
                  {
                    label: "Sales in Month",
                    data: months.map((month: string) => {
                      if (!categorizedData[month]) categorizedData[month] = 0;

                      return categorizedData[month];
                    }),
                    backgroundColor: [
                      "rgba(75,192,192,1)",
                      "#ecf0f1",
                      "#50AF95",
                      "#f3ba2f",
                      "#2a71d0",
                    ],
        fill: true,

                    borderColor: "black",
                    borderWidth: 2,
                    pointStyle: "circle",
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    
                  },
                ],
              } as any
            }
            options={{
              responsive: true,
              animations: {
                tension: {
                  duration: 1000,
                  easing: 'linear',
                  from: 1,
                  to: 0,
                  loop: true
                }
              },
              plugins: {
                  title: {
                      display: true,
                  text: "Chart Shows Sales Volume in Following Months",
                },
              },
            }}
            />
        </Box>
            </>
      ) : (
        <Loader></Loader>
      )}
    </Box>
  );
};

export default Stats;
