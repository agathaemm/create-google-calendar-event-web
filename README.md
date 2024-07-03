# Create Google Calendar Event (web version)

Este projeto é uma poc com o objetivo de criar eventos na agenda do google com a implementação apenas na versão web

## Tecnologias utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/pt)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/guide/) 

## Instalando o projeto

1. Garanta que o NodeJS está instalado e configurado na sua máquina. A versão sugerida para o projeto atualmente é `v18`. Caso você precise utilizar outras verões do NodeJS em diferentes projetos você pode utilizar o [NVM](https://github.com/nvm-sh/nvm), para gerenciar versões diferentes.
2. Instale as dependencias do projeto com o comando `yarn install` ou `yarn`.
3. Copie o arquivo .env.example, cole na raiz do projeto, renomeie para .env e adicione as chaves de comunicação com a api do google que podem ser geradas seguindo o [Tutorial](https://developers.google.com/calendar/api/quickstart/js?hl=pt-br)

## Rodando a aplicação

1. Após a instalação das dependencias rode o projeto com o comando `yarn dev`
2. Abra o endereço [http://localhost:5173](http://localhost:5173) para navegar na aplicação.