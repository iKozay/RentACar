import { useState, useEffect, useContext } from 'react';
import fetchData from '../utilities/fetchData';
import {Link} from 'react-router-dom';
import { UserContext } from './Root';

export default function CustomerIssues() {
    const {user} = useContext(UserContext);
    const [error, setError] = useState(false);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCustomerIssues() {
            setLoading(true);
            const result = await fetchData(`http://localhost:3000/api/issues/user/${user.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                }
            });
            if (result.data) {
                setLoading(false);
                setIssues(result.data);
            } else if (result.error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchCustomerIssues();
    }, [user.id]);

    return (
        <div className="container mx-auto p-4">
            {!error && !loading ? (
                <div>
                    {issues.map(issue => (
                        <Link key={issue._id} to={`/issues/${issue._id}`}><div  className="bg-white shadow-md rounded-md p-4 mb-4">
                            <h2 className="text-lg font-bold mb-2">{issue.subject}</h2>
                            <p className="text-gray-600">{issue.description}</p>
                        </div></Link>
                    ))}
                </div>
            ) : (
                <div className="p-2 text-center">
                    {loading && !error ? "Loading..." : "Failed to load customers"}
                </div>
            )}
        </div>
    );
}
