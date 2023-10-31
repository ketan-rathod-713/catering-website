import React from "react";
import Navbar from './../../components/Navbar';
import NavbarAdmin from "../../components/NavbarAdmin";
import authoriseAdmin from "../../utils/authoriseAdmin";
import Order from "../../models/Order";
import NotAuthorised from "../../components/NotAuthorised";
import PagePadding from './../../components/PagePadding';
import PageHeading from './../../components/PageHeading';
import LineChart from "../../components/LineChart";
import { DELIVERED, ONGOING } from "../../data/orderStatus";

const orders = [
  ["Date", "Orders"],
  [1, 89],
  [2, 13],
  [3, 52],
  [4, 68],
  [5, 41],
  [6, 27],
  [7, 91],
  [8, 7],
  [9, 35],
  [10, 70],
  [11, 96],
  [12, 86],
  [13, 63],
  [14, 24],
  [15, 18],
  [16, 81],
  [17, 12],
  [18, 43],
  [19, 48],
  [20, 58],
  [21, 6],
  [22, 79],
  [23, 10],
  [24, 74],
  [25, 23],
  [26, 17],
  [27, 3],
  [28, 51],
  [29, 16],
  [30, 37]
];


const AdminPanel = ({error, dashboardData}) => {

  if(error){
    return <div>
        <NotAuthorised message={error}/>
    </div>
}

  return <div className="">
    <NavbarAdmin/>
    <PagePadding>
      <PageHeading>ADMIN DASHBOARD</PageHeading>

      {/* top */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="p-7 border-2 rounded-lg border-gray-200 hover:bg-blue-500 text-gray-800 duration-200 hover:text-white">
          <div className="text-lg font-bold ">Pending Orders</div>
          <div className="text-2xl mt-3 font-bold">{dashboardData.total_orders_ongoing}</div>
          <div className="text-xs mt-3">All Pending Orders & today orders : {dashboardData.today_orders}</div>
        </div>
        <div className="p-7 border-2 rounded-lg border-gray-200 hover:bg-blue-500 text-gray-800 duration-200 hover:text-white">
          <div className="text-lg font-bold ">Completed Orders</div>
          <div className="text-2xl mt-3 font-bold">{dashboardData.total_orders_completed}</div>
          <div className="text-xs mt-3">All Completed Orders</div>
        </div>
        <div className="p-7 border-2 rounded-lg border-gray-200 hover:bg-blue-500 text-gray-800 duration-200 hover:text-white">
          <div className="text-lg font-bold ">Total Revenue</div>
          <div className="text-2xl mt-3 font-bold">{dashboardData.totalRevenue}</div>
          <div className="text-xs mt-3">Total Revenue Of All Completed Orders </div>
        </div>
        <div className="p-7 border-2 rounded-lg border-gray-200 hover:bg-blue-500 text-gray-800 duration-200 hover:text-white">
          <div className="text-lg font-bold ">Active Users</div>
          <div className="text-2xl mt-3 font-bold">112</div>
          <div className="text-xs mt-3">Users who interacted atleast during a month </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10">
        <div>
          <h1 className="text-xl font-bold text-center">No Of Orders This Month</h1>
          <LineChart orders={orders}/>
        </div>

        <div>
        <h1 className="text-xl font-bold">All Notifications</h1>
        </div>
      </div>
    </PagePadding>
  </div>;
};

export default AdminPanel;

export async function getServerSideProps(context){
  const {req} = context;
  const decodedToken = await authoriseAdmin(req)

  if(decodedToken){

    // get all statistics data here
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const today_orders = await Order.countDocuments({timeWhenOrdered: {$gte : today}})
    const total_orders_ongoing = await Order.countDocuments({status: ONGOING});
    const total_orders_completed = await Order.countDocuments({status: DELIVERED});

    console.log(today_orders)
    console.log(total_orders_ongoing);

    // total revenue // add all orders prices // completed orders
    const pipeline = [
      {
        $match: {
          status: DELIVERED,
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ];
    
    const totalRevenueArray = await Order.aggregate(pipeline);
    const totalRevenue = totalRevenueArray[0]["totalRevenue"]

    const dashboardData = {
      total_orders_completed, total_orders_ongoing, totalRevenue, today_orders
    }

    return {
      props: {
        dashboardData
      }
    }
  } else {
    return {
      props: {
        error: "You are not authorised to view this page"
      }
    }
  }

  
  
}
