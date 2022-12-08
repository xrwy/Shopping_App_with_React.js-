import React from 'react'
import { Box, Image, Button}  from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import './product.css';
import { useShoopingContext } from '../../context/ShoopingProvider';
import { ADD_TO_CART, DELETE_FROM_CARD } from '../../action_types/ActionTypes';

const Product = ({ product }) => {

    const { dispatch, cardContents } = useShoopingContext();
    
    const findItem = cardContents.find((cardItem) => cardItem.id === product.id);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
        <Link to={`/products/${product.id}`} className='text-black'>
            <Box justifyContent="center" display="flex" height="min-content">
                <Box width="11.25rem" height="12.5rem" display="flex" alignItems="center">
                    <Image className='hover-effect' src={product.product_image} style={{maxHeight:'100%',maxWidth:'100%'}} alt="product" loading='lazy' objectFit="contain" />
                </Box>
            </Box>

            <Box paddingTop="4" paddingBottom="4">
                <Box display="flex" alignItems="baseline">
                   <span className='overText'>1.12.2002</span>
                </Box>
                <Box mt="1" fontWeight="semibold" as="h4" className='overText'>
                    {product.product_title}
                </Box>
                <Box className='overText'>
                    {product.product_description}
                </Box>
                <Box className='after-p-0' mt="2" border="1.5px solid #ddd" color="black" display="inline-flex" paddingLeft="4" paddingRight="4" paddingTop="2" paddingBottom="2" borderRadius="4">
                    <b style={{fontWeight:'400'}}>{product.product_price} $</b>
                </Box>
            </Box>
        </Link>
        <Button colorScheme="pink" className='fontVw' onClick={() => {
            if(!findItem){
                dispatch({type:ADD_TO_CART, payload:product})
            }else {
                dispatch({type:DELETE_FROM_CARD, payload:product.id})
            }
        }}>{!findItem ? "Add to Basket" : "Delete From Card"}</Button>
    </Box>
  )
}

export default Product
