import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "./Order.css";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_PORT}/api/order/`
        );
        setOrders(response.data.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_PORT}/api/order/${id}`);
      setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_PORT}/api/order/${id}`,
        { status: newStatus }
      );
      setOrders(orders.map((order) =>
        order._id === id ? response.data.data.order : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", width: 160 },
    { field: "productName", headerName: "Product Name", width: 200 },
    {
      field: "category",
      headerName: "Category",
      width: 230,
    },
    {
      field: "sizes",
      headerName: "Sizes",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="tdrow">
            {params.value.map((sizeObj, index) => (
              <div key={index}>
                {" "}
                {sizeObj.size}: {sizeObj.quantity}{" "}
              </div>
            ))}
          </div>
        );
      },
    },
    { field: "status", headerName: "Status", width: 100 },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    productName: order.productId.name,
    category: order.productId.category,
    amount: order.productId.price,
    sizes: order.productId.sizes,
    status: order.status,
  }));

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              className="viewButton"
              style={{ textDecoration: "none" }}
              to={`/order/edit/${params.row.id}`}
              onClick={() => handleUpdateStatus(params.row.id, "completed")}
            >
              Edit
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[6, 12]}
        checkboxSelection
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default Order;
