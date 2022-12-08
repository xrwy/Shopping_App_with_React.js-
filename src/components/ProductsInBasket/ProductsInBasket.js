import React from 'react'
import { Box, Image, Button}  from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useShoopingContext } from '../../context/ShoopingProvider';
import { ADD_TO_CART, DELETE_FROM_CARD, DESCREASE_NUMBER_OF_PIECES, INCREASE_NUMBER_OF_PIECES } from '../../action_types/ActionTypes';
import { BsFillPlusCircleFill, BsFillDashCircleFill } from "react-icons/bs";
import './productinbasket.css';


const ProductsInBasket = ({ product }) => {
    const { dispatch, cardContents } = useShoopingContext();
    
    const findItem = cardContents.find((cardItem) => cardItem.id === product.id);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
        <Link to={`/products/${product.id}`}>
            <Box justifyContent="center" display="flex" height="min-content">
                <Box width="11.25rem" height="12.5rem" display="flex" alignItems="center">
                    <Image className='hover-effect' src={product.product_image} style={{maxHeight:'100%',maxWidth:'100%'}} alt="product" loading='lazy' objectFit="contain" />
                </Box>
            </Box>
        </Link>
            <Box paddingTop="4" paddingBottom="4">
                <Box display="flex" alignItems="baseline">
                    1.12.2002
                </Box>
                <Box mt="1" fontWeight="semibold" as="h4" className='overText'>
                    {product.product_title}
                </Box>
                <Box className='overText'>
                    {product.product_description}
                </Box>
                <Box mt="2" border="2px dotted black" color="black" display="inline-flex" paddingLeft="4" paddingRight="4" paddingTop="2" paddingBottom="2" borderRadius="4">
                    <b style={{fontWeight:'600'}}><b>Price :</b> {product.product_price} $</b>
                </Box>
                <Box mt="2">
                    Subtotal ( {product.product_count} items ) : <b>${Number(product.product_price * product.product_count).toFixed(2)}</b>
                </Box>
                <Box mt="3" display='flex' justifyContent="center" alignItems="center">
                    <BsFillDashCircleFill fontSize="24px" cursor="pointer" onClick={() => {
                        dispatch({type:DESCREASE_NUMBER_OF_PIECES, payload:{id:product.id}})
                    }}
                    />
                    <Box marginLeft="1rem" marginRight="1rem">
                        {product.product_count}
                    </Box>
                    <BsFillPlusCircleFill fontSize="24px" cursor="pointer" onClick={() => {
                        dispatch({type:INCREASE_NUMBER_OF_PIECES, payload:{id:product.id}})
                    }}
                    
                    />
                </Box>
            </Box>
        
        <Button colorScheme="pink" className='fontVw delete-btn' onClick={() => {
            if(!findItem){
                dispatch({type:ADD_TO_CART, payload:product})
            }else {
                dispatch({type:DELETE_FROM_CARD, payload:product.id})
            }
        }}>{!findItem ? "Add to Basket" : "Delete From Card"}</Button>
    </Box>
  )
}

export default ProductsInBasket;
