import { Link } from "react-router-dom";
import fetchData from "../utilities/fetchData";
import { useState, useEffect, useContext } from "react";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import Button from "../components/generalPurpose/Button";
import { UserContext } from "./Root";

export default function Issues({ admin = true }) {
  const { user } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [issues, setIssues] = useState([]);
  const [issueDialog, setIssueDialog] = useState(false);
  const [formInputValid, setFormInputValid] = useState(true);
  const [input, setInput] = useState("");
  const [textArea, setTextArea] = useState("");
  const [createdIssue, setCreatedIssue] = useState(false);
  const [created, setCreated] = useState(false); // Convert created into a state variable

  useEffect(() => {
    async function fetchIssues() {
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
        setFormInputValid(true);
        setSuccess(true);
      } else if (response.error) {
        setLoading(false);
        setError(true);
        setFormInputValid(false);
      }
    }
    fetchIssues();
  }, [created]); // Listen for changes in the 'created' state

  const handleOpenAnIssue = async (e) => {
    e.preventDefault();
    if (input.trim() === "" || textArea.trim() === "" || user === null) {
      setFormInputValid(false);
      return;
    }

    const issue = {
      sender: user.id,
      subject: input,
      description: textArea,
    };
    const response = await fetchData("http://localhost:3000/api/issues", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(issue),
    });
    if (response.data) {
      setCreatedIssue(true);
      setFormInputValid(true);
      setTextArea("");
      setInput("");
      setCreated(!created); // Toggle the 'created' state to trigger re-render
      setTimeout(() => setCreatedIssue(false), 1000);
    } else if (response.error) {
      setCreatedIssue(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Issues</h2>
      <div className="border-collapse p-1 ">
        {admin && (
          <div className="bg-gray-100 flex p-2">
            <div className="flex-1">Username</div>
            <div className="flex-1">Subject</div>
            <div className="flex-1">Date posted</div>
          </div>
        )}
        {success ? (
          issues.map((issue, index) => (
            <div key={issue._id}>
              {admin ? (
                <Link
                  to={`${issue._id}`}
                  className={`flex justify-between  p-4 ${
                    index % 2 === 0 ? "bg-gray-200" : "bg-white"
                  } border border-gray-300 hover:border-gray-700 rounded-md`}
                  style={{ textDecoration: "none" }}
                >
                  <div>
                    <div className="flex-1">{issue.sender?.username}</div>
                    <div className="flex-1">{issue.subject}</div>
                    <div className="flex-1">
                      {issue.createdAt.substring(0, 10)}
                    </div>
                  </div>
                  {((!issue.seen && issue.replies[issue.replies.length-1].sender._id!=user.id) || issue.replies.length === 0) && (
                    <FmdBadIcon
                      className="text-red-500 text-3xl"
                      style={{
                        fontSize: "35px",
                        transition: "font-size 200ms",
                        ":hover": { fontSize: "40px" },
                      }}
                    />
                  )}
                </Link>
              ) : (
                <>
                  <Link
                    className="flex justify-between bg-white shadow-md rounded-md p-4 mb-4"
                    key={issue._id}
                    to={`/issues/${issue._id}`}
                  >
                    <div>
                      <h2 className="text-lg font-bold mb-2">
                        {issue.subject}
                      </h2>
                      <p className="text-gray-600">{issue.description}</p>
                    </div>
                    {!issue.seen && issue.replies[issue.replies.length-1].sender._id!=user.id && (
                      <FmdBadIcon
                        className="text-red-500 text-3xl"
                        style={{
                          fontSize: "35px",
                          transition: "font-size 200ms",
                          ":hover": { fontSize: "40px" },
                        }}
                      />
                    )}
                  </Link>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="p-2">
            {loading && !error  ? "Loading..." : "Failed to load issues"}
          </div>
        )}
      </div>
      {issueDialog && (
        <form onSubmit={handleOpenAnIssue} className="mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Issue Subject"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
            cols={30}
            rows={5}
            placeholder="Issue Description"
            className="w-full mt-2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
          <button
            type="submit"
            className="mb-2 mt-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      )}
{
  !admin &&       <Button
  handler={setIssueDialog}
  value={issueDialog ? false : true}
  color={issueDialog ? "red" : "green"}
  text={issueDialog ? "Close" : "Open an issue"}
  inline={true}
/>
}
      <Link to={admin ? "/dashboard" : "/"}>
        <Button text="Back" color="blue" inline={true} />
      </Link>
      {createdIssue && (
        <div className="text-green-500">Successfully created a new issue</div>
      )}
      {!formInputValid && (
        <div className="text-red-500">Both fields are required</div>
      )}
    </div>
  );
}
