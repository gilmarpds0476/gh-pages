script.js
// script.js
let produtos = [];

document.getElementById('cadastroForm').addEventListener('submit', function (event) {
    event.preventDefault();
    cadastrarProduto();
});

document.getElementById('atualizacaoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    atualizarPreco();
});

function cadastrarProduto() {
    let id = document.getElementById('id').value;
    let nome = document.getElementById('nome').value;
    let descricao = document.getElementById('descricao').value;
    let preco = parseFloat(document.getElementById('preco').value).toFixed(2);
    let categoria = document.getElementById('categoria').value;
    let imagem = document.getElementById('imagem').files[0];

    if (produtos.some(produto => produto.id === id)) {
        alert('O produto já está cadastrado!');
        return;
    }

    let leitor = new FileReader();
    leitor.onload = function (e) {
        produtos.push({
            id,
            nome,
            descricao,
            preco: `R$ ${preco}`,
            categoria,
            imagem: e.target.result
        });
        alert('Produto cadastrado com sucesso!');
        if (confirm('Deseja cadastrar outro produto?')) {
            document.getElementById('cadastroForm').reset();
        } else {
            document.getElementById('cadastroForm').reset();
        }
    };
    leitor.readAsDataURL(imagem);
}

function atualizarPreco() {
    let id = document.getElementById('idAtualizacao').value;
    let novoPreco = parseFloat(document.getElementById('precoAtualizacao').value).toFixed(2);

    let produto = produtos.find(produto => produto.id === id);
    if (produto) {
        produto.preco = `R$ ${novoPreco}`;
        alert('Preço atualizado com sucesso!');
    } else {
        alert('Produto não encontrado!');
    }
}

function mostrarProdutos(categoria) {
    let listaProdutos = produtos.filter(produto => produto.categoria === categoria);
    let produtosDiv = document.getElementById('produtos');
    produtosDiv.innerHTML = '';
    listaProdutos.forEach(produto => {
        let produtoDiv = document.createElement('div');
        produtoDiv.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" style="width:100px;height:100px;">
            <h3>${produto.nome}</h3>
            <p>${produto.descricao}</p>
            <p>${produto.preco}</p>
            <label for="quantidade-${produto.id}">Quantidade:</label>
            <input type="number" id="quantidade-${produto.id}" name="quantidade-${produto.id}" min="1" value="1">
            <button onclick="adicionarAoCarrinho('${produto.id}')">Adicionar ao Carrinho</button>
        `;
        produtosDiv.appendChild(produtoDiv);
    });
}

let carrinho = [];

function adicionarAoCarrinho(id) {
    let produto = produtos.find(produto => produto.id === id);
    let quantidade = parseInt(document.getElementById(`quantidade-${id}`).value);

    carrinho.push({
        ...produto,
        quantidade,
        precoTotal: `R$ ${(quantidade * parseFloat(produto.preco.replace('R$ ', ''))).toFixed(2)}`
    });

    atualizarCarrinho();
}

function atualizarCarrinho() {
    let listaCarrinho = document.getElementById('listaCarrinho');
    listaCarrinho.innerHTML = '';
    carrinho.forEach(item => {
        let itemLi = document.createElement('li');
        itemLi.innerHTML = `
            ${item.nome} - ${item.descricao} - ${item.quantidade} x ${item.preco} = ${item.precoTotal}
        `;
        listaCarrinho.appendChild(itemLi);
    });
}

function fecharPedido() {
    let textoPedido = 'Pedido:\n';
    let precoTotal = 0;

    carrinho.forEach(item => {
        textoPedido += `
            ${item.nome} - ${item.descricao} - ${item.quantidade} x ${item.preco} = ${item.precoTotal}\n
        `;
        precoTotal += parseFloat(item.precoTotal.replace('R$ ', ''));
    });

    textoPedido += `\nPreço Total: R$ ${precoTotal.toFixed(2)}`;

    alert(textoPedido);

    // Aqui você pode implementar a lógica para imprimir o pedido, se necessário.
}
