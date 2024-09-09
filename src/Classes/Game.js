/**
 * @class Game
 * 
 * @description Represents the game itself, containing the board and the game state. Each new game will have a new instance of this class.
 */
class Game
{
   _state; // Array
   _board; // Board
   _size; // int
   _placedFlags; // int
   _placedFlagsPosition; //array[Position]
   _bombAmount; // int
   _gameWon; //boolean

   /**
    * @constructor
    * 
    * @description Creates an instance of Game, setting the size and the amount of bombs, and initializing the state of the game.
    * 
    * @param {integer} size 
    * @param {integer} bombAmount 
    */
   constructor(size, bombAmount)
   {
      this._size = size;
      this._bombAmount = bombAmount;
      this._placedFlags = 0;
      this._placedFlagsPosition = [];
      this._gameWon = false;

      this._state = new Array(size).fill(null).map(() => new Array(size).fill(null));
   }

}