# Projeto Physical Store - Backend em TypeScript

## Descrição do Projeto
O **Physical Store** é uma API desenvolvida em TypeScript que permite localizar lojas físicas com base em um CEP informado pelo usuário. Utilizando a API do ViaCEP para consulta de endereços e a API do OpenStreetMap (Nominatim) para geolocalização, a aplicação retorna as lojas mais próximas dentro de um raio de 100 km.

## Tecnologias Utilizadas
* **TypeScript** - Melhor tipagem e segurança no código.
* **Express** - Framework para criação de rotas e controle HTTP.
* **MongoDB Atlas** - Banco de dados online, garantindo escalabilidade e disponibilidade.
* **Winston** - Sistema de logging para monitoramento de eventos e erros.
* **Morgan** - Middleware para registro de requisições HTTP.
* **ViaCEP API** - Para busca de endereços a partir de CEPs.
* **OpenStreetMap (Nominatim)** - Para converter endereços em coordenadas geográficas.

## Funcionalidades
* Localização de lojas próximas a partir de um CEP.
* Cálculo de distância entre o CEP informado e as lojas cadastradas.
* Registro de logs detalhados em formato JSON com Winston.
* API segura e organizada, seguindo boas práticas de desenvolvimento.

## Rotas da API
* `POST /stores` - Criar uma nova loja.
* `GET /stores` - Listar todas as lojas cadastradas.
* `DELETE /stores` - Remover todas as lojas.
* `DELETE /stores/:nome_da_loja` - Remover uma loja pelo nome.
* `PUT /stores/:nome_da_loja` - Atualizar informações de uma loja.
* `GET /lojas/:cep` - Buscar lojas próximas a um CEP informado.

## Segurança
As credenciais sensíveis do projeto, como a conexão com o banco de dados, são armazenadas em variáveis de ambiente utilizando `dotenv`, garantindo segurança contra vazamentos de informações sensíveis.

## Estrutura do Projeto
A organização do projeto segue o padrão MVC, separando responsabilidades para melhor manutenção do código:
* **Controllers** - Responsáveis pelas regras de negócio e manipulação das requisições.
  * `store.controller.ts` - Gerencia operações CRUD das lojas.
  * `get.controller.ts` - Exclusivo para buscas de lojas.
  * `cep.controller.ts` - Manipula a lógica de geolocalização baseada em CEP.
* **Services** - Cuidam da interação com APIs externas.
  * `ViaCEP Service` - Realiza buscas de endereços.
  * `LocationService` - Converte CEPs em coordenadas geográficas.
* **Middlewares**
  * `Winston` e `Morgan` - Gerenciam logs de eventos e requisições HTTP.

## Link da ADR
Para detalhes sobre as decisões arquiteturais do projeto, consulte o documento: [ADR - Physical Store](https://docs.google.com/document/d/1alMUdbnWIC-r42RfkNCgFs51rrWxkqEQZJxjRq1s3MQ/edit?usp=sharing)

---
Este projeto foi desenvolvido seguindo boas práticas de desenvolvimento, garantindo um código organizado, modular e escalável.

