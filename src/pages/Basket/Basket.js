import { Box, Grid } from '@chakra-ui/layout';
import { Button, Center } from '@chakra-ui/react'
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductsInBasket from '../../components/ProductsInBasket/ProductsInBasket';
import { useShoopingContext } from '../../context/ShoopingProvider';
import './basket.css';


const Basket = () => {
  const { cardContents } = useShoopingContext();

  const total = cardContents.reduce((acc, item) => {
    if(item.product_count === 0){
      return acc + 0;
    }else {
      const result = acc + item.product_count * item.product_price;
      return result;
    }
  }, 0);
  

  if(cardContents.length === 0){
    return (
      <Center flexDirection="column" rowGap="5" bg="white" h='100vh' color='black' fontSize="4xl">
        <Box>
          There is no product in the cart.
        </Box>
        <Box>
            <Link to='/'>
              <Button className='py-8 px-8 fw-5' borderRadius="6" colorScheme="purple" width="100%">
                Back to Homepage
              </Button>
            </Link>
          </Box>
      </Center>
    )
  }

  return (
    <Box className='basket-wrapper'>
      <Row className='row-'>
        <Col className='col-'>
          <Grid templateColumns='repeat(2, 1fr)' gap={4} className='max-w-screen-xl mx-auto py-6 px-4 relative repeat-4 repeat-1'>
          {
            cardContents.map((product, i) => (
              <ProductsInBasket key={i} product={product} />
            ))
          }
        </Grid>
        </Col>
      </Row>
      <Box className='py-6 px-4 buy-box after-py-1'>
        <Box className='py-6 px-4 border after-py-0'>
          <Box className='py-6 w-100'>
            <h2 className='text-2xl font-semibold'>Subtotal : ${Number(total).toFixed(2)}</h2>
          </Box>
          <Box>
            <Link to='/basket/checkout'>
              <Button className='py-8 px-8 fw-5' borderRadius="6" colorScheme="purple" width="100%">
                Continue to checkout
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Basket;
