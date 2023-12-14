import {FaCircle} from 'react-icons/fa'
import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CardItem = props => {
  const [count, setCount] = useState(0)
  return (
    <CartContext.Consumer>
      {value => {
        const {addonCart} = value
        const {cardDetails} = props

        const {
          dishName,
          dishImage,
          dishPrice,
          dishCurrency,
          dishCalories,
          dishDescription,
          addOnCat,
          dishAvailability,
          dishType,
        } = cardDetails

        const onClickMinusButton = () => {
          if (count > 0) {
            setCount(prevState => prevState - 1)
          }
        }

        const onClickPlusButton = () => {
          setCount(prevState => prevState + 1)
        }

        const onClickAddon = () => {
          addonCart({...cardDetails, count})
        }

        let color
        if (dishType > 1) {
          color = 'green'
        } else {
          color = 'red'
        }

        return (
          <li className="food-item-card">
            <div className="label">
              <FaCircle fill={color} size={20} />
            </div>
            <div className="food-item-details">
              <h1 className="dish-name">{dishName}</h1>
              <p className="dish-price">
                {dishCurrency} {dishPrice}
              </p>
              <p className="dish-description">{dishDescription}</p>
              {dishAvailability && (
                <>
                  <div className="add-on-card">
                    <button
                      type="button"
                      className="count-button"
                      onClick={onClickMinusButton}
                    >
                      -
                    </button>
                    <p className="count-content">{count}</p>
                    <button
                      type="button"
                      className="count-button"
                      onClick={onClickPlusButton}
                    >
                      +
                    </button>
                  </div>
                  {count > 0 ? (
                    <button
                      type="button"
                      onClick={onClickAddon}
                      className="add-button"
                    >
                      Add To Cart
                    </button>
                  ) : null}
                </>
              )}
              {!dishAvailability && (
                <p className="not-available">Not available</p>
              )}
              {addOnCat.length > 0 ? (
                <p className="customization-status">Customizations Available</p>
              ) : (
                ' '
              )}
            </div>
            <p className="dish-calories">{dishCalories} calories</p>
            <img src={dishImage} alt={dishName} className="dish-image" />
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CardItem
