import React from 'react'
import { Button } from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserProvider'
import { LOGOUT } from '../../action_types/ActionTypes';
import { logout } from '../../firebase/firebase';
import toast from 'react-hot-toast';
import { useShoopingContext } from '../../context/ShoopingProvider';
import './header.css';


const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useUserContext();
  const { cardContents } = useShoopingContext();

  const openMenu = (menu) => {
    const menu_ = document.getElementById(menu);
    if(menu_.classList.contains('show')) {
      menu_.classList.remove('show');
      menu_.classList.add('none');
    }else {
      menu_.classList.add('show');
      menu_.classList.remove('none');
    }
  }

  return (
    <header className='bg-black'>
      <div className='max-w-screen-xl mx-auto py-6 px-4 relative'>
        <div className='menu-icon-box px-4'>
          <button className='menu-icon' onClick={() => openMenu('menu')}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
          </button>
        </div>
        <div className='text-white px-4 mr-10 none' id='menu'>
          <nav className='relative flex justify-between items-center'>
          <div className='px-4 logo'>
            <Link to="/" className='text-white text-3xl logo-text' style={{fontFamily:'Fuzzy Bubbles,cursive'}}>
              Shooping APP
            </Link>
          </div>
            <ul className='flex items-center'>
              <li className='mr-10 font-thin'>
                <Link to="/products" className='hover'>
                  Product
                </Link>
              </li>
              {
                !user ?
                  <li className='mr-12 font-thin'>
                  <Link to="/login" className='hover'>
                    Login
                  </Link>
                  <span className='m-1'>/</span>
                  <Link to="/register" className='hover'>
                    Register
                  </Link>
                </li>
                :
                <Button colorScheme='purple' onClick={async() => {
                  try {
                    const data = await logout();
                    if(data) {
                      dispatch({type:LOGOUT});
                      toast.success("Signed Out Successfully.");
                      
                      navigate('/', {
                        replace:true
                      })
                    }else {
                      toast.error("Failed to Exit.");
                    }
                  } catch (error) {
                    toast.error("Failed to Exit.");
                  }
                  
                }}>Logout</Button>
              }
            </ul>
          </nav>
        </div>
        <div className='absolute right-8 top-7'>
          <Link to='/basket' className='relative'>
            <span className='absolute top-'>{cardContents.length}</span>
            <svg width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.508 19.97h17.909c1.978 0 3.583-1.456 3.583-3.237V9.922c0-.397-.36-.722-.8-.722-.439 0-.798.325-.798.722v6.81c0 .994-.893 1.794-1.985 1.794H8.508c-1.099 0-1.984-.806-1.984-1.793V3.417c0-.023 0-.048-.007-.078v-.018c0-.018-.007-.036-.007-.048a.103.103 0 0 0-.013-.042c0-.006-.007-.018-.007-.024-.006-.018-.013-.03-.02-.048 0-.006-.006-.012-.006-.018-.007-.012-.014-.03-.02-.042-.007-.006-.007-.018-.014-.024-.006-.012-.013-.024-.02-.03-.006-.013-.013-.019-.02-.03-.006-.007-.013-.019-.02-.025-.006-.012-.02-.024-.026-.03l-.02-.018c-.013-.012-.02-.024-.033-.036-.007-.006-.014-.006-.014-.012l-.04-.036c-.006-.006-.013-.012-.02-.012-.013-.012-.026-.018-.04-.03-.013-.006-.026-.018-.046-.024-.007-.006-.014-.006-.02-.012-.027-.012-.047-.024-.073-.03L1.109.872C.703.716.237.89.064 1.258c-.174.367.02.788.426.944l4.429 1.69v17.913c0 1.697 1.445 3.087 3.283 3.225a2.965 2.965 0 0 0-.593 1.769C7.61 28.562 9.201 30 11.152 30c1.952 0 3.543-1.438 3.543-3.201 0-.65-.213-1.252-.579-1.757h8.478a2.976 2.976 0 0 0-.58 1.757c0 1.763 1.593 3.201 3.544 3.201s3.543-1.438 3.543-3.201c0-1.763-1.592-3.2-3.543-3.2H8.508c-1.099 0-1.984-.807-1.984-1.794v-2.377a3.832 3.832 0 0 0 1.984.542Zm4.59 6.829c0 .969-.873 1.757-1.946 1.757-1.072 0-1.944-.788-1.944-1.757 0-.969.872-1.757 1.944-1.757 1.073 0 1.945.788 1.945 1.757Zm14.398 0c0 .969-.873 1.757-1.945 1.757s-1.944-.788-1.944-1.757c0-.969.872-1.757 1.944-1.757s1.945.788 1.945 1.757Z" fill="#fff"></path><path d="M11.16 16.203h12.6c.44 0 .799-.324.799-.722 0-.397-.36-.722-.8-.722h-12.6c-.44 0-.8.325-.8.722 0 .398.354.722.8.722Z" fill="#fff"></path></svg>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
