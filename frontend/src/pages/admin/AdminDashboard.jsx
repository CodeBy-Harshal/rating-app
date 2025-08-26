import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setMetrics(res.data);
      } catch (err) {
        console.error("Error fetching metrics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (loading) {
    return <div className="p-6">Loading metrics...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-2xl font-bold">{metrics.totalUsers}</p>
          <Link to="/admin/users" className="text-blue-500 underline mt-2 block">
            Manage Users
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Stores</h2>
          <p className="text-2xl font-bold">{metrics.totalStores}</p>
          <Link to="/admin/stores" className="text-blue-500 underline mt-2 block">
            Manage Stores
          </Link>
        </div>
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <h2 className="text-lg font-semibold">Ratings</h2>
          <p className="text-2xl font-bold">{metrics.totalRatings}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
