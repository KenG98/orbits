//scene and camera
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


//renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);


//gravity center
var gravityPosition = {x:0, y:0, z:0};
var gravityStrength = 0.1;
var gravityGeometry = new THREE.SphereGeometry(30);
var gravityMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var gravityBody = new THREE.Mesh(gravityGeometry, gravityMaterial);
gravityBody.castShadow = true;
gravityBody.receiveShadow = true;
gravityBody.position.x = gravityPosition.x;
gravityBody.position.y = gravityPosition.y;
gravityBody.position.z = gravityPosition.z;
scene.add(gravityBody);


//orb
var orbPosition = {x:100, y:0, z: 0};
var orbForce = {x:0, y:0, z:2};
var orbGeometry = new THREE.SphereGeometry(10);
var orbMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
var orbBody = new THREE.Mesh(orbGeometry, orbMaterial);
orbBody.castShadow = true;
orbBody.receiveShadow = true;
orbBody.position.x = orbPosition.x;
orbBody.position.y = orbPosition.y;
orbBody.position.z = orbPosition.z;
scene.add(orbBody);


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

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 300;
camera.lookAt({x:0,y:0,z:0});

function moveOrb(){
	var deltaX = orbPosition.x - gravityPosition.x;
	var deltaY = orbPosition.y - gravityPosition.y;
	var deltaZ = orbPosition.z - gravityPosition.z;
	var distanceToGrav = Math.sqrt(deltaX*deltaX + deltaY*deltaY + deltaZ*deltaZ);
	deltaX /= distanceToGrav; 
	deltaX *= gravityStrength;
	deltaY /= distanceToGrav; 
	deltaY *= gravityStrength;
	deltaZ /= distanceToGrav; 
	deltaZ *= gravityStrength;
	orbForce.x -= deltaX;
	orbForce.y -= deltaY;
	orbForce.z -= deltaZ;
	orbPosition.x += orbForce.x;
	orbPosition.y += orbForce.y;
	orbPosition.z += orbForce.z;
	orbBody.position.x = orbPosition.x;
	orbBody.position.y = orbPosition.y;
	orbBody.position.z = orbPosition.z;
}

function render(){
	//move the orb
	moveOrb();
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();