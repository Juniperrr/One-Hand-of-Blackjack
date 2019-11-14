const suits = ["S", "D", "C", "H"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
let deck = new Array();
const players = new Array();
let currentPlayer = 0;

// Generate a deck of 52 unshuffled cards and assigning points.
function generateDeck(callback) {
    // 3
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
            //4
		}
    }
    // 5
    callback(); // shuffle.
}

// Shuffling the deck.
function shuffle() {
    // 6
	// for 200 turns, and switch the values of two random cards
	for (let i = 0; i < 200; i++) {
		const card1 = Math.floor((Math.random() * deck.length));
		const card2 = Math.floor((Math.random() * deck.length));
		const tmp = deck[card1];
		deck[card1] = deck[card2];
		deck[card2] = tmp;
    }
    //7
}

// Declare 2 players, who will get 2 cards assigned.
function generatePlayers() {
    // 8
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
    // 9
}

// deal the hand (to me and compture) + pop and push if specified
function dealHands(startValues) {
    // 10
    // push the speciied cards to the front
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
        const startCard = { suit: "hearts", value: startValues[i], point: startPoint };
        deck.unshift(startCard); //1,2,3,4,5,6,7
    }
    //11
    // deal hands to the 2 players
    for(let i = 0; i < 2; i++) { // 2 cards
        for (let x = 0; x < players.length; x++) { // 2 players
            const card = deck[0];
            deck.shift(); 
            players[x].hands.push(card); 
            // renderCard(card, x);
            updateScores();
        }
    }
    // updateDeck();
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

function getImgAttributeName(card) {
    const cardPoint = card.point + "";
    const cardSuit = card.suit;
    const attributeName = cardPoint + cardSuit + ".png";
    return attributeName;
}

function setImgAttribute(card) {
    const cardPoint = card.point + "";
    const cardSuit = card.suit;
    const attributeName = "/public/img/" + cardPoint + cardSuit + ".png";
    card.setAttribute("src", attributeName);
    card.setAttribute("width", "53");
    card.setAttribute("height", "85");
}

// Display user name/scores, cards, hit/stand
function displayInitialUI () {
    // display user name
    for (let p = 0; players.length; p++) {
        const divPlayer = document.createElement('div'); // name, score, cards

        const playerName = document.createTextNode(players[p].name);
        divPlayer.appendChild(playerName);
        const playerScore = document.createTextNode(players[p].points);
        divPlayer.appendChild(playerScore);

        const numHands = players[p].hands.length;
        const playerHand2ndLast = players[p].hands[numHands-2];
        const playerHandLast = players[p].hands[numHands-1];
        const playerCard1 = document.createElement(playerHand2ndLast); // displays the 2nd latest
        setImgAttribute(playerCard1);
        divPlayer.appendChild(playerCard1);
        const playerCard2 = document.createElement(playerHandLast); // displays the latest 
        setImgAttribute(playerCard2);
        divPlayer.appendChild(playerCard2);

        const currDiv = document.getElementById("cdiv1");
        document.body.insertBefore(divPlayer, currDiv);
        /*
        // const divPlayerId = document.createElement('div');

        divPlayer.id = 'player_' + p;

        // divPlayerId.innerHTML = players[p].ID;
        divPlayer.appendChild(divPlayerId);
        document.getElementById('players').appendChild(divPlayer);
        */
    }
    
}

function renderDeck() {
    const deck = shuffle;
	document.getElementById('deck').innerHTML = ''; //ID="deck"
	for(let i = 0; i < deck.length; i++) {
		const card = document.createElement("div");
		let icon = '';
		if (deck[i].Suit === 'hearts') {
            icon='?';
        }
		else if (deck[i].Suit === 'spades') {
            icon = '?';
        }
		else if (deck[i].Suit === 'diamonds') {
            icon = '?';
        }
		else {
            icon = '?';
        }
		card.innerHTML = deck[i].Value + '' + icon;
		card.className = 'card';
	document.getElementById("deck").appendChild(card);
	}
}


/*
btn.addEventListner('click', function(evt) {
        const textInput = documen.querySelector('input[type=text]');
        const teaname = textInput.value;
        const url = `https://api.github.com/users/${username}/repos`;
        getRepose(url);
        evt.preventDefault(); // actually not submitting the fom!
    });
*/

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
        displayInitialUI();
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
    displayInitialUI: displayInitialUI,
    renderDeck: renderDeck,
  };