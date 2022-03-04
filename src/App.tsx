import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import LoginPage from "./components/loginPage/LoginPage";
import TodoList from "./components/todoListPage/TodoList";
import './App.css';

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false)
  function getCookie(name: string){
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if(parts.length === 2){
      setIsLogged(true)
      return parts?.pop()?.split(';')?.shift();
    }
  }
  useEffect(()=>{
    getCookie("token")
    
  },[])

  return (
    <div className="App">

      {isLogged === true ? <TodoList /> : <LoginPage />}
      {/* <LoginPage />  */}
    </div>
  );
}

export default App;
