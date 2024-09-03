import "./DataTable.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  productColumns as baseProductColumns,
} from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Datatable = () => {
  const location = useLocation();
  const isUserPage = location.pathname.includes("users");

  const [data, setData] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [hoveredSizeIndex, setHoveredSizeIndex] = useState(null);

  const refineData = (data) => {
    return data.map((item) => {
      const imagePath = isUserPage ? item.image : item.images;
      return {
        ...item,
        imagePath: `${process.env.REACT_APP_PORT}${imagePath}`,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("env value ", process.env.REACT_APP_PORT);
      const url = isUserPage
        ? `${process.env.REACT_APP_PORT}/api/users/getAlluser`
        : `${process.env.REACT_APP_PORT}/api/product/getProducts`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log("result", result);
        if (response.ok) {
          const fetchedData = isUserPage
            ? result.data.users
            : result.data.product;
          const refinedData = refineData(fetchedData);
          setData(refinedData);
          console.log("refinedData", refinedData);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isUserPage]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              className="viewButton"
              to={
                isUserPage
                  ? `/users/${params.row._id}`
                  : `/products/${params.row._id}`
              }
              style={{ textDecoration: "none" }}
            >
              View
            </Link>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const productColumns = baseProductColumns.map((column) => {
    if (column.field === "sizes") {
      return {
        ...column,
        renderCell: (params) => (
          <div>
            {params.row.sizes.map((size, sizeIndex) => (
              <span
                key={size.name}
                className="size-name"
                onMouseEnter={() => {
                  setHoveredProductId(params.row._id);
                  setHoveredSizeIndex(sizeIndex);
                }}
                onMouseLeave={() => {
                  setHoveredProductId(null);
                  setHoveredSizeIndex(null);
                }}
              >
                {size.name}
                {hoveredProductId === params.row._id &&
                  hoveredSizeIndex === sizeIndex && (
                    <span className="quantity">: {size.quantity}</span>
                  )}
              </span>
            ))}
          </div>
        ),
      };
    }
    return column;
  });

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {isUserPage ? "Add New User" : "Add New Product"}
        <Link to={isUserPage ? "/users/new" : "/products/new"} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        rows={data}
        columns={(isUserPage ? userColumns : productColumns).concat(
          actionColumn
        )}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 6 },
          },
        }}
        pageSizeOptions={[6, 12]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
