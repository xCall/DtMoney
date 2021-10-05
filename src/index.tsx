import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

import {createServer, Model} from 'miragejs';

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [{
        id: 1,
        title: 'Freelance de website',
        type: 'deposit',
        category: 'dev',
        amount: 4000,
        createdAt: new Date("2021-08-31 17:00:00")
      }, {
        id: 2,
        title: 'Alugel',
        type: 'withdraw',
        category: 'casa',
        amount: 1200,
        createdAt: new Date("2021-08-31 12:00:00")
      }]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    });

    this.post('/transaction', (schema, request) =>{
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

