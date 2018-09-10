/*
 * Create a list that holds all of your cards
 */


const allCards = ['fa-diamond','fa-diamond',
				'fa-paper-plane-o','fa-paper-plane-o',
				'fa-bolt', 'fa-bolt',
				'fa-cube','fa-cube',
				'fa-anchor','fa-anchor',
				'fa-leaf','fa-leaf',
				'fa-bicycle','fa-bicycle',
				'fa-bomb','fa-bomb',
				];


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
const moveCount = document.querySelector('.moves');
const restart = document.querySelector('.restart');
let move = 0;


// initialize the game with cards randomly shuffled
function init(){
	let newCards = shuffle(allCards);
	const deck = document.querySelector('.deck');
	const cardHTML = newCards.map(function(card){
		return `<li class="card" data-icon="${card}"><i class="fa ${card}"></i></li>`;
	});
	moveCount.textContent = 0;
	deck.innerHTML = cardHTML.join('');
}

init();
/*
restart.addEventListener('click', function(){
		init();
	}); */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



const cards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
let card;


cards.forEach(function(card){
		card.addEventListener('click', function(){	
			// To prevent users click on same open card twice
			if(!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')){	
				// if 0 or 1 card is open already, users can click	
				openCards.push(card);
				card.classList.add('open','show');
				if(openCards.length === 2){
					move++;
					moveCount.textContent = move;
					starUpdate(move);
					// if two cards are matched
					if (compare(openCards[0],openCards[1]) === true){
						openCards.forEach(function(card){
							matchedCards.push(card);
							card.classList.remove('open','show');
							card.classList.add('match');
					});
					openCards = [];
				}
				// if not matched
				else{
					setTimeout(function(){
					openCards.forEach(function(card){
						card.classList.remove('open','show');
					});
					openCards = [];
				}, 600);
				}			
			}
		}
	});
});



// Compare the two cards to see if they match
function compare(card_1, card_2){
	if(card_1.dataset.icon === card_2.dataset.icon){
		return true;
	}
	else{
		return false;
	}
}

let star = document.querySelector('.last');
// Update star rating based on move counts
function starUpdate(move){
	if (move === 10){
		//two stars
		star.classList.replace('fa-star', 'fa-star-o');
		star = document.querySelector('.middle'); 
	}
	if (move === 14){
		//one star
		star.classList.replace('fa-star', 'fa-star-o');
		star = document.querySelector('.first'); 
	}
	if (move === 18){
		//game over 
		star.classList.replace('fa-star', 'fa-star-o');
	}
}

let time = 0;
// A timer when the game starts
function setTimer(){
	
}

// if the user wins the game
function winning(){
	if(matchedCards.length === 16){

	}
}

// if the user wants to reset the game

	