const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
  GET http://localhost:3333/events
  Monitora eventos em tempo real
*/
app.get('/events', function(req, res) {
  console.log(`Cliente conectado`);
  fs.readFile(`${__dirname}/webhook.html`, 'utf8', function (err, content) {
    if (err) {
      res.statusCode(500);
    } else {
      // renderiza conteúdo HTML
      res.end(content);
    }
  });
});

/*
  POST http://localhost:3333/webhook
  Webhook para receber eventos
*/
app.post('/webhook', (req, res) => {
  // Evento está no body do request
  const event = req.body;
  console.log('Recebeu evento', event);
  io.emit(`teravoz-event`, require('util').inspect(event));
  res.json({ status: 'ok' });
});

http.listen(3333, function(){
  console.log('Escutando na porta *:3333');
});
