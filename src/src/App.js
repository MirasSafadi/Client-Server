import logo from './logo.svg';
import './App.css';
import SignIn from './pages/Signin';


function App() {
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <SignIn />
    </div>
  );
}

export default App;
