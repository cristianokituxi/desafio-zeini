## Sistema de Gerenciamento de consultas medicas🏎️
começando com o primeiro módulo que inclui autenticação de usuários e um CRUD para gerenciar entidades como Usuários e medicos. O backend utiliza uma arquitetura baseada em microsserviços, com um API Gateway, um serviço de autenticação (AuthService), e um serviço CRUD.

## 🛠️ Tecnologias Utilizadas
Node.js: Plataforma JavaScript para desenvolvimento de aplicações.  
Express.js: Framework para criação de APIs RESTful.  
MongoDB: Banco de dados NoSQL.  
Mongoose: ODM (Object Data Modeling) para MongoDB.  
Axios: Cliente HTTP para comunicação entre serviços.  
Bcrypt.js: Biblioteca para hash de senhas.  
Cors: Middleware para habilitar o compartilhamento de recursos entre origens   diferentes.  
Dotenv: Gerenciamento de variáveis de ambiente.  
Docker/Docker Compose: Containerização e orquestração dos serviços.



**Abaixo a estrutura  de diretório do projeto.**
```
backend/  
│   │
│   ├── api/(API Gateway)
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controller/
│   │   │   ├── middlewares/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── app.ts
│   │   │   └── server.ts
│   │   ├──.env
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── authservice/ (Autenticação)
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
|   |   |   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── server.ts
│   │   │   
│   │   ├── .env
|   |   ├── Dockerfile.env
│   │   └── package.json
│   ├── crudservice/ (Gestão de entidades)
│   ├── authservice/ (Autenticação)
│   │   ├── src/
│   │   │   ├── config/
│   │   │   ├── controllers/
│   │   │   ├── middlewares/
|   |   |   ├── models/
│   │   │   ├── routes/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── server.ts
│   │   │   
│   │   ├── .env
|   |   ├── Dockerfile.env
│   |   └── package.json
└── .env
└── .gitgnore
└── docker-compose
└── README.md
```

## 🚀 Como Configurar e Iniciar o Projeto
**1. Clonar o Repositório**
``git clone https://github.com/cristianokituxi/desafio-zeini.git``  
 
   2. cd back-end  

2. dentro da pasta back-end e supondo que já tenha instalado o doker execute o seguinte comando para subir os serviços:
 ``docker-compose up --build``

Att: deixei um banco de dados mongo configurado para testes. mas caso prefifar é só alterar o uri para o banco mongo de sua escolha 

## Funcionalidades Implementadas
**3.1: Autenticação (AuthService)** 
Login: Geração de tokens JWT.  
Validação de Tokens: Verificação de autenticidade dos tokens JWT.

**3.2: CRUD de Entidades (CrudService)**   
Usuários: Operações de criação, leitura, atualização e exclusão.


**3.3: API Gateway**  
Roteamento centralizado para os serviços.
Autorização e autenticação com middleware.
