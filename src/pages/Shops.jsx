import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Loader from '../components/ui/Loader';
import { useAuthCtx } from '../store/AuthProvider';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';

function Shops() {
  const [shopsArr, setShopsArr] = useState([]);
  const { isLoading, setIsLoading } = useAuthCtx();

  useEffect(() => {
    async function getShops() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, 'shops'));
      const tempPosts = [];
      querySnapshot.forEach((doc) => {
        tempPosts.push({ uid: doc.id, ...doc.data() });
      });
      setShopsArr(tempPosts);
      setIsLoading(false);
    }
    getShops();
  }, []);

  return (
    <Container>
      <h1 className='font-headers text-[45px] my-6 text-center'>Welcome to shops page!</h1>
      {isLoading && <Loader />}
      {!isLoading && shopsArr.length === 0 ? (
        <h3>Sadly there are no shops..</h3>
      ) : (
        // <Loader />
        <div className='grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {shopsArr.map((shopObj) => (
            <Card item={shopObj} key={shopObj.uid} />
          ))}
        </div>
      )}
    </Container>
  );
}

export default Shops;
