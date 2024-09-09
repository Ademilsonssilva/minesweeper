/**
 * DomService
 * 
 * This class is responsible for drawing the board on the screen and handling the user's interactions with the board.
 * 
 * @class 
 * 
 * @method drawBoard 
 * @method blockBoard
 * @method recursiveRevealPosition
 * @method drawBombCounter
 * 
 */
class DomService
{
   /**
    * This method draws the board on the screen and creates the event listeners for the user's interactions with the board.
    * 
    * @param {Game} game 
    * 
    * @returns void
    */
   drawBoard(game)
   {

      let gameService = new GameService();

      let board = game._board;

      let boardService = new BoardService();

      const boardElement = document.getElementById('board');
      boardElement.innerHTML = '';
      board._state.forEach((row, rowIndex) => {
         const rowElement = document.createElement('div');
         rowElement.className = 'row';
         row.forEach((cell, cellIndex) => {

            let clickPosition = new Position(rowIndex, cellIndex);

            const cellElement = document.createElement('div');
            cellElement.className = 'cell';

            if (cell != null) {
               cellElement.appendChild(cell.toString());
            }

            cellElement.addEventListener('click', game._over ? () => {} : () => {

               if (boardService.getPositionContent(game._board, clickPosition) != null) {
                  return false;
               }

               if (gameService.positionHasBomb(game, clickPosition)) {

                  game._over = true;

                  boardService.putItem(board, clickPosition, new Bomb());
                  this.drawBoard(game);

                  return alert('Fim de jogo!');
               }

               let bombCount = gameService.getPositionContent(game, clickPosition);

               let item = new BombAmount(bombCount);

               boardService.putItem(board, clickPosition, item);

               if (bombCount == 0) {
                  this.recursiveRevealPosition(game, clickPosition);
               }

               this.drawBoard(game);

            });

            cellElement.addEventListener('contextmenu', game._over ? () => {} : (event) => {

               event.preventDefault();

               let thisPosition = new Position(rowIndex, cellIndex);

               let positionContent = boardService.getPositionContent(board, thisPosition);

               if ( positionContent instanceof Bomb || positionContent instanceof BombAmount) {
                  return false;
               }

               let newPositionContent = new Flag();

               if (positionContent instanceof Flag) {
                  newPositionContent = new Guess();
               }
               else if (positionContent instanceof Guess) {
                  newPositionContent = null;
               }

               if (game._placedFlags >= game._bombAmount && newPositionContent instanceof Flag) {
                  return alert("Número máximo de bandeiras atingido!");
               }

               let gameWon = false;
               if (newPositionContent instanceof Flag) {
                  game._placedFlagsPosition.push(thisPosition);
                  game._placedFlags++;

                  if (gameService.verifyWin(game)){
                     game._gameWon = true;
                     game._over = true;
                     gameWon = true;
                  }
               }
               else if (positionContent instanceof Flag) {
                  gameService.removeFlagFromPosition(game, thisPosition);
               }

               boardService.putItem(board, thisPosition, newPositionContent);
               this.drawBoard(game);

               if (gameWon) {
                  this.blockBoard();
                  alert("Parabéns, você venceu!");
               }
            });

            rowElement.appendChild(cellElement);
         });
         boardElement.appendChild(rowElement);
      });

      this.drawBombCounter(game);
   }

   /**
    * This method blocks the board, preventing the user from interacting with it after the game finishes.
    * 
    * @returns void
    */
   blockBoard()
   {
      let cells = document.querySelectorAll('.cell');

      cells.forEach(cell => {
         cell.addEventListener("click", () => null);
         cell.addEventListener("contextmenu", (event) => {event.preventDefault();});
      });
   }

   /**
    * This method reveals the content of a position and its neighbours recursively when the user clicks on a position with no bombs around it.
    * 
    * @param {Game} game 
    * @param {Position} position 
    * 
    * @returns {void}
    */
   recursiveRevealPosition(game, position)
   {
      let positionService = new PositionService();
      let boardService = new BoardService();
      let gameService = new GameService();

      let neighbourPositions = positionService.getNeighbourPositions(position, game._size);

      let emptyNeighbourPositions = neighbourPositions.filter(neighbourPosition => {
         return boardService.getPositionContent(game._board, neighbourPosition) == null;
      });

      emptyNeighbourPositions.forEach(neighbourPosition => {

         let positionContent = gameService.getPositionContent(game, neighbourPosition);

         if (boardService.getPositionContent(game._board, neighbourPosition) == null) {
            boardService.putItem(game._board, neighbourPosition, new BombAmount(positionContent));
         }

         if ( positionContent != 0) {
            return ;
         }

         return this.recursiveRevealPosition(game, neighbourPosition);
         
      });

      return ;

   }

   /**
    * Draw the bomb counter on the screen.
    * 
    * @param {Game} game 
    */
   drawBombCounter(game)
   {
      let bombCounter = document.getElementById('bomb-counter');

      if (game._gameWon) {
         bombCounter.innerHTML = "Você venceu!";
         return;
      }

      bombCounter.innerHTML = `Bandeiras restantes: ${game._bombAmount - game._placedFlags}`;
   }
}