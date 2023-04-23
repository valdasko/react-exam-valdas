import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import Loader from '../components/ui/Loader';
import { useAuthCtx } from '../store/AuthProvider';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';
import { GridLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

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

  // loader test
  // setIsLoading(true);

  return (
    <section className='min-h-screen'>
      <Container>
        <div className='mx-auto '>
          <div className='relative mb-6 w-full'>
            {/* <video src={escalators} w-full object-cover h-full autoPlay loop muted /> */}
            <img className='w-full h-80 object-cover bottom-5' src='/public/hero.webp' alt='hero img' />
            <h1 className='font-headers text-center text-[40px] font-normal  text-secondary bg-light absolute left-1/2 transform -translate-x-1/2  bottom-0 bg-opacity-80 rounded-t-xl  uppercase py-8 px-20'>
              shops
              <span className='block font-body text-xl text-center text-[#333]'>Welcome to our shops page</span>
            </h1>
          </div>
          {isLoading ? (
            <div className='flex justify-center mt-20'>
              <GridLoader className='' size={30} color='#CDA274' />
            </div>
          ) : (
            <div className='grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {shopsArr.map((shopObj) => (
                <Card item={shopObj} key={shopObj.uid} />
              ))}
            </div>
          )}
          {!isLoading && shopsArr.length === 0 && (
            <div>
              <h2 className='mt-20 text-center font-headers text-[50px]'>Seems like there are no shops..</h2>
              <p className='text-center font-body text-[30px]'>
                If you want to add a shop press here{' '}
                <Link className='text-primary hover:text-secondary transition-colors' to={'/addshop'}>
                  add shop
                </Link>
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default Shops;
