## Sistema de Gerenciamento para Autódromo 🏎️
Este é o frontend do Sistema de Gerenciamento Para Autódromo, desenvolvido com React e configurado com Vite para desempenho otimizado. O sistema é desenvolvido em TypeScript e utiliza bibliotecas modernas para gerenciamento de estado, estilização e integração com APIs. Este módulo inicial inclui autenticação, e CRUD de entidades como Usuários e Karts.

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
backend/  
│   
├── frontend/
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
├── .env                
└── vite.config.ts       
└── .env
└── .gitgnore
└── README.md
```

## 🚀 Como Configurar e Iniciar o Projeto
**1. Clonar o Repositório**
``git clone https://gitlab.com/desafios5844245/aeroscan/front-end.git``  
 
   2. cd modulo-gestor  

2. dentro da pasta back-end e supondo que já tenha instalado todos os pré requisitos execute o seguinte comando para subir os serviços:
 ``npm install ou yarn`` em seguida execute ``yarn run dev``

## Funcionalidades Implementadas
**Autenticação**
Login e registro
Persistência de sessão.

**CRUD**
Gerenciamento de Usuários e Karts.
Interface amigável utilizando MUI DataGrid.
