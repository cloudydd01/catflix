// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
// import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { getWidth } from "./utils/dvWidthSlice.js";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Shared/Signup";
import Registration from "./components/Registration";
import Regform from "./components/Regform";
// import Browse from "./pages/Shared/BrowseShared";
import Browse from "./pages/Browse";
import ManageProfiles from "./pages/ManageProfiles";
import BrowseShared from "./pages/Shared/BrowseShared";
import ProtectedRoute from "./pages/Shared/ProtectedRoute.jsx";

import { useSelector } from "react-redux";

function App() {
  // const [profileClick, setProfileClick] = useState(false)
  const[editClick,setEditClick] = useState(false)
  const [accountClick,setAccountClick] = useState(false)
  const [email,setEmail] = useState("")
  const [loaded,setLoaded] = useState(false)
  const [addProfile,setAddProfile] = useState()
  const dispatch = useDispatch();

  const {dvWidth} = useSelector((state)=> state.dvWidth)

  const handleEvent = () => {
    dispatch(getWidth(window.innerWidth));
  };

  useEffect(() => {
    window.addEventListener("load", handleEvent);
    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("load", handleEvent);
      window.removeEventListener("resize", handleEvent);
    };
  }, []);

  console.log('Apps dvWidth is: ',dvWidth)

  // console.log("loaded",loaded)
 
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Signin />} />
      <Route path="signup" element={<Signup setEmail={setEmail} />}>
        <Route index element={<Registration />} />
        <Route path="regform" element={<Regform email={email} />} />
      </Route>

      <Route element={<ProtectedRoute setLoaded={setLoaded} addProfile={addProfile} editClick={editClick} setEditClick={setEditClick} setAccountClick={setAccountClick} />}>
        <Route path="browse" element={<BrowseShared accountClick={accountClick} />}>
          <Route index element={<Browse accountClick={accountClick} setAccountClick={setAccountClick} setEditClick={setEditClick} loaded={loaded} addProfile={addProfile} setAddProfile={setAddProfile} />} />
        </Route>
        <Route path="ManageProfiles" element={<ManageProfiles editClick={editClick} setEditClick={setEditClick} setAccountClick={setAccountClick} loaded={loaded} />} />
      </Route>

    </Routes>
  );
}

export default App;
