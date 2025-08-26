import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (name) params.name = name;
      if (email) params.email = email;
      if (address) params.address = address;
      if (role) params.role = role;

      const res = await api.get("/admin/users", { params });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  if (loading) return <div className="p-6">Loading users...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Filter Bar */}
      <form onSubmit={handleFilter} className="grid grid-cols-5 gap-3 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          className="border p-2 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="Owner">Owner</option>
        </select>
        <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
          Filter
        </button>
      </form>

      {/* Users Table */}
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Ratings</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.address}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">
                {u.storeRatings ? `Total:  ${u.storeRatings.totalRatings}, Avg: ${u.storeRatings.averageScore}` : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
