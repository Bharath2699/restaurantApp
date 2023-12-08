import {Component} from 'react'
import CartContext from './context/CartContext'
import RestaurantMainView from './components/RestaurantMainView'
import './App.css'

// write your code here

class App extends Component {
  state = {cartList: []}

  addonCart = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addonCart: this.addonCart,
        }}
      >
        <RestaurantMainView />
      </CartContext.Provider>
    )
  }
}
export default App
