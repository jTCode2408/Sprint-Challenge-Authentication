const db = require('../database/dbConfig');

module.exports = {
    find, 
    findBy,
    findById,
    add
}

function find() {
    return db('users').select('id', 'username', 'password')
}

function findBy(user) {
    return db('users').where(user);
  }
  
  function findById(id) {
    return db('users').select('id', 'username')
        .where({ id })
        .first();
}

function add(user) {
    return db('users').insert(user, 'id')
        .then(userIDs => {
            const [id] = userIDs
            return findById(id)
        })
}