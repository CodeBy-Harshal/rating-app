import React, { useState } from "react";
import api from "../../api/api";

const AddStore = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      if (name.length < 20 || name.length > 60)
        throw new Error("Store name must be 20–60 chars");
      if (address.length > 400)
        throw new Error("Address too long (max 400 chars)");

      await api.post("/admin/stores", { name, email, address, ownerId });

      setName("");
      setEmail("");
      setAddress("");
      setOwnerId("");
      alert("Store added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Store</h1>
      <form
        onSubmit={handleAddStore}
        className="space-y-3 bg-white p-4 rounded shadow w-full"
      >
        <input
          type="text"
          placeholder="Store Name (20–60 chars)"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Store Email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          placeholder="Address (max 400 chars)"
          className="border p-2 rounded w-full"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="number"
          placeholder="Owner ID"
          className="border p-2 rounded w-full"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Store
        </button>
      </form>
    </div>
  );
};

export default AddStore;
