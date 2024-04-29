import "./slider.scss";
import { FaBars } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";
import { LuMessageSquare } from "react-icons/lu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootType } from "../Redux/Strore";
import { getAllData } from "../Redux/Slice/Reducer";
const Slider = () => {
  const [sliderClose, setSliderClose] = useState<boolean>(true);
  const { oneUer } = useSelector((state: RootType) => state.fetchUserSlice);
  const { loading, allData } = useSelector(
    (state: RootType) => state.geminiSlice
  );
  const navigate= useNavigate();
  const dipatch = useDispatch<AppDispatch>();
  const sliderHander = () => {
    setSliderClose((prev) => !prev);
  };

  useEffect(() => { 
    async function fetchData(){
      await dipatch(getAllData({ user: oneUer?.uid! }));
    }
    fetchData();
  }, []);

  const homeHandler = ()=>{
    navigate('/');
  }
  return (
    <>
      {!loading && (
        <div
          className="slider"
          style={{ width: sliderClose ? "100px" : "auto" }}
        >
          <div className="slider_head">
            <FaBars onClick={sliderHander} />
            <button style={{ width: sliderClose ? "50px" : "auto" }} onClick={homeHandler}>
              <FiPlus />{" "}
              {!sliderClose ? <span className="text_btn">New Chat</span> : ""}
            </button>
          </div>

          {!sliderClose ? (
            <div className="slider_tasks">
              <p>Recent</p>
              <div className="tasks">
                {allData &&
                  allData?.results?.map((v) => (
                    <Link to={`/${v._id}`} key={v._id}>
                      <LuMessageSquare />
                      <span>{v.heading}</span>
                      <BsThreeDotsVertical className="hide" />
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
            ""
          )}
          {!sliderClose ? (
            <div className="slider_bottom">
              <ul>
                <li>
                  <IoMdHelpCircleOutline />
                  <p>Help</p>{" "}
                </li>
                <li>
                  <IoMdTime />
                  <p>Activity</p>{" "}
                </li>
                <li>
                  <IoSettingsOutline />
                  <p>Setting</p>{" "}
                </li>
              </ul>
              <button>
                <FaStar />
                <p> Upgrade to Gemini Advance</p>{" "}
              </button>
              <p className="para">New Delhi, Delhi, India </p>
              <span className="active">
                From your IP address • Update location
              </span>
            </div>
          ) : (
            <div className="sliderActive">
              <ul>
                <li>
                  {" "}
                  <IoMdHelpCircleOutline />
                </li>
                <li>
                  {" "}
                  <IoMdTime />
                </li>
                <li>
                  {" "}
                  <IoSettingsOutline />
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Slider;
