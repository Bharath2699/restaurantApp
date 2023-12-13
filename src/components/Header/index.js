import {FaCartArrowDown} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {name} = props
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const onClickLogout = () => {
          Cookies.remove('jwt_token')
          const {history} = props
          history.replace('/login')
        }

        return (
          <nav className="header-container">
            <Link to="/">
              <h1 className="name">{name}</h1>
            </Link>

            <p className="my-orders-card">My Orders </p>
            <Link to="/cart">
              <button type="button">
                <FaCartArrowDown size={25} />
              </button>{' '}
            </Link>
            <span className="length">{cartList.length}</span>

            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
