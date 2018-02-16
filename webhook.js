const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const fs = require('fs');
const download = require('./download');

/**
  Credenciais de acesso à API da Teravoz, no formato USUÁRIO:SENHA.
  Altere para as suas próprias credenciais.
*/
const TERAVOZ_CREDENTIALS = 'USER:PASSWD';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
  GET http://localhost:3333/events
  Monitora eventos em tempo real
*/
app.get('/events', function(req, res) {
  console.info(`Cliente conectado`);
  fs.readFile(`${__dirname}/webhook.html`, 'utf8', function (err, content) {
    if (err) {
      res.statusCode(500);
    } else {
      // renderiza conteúdo HTML
      res.end(content);
    }
  });
});

/**
  POST http://localhost:3333/webhook
  Webhook para receber eventos.
  Caso o evento recebido seja `call.recording-available`, realiza o download
  da gravação na pasta `./recordings`.
*/
app.post('/webhook', (req, res) => {
  // Evento está no body do request
  const event = req.body;
  console.info('Recebeu o evento', event);
  io.emit(`teravoz-event`, require('util').inspect(event));
  // Response sempre é { status: ok }
  res.json({ status: 'ok' });

  // Verifica se o evento é do tipo `call.recording-available`
  if (event.type === 'call.recording-available') {
    download(TERAVOZ_CREDENTIALS, event.url, (err, fileName) => {
      if (err) {
        console.error('Não foi possível efetuar o download.', err);
      } else {
        console.info('Download da gravação efetuado com sucesso. Arquivo:', fileName);
      }
    });
  }
});

http.listen(3333, function(){
  console.info('Escutando na porta *:3333');
});
