const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const info = await connection('info').select('*');
  
    return response.json(info);
  },

  async create(request, response) {
    const { sender, departments, receivement, value, debit, credit, referring, observation, numeration, } = request.body;

    // const id = crypto.randomBytes(4).toString('HEX');
    
    await connection('info').insert({
      sender,
      departments,
      receivement,
      value,
      debit,
      credit,
      referring,
      observation,
      numeration,
    })

    return response.json({ numeration });
  }
};