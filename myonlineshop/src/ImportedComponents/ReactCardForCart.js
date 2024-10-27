import React, { useContext } from 'react'
import { Card, CardHeader, CardBody, CardFooter,Text,Stack,Divider,Image,Heading,Button,ButtonGroup } from '@chakra-ui/react'
import { productAPI } from '../contexts/ProductContext'

export default function ReactCardForCart(props) {
  const cartInfo=useContext(productAPI)
  const {productName,productDescription,productPrice,images,_id}=props.product
  return (
    <Card maxW='xs'>
    <CardBody className='m-2'>
      <Image
        src={images[0]}
        borderRadius='lg'
        className='max-w-60 h-60'
      />
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{productName}</Heading>
     
        <Text color='blue.600' fontSize='2xl'>
        ₹{productPrice}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='ghost' colorScheme='blue' onClick={(e)=>{
          let cartProducts=cartInfo.productCart
         cartProducts= cartProducts.filter((e)=>{
            return e._id!==_id
          })
          cartInfo.setProductCart(cartProducts)
        }}>
          Remove from cart
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
  )
}
