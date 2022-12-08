import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button';
import { useShoopingContext } from '../../context/ShoopingProvider';
import { ADD_TO_CART, DELETE_FROM_CARD } from '../../action_types/ActionTypes';

const ProductDetail = () => {
    const { product_id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const { cardContents, dispatch } = useShoopingContext();

    useEffect(() => {
      fetch(`${process.env.REACT_APP_BASE_URL}/products/${product_id}`)
        .then((data) => data.json())
        .then((data) => setProductDetail(data))
        .catch(() => console.log("Error."))
    },[product_id]);

    const findValue = cardContents.find((cardItem) => cardItem.id === parseInt(product_id));

  return (
    <Container className='py-5'>
       <Row>
        <Col sm={4}>
          <div className='py-4 px-4'>
            <Image src={productDetail.product_image} thumbnail className='py-3 px-3'/>
          </div>
        </Col>
        <Col xs={8} className='items-center flex'>
          <div className='py-5'>
            <div>
              <h1 className='text-2xl uppercase font-normal' style={{fontFamily:'Oswald,sans-serif'}}>{productDetail.product_title}</h1>
            </div>
            <div className='flex justify-between items-center py-3'>
              <div>
                <h3 className='text-2xl font-bold'>{productDetail.product_price} $</h3>
              </div>
              <div>
                <div className='flex justify-end'>
                  <span className='mt-0.5 font-bold'>{productDetail.product_star}</span>
                  <span className='inline-block ml-3 mt-1' style={{marginRight:'-11px'}}>
                    <svg width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m15 .734 4.635 9.392L30 11.633l-7.5 7.31 1.77 10.323L15 24.392l-9.27 4.874L7.5 18.943 0 11.633l10.365-1.507L15 .734Z" fill="#EFCE4A"></path></svg>
                  </span>
                </div>
                <div className='mr-1'>
                  <span className='font-medium' style={{fontFamily:'Oswald,sans-serif'}}>{productDetail.product_Reviews} Reviews</span>
                </div>
              </div>
            </div>
            <div>
              <p className='text-lg line-height: 1.75rem font-light' style={{fontFamily:'Oswald,sans-serif'}}>
                {productDetail.product_description}
              </p>
            </div>
            <div className='py-4'>
              <div className="d-grid gap-2">
              <Button variant="outline-dark" size='lg' onClick={() => {
                    if(!findValue){
                        dispatch({type:ADD_TO_CART, payload:productDetail})
                    }else {
                        dispatch({type:DELETE_FROM_CARD, payload:productDetail.id})
                    }
                }}
                >
                {
                  !findValue ? "Add to Card" : "Delete From Card"
                }
              </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
