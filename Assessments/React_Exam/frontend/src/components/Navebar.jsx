import React from 'react'
import {Link} from 'react-router-dom'

const Navebar = () => {
  return (
    
    <div className='w-full bg-slate-400 shadow-sm'>
        <header className='w-full bg-slate-300 shadow-sm  h-10 ' >
            <nav className='ml-96 p-2'>
                <ul className='flex gap-8 '>
                    <li><Link to={'/'}>Home</Link> </li>
                    <li><Link to={'/signup'}>Sign Up</Link> </li>
                    <li><Link to={'/add-booking'}>Add Booking</Link> </li>
                    <li><Link to={'/view-booking'}>View Booking</Link> </li>
                    <li><Link to={'/display-booking'}>Search Booking</Link> </li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navebar