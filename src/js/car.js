/* 
 * Represents the car handling the loading of the model and the controls.
 * Author: Javier Morales
 */
 
var Car = Class.extend({
	z_axis: new THREE.Vector3(0,1,0),
	speed: 0,
	init: function(controls, maxSpeed) {
		this.ready = false;
		this.controls = controls || { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };
		this.dynamic = true;
		this.maxSpeed = maxSpeed || 10;
	},
	loadMesh: function(texturePath, callback) {
		var loader = new THREE.JSONLoader();
		loader.load("models/car.js", this.loadCallback.bind(this, callback), texturePath);
	},
	loadCallback: function(callback, geometry, material) {
		console.log(arguments);
		this.ready = true;
		this.mesh = new THREE.Mesh(geometry, material[0]);
		callback(this.mesh, true);
	},
	setControls: function(controls) {
		this.controls = controls;
	},
	update: function(input, delta) {
		if (this.mesh) {
			var rotation = input.isPressed(this.controls.RIGHT) ? -1 : 0;
			rotation += input.isPressed(this.controls.LEFT) ? 1 : 0;
			rotation = rotation * Math.PI/20;
			var direction = input.isPressed(this.controls.UP) ? 1 : 0;
			direction += input.isPressed(this.controls.DOWN) ? -1 : 0;
			
			delta = delta * 10;
			this.updateSpeed(direction, delta);

			this.mesh.rotateOnAxis(this.z_axis, rotation * delta * this.speed/10);
			this.mesh.translateZ(-1 * this.speed * delta);
		}
	},
	updateSpeed: function(direction, delta) {
		var change = direction == -1 ? -0.5 : 0.2;
		change = direction == 0 ? -0.2 : change;
		this.speed += change * delta;
		this.speed = this.speed > this.maxSpeed ? this.maxSpeed : this.speed;
		this.speed = this.speed < 0 ? 0 : this.speed;
	}
});