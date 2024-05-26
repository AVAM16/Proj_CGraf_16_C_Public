import * as THREE from 'three';
import { ParametricGeometry } from 'three/addons/geometries/ParametricGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';
import * as Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, renderer
var DirectionalLight
var camera
let normalMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});

let cylinderColor= 0x808080;
let ringColors=[0x880000, 0x888800, 0x008800]
let ringObjectsColor= 0x00ffff;
let mobiusStripColor= 0xff0000;
var carrossel, cylinder;
var mobiusStrip;
var size;
let mobiusStripLights=[];
let ringObjectsLights=[];
let rings=[];
let ringObjects=[];
let tubes1=[];
let tubes2=[];
let rings2=[];
let radius = [5, 15, 25, 35];
let texture = new THREE.TextureLoader().load('image.png');
let skydome;

const resetRenderer = () => renderer.setSize(window.innerWidth, window.innerHeight);
const setupRenderer = () => { resetRenderer(); document.body.appendChild(renderer.domElement); renderer.xr.enabled = true; }
/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene= new THREE.Scene();
    scene.add(new THREE.AxesHelper(10));
    createSkydome();
    createCarrossel();
    createLight();

}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.add(camera);
    camera.position.set(50,50,50);
    camera.lookAt(scene.position);
    const controls = new OrbitControls(camera, renderer.domElement);

}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createLight(){
    'use strict';
    // Cria uma luz direcional que incide com um ângulo diferente de zero
    // em relação à normal do plano xOz
    let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1); // ajuste a posição conforme necessário
    scene.add(directionalLight);

    // Armazena a luz direcional em uma variável global para que possamos ligá-la e desligá-la mais tarde
    DirectionalLight = directionalLight;

    // Cria uma luz ambiente com baixa intensidade e tom alaranjado
    let ambientLight = new THREE.AmbientLight(0xffa500, 0.2); // cor laranja, baixa intensidade
    scene.add(ambientLight);
    
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////
function createSkydome(){
    'use strict';
    let geometry = new THREE.SphereGeometry(500, 128, 128); // large sphere
    let material = new THREE.MeshNormalMaterial({ map: texture, side: THREE.BackSide });
    skydome = new THREE.Mesh(geometry, material);
    scene.add(skydome);
}

function createRingArray(innerorouter, segments){
    let array = [];
    for (let i = 0; i < segments; i++){
        let angle = i * Math.PI * 2 / segments;
        array.push(new THREE.Vector2(innerorouter * Math.cos(angle), innerorouter * Math.sin(angle)));
    }
    return array;
}

