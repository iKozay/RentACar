import fetchData from "./fetchData";
export default async function logout() {
    const result = await fetchData("http://localhost:3000//api/auth/logout",
    {
        method: "GET",
        credentials: "include", // Include cookies in the request
        mode: "cors", // Enable CORS
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      localStorage.removeItem("Token");
      return;
    }