# Teravoz API Client example

Exemplo de **client** da API Teravoz em **Node.js**.

Recebe os eventos na rota `/webhook`, e exibe os mesmos em realtime na rota `/events`.

## Requisitos

Necessário Node.js 4 ou superior.

## Instalação

git clone 
node webhook.js

## Uso

Acesse a URL `http://localhost:3333/events`

Faça um POST na URL `http://localhost:3333/webhook` com cUrl:

```
curl -X POST -H 'Content-type: application/json' -d '{ "type": "call.new" }' http://localhost:3333/webhook
```
