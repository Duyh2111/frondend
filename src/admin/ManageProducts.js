import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout className="container-fluid">
      <h2 className="text-center">Total {products.length} products</h2>
      <Table   hover size="sm" className="text-xs-center text-lg-center">
        <thead>
          <tr>
            <th className="text-left">Product name</th>
            <th className="text-left">Product price</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td className="text-left">{p.name}</td>              
              <td className="text-left">${p.price}</td>
              <td>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill">Update</span>
                </Link>
              </td>
              <td>
                <button
                  onClick={() => destroy(p._id)}
                  className="badge badge-danger badge-pill"
                  style={{ border: "none" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default ManageProducts;


