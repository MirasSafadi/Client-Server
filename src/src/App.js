import './App.css';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Home from './pages/Home';
import { Route } from 'react-router-dom';
import HOC from './HOC/hoc';



function App() {
  return (

    // <div className="App">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <SignIn />
    // </div>
    <HOC>
      <Route exact path="/" >
        <Home />
      </Route>
      <Route path="/login" >
        <SignIn />
      </Route>
      <Route path="/signup" >
        <SignUp />
      </Route>
    </HOC>
  );
}

export default App;
