// constants
var G = 0.03; // gravity, usually 9.8 in real life
var numOrbs = 10;

//scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);


// orbs
var orbs = [];
for (var i = 0; i < numOrbs; i++) {
	var orb = {
		location: {
			x: -200 + Math.random() * 400,
			y: -100 + Math.random() * 200,
			z: -100 + Math.random() * 200
		},
		velocity: { x: 0, y: 0, z: 0 }
	};
	// orb.mass = 10 + Math.random() * 5;
	orb.mass = 10;
	orb.geometry = new THREE.SphereGeometry(orb.mass);
	var randomColor ='#' + Math.random().toString(16).slice(-6);
	orb.material = new THREE.MeshLambertMaterial({color: randomColor});
	orb.body = new THREE.Mesh(orb.geometry, orb.material);
	orb.body.castShadow = true;
	orb.body.receiveShadow = true;
	orb.body.position.x = orb.location.x;
	orb.body.position.y = orb.location.y;
	orb.body.position.z = orb.location.z;
	scene.add(orb.body);
	orbs.push(orb);
}


// add the floor
var boxGeo = new THREE.BoxGeometry(200, 5, 200);
var boxMaterial = new THREE.MeshBasicMaterial( {color: 0x00cc00} );
var cube = new THREE.Mesh( boxGeo, boxMaterial );
cube.castShadow = true;
cube.recieveShadow = true;
cube.position.y = -60;
scene.add( cube );


//spotlight
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 1000, 0 );
spotLight.castShadow = true;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 2000;
spotLight.shadowCameraFov = 50;
scene.add( spotLight );
//ambient light
var ambientLight = new THREE.AmbientLight( 0x555555 );
scene.add( ambientLight );

// camera
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 300;
camera.lookAt({x:0,y:0,z:0});


function moveOrbs(){
	// i is the orb we're focussing on
	for (var i = 0; i < numOrbs; i++) {
		// n is the orb we're giving it gravity from
		for (var n = 0; n < numOrbs; n++) {
			// make sure i and n are not the same orb
			if (i != n) {
				var deltaX = orbs[i].location.x - orbs[n].location.x;
				var deltaY = orbs[i].location.y - orbs[n].location.y;
				var deltaZ = orbs[i].location.z - orbs[n].location.z;
				var distanceSqr = deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ;
				// make sure we don't divide by zero
				distanceSqr = (distanceSqr == 0) ? 1 : distanceSqr;
				var distance = Math.sqrt(distanceSqr) / G;
				// var force = G * orbs[i].mass * orbs[n].mass / distanceSqr;
				// this is not the real equation, this is for my conveneince,
				// real x y and z would depend on trigonometric functions.
				// real life would also use the F=GMm/r^2 formula for gravity
				orbs[i].velocity.x += -deltaX / distance; // * force;
				orbs[i].velocity.y += -deltaY / distance; // * force;
				orbs[i].velocity.z += -deltaZ / distance; // * force;
			}
		}
	}
	// actually do some moving
	for (var i = 0; i < numOrbs; i++) {
		orbs[i].location.x += orbs[i].velocity.x;
		orbs[i].location.y += orbs[i].velocity.y;
		orbs[i].location.z += orbs[i].velocity.z;
		orbs[i].body.position.x = orbs[i].location.x;
		orbs[i].body.position.y = orbs[i].location.y;
		orbs[i].body.position.z = orbs[i].location.z;
	}
}

$('body').mousemove(function( event ) {
	camera.position.x = -50 + 100 * (event.pageX / $('body').width());
	camera.position.y = -50 + 100 * (event.pageY / $('body').height());
	camera.position.z = 300 - Math.abs(camera.position.x) - Math.abs(camera.position.y);
	camera.lookAt({x:0,y:0,z:0});
});

function render(){
	//move the orb
	moveOrbs();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();
