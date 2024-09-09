/**
 * Item class
 * 
 * @class Item
 * 
 * @description Works as a abstract base class for all items in the game
 */
class Item
{
   description = null; //string

   /**
    * @description Creates an instance of Item, setting the description property.
    * 
    * @param {string} description 
    */
   constructor(description)
   {
      this.description = description;
   }

   /**
    * @description Returns the string representation of the item, which is the element that will be drawn on the screen.
    * 
    * @returns {string}
    */
   toString()
   {
      let element = document.createElement("span");

      return element;
   }
   
}