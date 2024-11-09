import React from 'react'

const Demo = () => {
  const name='Dinsha';
  const x=10;
  const y=20;

  const names=['sree','anu','sandhya','pow'];

  const loggedIn=false;

  return (
    <>
     <div className='text-5xl font-bold font-mono text-center m-auto mt-20'>Dinsha Sivan </div>
     <p>Hello, {name}</p>
     <p>The sum of {x} and {y} is {x+y} </p>
     <ul>
      {
        names.map((name,index)=>(
          <li key={index}>{name}</li>
        ))
      }
     </ul>
     {loggedIn ? <h1> hello member</h1> : <h1>hello guest</h1>}
     
    </>
  )
}

export default Demo