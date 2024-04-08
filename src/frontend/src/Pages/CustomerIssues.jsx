import { useState, useEffect, useContext } from 'react';
import fetchData from '../utilities/fetchData';
import {Link} from 'react-router-dom';
import { UserContext } from './Root';
import Issues from './Issues';

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
        <Issues admin={false}/>
        </div>
    );
}
