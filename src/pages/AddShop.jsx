import React from 'react';
import AddShopForm from '../components/forms/AddShopForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddShop() {
  const navigate = useNavigate();

  async function createShop(newShopObj) {
    try {
      const docRef = await addDoc(collection(db, 'shops'), newShopObj);
      toast.success('Shop added successfully');
      navigate('/shops');
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Error, try again later');
    }
  }

  return (
    <div>
      <h1>Add shop page</h1>
      <AddShopForm onNewShop={createShop} />
    </div>
  );
}

export default AddShop;
