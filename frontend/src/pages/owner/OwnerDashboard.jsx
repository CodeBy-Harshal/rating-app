import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const OwnerDashboard = () => {
  const { user } = useAuth();

  const [storeName, setStoreName] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/owner/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStoreName(res.data.storeName);
        setAvgRating(res.data.avgRating);
        setUsers(res.data.users);
      } catch (error) {
        console.error("Error fetching owner dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOwnerData();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user?.name || "Owner"} 👋
      </h1>

      <div className="space-y-6">
        {/* Store Info */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold">{storeName}</h2>
          <p className="text-gray-600">
            Average Rating:{" "}
            <span className="font-bold">{avgRating.toFixed(1)}</span>
          </p>
        </div>

        {/* Users who rated */}
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Users Who Rated {storeName}
          </h2>
          {users.length === 0 ? (
            <p className="text-gray-600">No ratings submitted yet.</p>
          ) : (
            <ul className="space-y-2">
              {users.map((u) => (
                <li key={u.id} className="p-2 border rounded">
                  {u.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
