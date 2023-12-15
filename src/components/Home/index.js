import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import Header from '../Header'
import Tab from '../Tab'
import CardItem from '../CardItem'
import './index.css'

const apiStatusOptions = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    tapList: [],
    categoryList: [],
    categoryId: '',
    dishesList: [],
    apiStatus: apiStatusOptions.initial,
  }

  componentDidMount() {
    this.getFoodDetails()
  }

  getFoodDetails = async () => {
    this.setState({apiStatus: apiStatusOptions.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.map(res => ({
        name: res.restaurant_name,
        tableMenuList: res.table_menu_list,
      }))
      const menuList = updatedData[0].tableMenuList.map(eve => ({
        category: eve.menu_category,
        menuCategoryId: eve.menu_category_id,
        categoryDishes: eve.category_dishes.map(ele => ({
          dishId: ele.dish_id,
          dishName: ele.dish_name,
          dishPrice: ele.dish_price,
          dishImage: ele.dish_image,
          dishCurrency: ele.dish_currency,
          dishCalories: ele.dish_calories,
          dishDescription: ele.dish_description,
          dishAvailability: ele.dish_Availability,
          dishType: ele.dish_Type,
          addOnCat: ele.addonCat.map(each => ({
            addonCategory: each.addon_category,
            addonCategoryId: each.addon_category_id,
            addonSelection: each.addon_selection,
            nextUrl: each.nexturl,
            addons: each.addons.map(item => ({
              dishId: item.dish_id,
              dishName: item.dish_name,
              dishPrice: item.dish_price,
              dishImage: item.dish_image,
              dishCurrency: item.dish_currency,
              dishCalories: item.dish_calories,
              dishDescription: item.dish_description,
              dishAvailability: item.dish_availability,
              dishType: item.dish_type,
            })),
          })),
        })),
      }))

      this.setState({
        tapList: updatedData[0],
        categoryList: menuList,
        dishesList: menuList[0].categoryDishes,
        categoryId: menuList[0].menuCategoryId,
        apiStatus: apiStatusOptions.success,
      })
    } else {
      this.setState({apiStatus: apiStatusOptions.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderHomeRouteFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/ds6o1m3db/image/upload/v1697198154/alert-triangle_vdgqti.svg"
        alt="failure view"
        className="failure-image"
      />
      <p className="heading">Something went wrong.Please try again</p>
      <button type="button" onClick={this.getPopularMoviesList}>
        Try Again
      </button>
    </div>
  )

  onSelectTab = id => {
    const {categoryList} = this.state
    console.log(id)
    console.log('trigger')
    const filteredList = categoryList.find(each => each.menuCategoryId === id)
    this.setState({
      dishesList: filteredList.categoryDishes,
      categoryId: id,
    })
  }

  renderHomeRouteSuccessView = () => {
    const {tapList, categoryList, categoryId, dishesList} = this.state

    const {name} = tapList
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          console.log(cartList)
          return (
            <div className="main_container">
              <Header name={name} />
              <div className="tap">
                {categoryList.map(each => (
                  <Tab
                    tabDetails={each}
                    key={each.menuCategoryId}
                    onSelectTab={this.onSelectTab}
                    isActive={each.menuCategoryId === categoryId}
                  />
                ))}
              </div>
              <div className="dishes-container">
                {dishesList.map(each => (
                  <CardItem
                    cardDetails={each}
                    addOnCartCount={this.addOnCartCount}
                    key={each.dishId}
                  />
                ))}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderHomeRouteFinalMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusOptions.success:
        return this.renderHomeRouteSuccessView()
      case apiStatusOptions.failure:
        return this.renderHomeRouteFailureView()
      case apiStatusOptions.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderHomeRouteFinalMovies()}</>
  }
}
export default Home
