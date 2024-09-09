/**
 * @class Board
 * 
 * @description Is the visual representation of the game, translating the state of the game to the screen
 */
class Board 
{
   _size;
   _state;

   /**
    * @constructor
    * 
    * @description Creates an instance of Board, setting the size of the board and initializing the state of the board.
    * 
    * @param {integer} size 
    */
   constructor(size)
   {
      this._size = size;
      this._state = new Array(size).fill(null).map(() => new Array(size).fill(null));
   }
}