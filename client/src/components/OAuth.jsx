import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
/* import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice"; */
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      //const data = await res.json();
      //dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className="relative mt-6 border rounded-md py-2 text-sm text-gray-800 bg-gray-100 hover:bg-gray-200"
    >
      <span className="absolute left-0 top-0 flex items-center justify-center h-full w-10 text-blue-500"></span>

      <span>Continue with google</span>
    </button>
  );
}
