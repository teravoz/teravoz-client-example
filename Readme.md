# Teravoz API Client example

Exemplo de **client** da API Teravoz em **Node.js**.

Recebe os eventos na rota `/webhook`, e exibe os mesmos em realtime na rota `/events`.

Caso o evento recebido seja um `call.recording-available`, efetua o download da gravação em uma pasta local chamada `./recordings`. Para que o download funcione, é necessário configurar a variável `TERAVOZ_CREDENTIALS` com as suas credenciais dentro do arquivo `webhook.js`.

## Requisitos

Necessário Node.js 4 ou superior.

## Instalação

Clone este repositório:
```
git clone https://github.com/teravoz/teravoz-client-example.git
cd teravoz-client-example/
```

Instale as dependências:

```
npm install
```

Execute o client:
```
node webhook.js
```

## Uso

Acesse a URL `http://localhost:3333/events`

Faça um POST na URL `http://localhost:3333/webhook` com cUrl:

```
curl -X POST -H 'Content-type: application/json' -d '{ "type": "call.new" }' http://localhost:3333/webhook
```
