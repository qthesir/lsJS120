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
    let randomIndex = Math.floor(Math.random() * this.cards.length);
    let card = this.cards.splice(randomIndex, 1)[0];

    participant.hand.push(card);
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
      shuffledDeck.push(deck.splice(randomIndex, 1)[0]);
    }

    return shuffledDeck;
  }
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  toString() {
    return `${this.rank} of ${this.suit}`;
  }

  getRank() {
    return this.rank
  }
}

class Participant {
  static CARD_TO_SCORE = {
    Ace: 11,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
  };
  constructor() {
    this.bust = false;
    this.hand = [];
  }

  hit() {}

  stay() {}

  calculatePoints() {
    let score = this.hand.reduce((score, card) => {
      console.log(card.getRank())
      score = score + Participant.CARD_TO_SCORE[card.rank];
      return score;
    }, 0);

    console.log(score);

    let numAces = this.hand.filter((card) => card.rank === "Ace").length;
    for (let i = 0; i < numAces; i++) {
      if (score <= 21) break;
      score = score - 10;
    }

    return score;
  }

  // The problem with the ace is you basically need to know what the previous points were in order to calculate it, so maybe
  // I can initially sort the cards with the Ace in the last position so that I can see what the first card is. Maybe I
  // also check, initially, to see if there's an Ace at all. And what if there are two aces? I guess that would just be 12.
  // But its if the points are over 21, and their is an Ace included, then the ace needs to be a one. I might also just
  // be able to check that at the very end. > 21 && ace included? Ace becomes a 1. Recalc score. Still over 21 && ace included?
  // add the other ace.

  displayHand(hidden = false) {
    hidden
      ? console.log(
          `${this.constructor.name} has ${this.hand[0]} and a hidden card`
        )
      : console.log(`${this.constructor.name} has ${this.hand.join(", ")}`);
  }

  displayPoints() {
    console.log(`${this.constructor.name} points: ${this.calculatePoints()}`);
  }
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
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  playOneGame() {
    this.displayWelcomeMessage();
    this.dealFirstCards();
    this.player.displayHand();
    this.dealer.displayHand(true);

    this.playerTurn();
    if (!this.player.bust) this.dealerTurn();
    this.displayWinner();
  }

  displayWelcomeMessage() {
    console.log(" ");
    console.log("Welcome to Twenty-One!");
    console.log(" ");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing. Goodbye!");
  }

  displayWinner() {}

  dealFirstCards() {
    for (let i = 0; i < 2; i++) {
      this.deck.deal(this.player);
      this.deck.deal(this.dealer);
    }
  }

  playerTurn() {
    console.log("It's your turn");
    this.player.displayHand();
    this.player.displayPoints();
  }

  dealerTurn() {}
}

let game = new TwentyOneGame();

game.playOneGame();

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

Every time a player is dealt a card, it increases their points. How do I ensure that each deal increases the players points as well? I need to 
tightly couple these two behaviors. 

Actually... We probably do not want to keep track of points separately, because how many points the player has will depend on 
whether or not the players Ace will bust them or not. So the points are dynamic depending on the hand. So they should be 
dynamically calculated based on the hand. There should not be a separate state for points - they should be derived from
the hand state. 
*/
