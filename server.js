const app = require("./backend/app");

const port = 3000; // Changez 3001 à un autre numéro de port disponible
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
