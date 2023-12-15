import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import CartContext from './context/CartContext'
import Home from './components/Home'
import Login from './components/Login'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import './App.css'

// write your code here

class App extends Component {
  state = {cartList: []}

  addonCart = product => {
    const {cartList} = this.state
    const productId = cartList.find(each => each.dishId === product.dishId)
    if (productId) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.dishId === product.dishId) {
            const updatedCount = each.count + 1
            return {...each, count: updatedCount}
          }
          return each
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const product = cartList.find(each => each.dishId === id)
    if (product.count > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.dishId === product.dishId) {
            const updatedCount = each.count - 1
            return {...each, count: updatedCount}
          }
          return each
        }),
      }))
    } else if (product.count === 1) {
      const filtered = cartList.filter(each => each.dishId !== id)
      this.setState({cartList: filtered})
    }
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.dishId === id) {
          const updatedCount = each.count + 1
          return {...each, count: updatedCount}
        }
        return each
      }),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each => each.dishId !== id)
    this.setState({cartList: filteredList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addonCart: this.addonCart,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}
export default App
