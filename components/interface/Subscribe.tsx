import { FormEvent, useState } from "react";

export default function Subscribe() {
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const subscribe = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const res = await fetch(`/api/subscribe?email=${email}`, {
      method: "POST",
    });

    const { error } = await res.json();

    if (error) {
      setMessage(error);
      setError(true);
    } else setMessage("Thanks for subscribing!");

    setLoading(false);
    setTimeout(() => setMessage(""), 5000);
  };
  return (
    <div className="w-full mt-16 p-4 md:p-8 border border-gray-500 rounded-xl">
      <h3 className="md:text-xl font-bold text-center md:text-left">
        Subscribe to my Newsletter
      </h3>
      <p className="text-gray-500 text-center md:text-left my-1 text-sm md:text-base">
        No spam or advertisements, just new and exclusive content straight to
        your inbox.
      </p>
      <form
        onSubmit={subscribe}
        className="md:relative my-4 flex flex-col gap-4"
      >
        <input
          aria-label="Email for newsletter"
          placeholder="you@example.com"
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
          className="px-4 py-2 focus:ring-blue-500 focus:border-blue-500 block w-full border-gray-300 rounded-md bg-light dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <button
          className="flex items-center justify-center w-full md:absolute md:right-1 md:top-1 h-8 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded md:w-28"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex flex-row gap-1 animate-pulse">
              <div className="bg-dark dark:bg-white w-2 h-2 rounded-full" />
              <div className="bg-dark dark:bg-white w-2 h-2 rounded-full" />
              <div className="bg-dark dark:bg-white w-2 h-2 rounded-full" />
            </div>
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      <p className={error ? "text-red-500" : ""}>{message}</p>
    </div>
  );
}
