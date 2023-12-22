import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Book from './Book'

const ClientRentCard = (props) => {
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
                <ButtonGroup spacing='2'>
                    
                    {<Book retrieve={props.retrieve} id={props.id} VechileModel={props.VechileModel} VechileNo={props.VechileNo} Capacity={props.Capacity} price={props.price}/>}
                    <Button variant='ghost' colorScheme='red' >
                        More Details
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
  )
}

export default ClientRentCard
