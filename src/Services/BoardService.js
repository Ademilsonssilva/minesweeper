/**
 * BoardService
 * 
 * @description This class is responsible for the board logic, such as putting an item in a position and getting the content of a position.
 * 
 * @class
 * 
 * @method putItem 
 * @method getPositionContent
 */
class BoardService
{
   /**
    * Put item in a position of the board
    * 
    * @param {Board} board 
    * @param {Position} position 
    * @param {Item} item 
    * 
    * @returns void
    */
   putItem(board, position, item)
   {
      board._state[position.row][position.column] = item;
   }

   /**
    * Returns the content of a position
    * 
    * @param {Board} board 
    * @param {Position} position 
    * 
    * @returns {Item|null}
    */
   getPositionContent(board, position)
   {
      return board._state[position.row][position.column];
   }
}