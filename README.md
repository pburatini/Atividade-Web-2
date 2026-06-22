# Atividade Web 2 - Loja "Poções e Soluções"

Web Service que permite a vendedora cadastrar, listar e remover poções, as quais possuem os campos nome, descrição, imagem e preço.
Possui uma página de administração que permita realizar essas três ações.

## O que foi utilizado no projeto:

- Node.js + Express
- Sequelize ORM com SQLite em memória
- HTML, CSS e JS puro
- AJAX via Fetch API

## Pré-requisitos:

- Node.js

## Instalação:

```bash
npm install
```

## Como abrir o projeto via localhost:

**Modo desenvolvimento** (reinicia automaticamente ao salvar):
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor será iniciado em **http://localhost:3000**.

## Páginas:

| Página | URL |
|---|---|
| Loja | http://localhost:3000/index.html |
| Administração | http://localhost:3000/admin.html |

### Login para a Área do Admin

| Campo | Valor |
|---|---|
| Usuário | `admin` |
| Senha | `admin123` |

A sessão é mantida enquanto a aba do navegador estiver aberta. O botão **Sair** no header encerra a sessão.

## Funcionalidades:

### Loja (`index.html`):
- Seção com uma breve descrição da loja
- Seção mostrando a história da loja
- Seção da loja em si --> frade de poções carregada dinamicamente via AJAX, em que cada card exibe o nome, a imagem, uma descrição, o preço e um botão de **Comprar** (OBS: não foi implementada a funcionalidade de compra)
- Footer contato e horário de funcionamento

### Administração (`admin.html`):
- Login com usuário e senha --> acesso restrito
- Forms. para cadastrar novas poções (nome, descrição, URL da imagem, preço)
- Tabela com todas as poções já cadastradas
- Botão para remover as poções da "aba de poções cadastradas"

## Poções pré-cadastradas:

| Nome | Preço |
|---|---|
| Blue Sky | 300 moedas |
| Perfume Misterioso | 200 moedas |
| Pinus | 3000 moedas |
| Beleza Eterna | 100 moedas |
| Arco Íro | 120 moedas |
| Caldeirão das Verdades Secretas | 150 moedas |

## Rotas da API:

| Método | Rota | Descrição |
|---|---|---|
| GET | /api/pocoes | Lista todas as poções |
| POST | /api/pocoes | Cadastra uma nova poção |
| DELETE | /api/pocoes/:id | Remove uma poção pelo ID |

### Exemplo de corpo para POST:

```json
{
  "nome": "Poção da Sorte",
  "descricao": "Traz fortuna a quem a bebe.",
  "imagem": "https://exemplo.com/imagem.jpg",
  "preco": 250
}
```

## Estrutura do projeto (DOM):

```
Atividade-Web-2/
├── src/
│   └── server.js   # Express + Sequelize + rotas da API
├── public/
│   ├── index.html  # Loja
│   ├── admin.html  # Administração (necessita informar usuário e senha)
│   ├── style.css
│   ├── main.js     # AJAX da loja (carrega e exibe as poções)
│   └── admin.js    # AJAX do admin (login, CRUD)
├── package.json
└── README.md
```
