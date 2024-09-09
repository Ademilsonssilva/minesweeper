/**
 * @class Bomb
 * 
 * @extends {Item}
 * 
 * @description Represents the bomb icon, which means that the player has clicked on a bomb and lost the game.
 */
class Bomb extends Item
{
   /**
    * @description Returns the bomb icon element.
    * 
    * @returns {Element} 
    */
   toString()
   {
     let element = document.createElement("i");
     element.classList.add("fas");
     element.classList.add("fa-bomb");
     element.classList.add("bomb");

     return element;
   }
}