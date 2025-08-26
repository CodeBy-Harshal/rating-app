import React, { useEffect, useState } from "react";
import api from "../../api/api";

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/stores");
      setStores(res.data);
    } catch (err) {
      console.error("Error fetching stores", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <div className="p-6">Loading stores...</div>;

  if (!stores.length) return <p className="p-6">No stores found.</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Stores List</h1>
      <table className="w-full border-collapse bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Address</th>
            <th className="border p-2 text-left">Owner</th>
            <th className="border p-2 text-left">Ratings</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="border p-2">{s.id}</td>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.address}</td>
              <td className="border p-2">{s.ownerName}</td>
              <td className="border p-2">{s.ratingsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoresList;
