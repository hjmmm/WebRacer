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
				mesh.scale.y = Math.random();
				this.world.add(mesh);
			}
		}
		callback(this.world);
	}
});

var levels = {
	0: {
		name: "Binary City",
		cellSize: 20,
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