//API Used: http://newsdata.io other alternatives newscatcherapi.com, gnews.io
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
// "in" stands for India
const country = "ca,ng,us";
const options = [
  "top",
  "business",
  "entertainment",
  "health",
  "politics",
  "science",
  "sports",
  "technology",
];

//100 requests per day
let requestURL;

//Create cards from data
const generateUI = (results) => {
  for (let item of results) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
    <img src="${item.image_url || "./pexels-photo.jpeg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
      ${item.description || item.content || ""}
      </div>
      <a href="${item.link}" target="_blank" class="view-button">Read More</a>
    </div>`;
    container.appendChild(card);
  }
};

//News API Call
const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.results);
};

//Category Selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsdata.io/api/1/news?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

//Options Buttons
const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "top" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&category=business`;
  init();
};
