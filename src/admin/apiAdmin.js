export let createCategory = async (userId, token, category) => {
  const response = await fetch(
    `http://localhost:8888/api/createCategory/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }
  );

  const data = await response.json();
  return data;
};

export const createBranch = async (userId, token, branch) => {
  const response = await fetch(
    `http://localhost:8888/api/createBranch/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(branch),
    }
  );

  const data = await response.json();
  return data;
};

export const createProduct = async (userId, token, product) => {
  const response = await fetch(
    `http://localhost:8888/api/createProduct/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    }
  );
  let data = await response.json();
  return data;
};

export let getCategories = async () => {
  const response = await fetch(`http://localhost:8888/api/categories`, {
    method: "GET",
  });
  let data = await response.json();
  return data;
};

export const getCategory = async (categoryId) => {
  const response = await fetch(
    `http://localhost:8888/api/adminCategory/${categoryId}`,
    {
      method: "GET",
    }
  );
  let data = await response.json();
  return data;
};

export const getBranch = async (branchId) => {
  const response = await fetch(
    `http://localhost:8888/api/adminBranch/${branchId}`,
    {
      method: "GET",
    }
  );
  let data = await response.json();
  return data;
};

export const updateCategory = async (categoryId, userId, token, category) => {
  const response = await fetch(
    `http://localhost:8888/api/updateCategory/${categoryId}/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    }
  );
  let data = await response.json();
  return data;
};

export const updateBranch = async (branchId, userId, token, branch) => {
  const response = await fetch(
    `http://localhost:8888/api/updateBranch/${branchId}/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(branch),
    }
  );
  let data = await response.json();
  return data;
};

export const getBranches = async () => {
  const response = await fetch(`http://localhost:8888/api/branches`, {
    method: "GET",
  });
  let data = await response.json();
  return data;
};

export const listOrders = async (userId, token) => {
  const response = await fetch(
    `http://localhost:8888/api/order/list/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let data = await response.json();
  return data;
};

export const getStatusValues = async (userId, token) => {
  const response = await fetch(
    `http://localhost:8888/api/order/status-values/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let data = await response.json();
  return data;
};

export const updateOrderStatus = async (userId, token, orderId, status) => {
  const response = await fetch(
    `http://localhost:8888/api/order/${orderId}/status/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, orderId }),
    }
  );
  let data = await response.json();
  return data;
};

export const getProducts = async () => {
  const response = await fetch(
    `http://localhost:8888/api/products?limit=undefined`,
    {
      method: "GET",
    }
  );
  let data = await response.json();
  return data;
};

export const deleteProduct = async (productId, userId, token) => {
  const response = await fetch(
    `http://localhost:8888/api/deleteProduct/${productId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let data = await response.json();
  return data;
};

export const deleteCategory = async (categoryId, userId, token) => {
  const response = await fetch(
    `http://localhost:8888/api/deleteCategory/${categoryId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let data = await response.json();
  return data;
};

export const deleteBranch = async (branchId, userId, token) => {
  const response = await fetch(
    `http://localhost:8888/api/deleteBranch/${branchId}/${userId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  let data = await response.json();
  return data;
};

export const getProduct = async (productId) => {
  const response = await fetch(
    `http://localhost:8888/api/adminProduct/${productId}`,
    {
      method: "GET",
    }
  );
  let data = await response.json();
  return data;
};

export const updateProduct = async (productId, userId, token, product) => {
  const response = await fetch(
    `http://localhost:8888/api/updateProduct/${productId}/${userId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    }
  );
  let data = await response.json();
  return data;
};
