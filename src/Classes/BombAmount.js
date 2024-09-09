/**
 * @class BombAmount
 * 
 * @extends {Item}
 * 
 * @description Represents the amount of bombs around a position, with the color according to the amount.
 */
class BombAmount extends Item
{

   _colors = [
      "#00FA9A", "#008000", "#008080", "#00CED1", "#4682B4", "#FFFF00", "#A0522D", "#FF0000",
   ];

   /**
    * @description Returns an element with the amount of bombs around the position, with the color according to the amount.
    * 
    * @returns {Element}
    */
   toString()
   {
	   let element = document.createElement("span");
      element.innerHTML = this.description > 0 ? this.description : "";
      element.style.fontWeight = "bold";
      element.style.color = this._colors[this.description];
      element.classList.add("bomb-amount");
   
      return element;
   }
   
}