const app = require("./app");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
