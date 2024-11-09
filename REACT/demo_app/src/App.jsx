import React from 'react'
import Card from './card';
import Demo from './demo';


const App = () => {

  return (
    <>
      <Demo/>
     <div className='flex'>
        <Card customClasses="bg-yellow-400" />
        <Card customClasses="bg-green-200" />
        <Card customClasses="bg-red-200" />
     </div>
   
     
    </>
  )
}

export default App