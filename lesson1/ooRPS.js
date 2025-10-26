/*
Step 1: Write a textual description of the problem or exercise 

Rock paper scissors is a two player game where each of the players simultaneously makes a selection
between 3 options: Rock, paper, and scissors. The relationship between the options determines the
winner:

1. Rock beats scissors
2. Paper beats rock
3. Scissors beats paper
4. If both players select the same option, its a tie, and no one wins. 

In this particular case, one player is a human / user and the other is a computer. The player
makes their move, and then the computer makes its move. Neither player has any knowledge
of the other players move (in person, its done at the same time). 

Once both the player and the computer make their move, a winner is determined, and the
player is notified of the result. 

Nouns
  Options
    Rock
    Paper
    Scissors
  Computer
  Player
  Game
  Rule

Verbs
  Make a move
  Determine winner
  
Options
  Rock
  Paper
  Scissors

Computer
  Make a move
    Options

Player 
  Make a move
    Options

Game 
  Determine winner
    Options
    Rules

Here's how LS has organized it:

Nouns: player, move rule
Verbs: choose, compare

Player
  - Choose
Move
Rule

?? 
  - Compare

Aside: This is a great example of trying to explain something in text, vs. intuitively 
understanding that thing in the physical world. It is so different. This is actually 
kind of hard to describe! 

*/

function createPlayer() {
  return {
    // possible state: player name?
    // possible state: player current move?
    // possible state: player or computer? 

    choose() {

    }
  }
}

function createMove() {
  return {
    // type of move (rock, paper, scissors)
  }
}

function createRule() {
  return{
    // do rules need state? Might just be a static object
  }
}

let compare = function(move1, move2) {

}



