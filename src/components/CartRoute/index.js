import CartContext from '../../context/CartContext'
import Header from '../Header'
import OrderedCartItem from '../OrderedCartItem'
import './index.css'

const CartRoute = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-route-container">
          <Header name="UNI Resto Cafe" />
          <button
            className="remove-all-button"
            onClick={onClickRemoveAll}
            type="button"
          >
            Remove All
          </button>
          <ul className="cart-list-card">
            {cartList.map(each => (
              <OrderedCartItem orderedCartDetails={each} key={each.dishId} />
            ))}
          </ul>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartRoute
