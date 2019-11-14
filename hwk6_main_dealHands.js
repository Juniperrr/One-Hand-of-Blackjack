// checking points
for(let p = 0; p < players.length; p++) { // 2 cards
    for (let c = 0; c < players[p].hands.length; c++) { // 2 players
        console.log(players[p].name, ': suit, value, point:', players[p].hands[c].suit, players[p].hands[c].value, players[p].hands[c].point);
    }
}