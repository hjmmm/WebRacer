/* 
 * Initializing code and global properties
 * Author: Javier Morales
 */

var Global = Class.extend({
	key: {
	  LEFT: 37,
	  UP: 38,
	  RIGHT: 39,
	  DOWN: 40
	},
	init: function() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.clock = new THREE.Clock();
		this.camera.position = new THREE.Vector3(0.5,9.5,20);
		this.input = new Input();
		document.body.appendChild(this.renderer.domElement);
		window.addEventListener( 'resize', this.resize.bind(this), false );
		this.initStats();
		this.fillScene();
	},
	initStats: function() {
		this.stats = new Stats();
		this.stats.setMode(1); // 0: fps, 1: ms
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.left = '0px';
		this.stats.domElement.style.top = '0px';
		document.body.appendChild(this.stats.domElement);
	},
	resize: function() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.render();
	}, 
	render: function() {
		requestAnimationFrame(this.render.bind(this));	
		this.updateState();
		this.renderer.render(this.scene, this.camera);
		this.stats.update();
	},
	updateState: function() {	
		var delta = this.clock.getDelta();
		if (this.car) {	
			this.car.update(this.input, delta);
		}
	},
	fillScene: function() {
		var light = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
		this.scene.add(light);
		light = new THREE.PointLight( 0xffffff, 10, 100 ); 
		light.position.set( 50, 50, 50 ); 
		this.scene.add( light );		
		this.loadModels();
		this.createGround();
	},
	createGround: function() {
		var geometry = new THREE.PlaneGeometry( 1000, 1000 ); 
		var material = new THREE.MeshBasicMaterial( {color: 0xDDDDDD} ); 
		this.ground = new THREE.Mesh(geometry, material);
		this.ground.rotateX(-Math.PI/2);
		this.scene.add(this.ground);
	},
	loadModels: function() {
		this.car = new Car(this.controls);
		this.car.loadMesh("./img/texture/", this.modelReady.bind(this));
		var world = new World(levels[0]);
		world.loadMesh("./img/texture/", new THREE.Vector3(-60,10,-60), this.modelReady.bind(this));
	},
	modelReady: function(mesh, protagonic) {
		this.scene.add(mesh);
		if (protagonic) {
			mesh.add(this.camera);
		}
		this.render();
	}
});

var global;
function startup() {
	global = new Global();
}