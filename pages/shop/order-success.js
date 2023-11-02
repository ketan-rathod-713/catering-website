import Link from 'next/link';
import Navbar from '../../components/Navbar';
import PagePadding from '../../components/PagePadding';

const OrderSuccessPage = () => {
  return (
    <div>
      <Navbar/>
      <PagePadding>
        <div className=''>
          <div className='flex flex-col space-y-5 p-7 bg-green-600 items-center'>
            <h1 className='text-6xl text-gray-200 text-center mb-10'>THANK YOU !</h1>
            <h1 className='text-4xl text-gray-200 font-bold text-center'>Order Placed Successfully</h1>
            <div className='text-lg text-gray-300 mb-20'>Your Order Will be Delivered Within A Week. We will inform you once product disptaches. for more information you can contact our email.</div>
            <Link className='text-xl text-center text-gray-100 underline mt-20' href="/shop/order">View Your Orders</Link>
          </div>
        </div>
      </PagePadding>
    </div>
  );
};

export default OrderSuccessPage;
