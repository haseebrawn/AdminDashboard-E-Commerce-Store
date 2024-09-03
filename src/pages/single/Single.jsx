import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Single.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import Chart from "../../Components/chart/Chart";
import List from "../../Components/table/TableComponent";

const Single = () => {
  const { id } = useParams();
  const location = useLocation();
  const [data, setData] = useState(null);
  const isUserPage = location.pathname.includes("users");

  useEffect(() => {
    const fetchData = async () => {
      const url = isUserPage
        ? `${process.env.REACT_APP_PORT}/api/users/${id}`
        : `${process.env.REACT_APP_PORT}/api/product/${id}`;

      try {
        const response = await fetch(url);
        const result = await response.json();
        if (response.ok) {
          setData(isUserPage ? result.data.user : result.data.product);
        } else {
          console.error("Error fetching data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, isUserPage]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Construct the image URL based on whether it's a user or product page
  const imageUrl = `${process.env.REACT_APP_PORT}${
    isUserPage ? data.image : data.images
  }`;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={imageUrl} alt="Item" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{data.username || data.name}</h1>
                {isUserPage ? (
                  <>
                    <div className="detailItem">
                      <span className="itemKey">Email:</span>
                      <span className="itemValue">{data.email}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Phone:</span>
                      <span className="itemValue">{data.phone}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Address:</span>
                      <span className="itemValue">{data.address}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Country:</span>
                      <span className="itemValue">{data.country}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detailItem">
                      <span className="itemKey">Description:</span>
                      <span className="itemValue">{data.description}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Price:</span>
                      <span className="itemValue">{data.price}</span>
                    </div>
                    <div className="detailItem">
                      <span className="itemKey">Category:</span>
                      <span className="itemValue">{data.category}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={3 / 1}
              title={
                isUserPage
                  ? "User Spending ( Last 6 Months)"
                  : "Product Sales ( Last 6 Months)"
              }
            />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
