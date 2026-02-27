class Deck {
  constructor() {
    this.suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    this.ranks = [
      "Ace",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    this.resetDeck();
  }

  deal(participant) {
    let randomIndex = Math.floor(Math.random() * this.deck.length);
    let card = this.deck.splice(randomIndex, 1);

    participant.cards.push(card);
  }

  resetDeck() {
    let cards = [];
    this.suits.forEach((suit) => {
      this.ranks.forEach((rank) => {
        cards.push(new Card(suit, rank));
      });
    });

    this.cards = this.shuffleDeck(cards);
  }

  shuffleDeck(deck) {
    let shuffledDeck = [];
    while (deck.length > 0) {
      let randomIndex = Math.floor(Math.random() * deck.length);
      shuffledDeck.push(deck.splice(randomIndex, 1));
    }

    return shuffledDeck;
  }
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

class Participant {
  constructor() {
    this.bust = false;
    this.score = 0;
    this.hand = [];
  }

  hit() {}

  stay() {}
}

class Player extends Participant {
  constructor() {
    super();
    this.bankroll = 5;
  }
}

class Dealer extends Participant {
  constructor() {
    super();
  }

  deal() {}
}

class twentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  playOneGame() {
    this.displayWelcomeMessage();
    this.dealFirstCards();
    this.playerTurn();
    if (!this.player.bust) this.dealerTurn();
    this.displayWinner();
  }

  displayWelcomeMessage() {
    console.log(" ")
    console.log("Welcome to Twenty-One!")
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing. Goodbye!")
  }

  displayWinner() {

  }

  displayHand(participant, hidden = true) {}

  displayPoints(participant) {}

  dealFirstCards() {
    for (let i = 0; i < 2; i++) {
      this.deck.deal(this.player);
      this.deck.deal(this.dealer);
    }
  }
}

let game = new twentyOneGame();

/*
The whole purpose of objects is to encapsulate state and behavior.
State is data, behavior are methods, encapsulation brings them
together in a coherent object framework. Objects have 
inheritance. 

Need to think about how to address the computers hidden card.
How do I know to reveal the card vs to only show part
of the hand? 

Question: I've encountered a situation, with the deal method, where I can either return a card from the deck, and set it equal to the 
participant in the parent function, or mutate the participant object passed to the method. What should I do here? 

Maybe I'll just leave it alone for now, focus on the twentyOneGame function, and then determine what will make the most sense. Thats why
you start at the top level...

Do I want to deal 
*/
