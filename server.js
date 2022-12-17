// ################################################################################
//  REST API based on sample dataset (sample_restaurants) from mongoDB Atlas    ###
//  CRUD Operations
//  URL: https://restaurant-api-qezq.onrender.com/
// ################################################################################

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const RestaurantDB = require("./modules/restaurantDB.js");
dotenv.config();
const HTTP_PORT = process.env.PORT || 8080;
let MONGO_URL = process.env.MONGO_URL;
const db = new RestaurantDB();
const app = express();

app.use(cors());
app.use(express.json());

// default route
app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

// POST: /api/restaurants
app.post("/api/restaurants", (req, res) => {
  db.addNewRestaurant(req.body)
    .then((newResObj) => res.status(201).json(newResObj))
    .catch(() => res.status(400).json({ error: "Object Creation Failed" }));
});

// GET: /api/restaurants
// EG : url/api/restaurants?page=1&perPage=10&borough=Queens
app.get("/api/restaurants", (req, res) => {
  console.log(req.query.page, req.query.perPage, req.query.borough);
  if (!req.query.page || !req.query.perPage) {
    res.status(400).json({ error: "Parameters MISSING" });
  } else {
    if (
      !isNaN(parseInt(req.query.page)) &&
      !isNaN(parseInt(req.query.perPage)) &&
      isNaN(parseInt(req.query.borough))
    ) {
      db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
        .then((resObjs) => res.status(200).json(resObjs))
        .catch((err) => res.status(500).json(err));
    } else {
      res.status(400).json({ error: "Parameters type INVALID" });
    }
  }
});

// GET: /api/restaurants/:id
// EG : url/api/restaurants/5eb3d668b31de5d588f4292f
app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((resObj) => {
      if (resObj) {
        res.status(200).json(resObj);
      } else {
        res.status(404).json({ error: "Object not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// PUT: /api/restaurants/:id
app.put("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((resObj) => {
      if (resObj) {
        db.updateRestaurantById(req.body, req.params.id)
          .then(() =>
            res
              .status(201)
              .json(`restaurantId: ${req.params.id} successfully updated`)
          )
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(404).json({ error: "Object not found" });
      }
    })
    .catch((err) => res.status(500).json(err));
});

// DELETE: /api/restaurants/:id
app.delete("/api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((result) => {
      if (result.deletedCount > 0) {
        res
          .status(200)
          .json(`restaurantId: ${req.params.id} successfully deleted`);
      } else {
        res
          .status(404)
          .json({ error: `restaurantId: ${req.params.id} doesn't exists` });
      }
    })
    .catch((err) => res.status(500).json(err));
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

db.initialize(MONGO_URL)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
