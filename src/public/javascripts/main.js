
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
            const card = { suit: suits[i], value: values[x]};
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
        for (let c = 0; c < players[p].hands.length; c++) {
            const currCard = players[p].hands[c];
            let pnt;
            if (currCard.value === "J" || currCard.value === "Q" || currCard.value === "K") {
                pnt = 10;
            }
            else if (currCard.value === "A") {
                pnt = 0;
            }
            else {
                pnt = parseInt(currCard.value);
            }
            sumScore += pnt;    
        }
        for (let c = 0; c < players[p].hands.length; c++) {
            const currCard = players[p].hands[c];
            if (currCard.value === "A") {
                if (sumScore + 11 > 21) {
                    sumScore += 1;
                } else {
                    sumScore += 11;
                }  
            }
        }
        players[p].points = sumScore; // gives total score if a player has a hand or more.
    }
    document.querySelector('#userTitle').textContent = 'User Hand - total ' + players[0].points;
    document.querySelector('#computerTitle').textContent = 'Computer Hand - total ?';
}

// deal the hand (to me and compture) + pop and push if specified
function dealHands(startValues) {
    // push the specified cards to the front
    for (let i = startValues.length-1; i >= 0; i--) {
        const startCard = { suit: "H", value: startValues[i]};
        deck.unshift(startCard); //1,2,3,4,5,6,7
    }
    // deal hands to the 2 players
    for(let i = 0; i < 2; i++) { // 2 cards
        for (let x = 0; x < players.length; x++) { // 2 players
            const card = deck[0];
            deck.shift(); 
            players[x].hands.push(card); 
        }
    }
}

function setImgAttribute(card, cardImg, what) {
    if (what === 'display') {
        cardImg.src = 'img/' + card.value + card.suit + ".png";
    } 
    else if (what === 'hide') {
        cardImg.src = 'img/gray_back.png';
    }
    cardImg.style.width = "50px";
    cardImg.style.height = "80px";
}

function cardsDisplay(userCards, computerCards) {

    updateScores();
    userCards.innerHTML = "";
    computerCards.innerHTML = "";
    for (let p = 0; p < players.length; p++) {
        let card;
        let cardImg;
        if (p === 0) { // user
            for (let h = 0; h < players[0].hands.length; h++) {
                card = players[0].hands[h];
                cardImg = document.createElement('img');
                if (card && card.value) {
                    setImgAttribute(card, cardImg, 'display');
                }
                // setImgAttribute(card, cardImg);
                userCards.appendChild(cardImg);
            }
            
        }
        else { // computer
            const card1 = players[1].hands[0];
            const cardImg1 = document.createElement('img');
            if (card1 && card1.value) {
                setImgAttribute(card1, cardImg1, 'display');
            }
            computerCards.appendChild(cardImg1);
            const card2 = players[1].hands[1];
            const cardImg2 = document.createElement('img');
            if (card2 && card2.value) {
                setImgAttribute(card2, cardImg2, 'hide');
            }
            computerCards.appendChild(cardImg2);
            
        }
    }
}

// Display user name/scores, cards, hit/stand
function gameInterface (startValues) {
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
    
    const resultBlock = document.createElement('div');
    const resultTitle = document.createElement('h3');	
    resultTitle.id='resultTitle';
    resultBlock.appendChild(resultTitle);
    
    gameDiv.appendChild(userDiv);
    gameDiv.appendChild(computerDiv);
    gameDiv.appendChild(bottomBlock);
    gameDiv.appendChild(resultBlock);
    
    // firstR(c,p,cardList,pCards,cCards);
    cardsDisplay(userCards, computerCards);
    hitBtn.onclick = () => hit(deck, userCards, computerCards, userTitle);
	standBtn.onclick = () => stand(startValues, computerCards, computerTitle);
	// if(total(p,'p')===21){
	// 	gameOver();
	// }
}

function checkBust() {
    for (let p = 0; p < players.length; p++) {
        if (players[p].points > 21) {
            if (p === 0) {
                document.querySelector('#resultTitle').textContent = "Player lost (bust)!";
            } else {
                document.querySelector('#resultTitle').textContent = "Computer lost (bust)!";
            }
        }
    }
}
function hit (deck, userCards, computerCards, userTitle) {
    console.log('clicked hit');
    const nextCard = deck.shift();
    players[0].hands.push(nextCard);
    cardsDisplay(userCards, computerCards);
    checkBust();
}
function stand (deck, userCards, userTitle) {
    console.log('clicked stand');
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
        gameInterface(startValues);
    });
    // 1
    
}
document.addEventListener('DOMContentLoaded', main); 
