import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Loader from '../components/ui/Loader';

function Shops() {
  const [shopsArr, setShopsArr] = useState([]);

  useEffect(() => {
    async function getShops() {
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const tempPosts = [];
      querySnapshot.forEach((doc) => {
        tempPosts.push({ uid: doc.id, ...doc.data() });
      });
      setShopsArr(tempPosts);
    }
    getShops();
  }, []);

  return (
    <div>
      <h1>Shops page</h1>
      {shopsArr.length === 0 ? (
        <h3>Sadly there are no shops..</h3>
      ) : (
        // <Loader />
        <div>
          {shopsArr.map((shopObj) => (
            <div key={shopObj.uid}>
              <div>
                <img src={shopObj.image} alt='shop' />
              </div>
              <h3>{shopObj.name}</h3>
              <p>{shopObj.description}</p>
              <p>{shopObj.town}</p>
              <p>{shopObj.startyear}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Shops;
