import './App.css';
import {useState} from "react";
import Login from "./Login";
import MainPage from "./MainPage";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [userData, setUserData] = useState(undefined)
  return (
    <div className="App">
      {
        !userData ? <Login setUserData={setUserData}/> : <MainPage userData={userData}/>
      }
    </div>
  );
}

export default App;
