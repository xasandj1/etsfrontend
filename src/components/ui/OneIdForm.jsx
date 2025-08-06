'use client';
import React, { useState } from 'react';

export default function OneIdForm({ onSubmit }) {
  const [id, setId] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(id); }}>
      <h2 className="text-xl font-bold mb-4">Войти через One ID</h2>
      <input
        type="text"
        placeholder="One ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:border-primary"
      />
      <button type="submit" className="bg-primary text-white py-2 px-4 rounded-md">
        Перейти
      </button>
    </form>
  );
}
