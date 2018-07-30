const mongoose = require('mongoose');

import Settings from 'core/Settings';

const host = Settings.get('app.database.host');
const port = Settings.get('app.database.port');
const database = Settings.get('app.database.name');

mongoose.connect(`mongodb://${host}:${port}/${database}`, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('Mongoose Connected'));
mongoose.connection.on('error', (error) => console.error('Mongoose Error', error));
mongoose.connection.on('disconnected', () => console.log('Mongoose Disconnected'));

export default mongoose;
