const express = require("express");
const axios = require("axios");
const redis = require("redis");

let redisClient;

const redisTry = async () => {
  redisClient = redis.createClient(6379);
  redisClient.on("error", (error) => {
    console.log(error);
  });
  await redisClient.connect();
};

const PORT = 8080;

const app = express();

app.get("/dogs/:breed", async (req, res) => {
  try {
    const { breed } = req.params;

    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images`
    );

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

app.get("/dogs-redis/:breed", async (req, res) => {
  try {
    const { breed } = req.params;

    await redisTry();

    const cached = await redisClient.get(breed);
    if (cached) {
      return res.status(200).send(JSON.parse(cached));
    }

    const { data } = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images`
    );

    redisClient.setEx(breed, 100, JSON.stringify(data));

    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
