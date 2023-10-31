import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { signinWithGoogle}  from "../utils/firebase";


const Auth = () => {

    const handleGoogleSignIn = ()=> {
        console.log("clicked");
        signinWithGoogle()
    }
  return  <div>
  <button onClick={handleGoogleSignIn} className="py-2 px-5 bg-blue-600 text-white rounded-sm">Sign in with Google</button>
</div>;
};

export default Auth;
