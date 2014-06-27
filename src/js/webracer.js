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
		this.placeholders = { purchase: new THREE.Object3D() };
		this.scene.add(this.camera);		
		this.input = new Input();
		document.body.appendChild(this.renderer.domElement);
		window.addEventListener('resize', this.resize.bind(this), false);
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
		this.findObject();
		this.updateState();
		this.renderer.render(this.scene, this.camera);
		this.stats.update();
	},
	findObject : function() {
		if(this.input.lastClick) {
			var vector = new THREE.Vector3( ( this.input.lastClick.clientX / window.innerWidth ) * 2 - 1, - ( this.input.lastClick.clientY / window.innerHeight ) * 2 + 1, 0.5 );
			var projector = new THREE.Projector();
			projector.unprojectVector(vector, this.camera);
			var raycaster = new THREE.Raycaster(this.camera.position, vector.sub(this.camera.position).normalize());
			var intersects = raycaster.intersectObjects(this.scene.children, true);
			
			if (intersects.length > 0) {
				console.log(intersects);
			}
			this.input.clearClick();
		}
	},
	updateState: function() {	
		var delta = this.clock.getDelta();
		if (this.car && this.car.mesh) {
			this.car.update(this.input, delta);

			// Camera update
			this.car.mesh.updateMatrixWorld();
			this.camera.position.set(0,0,0);
			this.camera.updateMatrixWorld();
			this.camera.applyMatrix(this.placeholders.purchase.matrixWorld);
			this.camera.lookAt(this.car.mesh.position);
			this.camera.rotateOnAxis(new THREE.Vector3(1,0,0),0.4);
		}
	},
	fillScene: function() {
		var light = new THREE.AmbientLight( 0x404040 ); // soft white light scene.add( light );
		this.scene.add(light);
		light = new THREE.PointLight( 0xffffff, 10, 100 ); 
		light.position.set( 50, 50, 50 ); 
		this.scene.add( light );		
		this.loadModels();
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
			this.placeholders.purchase.position.set(0,10,30);
			mesh.add(this.placeholders.purchase);
		}
		this.render();
	}
});

var global;
function startup() {
	global = new Global();
}