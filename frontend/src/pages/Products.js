import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import ProductCard from "../components/ProductCard";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
    setIsFetching(false);
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <div className="product-list-container pd">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <h1>All Products</h1>

      {isFetching ? (
        <p className="loading-message">Loading products...</p>
      ) : (
        <>
          <div className="product-grid">
            {currentProducts.map((product) => (
              <ProductCard product={product}></ProductCard>
            ))}
          </div>

          <ReactPaginate
            previousLabel={"← Prev"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={pageCount}
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
    </div>
  );
}
