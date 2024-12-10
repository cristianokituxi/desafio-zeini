## Sistema de Gerenciamento de consultas medicas 🏎️
Este é o frontend do Sistema de Gerenciamento de consultas medicas, desenvolvido com React e configurado com Vite para desempenho otimizado. O sistema é desenvolvido em TypeScript e utiliza bibliotecas modernas para gerenciamento de estado, estilização e integração com APIs. Este módulo inicial inclui autenticação, e CRUD de entidades como Usuários e Karts.

## 🛠️ Tecnologias Utilizadas
Vite (Build Tool)  
React (Framework de UI)  
TypeScript (Superset do JavaScript)  
MUI (Material-UI) (Biblioteca de componentes)  
@mui/material, @mui/icons-material, @mui/x-data-grid, @mui/x-date-pickers  
Gerenciamento de Estado: Recoil  
Validação de Formulários: React Hook Form + Yup  
Estilização: Sass, Emotion  
Gráficos: React Google Charts, MUI Charts  
Geração de PDFs: PdfMake  
Autenticação: Firebase  
Notificações: React Toastify  
Manipulação de Dados: Axios, Date-fns  
Outros: React Router, React Input Mask, dotenv  

**Abaixo a estrutura  de diretório do projeto.**
```
Front-end/  
│   
├──  Modulo-gestor/
│   ├── public/               
│   ├── src/
│   │   ├── assets/          
│   │   ├── components/      
│   │   ├── context/           
│   │   ├── fonts/            
│   │   ├── pages/           
│   │   ├── routes/           
│   │   ├── services/           
│   │   ├── url/     
|   |   ├── utils/           
│   │   |      
│   ├── App.tsx           
│   ├── main.tsx          
│   ├── .env                
│   └── vite.config.ts       
│   └── .env
|   └── .gitgnore
|   └── README.md
|
├──  Modulo-gestor/
│   ├── public/               
│   ├── src/
│   │   ├── assets/          
│   │   ├── components/      
│   │   ├── context/                      
│   │   ├── pages/           
│   │   ├── routes/               
│   │   ├── url/             
│   │   |      
│   ├── App.tsx           
│   ├── main.tsx          
│   ├── .env                
│   └── vite.config.ts       
│   └── .env
|   └── .gitgnore
|   └── README.md
|
└── .gitgnore
└── README.md
```

## 🚀 Como Configurar e Iniciar o Projeto
**1. Clonar o Repositório**
``git clone https://gitlab.com/desafios5844245/aeroscan/front-end.git``  
 
   2. cd modulo-gestor  

2. dentro da pasta Modulo-Gestor e supondo que já tenha instalado todos os pré requisitos execute o seguinte comando para subir os serviços:
 ``npm install ou yarn`` em seguida execute ``yarn run dev``

## Funcionalidades Implementadas
**Autenticação**
Login e registro
Persistência de sessão.

**CRUD**
Gerenciamento de Usuários
Interface amigável utilizando MUI DataGrid.

**3. start do modulo paciente**
 2. cd modulo-paciente 

 2. dentro da pasta Modulo-paciente e supondo que já tenha instalado todos os pré requisitos execute o seguinte comando para subir os serviços:
 ``npm install ou yarn`` em seguida execute ``yarn run dev``

## Funcionalidades Implementadas
Autenticação de Usuário: Verifica credenciais e exibe mensagens de erro em caso de falha.  
Cadastro de Usuários: Campos obrigatórios para nome, sobrenome, e-mail, senha.  
Recuperação de Credenciais: Campo para inserir e-mail e enviar solicitação de redefinição de senha.  
Validação de Campos: Confirmação de preenchimento do e-mail.  
Feedback Visual: Mensagem informando envio de e-mail ou erro, caso o e-mail não seja  
Persistência de sessão e redirecionamento pós-login.  
listagem completa de médicos  
Filtro por Especialidade: Permite buscar médicos por sua área de atuação, como "Cardiologista" ou "Pediatra".  
Filtro por Hospital: Lista apenas médicos vinculados a um hospital específico.  

obs:lembrando que ambos projetos são independentes então um não precisa estar startado para que o outro funcione!!



