import { Box } from '@chakra-ui/layout'
import React from 'react'
import './pagenotfound.scss';


const PageNotFound = () => {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <h2 className='text-5xl font-bold'>
            <span className='error-404'>404 Error. Page Not Found.</span>
        </h2>
    </Box>
  )
}

export default PageNotFound
