import PageHeading from "./PageHeading";
import SessionListingsUser from "./SessionListingsUser";
import apiClient from "../api/apiClient";
import { useState, useEffect } from "react";

// Hooks
export default function SessionHistoryUser({ userId }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Run once when the component mounts
  // Mounting is the process of creating and adding the component into DOM
  useEffect(() => {
    fetchSessions();
  }, [userId]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      console.log("the uuuuuserrrr id is: ", userId);
      const response = await apiClient.get(`/sessions/user/${userId}`); // Axios GET Request
      setSessions(response.data); // Update sessions state with fetched data
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to fetch sessions. Please try again.",
      ); // Extract error message if available
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl font-semibold">Loading sessions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-xl text-red-500">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="max-w-[1152px] mx-auto px-6 py-8">
      <PageHeading title="Session History">Select Filter</PageHeading>
      <SessionListingsUser sessions={sessions} />
    </div>
  );
}
