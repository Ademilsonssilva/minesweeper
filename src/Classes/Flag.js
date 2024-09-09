/**
 * @class Flag
 * 
 * @extends {Item}
 * 
 * @description Represents the flag icon, which means that the player has marked a position as a bomb.
 */
class Flag extends Item
{
   /**
    * @description Returns the flag icon element.
    * 
    * @returns {Element}
    */
   toString()
   {
	   let element = document.createElement("i");
	   element.classList.add("fas");
	   element.classList.add("fa-flag");
	   element.style.color = "red";

	   return element;
   }
}