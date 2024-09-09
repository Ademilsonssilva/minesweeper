/**
 * GameService
 * 
 * This class is responsible for manage the match logic.
 * 
 * @class 
 * 
 * @method initialize
 * @method applyBombs
 * @method applyNumber
 * @method fillWithNeighborBombsCount
 * @method positionHasBomb
 * @method getPositionContent
 * @method removeFlagFromPosition
 * 
 */
class GameService
{
   _domService;
   _positionService;

   /**
    * Constructor
    * 
    * This method creates a new instance of GameService and injects the services that it will use.
    * 
    * @constructor
    */
   constructor()
   {
      this._domService = new DomService();
      this._positionService = new PositionService();
   }

   /**
    * Initialize the game, creating the board and applying the bombs.
    * 
    * @param {Game} game 
    * 
    * @returns {void}
    */
   initialize(game)
   {
      let board = new Board(game._size);

      game._board = board;

      this._domService.drawBoard(game);

      let bombPositions = this._positionService.raffleBombPositions(game._size, game._bombAmount);

      this.applyBombs(game, bombPositions);
      this.fillWithNeighborBombsCount(game);
   }

   /**
    * Receives the game and an array of bomb positions and applies the bombs to the game state.
    * 
    * @param {Game} game 
    * @param {array<Position>} bombPositions 
    * 
    * @returns {void}
    */
   applyBombs(game, bombPositions)
   {
      bombPositions.forEach(bombPosition =>
      {
         game._state[bombPosition.row][bombPosition.column] = "B";
      });
   }

   /**
    * Applies a number of neighbor bombs to a position on the board
    * 
    * @param {Game} game 
    * @param {Position} position 
    * @param {integer} number 
    * 
    * @returns {void}
    */
   applyNumber(game, position, number)
   {
      game._state[position.row][position.column] = number;
   }

   /**
    * fills the board with the number of bombs in the neighboring positions
    * 
    * @param {Game} game 
    * @returns {void}
    */
   fillWithNeighborBombsCount(game)
   {

      let positionService = new PositionService();

      game._state.forEach((row, rowIndex) => {
         
         row.forEach((cell, cellIndex) => {
            
            let position = new Position(rowIndex, cellIndex);

            if (this.positionHasBomb(game, position)) {
               return;
            }

            let neighbourPositions = positionService.getNeighbourPositions(position, game._size);

            let neighbourBombsCount = 0;

            neighbourPositions.forEach(neighbourPosition => {
               if (this.positionHasBomb(game, neighbourPosition)) {
                  neighbourBombsCount++;
               }
            });

            this.applyNumber(game, position, neighbourBombsCount);

         });

      });
   }

   /**
    * Verify if a position has a bomb
    * 
    * @param {Game} game 
    * @param {Position} position 
    * @returns {boolean}
    */
   positionHasBomb(game, position)
   {
      return game._state[position.row][position.column] === "B";
   }

   /**
    * Returns the content of a position on the board
    * 
    * @param {Game} game 
    * @param {Position} position 
    * @returns {string}
    */
   getPositionContent(game, position)
   {
      return game._state[position.row][position.column];
   }

   /**
    * Remove a flag from a position on the board
    * 
    * @param {Game} game 
    * @param {Position} position 
    * 
    * @returns {void}
    */
   removeFlagFromPosition(game, position)
   {
      game._placedFlagsPosition.forEach((flagPosition, index) => {
         if (this._positionService.comparePositions(flagPosition, position)) {
            game._placedFlagsPosition.splice(index, 1);
            game._placedFlags--;
         }
      });
   }

   /**
    * Verify if the player won the game
    * 
    * @param {Game} game 
    * @returns {boolean}
    */
   verifyWin(game)
   {
      if (game._placedFlags < game._bombAmount) {
         return false;
      }

      let correctFlags = 0;
      game._placedFlagsPosition.forEach(flagPosition => {
         if (this.positionHasBomb(game, flagPosition)) {
            correctFlags++;
         }
      });

      if (correctFlags < game._bombAmount) {
         alert("Uma ou mais bandeiras estão posicionadas incorretamente!");
      }

      return correctFlags === game._bombAmount;

   }
}