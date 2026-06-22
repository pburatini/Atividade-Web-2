const USUARIO_ADMIN = 'admin';
const SENHA_ADMIN = 'admin123';

function verificarLogin() {
  if (sessionStorage.getItem('admin-logado') === 'sim') {
    mostrarAdmin();
  } else {
    mostrarTelaLogin();
  }
}

function mostrarTelaLogin() {
  document.getElementById('tela-login').style.display = 'flex';
  document.getElementById('conteudo-admin').style.display = 'none';
  document.getElementById('btn-logout').style.display = 'none';
}

function mostrarAdmin() {
  document.getElementById('tela-login').style.display = 'none';
  document.getElementById('conteudo-admin').style.display = 'block';
  document.getElementById('btn-logout').style.display = 'inline-block';
  carregarPocoes();
}

function fazerLogout() {
  sessionStorage.removeItem('admin-logado');
  mostrarTelaLogin();
}

document.getElementById('form-login').addEventListener('submit', function (evento) {
  evento.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const erro = document.getElementById('erro-login');

  if (usuario === USUARIO_ADMIN && senha === SENHA_ADMIN) {
    sessionStorage.setItem('admin-logado', 'sim');
    mostrarAdmin();
  } else {
    erro.textContent = 'Usuário ou senha incorretos.';
  }
});

async function carregarPocoes() {
  try {
    const resposta = await fetch('/api/pocoes');
    const pocoes = await resposta.json();
    exibirPocoes(pocoes);
  } catch (error) {
    console.error('Erro ao carregar poções:', error);
  }
}

function exibirPocoes(pocoes) {
  const tbody = document.getElementById('corpo-tabela');
  tbody.innerHTML = '';

  for (const pocao of pocoes) {
    tbody.appendChild(criarLinha(pocao));
  }
}

function criarLinha(pocao) {
  const tr = document.createElement('tr');

  const tdImg = document.createElement('td');
  const img = document.createElement('img');
  img.src = pocao.imagem;
  img.alt = pocao.nome;
  tdImg.appendChild(img);

  const tdNome = document.createElement('td');
  tdNome.textContent = pocao.nome;

  const tdDesc = document.createElement('td');
  tdDesc.textContent = pocao.descricao;

  const tdPreco = document.createElement('td');
  tdPreco.textContent = Number(pocao.preco) + ' moedas';

  const tdAcao = document.createElement('td');
  const botao = document.createElement('button');
  botao.textContent = 'Remover';
  botao.classList.add('botao-perigo');
  botao.addEventListener('click', () => removerPocao(pocao.id));
  tdAcao.appendChild(botao);

  tr.appendChild(tdImg);
  tr.appendChild(tdNome);
  tr.appendChild(tdDesc);
  tr.appendChild(tdPreco);
  tr.appendChild(tdAcao);

  return tr;
}

async function removerPocao(id) {
  try {
    const resposta = await fetch('/api/pocoes/' + id, { method: 'DELETE' });

    if (resposta.status === 200) {
      carregarPocoes();
    }
  } catch (error) {
    console.error('Erro ao remover poção:', error);
  }
}

document.getElementById('form-pocao').addEventListener('submit', async function (evento) {
  evento.preventDefault();

  const mensagem = document.getElementById('mensagem');

  const dados = {
    nome:      document.getElementById('nome').value,
    descricao: document.getElementById('descricao').value,
    imagem:    document.getElementById('imagem').value,
    preco:     parseFloat(document.getElementById('preco').value),
  };

  try {
    const resposta = await fetch('/api/pocoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (resposta.status === 201) {
      mensagem.textContent = 'Poção cadastrada com sucesso!';
      mensagem.className = 'mensagem-feedback sucesso';
      document.getElementById('form-pocao').reset();
      carregarPocoes();
    } else {
      const corpo = await resposta.json();
      mensagem.textContent = corpo.erro || 'Erro ao cadastrar poção.';
      mensagem.className = 'mensagem-feedback erro';
    }
  } catch (error) {
    mensagem.textContent = 'Erro de conexão com o servidor.';
    mensagem.className = 'mensagem-feedback erro';
  }
});

verificarLogin();
