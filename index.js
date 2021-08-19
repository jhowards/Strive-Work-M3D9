window.onload = async () => {
  const results = await grabAPI();
  console.log(results);
  generateCards(results);
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

const generateCards = (results) => {
  const grabCards = document.getElementById("cardList");
  grabCards.innerHTML = results
    .map(function (results) {
      return `

            <div class="col mb-4">
            <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4 d-flex">
              <img src="${results.imageUrl}" class="card-img-top mx-auto" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${results.brand}</h5>
            <b class="card-text">
            £${results.price}
            </b>
            <p class="card-text">
            ${results.description}
            </p>
            <p class="card-text">
              <small class="text-muted">${results.userId}</small>
            </p>
          </div>
            </div>
          </div>
        </div>
        </div>
        `;
    })
    .join("");
};
