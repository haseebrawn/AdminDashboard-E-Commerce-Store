import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Table.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const TableComponent = ({userId}) => {
  // const { userId } = useParams();
  const [rows, setRows] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError("No user ID found. Please log in again.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PORT}/api/order/user/orders/${userId}`);
        setRows(response.data.data);
        console.log('user-getOrder', response);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders. Error: ' + err.message);
      }
    };

    fetchOrders();
  }, [userId]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (rows.length === 0) {
    return <div className="no-orders">No orders found for this user.</div>;
  }
  

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell">{row.trackingId}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={row.productId?.images?.[0]}
                    alt={row.productId?.name || 'Product'}
                    className="image"
                  />
                  {row.productId?.name}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">
                {new Date(row.date).toLocaleString()}
              </TableCell>
              <TableCell className="tableCell">${row.amount}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status.toLowerCase()}`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
