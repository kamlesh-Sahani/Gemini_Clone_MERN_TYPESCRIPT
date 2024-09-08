import { FormEvent, useEffect, useState } from "react";
import "./login.scss";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoginUser,
  fetchSingleUser,
  fetchUser,
} from "../../Redux/Slice/User";
import { useNavigate } from "react-router-dom";
import { AppDispatch,RootType } from "../../Redux/Strore";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading: fetchLoading,user:logUser } = useSelector((state: RootType) => state.fetchUserSlice);

  const [email, setEmail] = useState<string>("");
  const [uid, setUid] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  
  const navigate = useNavigate();

  // Login Handler (Manual Login)
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);

    try {
      await dispatch(fetchLoginUser({ email, uid }));
      localStorage.setItem("token", JSON.stringify(uid)); 
      dispatch(fetchSingleUser({ uid }));
     
    } catch (error) {
      console.error("Error during login:", error);
    }

    setLoginLoading(false);
  };

  // Google Sign-In Handler
  const googleHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      const data = {
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        uid: user.uid!,
      };

      const userResponse: any = await dispatch(fetchSingleUser({ uid: user.uid }));

      if (userResponse?.payload?.success) {
        await dispatch(fetchLoginUser({ email: user.email!, uid: user.uid! }));
      } else {
        await dispatch(fetchUser(data));
      }

      localStorage.setItem("token", JSON.stringify(user.uid));
      navigate("/");
    } catch (error) {
      console.error("Google sign-up error:", error);
    }
  };

  // Guest Login Handler
  const guestHandler = async () => {
    setLoading(true);
    const guestUid = import.meta.env.VITE_GUEST_UID!;
    localStorage.setItem("token", JSON.stringify(guestUid));
  
    await dispatch(fetchLoginUser({ email: import.meta.env.VITE_GUEST_EMAIL!, uid: guestUid }));
    navigate("/");
    setLoading(false);
  };

  // Auto-Redirect if Already Logged In
  useEffect(() => {
    if(logUser && logUser.email){
      navigate("/");
    }
  }, [navigate,dispatch,fetchLoading]);

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
            disabled={loginLoading || loading}
          />
        </label>

        <label>
          <p>UID</p>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            required
            disabled={loginLoading || loading}
          />
        </label>

        <input
          type="submit"
          value={loginLoading ? "Loading..." : "Login"}
          disabled={loginLoading || loading}
        />
        
        <button
          className="googleBtn"
          type="button"
          onClick={googleHandler}
          disabled={loginLoading || loading}
        >
          <img src="google.webp" alt="Google" />
          <p>Login With Google</p>
        </button>

        <button
          type="button"
          onClick={guestHandler}
          className="guest"
          disabled={loading || loginLoading}
        >
          {loading ? "Loading..." : "Guest"}
        </button>
      </form>
    </div>
  );
};

export default Login;
