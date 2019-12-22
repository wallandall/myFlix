const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

require('./models/db');
const app = require('./app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