function createCarrossel(){
    'use strict';
    carrossel = new THREE.Object3D();
    scene.add(carrossel);
    let geometry = new THREE.CylinderGeometry(5, 5, 38);
    let material = new THREE.MeshNormalMaterial({side: THREE.FrontSide});
    cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 15, 0);
    carrossel.add(cylinder); 


    var firstRing;
    var firstTube;
    var firstTube2;
    var firstRing2;
    var secondRing;
    var secondTube;
    var secondTube2;
    var secondRing2;
    var thirdRing;
    var thirdTube;
    var thirdTube2;
    var thirdRing2;
    /*anel pequeno*/
    /*anel1*/
    let outer = new THREE.Shape(createRingArray(radius[1], 32));
    let inner = new THREE.Path(createRingArray(radius[0], 32));
    outer.holes = [inner];
    let extrudeSettings = { steps: 1, depth: 2};
    let ringGeometry = new THREE.ExtrudeGeometry(outer, extrudeSettings);
    firstRing = new THREE.Mesh(ringGeometry, material);
    firstRing.userData = {isMoving: false, speed: 0.2};
    firstRing.position.y=-18;
    firstRing.rotation.x = Math.PI/2;
    rings.push(firstRing);
    cylinder.add(firstRing);
    /*tubo1*/
    
    /*tubo2*/
    
    /*anel2*/


    /*anel médio*/
    /*anel 1*/
    outer = new THREE.Shape(createRingArray(radius[2], 24));
    inner = new THREE.Path(createRingArray(radius[1], 24));
    outer.holes = [inner];
    ringGeometry = new THREE.ExtrudeGeometry(outer, extrudeSettings);
    secondRing = new THREE.Mesh(ringGeometry, material);
    secondRing.userData = {isMoving: false, speed: 0.2};
    secondRing.position.y=-18;
    secondRing.rotation.x = Math.PI/2;
    rings.push(secondRing);
    cylinder.add(secondRing);
    /*tubo1*/

    /*tubo2*/
    
    /*anel2*/
    

    /*anel grande*/
    /*anel1*/
    outer = new THREE.Shape(createRingArray(radius[3], 24));
    inner = new THREE.Path(createRingArray(radius[2], 24));
    outer.holes = [inner];
    ringGeometry = new THREE.ExtrudeGeometry(outer, extrudeSettings);
    thirdRing = new THREE.Mesh(ringGeometry, material);
    thirdRing.userData = {isMoving: false, speed: 0.2};
    thirdRing.position.y=-18;
    thirdRing.rotation.x = Math.PI/2;
    rings.push(thirdRing);
    cylinder.add(thirdRing);
    /*tubo1*/
    
    /*tubo2*/
    
    /*anel2*/
    

    for (let i=0; i<rings.length; i++){
        size = i + 1;
        for (let j=0; j<8; j++){
            if(j == 0){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createSphere      ,25,25), normalMaterial);
            }
            else if(j == 1){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createTorus       ,25,25), normalMaterial);
            }
            else if(j == 2){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createCylinder    ,25,25), normalMaterial);
            }
            else if(j == 3){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createCone        ,25,25), normalMaterial);
            }
            else if(j == 4){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createPlane       ,25,25), normalMaterial);
            }
            else if(j == 5){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createCube        ,25,25), normalMaterial);
            }
            else if(j == 6){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createTrefoilKnot ,25,25), normalMaterial);
            }
            else if(j == 7){
                addSurfaceToRing(i, j*Math.PI/4, new ParametricGeometry(createHyperboloid ,25,25), normalMaterial);
            }
        }
    }
    createMobiusStrip();
}

