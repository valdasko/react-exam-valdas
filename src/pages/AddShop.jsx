import React from 'react';
import AddShopForm from '../components/forms/AddShopForm';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Container from '../components/ui/Container';
import { useAuthCtx } from '../store/AuthProvider';

function AddShop() {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useAuthCtx();

  async function createShop(newShopObj) {
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'shops'), newShopObj);
      toast.success('Shop added successfully');
      navigate('/shops');
      setIsLoading(false);
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Error, try again later');
      setIsLoading(false);
    }
  }

  //   return (
  //     <Container>
  //       <h1>Add shop page</h1>
  //       <AddShopForm onNewShop={createShop} />
  //     </Container>
  //   );
  // }
  return (
    <div className='min-h-[93.4vh] flex items-center justify-center'>
      <div className='bg-primary flex rounded-2xl shadow-lg max-w-5xl p-5'>
        <div className='md:w-1/2 px-8'>
          <h2 className='font-bold font-headers text-secondary text-2xl'>Add shop</h2>
          <p className='font-body text-sm mt-4'>Add your shop to our page easily</p>
          <AddShopForm onNewShop={createShop} />
        </div>

        {/* image */}
        <div className='w-1/2 md:block hidden '>
          <img className='rounded-2xl ' src='/public/addshop.png' alt='login image' />
        </div>
      </div>
    </div>
  );
}

export default AddShop;
