import React from 'react'

const Navbar = ({getNotes}) => {
  return (
    <div className='flex justify-between py-5 w-1/2 mx-auto'>
        <h1 className='text-blue-400 text-4xl uppercase font-bold'>FireNote</h1>
        <button onClick={getNotes} className='px-4 py-3 rounded-lg bg-blue-400 text-white'>Refresh Notes</button>
    </div>
  )
}

export default Navbar