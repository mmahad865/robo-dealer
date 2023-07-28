// Define the Card object with 'value' and 'suit' properties
function Card(value, suit) {
  this.value = value;
  this.suit = suit;
}

// Function to create a standard deck of cards
function createDeck() {
  let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let deck = [];

  for (let suit of suits) {
    for (let i = 0; i < ranks.length; i++) {
      let cardValue = (i < 9) ? (i + 2) : ranks[i]; // Numeric value for numbered cards, 'J', 'Q', 'K', 'A'
      deck.push(new Card(cardValue, suit));
    }
  }

  return deck;
}

// Function to shuffle the deck using Fisher-Yates algorithm
function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Function to deal a specified number of cards from the deck without repeating cards
function dealCards(deck, numCards, dealtIndexes) {
  let hand = [];
  for (let i = 0; i < numCards; i++) {
    let index;
    do {
      index = getRandomNumber(0, deck.length - 1);
    } while (dealtIndexes.includes(index));

    hand.push(deck[index]);
    dealtIndexes.push(index);
  }
  return hand;
}

// Function to convert card value to name for face cards
function cardValueToName(cardValue) {
  if (cardValue === 'J') return 'Jack';
  if (cardValue === 'Q') return 'Queen';
  if (cardValue === 'K') return 'King';
  if (cardValue === 'A') return 'Ace';
  return cardValue;
}

// Function to get a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Main function to deal hands and display them on the HTML page
function dealHands() {
  let numHands = 5;
  let deck = createDeck();
  shuffleDeck(deck);
  let handsContainer = document.getElementById('handsContainer');
  handsContainer.innerHTML = '';
  let dealtIndexes = [];

  for (let i = 0; i < numHands; i++) {
    let hand = dealCards(deck, 5, dealtIndexes);
    let handInfo = hand.map(card => {
      let cardValueName = (typeof card.value === 'number') ? card.value : cardValueToName(card.value);
      return `${cardValueName} of ${card.suit}`;
    });

    let handDiv = document.createElement('div');
    handDiv.innerHTML = `<strong>Hand ${i + 1}:</strong> ${handInfo.join(', ')}`;
    handsContainer.appendChild(handDiv);
  }
}

// Call the function to deal 5 hands initially (optional)
dealHands();
