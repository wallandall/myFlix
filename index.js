const dotenv = require('dotenv');

require('./models/db');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
