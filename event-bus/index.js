const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5005;

app.use(express.json());

app.post("/events", async (req, res) => {
  const event = req.body;
  console.log("Received event:", event.type);

  axios.post("http://localhost:5000/events", event).catch((err) => {
    console.error("Error forwarding event to Posts Service:", err);
  });
  
  axios.post("http://localhost:5001/events", event).catch((err) => {
    console.error("Error forwarding event to Comments Service:", err);
  });

  res.json({ status: "OK" });
});

  

app.listen(PORT, () => {
  console.log(`Event Bus is running on http://localhost:${PORT}`);
});