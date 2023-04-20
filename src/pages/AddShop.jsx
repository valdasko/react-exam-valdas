import React from 'react';
import AddShopForm from '../components/forms/AddShopForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

function AddShop() {
  async function createShop(newShopObj) {
    try {
      const docRef = await addDoc(collection(db, 'shops'), newShopObj);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
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
