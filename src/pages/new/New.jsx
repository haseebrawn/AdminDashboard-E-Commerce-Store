import "./New.css";
import Sidebar from "../../Components/sidebar/Sidebar";
import Navbar from "../../Components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useRef } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const New = ({ inputs, title, formType }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState({ name: "", quantity: "" });
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSizeChange = (e) => {
    const { name, value } = e.target;
    setSizeInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    if (name === "name") {
      setShowQuantityInput(true);
    }
  };

  const addSize = () => {
    setSizes([...sizes, sizeInput]);
    setSizeInput({ name: "", quantity: "" });
    setShowSizeDropdown(false);
    setShowQuantityInput(false);
  };

  const removeSize = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });
  
    if (file) {
      formDataToSend.append('images', file);
    }
  
    if (formType === 'product') {
      formDataToSend.append('sizes', JSON.stringify(sizes));
    }
  
    // Log the formDataToSend
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {
      const url = formType === 'product'
        ? `${process.env.REACT_APP_PORT}/api/product/products` 
        : `${process.env.REACT_APP_PORT}/api/users/signUP`;
      const response = await axios.post(url, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log("Saved Data: ", response.data);
      setFormData({});
      setFile("");
      setSizes([]);
    } catch (error) {
      console.error("Error saving data: ", error.response ? error.response.data : error.message);
    }
  };
  
  const availableSizes = ["S", "M", "L", "XL"].filter(
    (size) => !sizes.find((s) => s.name === size)
  );

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <Container>
          <Row className="row-title">
            <Col>
              <h1>{title}</h1>
            </Col>
          </Row>
          <Row className="content-container">
            <Col>
              <div className="img-container">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt=""
                  className="img-fluid"
                />
              </div>
            </Col>
            <Col lg={12}>
              <Row>
                <form className="user-form" onSubmit={handleSubmit}>
                  <Col lg={6}>
                    <div className="mb-3">
                      <div>
                        Image: 
                        <DriveFolderUploadOutlinedIcon
                          className="icon"
                          onClick={() => fileInputRef.current.click()}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                      />
                    </div>
                  </Col>
                  {inputs.map((input) => (
                    <Col lg={6} key={input.id}>
                      <div className="mb-3">
                        <label>{input.label}</label>
                        <input
                          type={input.type}
                          placeholder={input.placeholder}
                          name={input.label.replace(/ /g, "").toLowerCase()}
                          value={formData[input.label.replace(/ /g, "").toLowerCase()] || ''}
                          onChange={handleInputChange}
                          size="50"
                        />
                      </div>
                    </Col>
                  ))}
                  {formType === 'product' && (
                    <>
                      <Col lg={12}>
                        <div className="btn-size">
                          <button
                            type="button"
                            className="btnAddSize"
                            onClick={() => setShowSizeDropdown(true)}
                          >
                            Add Size
                          </button>
                        </div>
                      </Col>
                      {showSizeDropdown && (
                        <Col lg={12} className="drop-size">
                          <div>
                            <select
                              name="name"
                              value={sizeInput.name}
                              onChange={handleSizeChange}
                              className="input-size"
                            >
                              <option value="">Select Size</option>
                              {availableSizes.map((size) => (
                                <option key={size} value={size}>
                                  {size}
                                </option>
                              ))}
                            </select>
                          </div>
                        </Col>
                      )}
                      {showQuantityInput && (
                        <Col lg={12} className="drop-quantity">
                          <div className="quantity_input">
                            <input
                              type="number"
                              name="quantity"
                              placeholder="Quantity"
                              value={sizeInput.quantity}
                              onChange={handleSizeChange}
                              className="form-quantity"
                            />
                          </div>
                          <Col lg={12}>
                            <div className="btn-quantity">
                              <button type="button" onClick={addSize} className="btnAddQuantity">
                                Add Quantity
                              </button>
                            </div>
                          </Col>
                        </Col>
                      )}
                      <Col lg={12} className="sizeQuantity">
                        <ul className="size-ul">
                          {sizes.map((size, index) => (
                            <li key={index} className="size-li">
                              {size.name} - {size.quantity}
                              <button onClick={() => removeSize(index)} className="remove-size-btn">
                                X
                              </button>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </>
                  )}
                  <div className="col-12">
                    <button className="btn-send" type="submit">Send</button>
                  </div>
                </form>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default New;
