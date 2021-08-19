window.onload = async () => {};

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
    name: "t",
    brand: productName,
  };

  addToAPI(product);

  console.log(product);

  let type = "alert-warning";
  showAlert("Object Added!", type);
};

clearProducts = () => {
  let type = "alert-danger";
  showAlert("All products cleared!", type);
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
