import React from 'react'

const Cart = ({cartItems,removeFromCart}) => {
  return (
    <div>
        <h2 className='text-2xl font-bold mb-4'>Your Cart</h2>
        {cartItems.length === 0 ? (
            <p>Your Cart is empty.</p>
        ) : (
            <ul>
                {cartItems.map((item ,  index) => (
                    <li key={index} className='border-b py-2 flex justify-between items-center'>
                        <div>
                        <h4 className='text-lg font-bold'>{item.name}</h4>
                        <p className='text-grat-700'>${item.price}</p>    
                        </div> 

                        <button 
                        onClick={() => removeFromCart(index)} 
                        className='bg-red-500 text-white px-4 py-2 rounded-lg'
                        >
                            Remove
                        </button>

                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Cart