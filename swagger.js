import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Reading API",
    desccription: "CSE341 Project 2 - API to track books that readers have read",
  },
  host: "https://cse341-week3-4-3ob0.onrender.com/",
  schemes: ["https"],
};

const ouput = "./swagger-out.json";
const routes = ["./routes/index.js"];

swaggerAutogen()(ouput, routes, doc);
