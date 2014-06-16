/* 
 * Code to handle user input
 * Author: Javier Morales
 */
 
var Input = Class.extend({
	init: function() {
		this.pressed = {};
		window.addEventListener('keydown', this.onKeyDown.bind(this), false);
		window.addEventListener('keyup', this.onKeyUp.bind(this), false);
	},
	onKeyDown: function(event) {
		this.pressed[event.keyCode] = true;
	},
	onKeyUp: function(event) {
		this.pressed[event.keyCode] = false;
	},
	isPressed: function(keyCode) {
		return this.pressed[keyCode];
	}
});