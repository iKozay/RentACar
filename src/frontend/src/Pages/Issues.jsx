import { Link } from "react-router-dom";
import fetchData from "../utilities/fetchData";
import { useState, useEffect } from "react";

export default function Issues() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const response = await fetchData("http://localhost:3000/api/issues", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        setIssues(response.data);
        setLoading(false);
        setSuccess(true);
      } else if (response.error) {
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Options</h2>
      <div className="border border-collapse">
        <div className="bg-gray-100 flex p-2">
          <div className="flex-1">Username</div>
          <div className="flex-1">Subject</div>
          <div className="flex-1">Date posted</div>
        </div>
        {success ? (
          Issues.map((issue, index) => (
            <Link
              key={issue._id}
              to={`${issue._id}`}
              className={`flex items-center p-4 ${
                index % 2 === 0 ? "bg-gray-200" : "bg-white"
              } border border-gray-300 hover:border-gray-700 rounded-md`}
              style={{ textDecoration: "none" }}
            >
              <div className="flex-1">{issue.sender.username}</div>
              <div className="flex-1">{issue.subject}</div>
              <div className="flex-1">{issue.createdAt.substring(0, 10)}</div>
            </Link>
          ))
        ) : (
          <div className="p-2">
            {loading && !error ? "Loading..." : "Failed to load customers"}
          </div>
        )}
      </div>
    </div>
  );
}
