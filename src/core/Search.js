import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import CardProduct from "./Card";
import { Row, Container, Col } from "react-bootstrap";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = async () => {
    const categories = await getCategories();
    if (categories.error) return console.log("categories.error");
    setData({ ...categories, categories: categories });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = async () => {
    if (search) {
      const results = await list({
        search: search || undefined,
        category: category,
      });
      if (results.error) return console.log(results.error);
      setData({ ...data, results: results, searched: true });
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <Row>
          {results.map((product, i) => (
            <Col className="col-4 mb-3">
              <CardProduct key={i} product={product} />
            </Col>
          ))}
        </Row>
      </>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <Row>
      <Container>{searchForm()}</Container>
      <Container>{searchedProducts(results)}</Container>
    </Row>
  );
};

export default Search;
