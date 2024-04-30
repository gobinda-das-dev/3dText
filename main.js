import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import * as dat from 'dat.gui';

const gui = new dat.GUI();

const textureLoader = new THREE.TextureLoader();
const matcap1 = textureLoader.load('matcaps/11.png');




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setPixelRatio = 2;

camera.position.z = 5;

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
})

const controls = new OrbitControls(camera, renderer.domElement);
// controls.autoRotate = true;
controls.enableDamping = true;

// const axesHelper = new THREE.AxesHelper();
// scene.add( axesHelper );
const fontLoader = new FontLoader();

fontLoader.load(
	// 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	'Kanit Light_Regular.json',
	// './public/Gilroy Light_Regular.json',
	font => {
		const textGeometry = new TextGeometry(
			'Gobinda Das',
			{
				font: font,
				size: 1,
				depth: 0.5,
				curveSegments: 10,
				// bevelEnabled: true,
        bevelThickness: 0.1,
        bevelSize: 0.2,
        bevelOffset: 0.05,
        bevelSegments: 1,
			}
		);
		// textGeometry.computeBoundingBox();
		// textGeometry.translate(
		// 	- (textGeometry.boundingBox.max.x - 0.2) / 2,
		// 	- (textGeometry.boundingBox.max.y - 0.2) / 2,
		// 	- (textGeometry.boundingBox.max.z - 0.2) / 2,
		// )
		textGeometry.center();
		
		const material = new THREE.MeshMatcapMaterial({ matcap: matcap1 });
		// material.wireframe = true;
		const text = new THREE.Mesh(textGeometry, material);
		scene.add(text);

		const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
		for(let i = 0; i < 300; i++) {
			const donut = new THREE.Mesh(donutGeometry, material);

			donut.position.x = (Math.random() - 0.5) * 10;
			donut.position.y = (Math.random() - 0.5) * 10;
			donut.position.z = (Math.random() - 0.5) * 10;
			
			donut.rotation.x = Math.random() * Math.PI;
			donut.rotation.y = Math.random() * Math.PI;

			const scale = Math.random();
			donut.scale.set(scale, scale, scale);
			scene.add(donut);
		}
	}
)






function animate() {
	requestAnimationFrame( animate );

	controls.update();
	renderer.render( scene, camera );
}

animate();