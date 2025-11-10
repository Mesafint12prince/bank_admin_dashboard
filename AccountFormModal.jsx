import React, { useState, useEffect } from "react";
import axios from "axios";

const AccountForm = ({ onClose, onSave, existing }) => {
  const [form, setForm] = useState({
    customerId: existing?.customer?._id || "",
    accountType: existing?.accountType || "Savings",
    balance: existing?.balance || "",
    status: existing?.status || "Active",
  });
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-bold mb-4">
          {existing ? "Edit Account" : "Add Account"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!existing && (
            <select
              name="customerId"
              value={form.customerId}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            >
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </select>
          )}

          <select
            name="accountType"
            value={form.accountType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Savings">Savings</option>
            <option value="Checking">Checking</option>
          </select>

          <input
            name="balance"
            type="number"
            placeholder="Balance"
            value={form.balance}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="Active">Active</option>
            <option value="Frozen">Frozen</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
