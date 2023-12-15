import CartContext from '../../context/CartContext'
import Header from '../Header'
import OrderedCartItem from '../OrderedCartItem'
import EmptyCartView from '../EmptyCartView'
import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      const IsEmptyCart = cartList.length === 0

      return (
        <div className="cart-route-container">
          <Header name="UNI Resto Cafe" />
          {IsEmptyCart ? (
            <EmptyCartView />
          ) : (
            <>
              <button
                className="remove-all-button"
                onClick={onClickRemoveAll}
                type="button"
              >
                Remove All
              </button>
              <ul className="cart-list-card">
                {cartList.map(each => (
                  <OrderedCartItem
                    orderedCartDetails={each}
                    key={each.dishId}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
