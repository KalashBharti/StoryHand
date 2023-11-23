import { useEffect, useRef, useState } from "react";
import Alert from "./Components/subComponent/Alert";
import "./Sass/main.css"
import Button from "./Components/subComponent/Button";
import plus from "./image/icons/plus.png"
import Chat from "./Components/subComponent/Chat";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AddBlog from "./Components/AddBlog";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import DataState from "./context/DataState";
import CreateAccount from "./Components/CreateAccount";
import Navbar from "./Components/Navbar";
import AdminInfo from "./Components/subComponent/AdminInfo";
import Blog from "./Components/subComponent/Blog";

function App() {
  const [darkTheme, setTheme] = useState(false);
  const [adminSocial,setAdminSocial] = useState(false);
  const [token,setToken] = useState("");
  const [showBlog,setShowBlog] = useState(false);
  const [blogData , setBlogData] = useState({});
  const [alertMsg, setAlertMsg]= useState("");
  const[alert,setAlert] = useState(false);
  const [user,setUser]= useState({});
  useEffect(() => {
    const saveTheme = localStorage.getItem("theme");
    console.log(saveTheme);
    if (saveTheme) {
      setTheme(saveTheme === "true")

    }
    else {
      localStorage.setItem("theme", "false");
      setTheme(false)
    }

  }, [])
  
  return (
    <>
    {showBlog&& <Blog data={blogData} active={setShowBlog}/>}
   {alert && <Alert message={alertMsg} setActive={setAlert}/>}
    <div className="App" style={{ backgroundColor: darkTheme ? "#110B2B" : "white" }} >
      <Router>
       
        <Navbar user={user} setUser={setUser} token={token} darkTheme={darkTheme} setTheme={setTheme}/>
        <AdminInfo  darkTheme={darkTheme} active={adminSocial} setActive={setAdminSocial} />
        <DataState>
          <Routes>
            <Route exact path="" element={
              <Home setUser={setUser} darkTheme={darkTheme}
                setBlogData={setBlogData} setShowBlog={setShowBlog} 
              />
              // <Profile darkTheme={darkTheme}/>
              
              // <Login/>
              // <CreateAccount/>
            } />
            <Route exact path="/profile/:name" element={
              <Profile darkTheme={darkTheme} />
            } />
            <Route exact path="/user/login" element={
              <Login setToken={setToken} />
            } />
            <Route exact path="/user/register" element={
              <CreateAccount />
            } />
            <Route exact path="/post/addPost" element={
              <AddBlog token={token} alertMsg={setAlertMsg} setAlert={setAlert}/>
            } />
          </Routes>
        </DataState>
      </Router>
    </div>
    </>
  );
}

export default App;
