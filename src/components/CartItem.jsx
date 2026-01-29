import React from 'react'

function CartItem({item}) {
    const {id, name, imageUrl, price} = item;
  return (
    <div key={id} className='relative group flex flex-col gap-y-2 border border-zinc-200 bg-white rounded-md p-24'>
              <h2>{name}</h2>
              <img alt={name} src={imageUrl} width={300} height={300}  className='group-hover:-translate-y-2 transition-all duration-500'/>
              <div className='absolute bottom-5 left-5'>
                <h1 className='text-zinc-700 text-sm'>{name}</h1>
                <span className='text-pink-400 text-sm'>${price}</span>
              </div>
        </div>
  )
}

export default CartItem