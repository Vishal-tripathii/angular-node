import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors({
  credentials: true,
  origin: ["http://localhost:4200"]

}));

app.get('/api/foods', (req, resp) => {
  resp.send("Hi there")
});


app.listen(5000, () => {
  console.log("Server is running on port: ", port)
})
