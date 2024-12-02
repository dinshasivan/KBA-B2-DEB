import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import Search from './Search'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";


const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const redirectToLoginPage = ()=>{
        navigate("/login")
    }

  return (
    <header  className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
        {
            !(isSearchPage && isMobile)&&(
                <div className='container mx-auto flex items-center  h-full px-2 justify-between'>
                {/* logo */}
                    <div className='h-full'>
                        <Link to={"/"} className='h-full flex justify-center item-center'>
                            <img
                                src={logo}
                                width={140}
                                height={40}
                                alt='logo'
                                className='hidden lg:block'
                            />
                            <img 
                                
                                src={logo}
                                width={120}
                                height={60}
                                alt='logo'
                                className='lg:hidden'
                            />
                        </Link>
                    </div>
                                                
                                                
                {/* Search */}
                <div className='hidden lg:block'>
                    <Search/>
                </div>
        
                {/* login and my cart */}
                <div>
                    <button className='text-neutral-600 lg:hidden'>
                        <FaRegCircleUser size={26}/>
                    </button>

                    {/**Desktop**/}
                    <div className='hidden lg:flex  items-center gap-10'>
                        <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                       <button onClick={()=>setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                             {/* add to cart */}
                             <div className='animate-bounce'>
                                <BsCart4 size={26}/>
                            </div>
                            <div className='font-semibold text-sm'>
                               {/* {
                                    cartItem[0] ? (
                                         <div>
                                            <p>{totalQty} Items</p>
                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                        </div>
                                    ) : (
                                        <p>My Cart</p>
                                    )
                                } */}
                            </div>   
                       </button>
                    </div>
                   
                </div>
                </div> 
            )
        }
      
    <div className='container mx-auto px-2 lg:hidden'>
        <Search/>
    </div> 
    </header>
  )
}

export default Header