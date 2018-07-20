const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist','index.html'));
});

app.post('/soldai', (req, res) => {
  const baseURL = `http://beta.soldai.com/bill-cipher/askquestion?question=${req.body.question}&session_id=1&key=c47045dc5c74ebbbb095db858e23db3288f72ecc&log=1`;
  axios.get(baseURL)
    .then(response => {
      res.send(response.data);
      console.log(response.data);
    })
    .catch(err => {
      console.log(err)
    });
});

app.post('/pokeapi', (req, res) => {
  const baseURL = `https://pokeapi.co/api/v2/pokemon/${req.body.pokemon}`;
  let intent = req.body.intent;
s
  axios.get(baseURL)
    .then(response => {
      switch(intent) {
        case 'habilidades':
          let abilities = response.data.abilities;
          abilities = abilities.map(ability => {
            return ability.ability.name
          })
          res.send(`Sus habilidades son ${abilities.join()}`)
        break;

        case 'estadisticas':
          let stats = response.data.stats
          stats = stats.map(stat => {
            return stat.stat.name + '-' + stat.base_stat;
          })
          res.send(`Sus estadísticas son ${stats.join()}`);
        break;

        case 'movimientos':
          let moves = response.data.moves;
          moves = moves.map(move => {
            return move.move.name;
          });
          res.send(`Sus movimientos son ${moves.join()}`);
        break;

        case 'peso':
          res.send(`Su peso es ${response.data.weight}`);
        break;

        case 'altura':
          res.send(`Su altura es ${response.data.height}`);
        break;

        case 'tipos':
          let types = response.data.types;
          types = types.map(type => {
            return type.type.name;
          });
          res.send(`Es de tipo ${types.join()}`);
        break;
      }
    })
    .catch(err => {
      console.log(err)
    })
})

app.listen(PORT, () => {
  console.log('Server al 100');
})
