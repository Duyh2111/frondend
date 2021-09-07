import queryString from "query-string";

export const getProducts = sortBy => {
    return fetch(`http://localhost:8888/api/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const getCategories = () => {
    return fetch(`http://localhost:8888/api/categories`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`http://localhost:8888/api/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            return res.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const list = params => {
    const query = queryString.stringify(params);
    console.log("query", query);
    return fetch(`http://localhost:8888/api/products/search?${query}`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const read = productId => {
    return fetch(`http://localhost:8888/api/product/${productId}`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = productId => {
    return fetch(`http://localhost:8888/api/products/related/${productId}`, {
        method: "GET"
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`http://localhost:8888/api/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const processPayment = (userId, token, payment) => {
    return fetch(`http://localhost:8888/api/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payment)
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const createOrder = (userId, token, createOrder) => {
    return fetch(`http://localhost:8888/api/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrder})
    })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};
