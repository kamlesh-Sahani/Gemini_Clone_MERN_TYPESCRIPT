import Slider from "./Components/Slider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./app.scss";
import Main from "./Components/Main/Main";
import Loader from "./Components/Loader/Loader";
import LoginPage from "./Components/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleUser } from "./Redux/Slice/User";
import { AppDispatch, RootType } from "./Redux/Strore";
import PrevData from "./Components/PrevData/PrevData";
const App = () => {
  const { oneUer } = useSelector((state: RootType) => state.fetchUserSlice);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(fetchSingleUser({ uid: JSON.parse(token!) }));
  }, [localStorage.getItem("token"),dispatch]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            oneUer ? 
              <div className="app">
                <Slider />
                <Main />
              </div>
             : (
              <LoginPage />
            )
          }
        />
        <Route path="/loader" element={<Loader />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:id" element={   <div className="app">
                <Slider />
                <PrevData /> 
              </div>} />
      </Routes>
    </Router>
  );
};

export default App;
