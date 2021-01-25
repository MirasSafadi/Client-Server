import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    token: localStorage.getItem('token'),
    user: {  
      name: localStorage.getItem('name'), 
      isAuthenticated: !!localStorage.getItem('token'),
    },
  }

  // Method to update state
  setUser = (newUser) => {
    this.setState({
      token: newUser.token,
      user: newUser.user
    })
  }

  render() {
    const { children } = this.props
    const { user, token } = this.state
    const { setUser } = this

    return (
      <UserContext.Provider
        value={{
          user,
          token,
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