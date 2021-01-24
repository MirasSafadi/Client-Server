import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component {
  // Context state
  state = {
    token: localStorage.getItem('token'),
    user: {  
      name: null, 
      isAuthenticated: !!localStorage.getItem('token'),
    },
  }

  // Method to update state
  setUser = (user) => {
    this.setState((prevState) => ({ user }))
  }

  render() {
    const { children } = this.props
    const { user } = this.state
    const { setUser } = this

    return (
      <UserContext.Provider
        value={{
          user,
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