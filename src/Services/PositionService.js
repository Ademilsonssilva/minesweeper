/**
 * PositionService
 * 
 * This class is responsible for manipulating and managing the positions of the game.
 * 
 * @class 
 * 
 * @method comparePositions
 * @method isPositionInArrayOfPositions
 * @method raffleBombPositions
 * @method getNeighbourPositions
 * 
 */
class PositionService
{
   /**
    * Verify if two positions are equal.
    * 
    * @param {Position} position1 
    * @param {Position} position2 
    * @returns {boolean}
    */
   comparePositions(position1, position2)
   {
      return (position1.row == position2.row) && (position1.column == position2.column);
   }

   /**
    * Verify if a position is in an array of positions.
    * 
    * @param {Position} position 
    * @param {array<Position>} arrayOfPositions 
    * @returns {boolean}
    */
   isPositionInArrayOfPositions(position, arrayOfPositions)
   {
      for (let i = 0; i < arrayOfPositions.length; i++)
      {
         if (this.comparePositions(position, arrayOfPositions[i]))
         {
            return true;
         }
      }
      return false;
   }

   /**
    * Randomly raffle positions for bombs.
    * 
    * @param {integer} size 
    * @param {integer} amount 
    * @returns {array<Position>}
    */
   raffleBombPositions(size, amount)
   {
      let positionService = new PositionService();

      let positions = [];
      for (let i = 0; i < amount; i++)
      {
         let row = Math.floor(Math.random() * size);
         let column = Math.floor(Math.random() * size);
         let position = new Position(row, column);

         if (positionService.isPositionInArrayOfPositions(position, positions)) {
            i--;
            continue;
         }

         positions.push(position);
         
      }
      return positions;
   }

   /**
    * Get the posititions around a position.
    * 
    * @param {Position} position 
    * @param {integer} maxSize 
    * @returns {array<Position>}
    */
   getNeighbourPositions(position, maxSize)
   {

      let neighbourPositions = [];
      for (let x = position.row - 1; x <= position.row + 1; x++) {
         for (let y = position.column - 1; y <= position.column + 1; y++) {
            if (x === position.row && y === position.column) {
               continue;
            }
            if (x < 0 || y < 0 || x >= maxSize || y >= maxSize) {
               continue;
            }

            let neighbourPosition = new Position(x, y);
            neighbourPositions.push(neighbourPosition);
            
         }
      }

      return neighbourPositions;
         
   }
}