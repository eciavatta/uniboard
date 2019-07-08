const mongoose = require('mongoose');
import {name} from '../../package.json';

let connectionString;

if (typeof process.env.MONGODB_URI !== 'undefined') {
  connectionString = process.env.MONGODB_URI
} else {
  const host = typeof process.env.MONGODB_HOST !== 'undefined' ? process.env.MONGODB_HOST : 'localhost';
  const port = typeof process.env.MONGODB_PORT !== 'undefined' ? process.env.MONGODB_PORT : 27017;
  const database = typeof process.env.MONGODB_DATABASE !== 'undefined' ? process.env.MONGODB_DATABASE : name;
  const username = typeof process.env.MONGODB_USERNAME !== 'undefined' ? process.env.MONGODB_USERNAME : null;
  const password = typeof process.env.MONGODB_PASSWORD !== 'undefined' ? process.env.MONGODB_PASSWORD : null;

  if (username) {
    connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}`
  } else {
    connectionString = `mongodb://${host}:${port}/${database}`
  }
}

mongoose.connect(connectionString, {useNewUrlParser: true}).then(
  () => {
    console.info('Successfully connected to mongodb')
  },
  err => {
    console.warn(`Can't connect to mongodb using "${connectionString}"`);
    console.error(err);
    process.exit(-1);
  }
);

export default mongoose.connection
