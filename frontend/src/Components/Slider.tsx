import "./slider.scss";
import { FaBars } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { Link,useNavigate } from "react-router-dom";
import { LuMessageSquare } from "react-icons/lu";
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
    <FaBars className="sideIcon" onClick={sliderHander} />
      {
        !sliderClose && <div
        className="slider"
      >
        <div onClick={homeHandler} className="new_chat_btn">
          <p>New Chat</p>
            <FiPlus />
          </div>

      
         
          <div className="slider_tasks">
          <p>Recent</p>
            <div className="tasks">
              {allData && !loading && 
                allData?.results?.map((v) => (
                  <Link to={`/${v._id}`} key={v._id}>
                    <LuMessageSquare />
                    <span>{v.heading.slice(0,40)}</span>
                  </Link>
                ))}
            </div>
          </div>
      
       
          <div className="slider_bottom">
            <button>
              <FaStar />
              <p> Upgrade to Gemini Advance</p>{" "}
            </button>
           
          </div>
        
      </div>
      }
       
      
    </>
  );
};

export default Slider;
