/* 
 * Generates the city using a descriptor object as input
 * Author: Javier Morales
 */
  
var World = Class.extend({
	init: function(level) {
		this.level = level;
		this.ready = false;
	},
	loadMesh: function(texturePath, position, callback) {		
		var geometry = new THREE.CubeGeometry(this.level.cellSize, this.level.defaultHeight, this.level.cellSize);
		var material = [new THREE.MeshBasicMaterial( { color: 0x222222 } ), new THREE.MeshBasicMaterial( { color: 0x002222 } )];
		this.world = new THREE.Object3D();
		this.world.position = position || new THREE.Vector3(0,0,0);	
		
		for (var i = 0; i<this.level.cells.length; i++) {
			if (this.level.cells[i] != 0) {
				var mesh = new THREE.Mesh(geometry, material[i%2]);
				mesh.position = new THREE.Vector3(
					(this.level.cellSize + this.level.cellPadding) * (i%this.level.cellsPerRow), 
					0, 
					(this.level.cellSize + this.level.cellPadding) * Math.floor(i/this.level.cellsPerRow));
				this.world.add(mesh);
			}
		}
		this.world.add(this.createGround());
		callback(this.world);
	},
	createGround: function() {
		var size = new THREE.Vector2((this.level.cellSize + this.level.cellPadding) * this.level.cellsPerRow, (this.level.cellSize + this.level.cellPadding) * (this.level.cells.length / this.level.cellsPerRow));
		var geometry = new THREE.PlaneGeometry(size.x, size.y); 
		var material = new THREE.MeshBasicMaterial( {color: 0xDDDDDD} ); 
		var ground = new THREE.Mesh(geometry, material);
		ground.translateY(this.level.defaultHeight * -1/2);
		ground.translateX(size.x/2 - this.level.cellSize/2);
		ground.translateZ(size.y/2 - this.level.cellSize/2);
		ground.rotateX(-Math.PI/2);
		return ground;
	}
});

var levels = {
	0: {
		name: "Binary City",
		cellSize: 60,
		cellPadding: 0.2, 
		cellsPerRow: 20,
		defaultHeight: 20,
		cells: [ 
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1,
			1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1,
			1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 
		]
	}
};