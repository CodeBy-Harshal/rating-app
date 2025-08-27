import React, { useEffect, useState } from "react";
import axios from "axios";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); // Search filter

  const token = localStorage.getItem("token");

  // Fetch stores from backend
  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setStores(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching stores:", error);
      setLoading(false);
    }
  };

  // Handle rating submission
  const handleRating = async (storeId, score) => {
    try {
      await axios.post(
        "http://localhost:5000/api/ratings",
        { storeId, score },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Refresh from backend to get updated average + user rating
      fetchStores();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // Filtered stores based on name or address
  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(filter.toLowerCase()) ||
      (store.address &&
        store.address.toLowerCase().includes(filter.toLowerCase()))
  );

  if (loading) return <p className="text-center mt-10">Loading stores...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Store Listings</h1>

      {/* Filter Bar */}
      <input
        type="text"
        placeholder="Search by store name or address..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full border px-4 py-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredStores.length === 0 ? (
        <p>No stores found</p>
      ) : (
        <div className="space-y-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <h2 className="text-lg font-semibold">{store.name}</h2>
              <p className="text-gray-600">
                {store.address || "No address provided"}
              </p>

              <p className="mt-2">
                <span className="font-medium">Overall Rating:</span>{" "}
                {store.overallRating
                  ? store.overallRating.toFixed(1)
                  : "No ratings yet"}
              </p>

              <p className="mt-1">
                <span className="font-medium">Your Rating:</span>{" "}
                {store.userRating ? store.userRating : "Not rated yet"}
              </p>

              {/* Rating Stars */}
              <div className="flex space-x-1 mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(store.id, star)}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= (store.userRating || 0) ? "⭐" : "☆"}
                  </button>
                ))}
              </div>

              {/* Show owner */}
              {store.owner && (
                <p className="mt-2 text-sm text-gray-500">
                  Owner: {store.owner.name}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Stores;
