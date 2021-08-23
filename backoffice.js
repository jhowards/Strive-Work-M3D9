window.onload = async () => {
  let urlID = new URLSearchParams(window.location.search)
    .toString()
    .slice(0, -1);

  if (urlID) {
    let heading = document.getElementById("editHeading");
    heading.innerText = "Edit Movies:";

    let deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.onclick = function () {
      deleteProduct(urlID);
    };
    deleteBtn.innerHTML = `<span class="iconify" data-icon="bi:trash-fill"></span>
    Delete product`;

    let createBtn = document.getElementById("createBtn");
    createBtn.onclick = function () {
      editProduct(urlID);
    };
    createBtn.innerHTML = "Edit Product";

    const productDetails = await grabProductDetails(urlID);
    document.getElementById("productNameForm").value = productDetails.name;
    document.getElementById("productImageForm").value = productDetails.imageUrl;
    document.getElementById("productDescriptionForm").value =
      productDetails.description;
    document.getElementById("productPriceForm").value = productDetails.price;
  } else {
    let deleteBtn = document.getElementById("deleteBtn");
    deleteBtn.onclick = function () {
      clearProducts();
    };

    let createBtn = document.getElementById("createBtn");
    createBtn.onclick = function () {
      createProduct();
    };
  }
};

createProduct = () => {
  let productName = document.getElementById("productNameForm").value;
  let productImage = document.getElementById("productImageForm").value;
  let productDescription = document.getElementById(
    "productDescriptionForm"
  ).value;
  let productPrice = document.getElementById("productPriceForm").value;

  let product = {
    price: productPrice,
    imageUrl: productImage,
    description: productDescription,
    name: productName,
    brand: " ",
  };

  addToAPI(product);

  console.log(product);

  let type = "alert-success";
  showAlert("Product Added!", type);
};

clearProducts = async () => {
  if (confirm("Are you sure you want to clear all products?")) {
    const allProducts = await grabAPI();
    allProducts.forEach(function (product) {
      deleteAllProducts(product._id);
    });
    alert("All products deleted succesfully!");
    window.location.replace("/index.html");
  } else {
  }
};

addToAPI = (product) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MjkzMDE4NzcsImV4cCI6MTYzMDUxMTQ3N30.LDpPQMQ1_KOfDhoiXOfIubADMG3ltSz-jnVSwZloBLY"
  );
  myHeaders.append("Content-Type", "application/json");

  var data = JSON.stringify(product);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  fetch("https://striveschool-api.herokuapp.com/api/product", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

showAlert = (alert, type) => {
  // Display alert
  let addAlert = document.getElementById("showalert");
  addAlert.classList.add(type);
  addAlert.style.display = "block";
  addAlert.innerText = alert;

  // Hide alert after 3 seconds
  setTimeout(function () {
    addAlert.classList.remove(type);
    addAlert.style.display = "none";
    addAlert.innerText = "";
  }, 3000);
};

const grabProductDetails = async (id) => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MjkzMDE4NzcsImV4cCI6MTYzMDUxMTQ3N30.LDpPQMQ1_KOfDhoiXOfIubADMG3ltSz-jnVSwZloBLY"
  );

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    requestOptions
  );

  results = await response.json();
  return results;
};

const deleteProduct = async (id) => {
  console.log("yregdfg" + id);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MjkzMDE4NzcsImV4cCI6MTYzMDUxMTQ3N30.LDpPQMQ1_KOfDhoiXOfIubADMG3ltSz-jnVSwZloBLY"
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));

  // showAlert("Product deleted succesfully!", "bg-success");
  alert("Product deleted succesfully!");
  window.location.replace("/index.html");
};

const deleteAllProducts = async (id) => {
  console.log("yregdfg" + id);
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MjkzMDE4NzcsImV4cCI6MTYzMDUxMTQ3N30.LDpPQMQ1_KOfDhoiXOfIubADMG3ltSz-jnVSwZloBLY"
  );

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const editProduct = (id) => {
  let productName = document.getElementById("productNameForm").value;
  let productImage = document.getElementById("productImageForm").value;
  let productDescription = document.getElementById(
    "productDescriptionForm"
  ).value;
  let productPrice = document.getElementById("productPriceForm").value;

  let product = {
    price: productPrice,
    imageUrl: productImage,
    description: productDescription,
    name: productName,
    brand: " ",
  };

  editAPI(product, id);
};

const editAPI = async (product, id) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MjkzMDE4NzcsImV4cCI6MTYzMDUxMTQ3N30.LDpPQMQ1_KOfDhoiXOfIubADMG3ltSz-jnVSwZloBLY"
  );
  myHeaders.append("Content-Type", "application/json");

  var data = JSON.stringify(product);

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: data,
    redirect: "follow",
  };

  fetch(
    "https://striveschool-api.herokuapp.com/api/product/" + id,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      let type = "alert-success";
      showAlert("Product edited succesfully!", type);
      console.log(result);
    })
    .catch((error) => console.log("error", error));
};

const grabAPI = async () => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDgxN2M1ZWU3ODE4NzAwMTVjMjY3YTgiLCJpYXQiOjE2MjkzMDE4NzcsImV4cCI6MTYzMDUxMTQ3N30.LDpPQMQ1_KOfDhoiXOfIubADMG3ltSz-jnVSwZloBLY"
  );

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const response = await fetch(
    "https://striveschool-api.herokuapp.com/api/product/",
    requestOptions
  );

  results = await response.json();
  return results;
};
