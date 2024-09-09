/**
 * @class Position
 * 
 * @description Class responsible for representing a position on the board or in the state of the game.
 */
class Position
{
   row; // integer
   column; // integer

   /**
    * @constructor
    * 
    * @param {integer} row 
    * @param {integer} column 
    */
   constructor(row, column)
   {
      this.row = row;
      this.column = column;
   }

}