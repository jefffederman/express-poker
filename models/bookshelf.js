var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'jefffederman',
    password: '',
    database: 'express_poker'
  }
});

module.exports = require('bookshelf')(knex);