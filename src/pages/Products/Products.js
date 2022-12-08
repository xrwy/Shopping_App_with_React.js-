import React, { useEffect, useState } from 'react'
import Product from '../../components/Product/Product'
import { Grid } from '@chakra-ui/layout';
import CircularProgress from '@mui/material/CircularProgress';
import './products.css';


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/products`)
    .then((data) => data.json())
    .then((data) => setProducts(data))
    .catch(() => console.log("Error."));
  }, []);
  
  if(products.length === 0) {
    return <div className='' style={{height:'72.6vh',overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}}>
      <CircularProgress color="inherit" />
    </div>
  }

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap={4} className='max-w-screen-xl mx-auto py-6 px-4 relative repeat-4'>
      {
        products.map((product, i) => (
          <Product key={i} product={product} />
        ))
      }
    </Grid>
  )
}

export default Products
