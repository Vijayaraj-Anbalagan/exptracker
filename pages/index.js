import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query } from 'firebase/firestore';
import { db } from './firebase';


export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "" });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];
      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Calculate total
      const totalPrice = itemsArr.reduce(
        (sum, item) => sum + parseFloat(item.price || 0), 0
      );
      setTotal(totalPrice);
    });
    return () => unsubscribe(); // This ensures the unsubscribe is called on component unmount
  }, []);

  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: parseFloat(newItem.price),
      });
      setNewItem({ name: '', price: '' }); // Clear form
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4">
      <h1 className="text-4xl font-bold mt-6">Expense Tracker</h1>
      <p className="text-lg mt-3">Keep track of your expenses</p>
      <form className="flex flex-row items-center mt-6 border border-gray-300 p-4 rounded-lg" onSubmit={addItem}>
        <input
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          type="text"
          placeholder="Enter Expense"
          className="border border-gray-300 rounded-lg p-2 mr-3 text-black"
          value={newItem.name}
        />
        <input
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          type="text"
          placeholder="Enter Amount"
          className="border border-gray-300 rounded-lg p-2 mr-3 text-black"
          value={newItem.price}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-700"
        >
          Add Expense
        </button>
      </form>
      <ul className="mt-6">
        {items.map((item, id) => (
          <li key={item.id} className="flex flex-row justify-between p-4 border border-gray-300 rounded-lg w-96 mb-3">
            <div className="flex flex-row justify-between w-full hover:bg-slate-900 p-2 rounded-sm">
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
            <button
              onClick={() => deleteItem(item.id)}
              className="ml-3 hover:bg-red-500 rounded-sm w-16"
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-between w-96 mt-6">
        <p className="text-lg">Total</p>
        <p className="text-lg">{total}</p>  
      </div>
    </main>
  );
}
