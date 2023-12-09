import CartContext from '../../context/CartContext'
import './index.css'

const OrderedCartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const {orderedCartDetails} = props
      const {
        dishId,

        dishName,
        dishPrice,
        dishImage,
        count,
      } = orderedCartDetails

      const onClickRemoveButton = () => {
        removeCartItem(dishId)
      }

      const onClickMinusButton = () => {
        decrementCartItemQuantity(dishId)
      }

      const onClickPlusButton = () => {
        incrementCartItemQuantity(dishId)
      }

      return (
        <li className="ordered-list-cart">
          <div className="details">
            <h1 className="ordered-name">{dishName}</h1>
            <p className="ordered-price">{dishPrice * count}</p>
            <div className="ordered-count-cart">
              <button
                className="minus-button"
                type="button"
                onClick={onClickMinusButton}
              >
                -
              </button>
              <p className="ordered-count">{count}</p>
              <button
                className="plus-button"
                type="button"
                onClick={onClickPlusButton}
              >
                +
              </button>
            </div>
          </div>
          <img src={dishImage} className="dish-images" alt="Img" />
          <button
            className="remove-button"
            type="button"
            onClick={onClickRemoveButton}
          >
            Remove
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default OrderedCartItem
