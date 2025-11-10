// AccountTable.jsx
import React from "react";

const AccountTable = ({ accounts, onEdit, onDelete }) => {
  return (
    <table className="w-full border mt-6">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 text-left">Customer</th>
          <th className="p-2 text-left">Account Type</th>
          <th className="p-2 text-left">Balance</th>
          <th className="p-2 text-left">Status</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.length > 0 ? (
          accounts.map((acc) => (
            <tr key={acc._id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                {acc.customer?.firstName} {acc.customer?.lastName}
              </td>
              <td className="p-2">{acc.accountType}</td>
              <td className="p-2">${parseFloat(acc.balance).toFixed(2)}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    acc.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : acc.status === "Frozen"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {acc.status}
                </span>
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => onEdit(acc)}
                  className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(acc._id)}
                  className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="p-4 text-center text-gray-500">
              No accounts found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AccountTable;
