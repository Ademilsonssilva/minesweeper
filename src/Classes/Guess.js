/**
 * @class Guess
 * 
 * @extends {Item}
 * 
 * @description Represents the interrogation icon, which means that the player is not sure if the position has a bomb or not.
 */
class Guess extends Item
{
   /**
    * @description Returns the interrogation icon element.
    * 
    * @returns {Element}
    */
   toString()
   {
      let element = document.createElement("i");
      element.classList.add("fas");
      element.classList.add("fa-question");
      element.style.color = "purple";

      return element;
   }
}