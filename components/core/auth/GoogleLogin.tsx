// import { supabase_client } from "@/lib/supabase";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLogin() {
    const signIn = async () => {
        // const { data, error } = await supabase_client.auth.signInWithOAuth({
        //     provider: 'google',
        // })
    }
    return (
      <button onClick={signIn} type="button" className="flex flex-row items-center gap-2 bg-red-500 text-light p-2 rounded text-sm">
        <FaGoogle />
        <div>|</div>
        <div>Sign in with Google</div>
      </button>
    );
  }
  