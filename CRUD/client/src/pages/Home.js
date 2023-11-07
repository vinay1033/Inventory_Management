import React, { useState, useEffect } from "react";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  productName: "",
  Seller: "",
  Price: "",
};

const Home = () => {
  const [state, setState] = useState(initialState);

  const { productName, Seller, Price } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !Seller || !Price) {
      toast.error("Please provide value to each input field");
    } else {
      axios
        .post("http://localhost:3001/api/post", {
          productName,
          Seller,
          Price,
        })
        .then(() => {
          setState({ productName: "", Seller: "", Price: "" });
        })
        .catch((err) => toast.error(err.response.data));
      setTimeout(() => loadData(), 100);
      toast.success("Added Sucessfully");
    }
  };

  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, {});

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      axios.delete(`http://localhost:3001/api/remove/${id}`);
      toast.success("Deleted Sucessfully");
      setTimeout(() => loadData(), 100);
    }
  };

  const [product, setProduct] = useState([]);

  const [newproductName, setnewproductName] = useState("");
  const [newseller, setnewseller] = useState("");
  const [newprice, setnewprice] = useState("");

  const [pr_id, setPrId] = useState();
  const updateProduct = (pr_id) => {
    axios
      .put("http://localhost:3001/update", {
        id: pr_id,
        productName: newproductName,
        Seller: newseller,
        Price: newprice,
      })
      .then((response) => {
        setProduct(
          product.map((val) => {
            return val.pr_id === pr_id ? { id: product.id } : val;
          })
        );
      });
    toast.success("Updated Record Sucessfully");
    setTimeout(() => loadData(), 100);
  };

  const deleteAllProduct = () => {
    axios.delete("http://localhost:3001/deleteAll").then((response) => {
      setProduct(response.data);
    });
    toast.success("Deleted All Records Sucessfully");
    setTimeout(() => loadData(), 100);
  };

  return (
    <>
      <div className="container text-center my-3">
        <h1 className=" py-4 text-info">
          <strong>INVENTORY MANAGEMENT</strong>
        </h1>
      </div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            className="w-200 m-2 p-2"
            id="productName"
            name="productName"
            placeholder="Product Name.."
            value={productName}
            onChange={handleInputChange}
          />
          <br></br>

          <label htmlFor="Seller">Product Seller:</label>
          <input
            type="text"
            className="w-200 m-2 p-2"
            id="Seller"
            name="Seller"
            placeholder="Product Seller.."
            value={Seller}
            onChange={handleInputChange}
          />
          <br></br>

          <label htmlFor="Price">Product Price:</label>
          <input
            type="text"
            className="w-200 m-2 p-2"
            id="Price"
            name="Price"
            placeholder="Product Price.."
            value={Price}
            onChange={handleInputChange}
          />
          <br></br>
          <button className="btn btn-success" id="btn-add px-5 mx-0">
            Add Product
          </button>
        </form>
      </div>

      <div className="my-2 flex">
        <button
          className="btn btn-danger"
          id="btn-delete"
          onClick={deleteAllProduct}
        >
          Delete All
        </button>
        &ensp;&ensp;
        <button
          className="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          id="btn-update"
        >
          Update
        </button>
      </div>

      <div style={{ marginTop: "40px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Product Name</th>
              <th style={{ textAlign: "center" }}>Seller</th>
              <th style={{ textAlign: "center" }}>Price</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product, index) => {
              return (
                <tr key={product.id} className="mx-auto my-3">
                  <th scope="row">{index + 1}</th>
                  <td>{product.productName}</td>
                  <td>{product.Seller}</td>
                  <td>{product.Price}</td>
                  <td>
                    <i
                      className="fa-solid fa-pencil"
                      style={{ color: "gold" }}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    ></i>
                    &ensp;&ensp;
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ color: "red" }}
                      onClick={() => {
                        deleteProduct(product.id);
                      }}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update {product.productName}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                id="userid"
                className="form-control my-2 "
                autoComplete="off"
                placeholder="ID"
                onChange={(event) => {
                  setPrId(event.target.value);
                }}
                value={pr_id}
              />
              <input
                type="text"
                id="proname"
                className="form-control my-2 "
                autoComplete="off"
                placeholder="Product Name"
                onChange={(event) => {
                  setnewproductName(event.target.value);
                }}
              />
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    id="seller"
                    className="form-control my-2 "
                    autoComplete="off"
                    placeholder="Seller"
                    onChange={(event) => {
                      setnewseller(event.target.value);
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    id="price"
                    className="form-control my-2 "
                    autoComplete="off"
                    placeholder="Price"
                    onChange={(event) => {
                      setnewprice(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary w-75 mx-auto my-3"
              id="btn-update"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                updateProduct(pr_id);
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
