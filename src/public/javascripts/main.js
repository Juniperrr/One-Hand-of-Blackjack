// Referred to 
// 'https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript'
// in order to learn how to implement BlackJack game.
// Code may resemble some parts of the learning material.

const suits = ["S", "D", "C", "H"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = new Array();
const players = new Array();
// let currentPlayer = 0;

// Generate a deck of 52 unshuffled cards and assigning points.
function generateDeck(callback) {
    deck = new Array();
    for(let i = 0; i < suits.length; i++) { // 4
		for(let x = 0; x < values.length; x++) { // 13
            let pnt;
            if (values[i] === "A") {
                pnt = 11; // or 1.
            }
            else if (values[i] === "J" || values[i] === "Q" || values[i] === "K") {
                pnt = 10;
            }
            else {
                pnt = parseInt(values[i]);
            }
            const card = { suit: suits[i], value: values[x], point: pnt };
            deck.push(card);
		}
    }
    callback(); // shuffle.
}

// Shuffling the deck.
function shuffle() {
	// for 200 turns, and switch the values of two random cards
	for (let i = 0; i < 200; i++) {
		const card1 = Math.floor((Math.random() * deck.length));
		const card2 = Math.floor((Math.random() * deck.length));
		const tmp = deck[card1];
		deck[card1] = deck[card2];
		deck[card2] = tmp;
    }
}

// Declare 2 players, who will get 2 cards assigned.
function generatePlayers() {
    const user = {
        name: 'user',
        points: 0,
        hands: new Array(),
    };
    players.push(user);
    const computer = {
        name: 'computer',
        points: 0,
        hands: new Array(),
    };
    players.push(computer);
}

function updateScores() {
    for (let p = 0; p < players.length; p++) {
        let sumScore = 0;
        for (let h = 0; h < players[p].hands.length; h++) {
            const currHand = players[p].hands[h];
            if (currHand.value === "A" && sumScore + currHand.point > 21) {
                currHand.point = 1;
            }
            sumScore += currHand.point;
            players[p].points = sumScore; // gives total score if a player has a hand or more.
        }
    }
}

// deal the hand (to me and compture) + pop and push if specified
function dealHands(startValues) {
    // push the specified cards to the front
    for (let i = startValues.length-1; i >= 0; i--) {
        let startPoint;
        if (startValues[i] === "A") {
            startPoint = 11; // or 1.
        }
        else if (startValues[i] === "J" || startValues[i] === "Q" || startValues[i] === "K") {
            startPoint = 10;
        }
        else {
            startPoint = parseInt(startValues[i]);
        }
        const startCard = { suit: "H", value: startValues[i], point: startPoint };
        deck.unshift(startCard); //1,2,3,4,5,6,7
    }
    // deal hands to the 2 players
    for(let i = 0; i < 2; i++) { // 2 cards
        for (let x = 0; x < players.length; x++) { // 2 players
            const card = deck[0];
            deck.shift(); 
            players[x].hands.push(card); 
            // should render cards?
            updateScores();
        }
    }
    // should update deck?
}

// Display user name/scores, cards, hit/stand
function gameInterface () {
    const gameDiv = document.querySelector('div[class=game]');

	const userDiv = document.createElement('div');
    userDiv.id='userDiv';
    const userTitle = document.createElement('h3');	
    userTitle.id='userTitle';
    const userCards = document.createElement('div');
    userCards.id='userCards';
    userDiv.appendChild(userTitle);
    userDiv.appendChild(userCards);

    const computerDiv = document.createElement('div');
	computerDiv.id='computerDiv';
    const computerTitle = document.createElement('h3');	
	computerTitle.id='computerTitle';
    const computerCards = document.createElement('div');
	computerCards.id='computerCards';
    computerDiv.appendChild(computerTitle);
	computerDiv.appendChild(computerCards);

    const hitBtn = document.createElement('button');
	const standBtn = document.createElement('button');
	const bottomBlock = document.createElement('div');
	hitBtn.id='hitBtn';
	standBtn.id='standBtn';
    bottomBlock.id='bb';
    
    bottomBlock.appendChild(hitBtn);
	bottomBlock.appendChild(standBtn);
    hitBtn.textContent = 'HIT';
    standBtn.textContent = 'STAND';
    
    gameDiv.appendChild(userDiv);
    gameDiv.appendChild(computerDiv);
    gameDiv.appendChild(bottomBlock);
    
    // firstR(c,p,cardList,pCards,cCards);
    updateScores();
    cardsDisplay(userCards, computerCards);
    userTitle.textContent = 'Player Hand - Total: '+ players[0].points;
	computerTitle.textContent = 'Computer Hand - Total: ?';
	// hitBtn.onclick = ()=>hit(deck,p,pCards,pTotal,pTitle);
	// standBtn.onclick = ()=>stand(cardList,cCards,cTotal,cTitle);
	// if(total(p,'p')===21){
	// 	gameOver();
	// }
//----------------------------------------------
    /*
    // display user name
    for (let p = 0; players.length; p++) {
        const divPlayer = document.createElement('div'); // name, score, cards

        const playerName = players[p].name;
        divPlayer.appendChild(playerName);
        const playerScore = players[p].points;
        divPlayer.appendChild(playerScore);
        console.log('done');
        const numHands = players[p].hands.length;
        const playerHand2ndLast = players[p].hands[numHands-2];
        const playerHandLast = players[p].hands[numHands-1];
        const playerCard1 = document.createElement("playerCard1"); // displays the 2nd latest
        setImgAttribute(playerCard1);
        divPlayer.appendChild(playerCard1);
        const playerCard2 = document.createElement("playerCard1"); // displays the latest 
        setImgAttribute(playerCard2);
        divPlayer.appendChild(playerCard2);

        const currDiv = document.getElementById("cdiv1");
        document.body.insertBefore(divPlayer, currDiv);
    }
    */
}
function cardsDisplay(userCards, computerCards) {
    for (let p = 0; p < players.length; p++) {
        let card;
        let cardImg;
        if (p === 0) { // user
            for (let h = 0; players[0].hands.length; h++) {
                card = players[0].hands[h];
                cardImg = document.createElement('img');
                cardImg.src = 'img/' + card.value + card.suit + ".png";
                userCards.appendChild(cardImg);
            }
            document.querySelector('#userTitle').textContent = 'User Hand - total + ' + players[0].points;
        }
        else { // computer
            for (let h = 0; players[1].hands.length; h++) {
                card = players[1].hands[h];
                cardImg = document.createElement('img');
                cardImg.src = 'img/' + card.value + card.suit + ".png";
                computerCards.appendChild(cardImg);
            }
            document.querySelector('#computerTitle').textContent = 'Computer Hand - total + ' + players[1].points;
        }
    }
}


// main.js
function main() {
    const btn = document.querySelector('.playBtn');
    const startForm = document.querySelector(".start");
    // form disappears when the submit button is clicked
    btn.addEventListener('click', function(evt) {
        // 2
        evt.preventDefault();
        startForm.style.display = "none";
        const startValues = document.querySelector("#startValues").value.split(',');
        generateDeck(shuffle);
        generatePlayers();
        dealHands(startValues);
        gameInterface();
    });
    // 1
    // dealHands(startValues);
}
document.addEventListener('DOMContentLoaded', main); 

module.exports = {
    main: main,
    generateDeck: generateDeck,
    shuffle: shuffle,
    generatePlayers: generatePlayers,
    dealHands: dealHands,
    updateScores: updateScores,
    gameInterface: gameInterface,
    cardsDisplay: cardsDisplay,
    // displayInitialUI: displayInitialUI,
  };