function createMobiusStrip(){
    'use strict';


    let geometry = new THREE.BufferGeometry();
    let vertices = [];
    let indices = [];
    for (let i = 0; i <= 15; i++) {
        for (let j = 0; j <= 15; j++) {
            let u = i / 15 * 2 * Math.PI; // u = azimuthal angle
            let v = j / 15 * 2 - 1; // v = height along the band (-1 to 1)

            

            vertices.push(
                (1 + v/2 * Math.cos(u/2)) * Math.cos(u),
                (1 + v/2 * Math.cos(u/2)) * Math.sin(u),
                v/2 * Math.sin(u/2)
            );
            if (i < 15 && j < 15) {
                let a = i + j * 16;
                let b = (i + 1) + j * 16;
                let c = i + (j + 1) * 16;
                let d = (i + 1) + (j + 1) * 16;

                // Faces
                indices.push(a, b, d);
                indices.push(a, d, c);
            }
        }
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();
    geometry.setIndex(indices);

    let material= normalMaterial;
    mobiusStrip = new THREE.Mesh(geometry, material);
    mobiusStrip.scale.set(15, 15, 15);
    
    mobiusStrip.position.y=50;
    mobiusStrip.rotateX(Math.PI/2);
    cylinder.attach(mobiusStrip);

    for (let i=0; i<8; i++){
        let light = new THREE.PointLight(0xffffff, 200, 30);
        light.position.set(Math.cos(i * Math.PI / 4)*15, 50, Math.sin(i * Math.PI / 4)*15);
        carrossel.add(light);
        mobiusStripLights.push(light);
        //let helper = new THREE.PointLightHelper(light);
        //carrossel.add(helper);
    }

}

function createSphere( u, v, target) {
    let radius = 1 + 0.5 * size;
    let x = radius * Math.sin(u * Math.PI) * Math.cos(v * 2 * Math.PI);
    let y = radius * Math.sin(u * Math.PI) * Math.sin(v * 2 * Math.PI);
    let z = radius * Math.cos(u * Math.PI);
    target.set(x, y, z);
}

function createTorus(u, v, target) {
    let radius1 = size;
    let radius2 = size * 0.7;
    let angleU = u * Math.PI * 2;
    let angleV = v * Math.PI * 2;
    let x = (radius1 + radius2 * Math.cos(angleV)) * Math.cos(angleU);
    let y = (radius1 + radius2 * Math.cos(angleV)) * Math.sin(angleU);
    let z = radius2 * Math.sin(angleV);
    target.set(x, y, z);
}

function createCylinder(u, v, target) {
    let radius = 1 + 0.5 * size;
    let angle = u * Math.PI * 2;
    let x = Math.cos(angle) * radius;
    let y = v * size;
    let z = Math.sin(angle) * radius;
    target.set(x, y, z);
}

function createCone(u, v, target) {
    let radius = 1 + 0.5 * size;
    let angle = u * Math.PI * 2;
    let x = Math.cos(angle) * (v * radius);
    let y = v * size;
    let z = Math.sin(angle) * (v * radius);
    target.set(x, y, z);
}

function createPlane(u, v, target) {
    let x = u * size;
    let y = 0;
    let z = v * size*2;
    target.set(x, y, z);
}

function createCube(u, v, target) {
    let x = size * (Math.cos(u * Math.PI) * Math.sin(v * Math.PI) + 0.5);
    let y = size * (Math.sin(u * Math.PI) * Math.sin(v * Math.PI) + 0.5);
    let z = size * Math.cos(v * Math.PI);
    target.set(x, y, z);
}

function createTrefoilKnot(u, v, target) {
    let radius = 1 + 0.5 * size;
    let a = Math.PI * 2 * u;
    let b = v * Math.PI * 2;
    let x = radius * (Math.sin(a) * Math.cos(b) - Math.cos(a) * Math.sin(b) * Math.sin(2 * a));
    let y = radius * (Math.cos(a) * Math.cos(b) + Math.sin(a) * Math.sin(b) * Math.sin(2 * a));
    let z = radius * Math.sin(a) * Math.cos(2 * b);
    target.set(x, y, z);
}

function createHyperboloid(u, v, target) {
    let radius = 1 + 0.5 * size;
    let angleU = u * Math.PI * 2;
    let angleV = v * Math.PI - Math.PI / 2;
    let x = radius/2 * Math.cosh(angleV) * Math.cos(angleU);
    let y = size/2 * Math.sinh(angleV);
    let z = radius/2 * Math.cosh(angleV) * Math.sin(angleU);
    target.set(x, y, z);
}



function addSurfaceToRing(ring, angle, geometry, material){
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.x= Math.cos(angle) * (radius[ring]+5);
    mesh.position.z= Math.sin(angle) * (radius[ring]+5);
    mesh.position.y= 5;
    
    let randomAxis = new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize();
    geometry.parameters.axis = randomAxis;
    let quaternion = new THREE.Quaternion().setFromAxisAngle(randomAxis, Math.random() * Math.PI * 2);
    mesh.quaternion.copy(quaternion);

    let light = new THREE.SpotLight(0xffffff, 200, 8, Math.PI, 0.5, 2);
    light.position.set(mesh.position.x, 0, mesh.position.z);
    light.target = mesh;
    rings[ring].attach(light);
    ringObjectsLights.push(light);
    rings[ring].attach(mesh);
    ringObjects.push(mesh);
}

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';
    renderer = new THREE.WebGLRenderer({ antialias: true , physicallyCorrectLights: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( VRButton.createButton( renderer ) );
    setupRenderer();
    //background color
    renderer.setClearColor(0xADD8E6);
    document.body.appendChild(renderer.domElement);
    createScene();
    createCamera();
    createLight();


    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    carrossel.rotation.y+=0.005;
    //move rings up and down
    for (let i=0; i<rings.length; i++){
        if(rings[i].userData.isMoving){
            rings[i].position.y+=rings[i].userData.speed;
            if(rings[i].position.y>=19 || rings[i].position.y<=-18){
                rings[i].userData.speed*=-1;
            }
        }
    }
    for (let j=0; j < ringObjects.length; j++){
        let deltaRotationQuaternion = new THREE.Quaternion().setFromAxisAngle(ringObjects[j].geometry.parameters.axis, 0.02);
        ringObjects[j].quaternion.multiplyQuaternions(deltaRotationQuaternion, ringObjects[j].quaternion);
    }

    render();
}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
        
    camera.updateProjectionMatrix();

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49: //1
            rings[0].userData.isMoving = true;
            break;
        case 50: //2
            rings[1].userData.isMoving = true;
            break;
        case 51: //3
            rings[2].userData.isMoving = true;
            break;
        case 81: //Q
        case 113: //q
            skydome.material = new THREE.MeshLambertMaterial({ map:texture, side: THREE.BackSide});
            cylinder.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: cylinderColor, flatShading: false});
            mobiusStrip.material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: mobiusStripColor,flatShading: false});
            for (let i = 0; i < rings.length; i++){
                rings[i].material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: ringColors[i],flatShading: false});
            }
            for (let j=0; j<ringObjects.length; j++){
                ringObjects[j].material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: ringObjectsColor, flatShading: false});
            }
            break;
        case 87: //W
        case 119: //w
            skydome.material = new THREE.MeshPhongMaterial({ map:texture, side: THREE.BackSide});
            cylinder.material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: cylinderColor, flatShading: false});
            mobiusStrip.material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: mobiusStripColor, flatShading: false});
            for (let i = 0; i < rings.length; i++){
                rings[i].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: ringColors[i], flatShading: false});
                tubes1[i].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: ringColors[i], flatShading: false});
                tubes2[i].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: ringColors[i], flatShading: false});
                rings2[i].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: ringColors[i], flatShading: false});
            }
            for (let j=0; j<ringObjects.length; j++){
                ringObjects[j].material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: ringObjectsColor})
            }
            break;
        case 69: //E
        case 101: //e
            skydome.material = new THREE.MeshToonMaterial({ map: texture, side: THREE.BackSide});
            cylinder.material = new THREE.MeshToonMaterial({ side: THREE.DoubleSide, color: cylinderColor});
            mobiusStrip.material = new THREE.MeshToonMaterial({ side: THREE.DoubleSide, color: mobiusStripColor});
            for (let i = 0; i < rings.length; i++){
                rings[i].material = new THREE.MeshToonMaterial({ side: THREE.DoubleSide, color: ringColors[i]});
            }
            for (let j=0; j<ringObjects.length; j++){
                ringObjects[j].material = new THREE.MeshToonMaterial({ side: THREE.DoubleSide, color: ringObjectsColor});
            }
            break;
        case 82: //R
        case 114: //r
            skydome.material = normalMaterial;
            cylinder.material = normalMaterial;
            mobiusStrip.material = normalMaterial;
            for (let i = 0; i < rings.length; i++){
                rings[i].material = normalMaterial;
            }
            for (let j=0; j<ringObjects.length; j++){
                ringObjects[j].material = normalMaterial;
            }
            break;
        case 84: //T
        case 116: //t
            skydome.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
            cylinder.material= new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: cylinderColor});
            mobiusStrip.material= new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: mobiusStripColor});
            for (let i = 0; i < rings.length; i++){
                rings[i].material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: ringColors[i]});

            }
            for (let j=0; j<ringObjects.length; j++){
                ringObjects[j].material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, color: ringObjectsColor});
            }
            break;
        case 68: //D
        case 100: //d
            DirectionalLight.visible = !DirectionalLight.visible;
            break;
        case 80://S
        case 112://s
            for (let i = 0; i < mobiusStripLights.length; i++) {
                mobiusStripLights[i].visible = !mobiusStripLights[i].visible;
            }
            break;
        case 83://P
        case 115://p
            for (let i = 0; i < ringObjectsLights.length; i++) {
                ringObjectsLights[i].visible = !ringObjectsLights[i].visible;
            }
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch (e.keyCode) {
        case 49: //1
            rings[0].userData.isMoving = false;
            break;
        case 50: //2
            rings[1].userData.isMoving = false;
            break;
        case 51: //3
            rings[2].userData.isMoving = false;
            break;
    }
}

init();
renderer?.setAnimationLoop(animate);