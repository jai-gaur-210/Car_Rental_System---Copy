import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'


const MyBookingCard = (props) => {
  return (
    <Card maxW='sm' boxShadow='dark-lg' margin={'2%'}>
            <CardBody>
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{props.VechileModel}</Heading>
                    <Text>
                        Vechile No : {props.VechileNo}
                    </Text>
                    <Text color='blue.600' >
                        Capacity : {props.Capacity}
                    </Text>
                    <Text color='red.600' >
                        Price : {props.price}/Day
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
            <Stack mt='6' spacing='3'>
                    <Text>
                        Owner : {props.owner.name}
                    </Text>
                    <Text color='blue.600' >
                        StartDate : {props.StartDate}
                    </Text>
                    <Text color='red.600' >
                        Days : {props.Days}
                    </Text>
                </Stack>
            </CardFooter>
        </Card>
  )
}

export default MyBookingCard
