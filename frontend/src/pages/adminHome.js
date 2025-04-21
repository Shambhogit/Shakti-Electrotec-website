import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", description: "", images: [] });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [editId, setEditId] = useState(null);
  const [activeTab, setActiveTab] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 10;

  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchProducts();
    getSubmission();
  }, []);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetching products failed:", err);
    }
    setIsFetching(false);
  };


  const getSubmission = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/submissions');
      // console.log(res);
      setSubmissions(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const selectedFiles = Array.from(files);
      setFormData({ ...formData, images: selectedFiles });

      const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(previewUrls);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    formData.images.forEach((img) => data.append("images", img));

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post("http://localhost:5000/api/products", data);
      }
      setFormData({ name: "", price: "", description: "", images: [] });
      setImagePreviews([]);
      setActiveTab("show");
      fetchProducts();
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      images: [],
    });
    setImagePreviews(product.links);
    setEditId(product._id);
    setActiveTab("add");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "add" ? "active" : ""}`}
          onClick={() => setActiveTab("add")}
        >
          Add Product
        </button>
        <button
          className={`tab-button ${activeTab === "show" ? "active" : ""}`}
          onClick={() => setActiveTab("show")}
        >
          Show Products
        </button>

        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          Show Reviews
        </button>

        <button
          className={`tab-button ${activeTab === "logout" ? "active" : ""}`}
          onClick={() => {
            localStorage.removeItem('loggedIn');
            window.location.href = '/';
          }}
        >
          Logout
        </button>
      </div>

      {activeTab === "add" && (
        <form onSubmit={handleSubmit} className="admin-form" encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="form-input"
            rows={4}
          />
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="form-input"
          />

          {imagePreviews.length > 0 && (
            <div className="product-image-gallery">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt="preview" className="product-image" />
              ))}
            </div>
          )}

          <button type="submit" className="form-button" disabled={isLoading}>
            {isLoading ? "Uploading..." : editId ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      {activeTab === "show" && (
        <>
          {isFetching ? (
            <p className="loading-message">Loading products...</p>
          ) : (
            <>
              <div className="product-grid">
                {currentProducts.map((product) => (
                  <div key={product._id} className="product-card">
                    <div className="product-image-gallery">
                      {product.links.map((src, index) => (
                        <img key={index} src={src} alt={product.name} className="product-image" />
                      ))}
                    </div>
                    <h2 className="product-name">{product.name}</h2>
                    <p>{product.description}</p>
                    <div className="product-actions">
                      <button
                        onClick={() => handleEdit(product)}
                        className="action-button edit-button"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="action-button delete-button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <ReactPaginate
                previousLabel={"← Prev"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                previousClassName={"pagination-button"}
                nextClassName={"pagination-button"}
                pageClassName={"pagination-button"}
                breakClassName={"pagination-button"}
                disabledClassName={"disabled"}
                forcePage={currentPage}
              />
            </>
          )}
        </>
      )}

      {activeTab === "reviews" && (


        <>
          <style>{`
  * {
    box-sizing: border-box;
  }

  html, body {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #f4f6f9;
  }

  table {
    display: grid;
    border-collapse: collapse;
    min-width: 100%;
    margin: 30px auto;
    grid-template-columns: 
      minmax(80px, 0.6fr)
      minmax(150px, 1.4fr)
      minmax(200px, 1.6fr)
      minmax(150px, 1.4fr)
      minmax(300px, 2fr);
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  thead, tbody, tr {
    display: contents;
  }

  th, td {
    padding: 16px 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: background-color 0.3s ease;
  }

  th {
    position: sticky;
    top: 0;
    background: #4b6cb7;
    text-align: left;
    font-weight: 500;
    font-size: 1.05rem;
    color: white;
    z-index: 1;
  }

  td {
    color: #555;
    font-size: 0.95rem;
  }

  tr:hover td {
    background-color: #eef1fd;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  tr:nth-child(even) td {
    background: #f9f9fc;
  }
`}</style>

          <table>
            <thead>
              <tr>
                <th>Sr.No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{sub.name}</td>
                  <td>{sub.email}</td>
                  <td>{sub.phone}</td>
                  <td>{sub.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
