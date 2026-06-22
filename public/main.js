async function carregarPocoes() {
  const grid = document.getElementById('grid-pocoes');

  try {
    const resposta = await fetch('/api/pocoes');

    if (resposta.status !== 200) {
      grid.innerHTML = '<p class="carregando">Não foi possível carregar as poções.</p>';
      return;
    }

    const pocoes = await resposta.json();

    grid.innerHTML = '';

    if (pocoes.length === 0) {
      grid.innerHTML = '<p class="carregando">Nenhuma poção disponível no momento.</p>';
      return;
    }

    for (const pocao of pocoes) {
      grid.appendChild(criarCard(pocao));
    }

  } catch (error) {
    grid.innerHTML = '<p class="carregando">Erro de conexão com o servidor.</p>';
  }
}

function criarCard(pocao) {
  const card = document.createElement('div');
  card.classList.add('card-pocao');

  const img = document.createElement('img');
  img.src = pocao.imagem;
  img.alt = pocao.nome;

  const info = document.createElement('div');
  info.classList.add('card-pocao-info');

  const nome = document.createElement('h3');
  nome.textContent = pocao.nome;

  const descricao = document.createElement('p');
  descricao.textContent = pocao.descricao;

  const preco = document.createElement('span');
  preco.classList.add('card-pocao-preco');
  preco.textContent = Number(pocao.preco) + ' moedas';

  const botaoComprar = document.createElement('button');
  botaoComprar.classList.add('botao-comprar');
  botaoComprar.textContent = 'Comprar';

  info.appendChild(nome);
  info.appendChild(descricao);
  info.appendChild(preco);
  info.appendChild(botaoComprar);

  card.appendChild(img);
  card.appendChild(info);

  return card;
}

carregarPocoes();
