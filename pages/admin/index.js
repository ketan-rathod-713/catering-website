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
import BarChart from "../../components/BarChart";

const AdminPanel = ({error, dashboardData}) => {

  if(error){
    return <div>
        <NotAuthorised message={error}/>
    </div>
}

const ordersForLineChart = dashboardData.totalOrdersInMonth.map(item => [item._id, item.totalOrders]);
const ordersDeliveredForLineChart = dashboardData.totalDeliveredOrdersInMonth.map(item => [item._id, item.totalOrders]);
const pendingOrdersDateWise = dashboardData.pendingOrdersDateWise.map(item => [item._id, item.ordersPending]);
console.log(pendingOrdersDateWise);

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-20">
        <div className="space-y-10">
          <h1 className="text-2xl font-bold text-center">Orders</h1>
          <BarChart data={[["Date", "Orders"] ,...ordersForLineChart]} />
        </div>

        <div className="space-y-10">
        <h1 className="text-2xl font-bold text-center">Delivered Orders</h1>
        <BarChart data={[["Date", "Orders"] ,...ordersDeliveredForLineChart]} />
        </div>
      </div>

      {/* show product wise orders .products to fulfilled */}

      <div className="grid grid-cols-1 lg:grid-cols-2 mt-20 gap-10">
        <div className="border-gray-200 border-2 p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center my-5">Product Orders To FullFill</h1>
        <div className="flex-col space-y-10">
        {
          dashboardData.productWiseOrdersToFullFill.map((product, index)=>(
            <div key={index} className="grid grid-cols-2 text-xl py-2 px-3">
              <div className=" flex flex-col">
                <div className="font-bold">{product.product.title}</div>
                <div className="text-sm">Product Id : {product._id}</div>
              </div>
              <div className="flex justify-end font-bold">{product.totalOrdersToFulFill}</div>
            </div>
          ))
        }
      </div>
        </div>
        <div className="border-gray-200 border-2 p-5 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center my-5">Pending Orders Date Wise</h1>
        <div>
          <BarChart data={[["Date", "Orders"],...pendingOrdersDateWise]}/>
        </div>
        </div>
      </div>
    </PagePadding>
  </div>;
};

export default AdminPanel;



// SERVER SIDE CODE

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
    console.log(totalRevenueArray);
    const totalRevenue =totalRevenueArray[0] ?  totalRevenueArray[0]["totalRevenue"] : 0;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const totalOrdersInMonth = await findOrdersPerDayInMonth(currentMonth, currentYear)
    console.log(totalOrdersInMonth);

    const totalDeliveredOrdersInMonth = await findDeliveredOrdersPerDayInMonth(currentMonth, currentYear)
    console.log(totalDeliveredOrdersInMonth);

    const productWiseOrdersToFullFill = await findProductWiseOrdersToFullFill()
    console.log(productWiseOrdersToFullFill);

    const pendingOrdersDateWise = await findPendingOrdersPerDayInMonth()
    console.log(productWiseOrdersToFullFill);

    const dashboardData = {
      total_orders_completed, total_orders_ongoing, totalRevenue, today_orders, totalOrdersInMonth, totalDeliveredOrdersInMonth,productWiseOrdersToFullFill, pendingOrdersDateWise
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

// write function to get month wise data

async function findProductWiseOrdersToFullFill() {
  try {
    const ordersDateWise =await Order.aggregate([
      {
          '$match': {
              'status': 'ONGOING'
          }
      }, {
          '$unwind': {
              'path': '$products', 
              'preserveNullAndEmptyArrays': false
          }
      }, {
          '$group': {
              '_id': '$products.product._id', 
              'totalOrdersToFulFill': {
                  '$sum': '$products.quantity'
              }
          }
      }, {
          '$lookup': {
              'from': 'products', 
              'let': {
                  'localId': {
                      '$toObjectId': '$_id'
                  }
              }, 
              'pipeline': [
                  {
                      '$match': {
                          '$expr': {
                              '$eq': [
                                  '$$localId', '$_id'
                              ]
                          }
                      }
                  }
              ], 
              'as': 'product'
          }
      }, {
          '$addFields': {
              'product': {
                  '$arrayElemAt': [
                      '$product', 0
                  ]
              }
          }
      }, {
          '$project': {
              'totalOrdersToFulFill': 1, 
              'product': {
                  'title': '$product.title', 
                  'category': '$product.category'
              }
          }
      }
  ])
console.log("orders product wise wise",ordersDateWise);
return ordersDateWise;

  } catch (error) {
    console.error("Error while finding orders per day:", error);
    return []; // Return an empty array in case of an error
  }
}

async function findPendingOrdersPerDayInMonth() {
  try {
    const ordersDateWise =await Order.aggregate([
      {
        '$match': {
          'status': 'ONGOING'
        }
      }, {
        '$addFields': {
          'day': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$timeWhenOrdered'
            }
          }
        }
      }, {
        '$group': {
          '_id': '$day', 
          'ordersPending': {
            '$sum': 1
          }
        }
      }
    ])
console.log("orders product wise wise",ordersDateWise);
return ordersDateWise;

  } catch (error) {
    console.error("Error while finding orders per day:", error);
    return []; // Return an empty array in case of an error
  }
}

async function findOrdersPerDayInMonth(month, year) {
  console.log(month, year);
  try {
    const ordersDateWise =await Order.aggregate([
      {
        '$addFields': {
          'day': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$timeWhenOrdered'
            }
          }, 
          'year': {
            '$dateToString': {
              'format': '%Y', 
              'date': '$timeWhenOrdered'
            }
          }, 
          'month': {
            '$dateToString': {
              'format': '%m', 
              'date': '$timeWhenOrdered'
            }
          }
        }
      }, {
        '$match': {
          'month': '11', 
          'year': '2023'
        }
      }, {
        '$group': {
          '_id': '$day', 
          'totalOrders': {
            '$sum': 1
          }
        }
      }
    ])
console.log("orders date wise",ordersDateWise);
return ordersDateWise;

  } catch (error) {
    console.error("Error while finding orders per day:", error);
    return []; // Return an empty array in case of an error
  }
}

async function findDeliveredOrdersPerDayInMonth(month, year) {
  console.log(month, year);
  try {
    const ordersDateWise =await Order.aggregate([
      {
        '$match': {
          'status': 'DELIVERED'
        }
      }, {
        '$addFields': {
          'day': {
            '$dateToString': {
              'format': '%Y-%m-%d', 
              'date': '$deliveryDate'
            }
          }, 
          'year': {
            '$dateToString': {
              'format': '%Y', 
              'date': '$deliveryDate'
            }
          }, 
          'month': {
            '$dateToString': {
              'format': '%m', 
              'date': '$deliveryDate'
            }
          }
        }
      }, {
        '$match': {
          'month': `${month}`, 
          'year': `${year}`
        }
      }, {
        '$group': {
          '_id': '$day', 
          'totalOrders': {
            '$sum': 1
          }
        }
      }
    ])
console.log("orders date wise",ordersDateWise);
return ordersDateWise;

  } catch (error) {
    console.error("Error while finding orders per day:", error);
    return []; // Return an empty array in case of an error
  }
}