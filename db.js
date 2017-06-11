var mongojs = require('mongojs');

var databaseUrl = 'mongodb://localhost:27017/iqmed';
var collections = ['users', 'data'];

var connect = mongojs(databaseUrl, collections);

module.exports = {
    connect: connect
};