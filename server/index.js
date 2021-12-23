const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

require("./routes/todo.routes")(app);

app.listen(3000, () => console.log(`Server running on PORT 3000`));
