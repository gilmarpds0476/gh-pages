let produtos = [];
let carrinho = [];

function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

function cadastroProduto() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const price = document.getElementById('productPrice').value;
    const image = document.getElementById('productImage').files[0];

    const reader = new FileReader();
    reader.onloadend = function() {
        produtos.push({
            id,
            name,
            description,
            price,
            image: reader.result
        });

        if (confirm('Produto cadastrado! Deseja cadastrar outro produto?')) {
            document.getElementById('cadastroForm').reset();
        } else {
            showSection('menu');
        }
    };
    reader.readAsDataURL(image);
}

function atualizarPreco() {
    const id = document.getElementById('updateId').value;
    const newPrice = document.getElementById('updatePrice').value;

    const produto = produtos.find(prod => prod.id === id);
    if (produto) {
        produto.price = newPrice;
        alert('Preço atualizado com sucesso!');
        document.getElementById('atualizacaoForm').reset();
        showSection('menu');
    } else {
        alert('Produto não encontrado!');
    }
}

function mostrarProdutos() {
    const produtosDiv = document.getElementById('produtos');
    produtosDiv.innerHTML = '';
    produtos.forEach(prod => {
        const produtoDiv = document.createElement('div');
        produtoDiv.className = 'produto';
        produtoDiv.innerHTML = `
            <img src="${prod.image}" alt="${prod.name}">
            <h3>${prod.name}</h3>
            <p>${prod.description}</p>
            <p>R$ ${prod.price}</p>
            <button onclick="adicionarAoCarrinho('${prod.id}')">Adicionar ao Carrinho</button>
        `;
        produtosDiv.appendChild(produtoDiv);
    });
}

function adicionarAoCarrinho(id) {
    const produto = produtos.find(prod => prod.id === id);
    if (produto) {
        carrinho.push(produto);
        alert('Produto adicionado ao carrinho!');
    }
}

function fecharPedido() {
    let textoPedido = 'Pedido:\n';
    let total = 0;

    carrinho.forEach(prod => {
        textoPedido += `${prod.name} - R$ ${prod.price}\n`;
        total += parseFloat(prod.price);
    });

    textoPedido += `\nTotal: R$ ${total.toFixed(2)}`;
    alert(textoPedido);
}

function continuarComprando() {
    mostrarProdutos();
    showSection('pedido');
}

// Mostrar produtos ao iniciar
mostrarProdutos();