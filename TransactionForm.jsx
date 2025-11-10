import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    accountId: '',
    toAccountId: '', // for transfers
    type: '',
    amount: '',
    note: ''
  });
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/accounts');
        setAccounts(res.data);
      } catch (err) {
        console.error('Failed to fetch accounts:', err);
      }
    };
    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedAccount = accounts.find(acc => acc._id === form.accountId);

    // ⚠️ Client-side overdraft prevention
    if (form.type === 'withdrawal' && selectedAccount && Number(form.amount) > selectedAccount.balance) {
      alert('⚠️ Insufficient balance for this withdrawal');
      return;
    }

    try {
      const payload = { ...form, type: form.type.toLowerCase() };
      const res = await axios.post('http://localhost:5000/api/transactions', payload);
      onAdd(res.data);
      setForm({ accountId: '', toAccountId: '', type: '', amount: '', note: '' });
    } catch (err) {
      const msg = err.response?.data?.error || err.message;
      alert(`⚠️ ${msg}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      {/* Select Transaction Type */}
      <select name="type" value={form.type} onChange={handleChange} className="input" required>
        <option value="">Transaction Type</option>
        <option value="deposit">Deposit</option>
        <option value="withdrawal">Withdrawal</option>
        <option value="transfer">Transfer</option>
      </select>

      {/* From Account */}
      <select name="accountId" value={form.accountId} onChange={handleChange} className="input" required>
        <option value="">Select Account</option>
        {accounts.map((acc) => (
          <option key={acc._id} value={acc._id}>
            {acc.type} - Balance: ${acc.balance.toFixed(2)}
          </option>
        ))}
      </select>

      {/* To Account (only for transfer) */}
      {form.type === 'transfer' && (
        <select name="toAccountId" value={form.toAccountId} onChange={handleChange} className="input" required>
          <option value="">Select Destination Account</option>
          {accounts
            .filter((acc) => acc._id !== form.accountId) // prevent same account transfer
            .map((acc) => (
              <option key={acc._id} value={acc._id}>
                {acc.type} - Balance: ${acc.balance.toFixed(2)}
              </option>
            ))}
        </select>
      )}

      {/* Amount */}
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="input"
        required
      />

      {/* Note */}
      <input
        type="text"
        name="note"
        placeholder="Note"
        value={form.note}
        onChange={handleChange}
        className="input"
      />

      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
