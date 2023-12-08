import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addonCart: () => {},
})

export default CartContext
