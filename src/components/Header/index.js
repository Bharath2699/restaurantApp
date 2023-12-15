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
            <li className="nav-list">
              <Link to="/">
                <h1 className="name">{name}</h1>
              </Link>
            </li>

            <li className="nav-list">
              <p className="my-orders-card">My Orders</p>
            </li>
            <li className="nav-list">
              <Link to="/cart">
                <button type="button">
                  <FaCartArrowDown size={25} />
                </button>
              </Link>
            </li>
            <span className="length">{cartList.length}</span>

            <li className="nav-list">
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}
export default withRouter(Header)
