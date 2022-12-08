import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css';


const Footer = () => {
  return (
    <footer className='py-5 bg-black'>
      <div className='max-w-screen-xl mx-auto px-4 flex justify-between items-center flex-wrap text-white text-1xl'>
        <div>
          Copyright &copy; Shopping 
        </div>
        <div className='mt-4'>
          <Link to="/">
          <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path d="M15 0C6.716 0 0 6.716 0 15c0 8.285 6.716 15 15 15 8.284 0 15-6.715 15-15 0-8.284-6.716-15-15-15Zm4.202 26.427c-.087-1.174-.183-2.628-.189-3.216-.037-.452-.086-1.602-1.177-2.336 4.332-.363 6.394-2.757 6.542-5.92.123-1.803-.593-3.387-1.865-4.666a25.633 25.633 0 0 0-.13-3.701c-.976-.281-3.254.921-3.89 1.436-1.343-.521-4.63-.704-6.626 0C10.45 7.03 8.84 6.414 7.96 6.585c-.81 1.797-.29 3.496-.131 3.699-1.044.954-2.501 2.129-2.106 4.59.635 3.608 3.174 5.554 7.261 6.03-.872.179-1.019.83-1.092 1.111-2.745 1.133-3.53-.699-3.877-1.176-1.152-1.426-2.186-1.013-2.25-.99-.061.022-.108.112-.102.155.058.308.686.62.717.645.85.634 1.165 1.779 1.359 2.105 1.22 2.005 4.055 1.174 4.082 1.19.002.176-.02 1.652-.037 2.8C6.615 25.332 2.812 20.616 2.812 15 2.812 8.269 8.27 2.813 15 2.813c6.731 0 12.187 5.456 12.187 12.187 0 5.253-3.328 9.714-7.985 11.427Z" fill="#fff"></path></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h30v30H0z"></path></clipPath></defs></svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
