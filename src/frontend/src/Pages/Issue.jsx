import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import fetchData from "../utilities/fetchData";
import { UserContext } from "./Root";
export default function Issue() {
  const {user} = useContext(UserContext);
  const { issueId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [issue, setIssue] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [replySucceeded,setReplySucceeded]=useState(true);
  const [isTextAreaValid,setIsTextAreaValid]=useState(true);
  useEffect(() => {
    async function fetchIssue() {
      setLoading(true);
      const issueData = await fetchData(
        `http://localhost:3000/api/issues/${issueId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (issueData.data) {
        setIssue(issueData.data);
        setLoading(false);
        setSuccess(true);
      } else if (issueData.error) {
        setLoading(false);
        setError(true);
      }
    }
    fetchIssue();
  }, [issueId]);

  const handleClickDeleteIssue = async () => {
    const response = await fetchData(
      `http://localhost:3000/api/issues/${issueId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setDeleting(response);
  };
  
  const handleReply =async (e) =>{
    e.preventDefault();
    if(textAreaValue==="")setIsTextAreaValid(false);
    else setIsTextAreaValid(true);
    const reply = {
        sender:user.id,
        body:textAreaValue
    }
    if(isTextAreaValid){
    
    const issueData = await fetchData(
        `http://localhost:3000/api/issues/reply/${issueId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          
        body: JSON.stringify(reply)
        }
      );
      if (issueData.data) {
          setReplySucceeded(true);
          setIssue(issueData.data);
      } else if (issueData.error) {
        setReplySucceeded(false);
      }
    }

  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Issue Details</h1>
      {success ? (
        !deleteBtn ? (
          <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{issue.subject}</h2>
              <p className="text-gray-700">{issue.description}</p>
            </div>
            <div className="p-1">
            {issue.replies.map((reply) => (
                <div key={reply._id} className="mb-1 p-4 bg-gray-100">
                <p className="text-gray-800">{reply.body}</p>
                <div className="flex justify-between mt-2">
                    <p className="text-sm text-gray-500">{new Date(reply.createdAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Posted by: {reply.sender.username}</p>
                </div>
                </div>
            ))}
            </div>

            <div className="p-4">
              <textarea
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                rows="3"
                placeholder="Type your reply here..."
                onChange={(e)=>setTextAreaValue(e.target.value)}
                required
              ></textarea>
                  {!isTextAreaValid && (
               <p className="text-red-500">This field is required</p>
              )}
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                onClick={handleReply}
              >
                Reply
              </button>
              {!replySucceeded&&<span className="text-red-500"> failed to send the reply</span>}
            </div>
          </div>
        ) : (
          deleting ? (
            deleting.data ? (
              <div className="bg-green-100 text-green-900 px-4 py-3 rounded-md mb-4">
                Successfully deleted issue {issueId}
              </div>
            ) : deleting.loading ? (
              <div className="bg-yellow-100 text-yellow-900 px-4 py-3 rounded-md mb-4">
                Attempting to delete issue {issueId}...
              </div>
            ) : (
              <div className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">
                Failed to delete issue {issueId}
              </div>
            )
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete{" "}
                <span className="text-red-500">issue {issueId}</span>?
              </p>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-4"
                  onClick={handleClickDeleteIssue}
                >
                  Delete
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
                  onClick={() => setDeleteBtn(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        )
      ) : loading ? (
        <h2 className="text-center text-gray-500">Loading...</h2>
      ) : error ? (
        <h2 className="bg-red-100 text-red-900 px-4 py-3 rounded-md mb-4">Error</h2>
      ) : (
        ""
      )}
    </div>
  );
}
