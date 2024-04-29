import { FormEvent, useEffect, useState } from "react";
import "./login.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useDispatch } from "react-redux";
import {
  fetchLoginUser,
  fetchSingleUser,
  fetchUser,
} from "../../Redux/Slice/User";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../Redux/Strore";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const navigate = useNavigate();

  const loginHandler = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(fetchLoginUser({email,uid}));
    localStorage.setItem("token", JSON.stringify(uid));
    navigate("/");
  };

  const googleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const data: { name: string; email: string; photo: string; uid: string } =
        {
          name: user.displayName!,
          email: user.email!,
          photo: user.photoURL!,
          uid: user.uid!,
        };

      const userResponse:any = await dispatch(fetchSingleUser({ uid: user.uid })); 
      if (userResponse?.payload?.success) {
        await dispatch(fetchLoginUser({ email: user.email!, uid: user.uid! }));
      } else {
        await dispatch(fetchUser(data));
      }

      localStorage.setItem("token", JSON.stringify(user.uid));
      navigate("/");
    } catch (error) {
      console.log("google sign up error", error);
    }
  };
 

  const guestHandler=async()=>{
    localStorage.setItem("token", JSON.stringify("UHsMPdfHhaMzhwbBaAHzRAvi2453"));
    await dispatch(fetchLoginUser({ email:"kamleshbca2005@gmail.com", uid:"UHsMPdfHhaMzhwbBaAHzRAvi2453" }));
    navigate("/");
  }
  useEffect(()=>{
    if(localStorage.getItem('token')!==null){
      navigate("/");
    }
   
    },[localStorage.getItem('token')])
  return (
    <div className="login">
      <div className="titleAndICon">
        <img src="geminiIcon.jpg" alt="gemini" />
        <h3>Login in Gemini Clone</h3>
      </div>
      <form onSubmit={loginHandler}>
        <label>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <p>Uid</p>
          <input
            type="password"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
          />
        </label>
        <input type="submit" value={"Login"} />
        <button className="googleBtn" type="button" onClick={googleHandler}>
          <img src="google.webp" alt="google" />
          <p>Login With Google</p>

         
        </button>
        <button type="button" onClick={guestHandler} className="guest">Guest</button>
      </form>
    </div>
  );
};

export default Login;
