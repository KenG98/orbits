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
var gravityPull = 0.1;
var gravityGeometry = new THREE.SphereGeometry(30);
var gravityMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
var gravityBody = new THREE.Mesh(gravityGeometry, gravityMaterial);
gravityBody.castShadow = true;
gravityBody.receiveShadow = true;
gravityBody.position = gravityPosition;
scene.add(gravityBody);


//orb
var orbPosition = {x:100, y:100, z: 100};
var orbForce = {x:1, y:1, z: 1};
var orbGeometry = new THREE.SphereGeometry(10);
var orbMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00});
var orbBody = new THREE.Mesh(orbGeometry, orbMaterial);
orbBody.castShadow = true;
orbBody.receiveShadow = true;
orbBody.position = orbPosition;
scene.add(orbBody);


//spotlight
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 1000, 0 );
spotLight.castShadow = true;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 2000;
spotLight.shadowCameraFov = 50;
scene.add( spotLight );
//amvient light
var ambientLight = new THREE.AmbientLight( 0x555555 );
scene.add( ambientLight );

camera.position.x = 300;
camera.position.y = 300;
camera.position.z = 300;
camera.lookAt({x:0,y:0,z:0});

function render(){
	//move the orb
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();