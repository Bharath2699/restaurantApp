import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showErrorMsg: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onFailureMessage = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSuccessMessage = token => {
    const {history} = this.props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessMessage(data.jwt_token)
    } else {
      this.onFailureMessage(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, showErrorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login-container">
        <form className="form-container" onSubmit={this.onSubmitUserDetails}>
          <h1 className="login-page">Login Page</h1>
          <div className="username-card">
            <label className="label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="input-card"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Enter the Username"
              id="username"
            />
          </div>
          <div className="username-card">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Enter the Password"
              className="input-card"
              id="password"
            />
          </div>
          <button type="submit" className="submit-button">
            Login
          </button>
          {showErrorMsg && <p className="error-mag">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
