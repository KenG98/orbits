var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.body.appendChild(renderer.domElement);

var gs = new GravityCenter(0,0,0);
scene.add(gs.gravityBody);

var oneOrb = new Orb(100,100,0,1,1,1);
scene.add(oneOrb.orbBody);

//light (for shadows)
var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 0, 1000, 0 );
spotLight.castShadow = true;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 2000;
spotLight.shadowCameraFov = 50;
scene.add( spotLight );

//amvient light
var ambientLight = new THREE.AmbientLight( 0x555555 ); // soft white light
// var ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

camera.position.x = 300;
camera.position.y = 300;
camera.position.z = 300;
camera.lookAt({x:0,y:0,z:0});

function render(){
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();