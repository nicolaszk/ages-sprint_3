# Projeto de API de Filmes

## Descrição
Este projeto consiste em uma API para gerenciar filmes e reviews, com um frontend simples em HTML, CSS e JavaScript para testar e visualizar os dados. A API foi construída utilizando Node.js com Express, SQLite como banco de dados e Prisma como ORM.

## 🚀 Tecnologias Utilizadas

•⁠  ⁠*Node.js*
•⁠  ⁠*Express.js*
•⁠  ⁠*Prisma ORM*
•⁠  ⁠*SQLite*

## 📌 Funcionalidades

•⁠  ⁠📽️ Criar um novo filme
•⁠  ⁠🎞️ Listar todos os filmes
•⁠  ⁠✏️ Editar um filme
•⁠  ⁠❌ Deletar um filme
•⁠  ⁠⭐ Adicionar reviews a um filme
•⁠  ⁠📊 Obter detalhes de um filme específico
## Como Rodar o Projeto

### Pré-requisitos
- Node.js e npm instalados.
- Banco de dados SQLite configurado.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/seuprojeto.git
   cd seuprojeto
   ```
2. Instale as dependências:
  ```bash
   npm install
   ```
3. Inicialize o banco de dados:
   ```bash
    npx prisma migrate dev
    ```  
4. Inicie o servidor:
```bash
    node run src/app.js
  ```
O servidor estará aberto na porta 3000

5. Acesse o frontend
    - Abra a url http://localhost:3000/filme no navegador.



### 📫 Rotas da API (Testáveis via Postman)

| Método | Rota                   | Descrição                               | Body (JSON) Exemplo                          |
|--------|------------------------|-----------------------------------------|---------------------------------------------|
| GET    | `/filmes`             | Lista todos os filmes                   | —                                           |
| GET    | `/filme/:slug`        | Retorna detalhes de um filme por slug   | —                                           |
| POST   | `/filme`              | Cria um novo filme                      | `{ "title": "Kill Bill", "director": "Tarantino", "year": 2003, "slug": "kill-bill" }` |
| PUT    | `/filme/:slug`        | Atualiza os dados de um filme           | `{ "title": "Novo Título", "director": "Novo Diretor", "year": 2024 }` |
| DELETE | `/filme/:slug`        | Remove um filme                         | —                                           |
| POST   | `/filme/:slug/review` | Adiciona uma review a um filme          | `{ "rating": 5, "comment": "Excelente filme!" , "user" : Vicente}` |
| GET    | `/filme/:slug/reviews`| Lista as reviews de um filme específico | —                                           |
 

