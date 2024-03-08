import {useState, useEffect} from "react";
import {useOutletContext,redirect,useNavigate} from "react-router-dom";
import fetchData from "../utilities/fetchData";

const Login = () => {
    const {setToken} = useOutletContext();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        // Decode the token to get user information
        const decodedToken = decodeToken(token);
        console.log("User Information:", decodedToken);
      }
    }, [success]);
  
    const handleUsername = (e) => {
      setUsername(e.target.value);
    };
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      const response = await fetchData("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.data) {
        localStorage.setItem("Token",response.data.token);
        setToken(response.data.token);
        redirect("/");
        setSuccess(true);
      } else if (response.error) {
        setError(true);
      }
      setLoading(false);
    };
  
    return (

      <div className="max-w-md mx-auto p-6 rounded-md shadow-md bg-neutral-200 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex justify-start">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  name="username"
                  required
                  value={username}
                  onChange={handleUsername}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-slate-600 hover:text-slate-400">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={handlePassword}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="font-semibold leading-6 text-slate-600 hover:text-slate-400">
              Sign-up
            </a>
          </p>
        </div>
        {error && <div className=" text-red-400 text-sm">Error logging in</div>}
          {success && <div>Successfully logged in</div>}
      </div>

    );
  };
  
  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  
  export default Login;