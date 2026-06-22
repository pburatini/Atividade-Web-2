import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// BD

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false,
});

const Pocao = sequelize.define('Pocao', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// API routes

app.get('/api/pocoes', async (req, res) => {
  try {
    const pocoes = await Pocao.findAll();
    res.status(200).json(pocoes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar poções.' });
  }
});

app.post('/api/pocoes', async (req, res) => {
  const { nome, descricao, imagem, preco } = req.body;

  if (!nome || !descricao || !imagem || !preco) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
  }

  try {
    const novaPocao = await Pocao.create({ nome, descricao, imagem, preco });
    res.status(201).json(novaPocao);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao cadastrar poção.' });
  }
});

app.delete('/api/pocoes/:id', async (req, res) => {
  try {
    const pocao = await Pocao.findByPk(req.params.id);

    if (!pocao) {
      return res.status(404).json({ erro: 'Poção não encontrada.' });
    }

    await pocao.destroy();
    res.status(200).json({ mensagem: 'Poção removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao remover poção.' });
  }
});

// dados iniciais

const pocoesSeed = [
  {
    nome: 'Blue Sky',
    descricao: 'Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.',
    imagem: 'https://i.ibb.co/ZzS7xb2/rsz-sky.png',
    preco: 300,
  },
  {
    nome: 'Perfume Misterioso',
    descricao: 'Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.',
    imagem: 'https://i.ibb.co/pyhZJXf/rsz-lilas.png',
    preco: 200,
  },
  {
    nome: 'Pinus',
    descricao: 'Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.',
    imagem: 'https://i.ibb.co/DkzdL1q/rsz-pinus.png',
    preco: 3000,
  },
  {
    nome: 'Beleza Eterna',
    descricao: 'Veneno que mata rápido.',
    imagem: 'https://i.ibb.co/9p872NK/rsz-1beleza.png',
    preco: 100,
  },
  {
    nome: 'Arco Íro',
    descricao: 'Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias.',
    imagem: 'https://i.ibb.co/PrC09MP/rsz-2unicornio.png',
    preco: 120,
  },
  {
    nome: 'Caldeirão das Verdades Secretas',
    descricao: 'As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.',
    imagem: 'https://i.ibb.co/s9Lyvj8/rsz-verdades.png',
    preco: 150,
  },
];

// inicializa o banco e o servidor

sequelize.sync({ force: true }).then(async () => {
  await Pocao.bulkCreate(pocoesSeed);
  console.log('Banco criado e populado com as 6 poções iniciais.');

  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
});
