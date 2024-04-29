import "../Main/main.scss";
import { useLocation } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeminiResult,
  getResult,
  getSingleData,
  storeResult,
} from "../../Redux/Slice/Reducer";
import { AppDispatch, RootType } from "../../Redux/Strore";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { fetchSingleUser } from "../../Redux/Slice/User";

const Main = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [hideBtn, setHideBtn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, oneData } = useSelector(
    (state: RootType) => state.geminiSlice
  );
  const { oneUer, loading: userLoading } = useSelector(
    (state: RootType) => state.fetchUserSlice
  );

  const dispatch = useDispatch<AppDispatch>();
  const promptHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(fetchGeminiResult({ prompt }));
    dispatch(getResult());

    setPrompt("");
  };

  const hideBtnHandler = () => {
    setHideBtn((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const locatPath = location.pathname;
    const id = locatPath.replace("/", "");
    async function fetchOneData() {
      await dispatch(getSingleData(id));
    }
    fetchOneData();
  }, [location]);



  const homeHandler = ()=>{
    navigate("/")
  }
  return (
    <>
      {userLoading || loading ? (
    ""
      ) : (
        <div className="main">
          <div className="main_head">
            <p>Gemini</p>
            <img
              src={oneUer?.photo}
              alt="photo"
              className="profile"
              onClick={hideBtnHandler}
            />
          </div>
          {hideBtn && (
            <div className="logout" onClick={logoutHandler}>
              <button>Logout</button>
            </div>
          )}
          <div className="result">
            {oneData?.result?.heading && (
              <div className="result_title">
                <img src={oneUer?.photo} className="profile" />
                <p>{oneData?.result?.heading}</p>
              </div>
            )}

            <div className="result_para">
              {oneData?.result?.heading && (
                <img src="geminiIcon.jpg" alt="gemini" />
              )}

              {loading ? (
                <Loader />
              ) : (
                oneData?.result?.data  && (
                  <div
                    dangerouslySetInnerHTML={{ __html: oneData?.result?.data ! }}
                  />
                )
              )}
            </div>
          </div>

          <div className="main_bottom">
            <form onSubmit={promptHandler}>
              <input
                name="promp"
                placeholder="Enter a prompt here"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                onClick={homeHandler}
              />
              <button type="submit">
                <FiSend className="submit" />
              </button>
            </form>
            <p>
              Gemini may display inaccurate info, including about people, so
              double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
