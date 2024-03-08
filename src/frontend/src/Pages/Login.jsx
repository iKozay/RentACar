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
      <div>
        <h2>Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={handleUsername}
          />
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={handlePassword}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <div>Error logging in</div>}
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