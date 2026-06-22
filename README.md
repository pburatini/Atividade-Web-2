# Atividade Web 2 - Loja "Poções e Soluções"

Web Service que permite a vendedora cadastrar, listar e remover poções, as quais possuem os campos nome, descrição, imagem e preço.
Possui uma página de administração que permita realizar essas três ações.

## Tecnologias utilizadas

- Node.js + Express
- Sequelize ORM com SQLite em memória
- HTML, CSS e JS puro
- AJAX via Fetch API

## Pré-requisitos

- Node.js instalado (v18 ou superior)

## Instalação

```bash
npm install
```

## Como executar

**Modo desenvolvimento** (reinicia automaticamente ao salvar):
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor será iniciado em **http://localhost:3000**.

> O banco de dados é criado em memória automaticamente ao iniciar o servidor, já populado com 6 poções. Como é in-memory, os dados são redefinidos toda vez que o servidor reinicia.

## Páginas

| Página | URL |
|---|---|
| Loja (público) | http://localhost:3000/index.html |
| Administração | http://localhost:3000/admin.html |

### Acesso à área de administração

A página de administração exige login. Use as credenciais abaixo:

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `admin123` |

A sessão é mantida enquanto a aba do navegador estiver aberta. O botão **Sair** no cabeçalho encerra a sessão. O botão **Cancelar** na tela de login retorna à loja sem efetuar login.

## Funcionalidades

### Loja (`index.html`)
- Descrição da loja
- Seção "Nossa História" com texto e fotos da loja em 1867 e nos dias atuais
- Grade de poções carregada dinamicamente via AJAX — cada card exibe nome, imagem, descrição, preço e botão **Comprar** (funcionalidade de compra não implementada)
- Rodapé com endereço, telefone e horário de funcionamento

### Administração (`admin.html`)
- Login com usuário e senha para acesso restrito
- Formulário para cadastrar novas poções (nome, descrição, URL da imagem, preço)
- Tabela com todas as poções cadastradas
- Botão para remover cada poção

## Poções pré-cadastradas

| Nome | Preço |
|---|---|
| Blue Sky | 300 moedas |
| Perfume Misterioso | 200 moedas |
| Pinus | 3000 moedas |
| Beleza Eterna | 100 moedas |
| Arco Íro | 120 moedas |
| Caldeirão das Verdades Secretas | 150 moedas |

## Rotas da API

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/pocoes | Lista todas as poções |
| POST | /api/pocoes | Cadastra uma nova poção |
| DELETE | /api/pocoes/:id | Remove uma poção pelo ID |

### Exemplo de corpo para POST

```json
{
  "nome": "Poção da Sorte",
  "descricao": "Traz fortuna a quem a bebe.",
  "imagem": "https://exemplo.com/imagem.jpg",
  "preco": 250
}
```

## Estrutura do projeto

```
Atividade-Web-2/
├── src/
│   └── server.js       # Servidor Express + Sequelize + rotas da API
├── public/
│   ├── index.html      # Página da loja
│   ├── admin.html      # Painel de administração (acesso restrito)
│   ├── style.css       # Estilos — tema escuro, fonte Gill Sans
│   ├── main.js         # AJAX da loja (carrega e exibe as poções)
│   └── admin.js        # AJAX do admin (login, CRUD)
├── package.json
└── README.md
```
