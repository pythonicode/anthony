// import { supabase_client } from "@/lib/supabase";
import { client } from "@/lib/supabase-client";
import { siteURL } from "@/lib/url";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";

export default function GoogleLogin() {
  const signIn = async () => {
    const { error } = await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.href}`
      }
    });
    if (error) {
      alert(error);
      return;
    }
  }
  return (
    <button onClick={signIn} type="button" className="flex flex-row items-center justify-center gap-2 bg-red-500 text-light py-2 w-80 rounded">
      <FaGoogle />
      <div>|</div>
      <div>Sign in with Google</div>
    </button>
  );
}
