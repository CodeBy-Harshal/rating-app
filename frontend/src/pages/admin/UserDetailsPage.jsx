import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get(`/admin/users/${userId}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user details", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  if (loading) return <div className="p-6">Loading user details...</div>;
  if (!user) return <div className="p-6">User not found</div>;

  return (
    <div className="p-6 space-y-6">
      <Link to="/admin/users" className="text-blue-500 hover:underline">
        ← Back to Users
      </Link>

      <h1 className="text-2xl font-bold">User Details</h1>

      {/* User Info */}
      <div className="bg-white shadow rounded p-4 space-y-2">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      {/* Stores */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Stores Owned</h2>
        {user.stores?.length > 0 ? (
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {user.stores.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="border p-2">{s.id}</td>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No stores owned</p>
        )}
      </div>

      {/* Ratings */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Ratings Submitted</h2>
        {user.ratings?.length > 0 ? (
          <table className="w-full border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">ID</th>
                <th className="border p-2 text-left">Score</th>
                <th className="border p-2 text-left">Comment</th>
              </tr>
            </thead>
            <tbody>
              {user.ratings.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="border p-2">{r.id}</td>
                  <td className="border p-2">{r.score}</td>
                  <td className="border p-2">{r.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No ratings submitted</p>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
