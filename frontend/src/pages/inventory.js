import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import axios from 'axios';

function Inventory() {
  // Sample dataset of pills with initial amounts and dosages
  const initialPills = [
    { name: 'Pill A', amount: 10, dosage: 1 },
    { name: 'Pill B', amount: 20, dosage: 2 },
    { name: 'Pill C', amount: 15, dosage: 1.5 },
    { name: 'Pill D', amount: 8, dosage: 0.5 },
  ];

  // State to store the pills data and modal visibility
  const [pills, setPills] = useState(initialPills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPillName, setNewPillName] = useState('');
  const [newPillAmount, setNewPillAmount] = useState('');
  const [newPillDosage, setNewPillDosage] = useState('');

  // Function to handle toggling the amount of a pill
  const toggleAmount = index => {
    const newPills = [...pills];
    newPills[index].amount +=
      newPills[index].dosage * (newPills[index].toggled ? 1 : -1);
    newPills[index].toggled = !newPills[index].toggled;
    setPills(newPills);
  };

  // Function to handle submitting the new pill form
  const handleSubmit = e => {
    e.preventDefault();
    if (
      newPillName.trim() !== '' &&
      newPillAmount.trim() !== '' &&
      newPillDosage.trim() !== ''
    ) {
      setPills([
        ...pills,
        {
          name: newPillName,
          amount: parseInt(newPillAmount),
          dosage: parseFloat(newPillDosage),
          toggled: false,
        },
      ]);
      setNewPillName('');
      setNewPillAmount('');
      setNewPillDosage('');
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <Navbar />
    <div className='w-full items-center justify-center text-center pt-20'>
        <h1 className="text-5xl font-semibold">
            Pill Inventory
        </h1>
    </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-10 px-5">
        {pills.map((pill, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold w-full flex items-center justify-center">
              {pill.name}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <button
                onClick={() => toggleAmount(index)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-2xl"
              >
                {pill.toggled ? '+' : '-'}
              </button>
              <span className="text-xl font-bold">{pill.amount}</span>
            </div>
            <div className="mt-2 flex justify-end"></div>
          </div>
        ))}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 m-5 rounded-lg shadow-md "
      >
        Add New Pill
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Pill</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="pillName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pill Name
                </label>
                <input
                  type="text"
                  id="pillName"
                  value={newPillName}
                  onChange={e => setNewPillName(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pillAmount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  id="pillAmount"
                  value={newPillAmount}
                  onChange={e => setNewPillAmount(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pillDosage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Dosage
                </label>
                <input
                  type="number"
                  id="pillDosage"
                  value={newPillDosage}
                  onChange={e => setNewPillDosage(e.target.value)}
                  className="mt-1 p-2 border rounded-md w-full"
                />
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Add Pill
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
