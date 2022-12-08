import { Box, Stack } from '@chakra-ui/layout'
import { Button, FormLabel, Input, Select, FormControl, Checkbox, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { BsFillFileLockFill, BsFillCreditCard2BackFill } from "react-icons/bs";
import { useShoopingContext } from '../../context/ShoopingProvider';
import './cartcheckout.css';

const CartCheckout = () => {
  const [countries, setCountries] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const { cardContents } = useShoopingContext();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/countries`)
    .then((response) => response.json())
    .then((data) => setCountries(data))
    .catch(() => console.log("Error."));
  }, []);


  const total = cardContents.reduce((acc, item) => {
    if(item.product_count === 0){
      return acc + 0;
    }else {
      const result = acc + item.product_count * item.product_price;
      return result;
    }
  }, 0)

  return (
    <Box className='max-w-5xl mx-auto'>
      <Box className='py-4'>
        <Row className='p-0' style={{margin:'0 auto'}}>
          <Col className='px-4 py-5 after-px-2' sm={7} style={{borderRadius:'7px',display:'flex', flexDirection:'column'}}>
            <Box className='py-2'>
              <h2 className='text-4xl font-medium'>Payment Information</h2>
            </Box>
            <Box className='mt-6'>
              <h2 className='text-2xl font-medium'>Billing Address</h2>
            </Box>
            <Box display="flex" flexDirection="column" maxWidth="50%" flex="1">
              <Box mt="4" display="flex" justifyContent="space-between" alignItems="center">
                <span className='text-sm'><b>Country</b></span>
                <span className='text-xs'>Necessary</span>
              </Box>
              <Box mt="4">
              <Select placeholder='Select Country' outline="2px solid lightgrey" cursor="pointer">
                {
                  countries.map((country, i) => (
                    <option key={i} value={country.country}>{country.country}</option>
                  ))
                }
              </Select>
              </Box>
            </Box>
            <Box mt="4">
              <span className='text-xs'>
                Anonymous is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
              </span>
            </Box>
            <Box className='mt-6'>
              <Box flexWrap="wrap" mt="4" display="flex" justifyContent="space-between" alignItems="center">
                <h2 className='text-2xl font-medium'>Payment Method</h2>
                <span className="flex justify-center items-center flex-wrap"> 
                  <span className='text-xs'>Secure Connection</span>
                  <BsFillFileLockFill className='ml-3 text-2xl'/>
                </span>
              </Box>
            </Box>
            <Box>
              <Stack  display="flex" className='py-4 px-0'>
                <Box cursor="pointer" display="flex" alignItems="center" justifyContent="space-between" onClick={() => {
                    setIsVisible((isVisible) => !isVisible)
                  }}  backgroundColor="#f7f9fa" className='px-2 py-2' flex="auto" flexWrap="wrap" border="1px solid #ddd">

                  <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" mr="4">
                    <Button className='px-2 py-1 ml-1' border="1px solid #ddd">
                      <BsFillCreditCard2BackFill style={{display:'inline'}} />
                    </Button>
                    <Box display="flex" alignItems="center">
                      <span className='pl-3 text-1xl font-medium'>
                        Credit / Account <br /> Card
                      </span>
                    </Box>
                  </Box>
                 
                  {
                    !isVisible ? 
                    <Box width="60%" className='cards' display="flex" alignItems="center" justifyContent="end" flexWrap="wrap" rowGap="0.5">
                    <Box>
                      <Image height="30px" border="1px solid #ddd" src="https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg" />
                    </Box>
                    <Box>
                      <Image maxWidth="4.2rem" height="30px" border="1px solid #ddd" ml="0.5" src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg" />
                    </Box>
                    <Box>
                      <Image height="30px" border="1px solid #ddd" ml="0.5" src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg" />
                    </Box>
                    <Box>
                      <Image height="30px" border="1px solid #ddd" ml="0.5" src="https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg" />
                    </Box>
                    <Box>
                      <Image height="30px" border="1px solid #ddd" ml="0.5" src="https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg" />
                    </Box>
                    <Box>
                      <Image height="30px" border="1px solid #ddd" ml="0.5" src="https://www.udemy.com/staticx/udemy/images/v9/card-jcb.svg" />
                    </Box>
                    <Box>
                      <Image height="30px" border="1px solid #ddd" ml="0.5" src="https://www.udemy.com/staticx/udemy/images/v9/card-troy.svg" />
                    </Box>
                  </Box>
                    :
                    null
                   
                  }
                </Box>
              </Stack>
              {
                !isVisible ?
                null
                :
                <Box>
                <form>
                  <FormControl isRequired>
                    <FormLabel mb="0.5">Name on the Card</FormLabel>
                    <Input className='py-4' borderRadius="0" backgroundColor="white" placeholder='Name on the Card' />
                  </FormControl>
                  <FormControl isRequired mt="3">
                    <FormLabel mb="0.5">Card Number</FormLabel>
                    <Input className='py-4' borderRadius="0" backgroundColor="white" placeholder='1234 5678 9012 3456' />
                  </FormControl>

                  <Box mt="1.5" display="flex" alignItems="center" justifyContent="start" flexWrap="wrap" rowGap="0.5">
                    <Box>
                      <Image height="20px" border="1px solid #ddd" src="https://www.udemy.com/staticx/udemy/images/v9/card-visa.svg" />
                    </Box>
                    <Box>
                      <Image height="20px" border="1px solid #ddd" ml="1" src="https://www.udemy.com/staticx/udemy/images/v9/card-mastercard.svg" />
                    </Box>
                    <Box>
                      <Image height="20px" border="1px solid #ddd" ml="1" src="https://www.udemy.com/staticx/udemy/images/v9/card-amex.svg" />
                    </Box>
                    <Box>
                      <Image height="20px" border="1px solid #ddd" ml="1" src="https://www.udemy.com/staticx/udemy/images/v9/card-dinersclub.svg" />
                    </Box>
                    <Box>
                      <Image height="20px" border="1px solid #ddd" ml="1" src="https://www.udemy.com/staticx/udemy/images/v9/card-discover.svg" />
                    </Box>
                    <Box>
                      <Image height="20px" border="1px solid #ddd" ml="1" src="https://www.udemy.com/staticx/udemy/images/v9/card-jcb.svg" />
                    </Box>
                    <Box>
                      <Image height="20px" border="1px solid #ddd" ml="1" src="https://www.udemy.com/staticx/udemy/images/v9/card-troy.svg" />
                    </Box>
                  </Box>
                  <Row className='mt-3'>
                    <Col>
                      <FormControl isRequired>
                        <FormLabel mb="0.5">Expiration Date</FormLabel>
                        <Input className='py-4' borderRadius="0" backgroundColor="white" placeholder='Expiration Date' />
                      </FormControl>
                    </Col>
                    <Col>
                      <FormControl isRequired>
                        <FormLabel mb="0.5">CVC / CVV</FormLabel>
                        <Input className='py-4' borderRadius="0" backgroundColor="white" placeholder='CVC / CVV' />
                      </FormControl>
                    </Col>
                  </Row>
                  <Box className='mt-4'>
                    <FormControl>
                     <FormLabel display="flex" alignItems="center">
                       <Checkbox />
                        <span className='ml-3 text-sm font-normal'>Securely save this card for my future purchases.</span>
                      </FormLabel>
                    </FormControl>
                  </Box>
                </form>
              </Box>
              }
            </Box>
            <Box className='mt-4'>
              <h2 className='text-2xl font-medium'>
                Order details
              </h2>
              <Box className='mt-4'>
                {
                  cardContents.map((cardItem, index) => (
                    <Box key={index}>
                    {
                      cardItem.product_count === 0
                      ?
                      null
                      :
                      <Box key={cardItem} mt="6" display="flex" flexWrap="wrap" justifyContent="space-between" alignItems="center">
                        <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                          <Box height="40px" width="40px">
                            <Image height="40px" width="35px" src={cardItem.product_image} />
                          </Box>
                          <Box display="flex" alignItems="center" flexDirection="column" justifyContent="flex-start">
                            <span className='ml-2 font-bold text-sm after-ml-0' style={{wordBreak:'break-all'}}>{cardItem.product_title}</span>
                            <span className='font-bold text-xs ml-2 mt-1 after-ml-0' style={{alignSelf:'flex-start'}}>
                              ({cardItem.product_count} Pieces)
                              </span>
                          </Box>
                        </Box>
                        <Box>
                          <span className='mr-3 font-semibold text-1xl'>
                            $
                            {
                              Number(cardItem.product_count * cardItem.product_price).toFixed(2) 
                            } 
                          </span>
                        </Box>
                      </Box>
                    }
                    </Box>
                  ))
                }
              </Box>
            </Box>
          </Col>
          <Col className='py-5 px-5 after-p-3' sm={5} style={{backgroundColor:'#f7f9fa',borderRadius:'7px',display:'flex', flexDirection:'column'}}>
            <Box className='py-3'>
              <h2 className='text-2xl font-medium'>Summary</h2>
            </Box>
            <Box  display="flex" justifyContent="space-between" alignItems="center">
              <span className='text-sm'>
                Original Price:
              </span>
              <span>
                {Number(total).toFixed(2)}
              </span>
            </Box>
            <Box mt="2">
              <hr />
            </Box>
            <Box mt="2" display="flex" justifyContent="space-between" alignItems="center">
              <span className='text-1xl font-bold'>
                Total:
              </span>
              <span className='text-1xl font-bold'>
                ${Number(total).toFixed(2)}
              </span>
            </Box>
            <Box mt="5">
              <span className='text-xs' style={{lineHeight:'0.2rem'}}>
                By completing your purchase, you agree to these Terms of Service.
              </span>
            </Box>
            <Box mt="4">
              <Button whiteSpace="pre-wrap" colorScheme="purple" size='md' height='63px' width='100%' borderRadius="0">
                Complete Payment
              </Button>
            </Box>
            <Box mt="1.5" display="flex" justifyContent="center">
              <span className='text-xs'>30-Day Money Back Guarantee</span>
            </Box>
          </Col>
        </Row>
      </Box>
    </Box>
  )
}

export default CartCheckout
