import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setMessage("No token found in the URL.");
      setLoading(false);
      return;
    }

    fetch(`${API_URL}/auth/verify-email?token=${token}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setMessage("Email verified! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          setMessage(data.message || " Verification failed.");
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage(" Something went wrong during verification.");
      });
  }, [searchParams, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm">
        <h2 className="text-lg font-semibold">
          {loading ? "Please wait..." : message}
        </h2>
      </div>
    </div>
  );
}


