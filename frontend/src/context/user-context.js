import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user')),
  }

  // Method to update state
  setUser = (newUser) => {
    this.setState({
      token: newUser.token,
      isAuthenticated: newUser.isAuthenticated,
      user: newUser.user
    })
  }

  render() {
    const { children } = this.props
    const { user, token, isAuthenticated } = this.state
    const { setUser } = this

    return (
      <UserContext.Provider
        value={{
          user,
          token,
          isAuthenticated,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }