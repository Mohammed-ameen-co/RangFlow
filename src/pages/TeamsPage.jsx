import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function TeamsPage() {
  const { token } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // For create form
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError(null);

    axios
      .get("/api/teams", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data && res.data.teams) {
          setTeams(res.data.teams);
        } else {
          setTeams([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
        setError("Failed to load teams");
        setTeams([]);
        setLoading(false);
      });
  }, [token]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Team name is required");
      return;
    }
    setCreating(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/teams",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setTeams((prev) => [...prev, res.data.team]);
        setName("");
        setDescription("");
        alert("Team created successfully!");
      }
    } catch (err) {
      alert("Error creating team");
      console.error(err);
    }
    setCreating(false);
  };

  if (loading) return <div className="text-white mt-6">Loading teams...</div>;
  if (error) return <div className="text-red-400 mt-6">{error}</div>;

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Teams</h2>

      <form onSubmit={handleCreateTeam} className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Team Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          rows={3}
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-green-600 hover:bg-green-700 py-2 rounded"
        >
          {creating ? "Creating..." : "Create Team"}
        </button>
      </form>

      <ul>
        {teams.length > 0 ? (
          teams.map((team) => (
            <li
              key={team._id}
              className="mb-2 border p-3 rounded hover:bg-gray-700 transition cursor-pointer"
            >
              <strong className="text-lg">{team.name}</strong>
              <p className="text-sm text-gray-300">{team.description}</p>
            </li>
          ))
        ) : (
          <li>No teams found. Create one to get started!</li>
        )}
      </ul>
    </div>
  );
}
