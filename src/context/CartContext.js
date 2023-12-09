import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addonCart: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
