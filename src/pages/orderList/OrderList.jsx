import React from 'react';
import Order from '../../Components/orders/Order';
import Navbar from '../../Components/navbar/Navbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import './OrderList.css';

const OrderList = () => {
  return (
    <div className='list'>
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      <Order />
    </div>
  </div>
  )
}

export default OrderList
