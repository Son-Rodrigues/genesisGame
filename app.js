let order = []; // ordem das cores
let clickedOrder = []; // ordem dos clicks
let score = 0; // pontos


// cada cor tera um numero diferente (0 - verde, 1 - vermelho, 2 - amarelo, 3 - azul);

const main = document.querySelector('.main-game');
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
let btn = document.querySelector('.btn');
let over = document.querySelector('.gameOver');


btn.innerText += 'Play Game!';

// função que arredonda número sorteado e cria ordem aleatória das cores

let mixOrder = () => {
	let colorOrder = Math.floor(Math.random() * 4); // atribui a ordem ao próximo número da ordem que vai vir
	order[order.length] = colorOrder; // atribui o indice do array com a cor que sair na função de sorteio
	clickedOrder = [];

	// acende a cor que corresponde ao número sorteado percorrendo o array
	for (let i in order) {
		let elementColor = createColorElement(order[i]);

		lightColor(elementColor, Number(i) + 1); // pega um número + 1 para que ele possa existir na nossa lista de cores
	}
}

let lightColor = (element, number) => {
	number = number * 500;
	setTimeout(() => { // executa a função no tempo estipulado
		element.classList.add('selected'); // adiciona uma classe para que seja adicionada a cor
	}, number - 250);
	setTimeout(() => { // remove a class adicionada
		element.classList.remove('selected');
	}, number - 50);
}

let checkOrder = () => { // compara se a ordem clicada é a correda
	for (let i in clickedOrder) {
		if (clickedOrder[i] != order[i]) { // quando a ordem for diferente
			gameOver();
			break;
		}
	}

	if (clickedOrder.length == order.length) { // quando a ordem estiver certa
		//alert(`Pontuação ${score}\n Você acertou! Inicindo próximo nível!`);
		nextLevel();
	}
}


// função click do jogador

let click = (color) => { // verifica se o a cor clicada é a mesma atribuida
	clickedOrder[clickedOrder.length] = color;
	createColorElement(color).classList.add('selected'); // acende a cor quando for clicada

	setTimeout(() => {
		createColorElement(color).classList.remove('selected'); // tira a classe colocada quando a cr foi clicada
		checkOrder(); // quando terminar de selecionar as cores será chamada a função para checar a ordem
	}, 250);
}


// função para retornar a cor

let createColorElement = (color) => {
	if (color == 0) {
		return green;
	} else if (color == 1) {
		return red;
	} else if (color == 2) {
		return yellow;
	} else if (color == 3) {
		return blue;
	}
}


// função para o próximo nível do jogo

let nextLevel = () => {
	score++; // adiciona os pontos
	mixOrder(); // e inicia nova ordem
	btn.innerText = `🎮 Nível ${score} 🎮`;
}


// função game over

let gameOver = () => {
	alert(`Nível ${score}\nGAME OVER!!!\nQuer jogar novamente?`);
	order = [];
	clickedOrder = [];

	playGame();
}

// função play game

let playGame = () => {
	//alert(`🎮 Welcome to the game! 🎮`);
	score = 0;
	document.querySelector('.btn').disabled = true;
	blue.style.borderBottomRightRadius = '20%';
	yellow.style.borderTopRightRadius = '20%';
	red.style.borderBottomLeftRadius = '20%';
	green.style.borderTopLeftRadius = '20%';
	order = [];
	clickedOrder = [];

	nextLevel();
}

// evento de clique das cores

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);