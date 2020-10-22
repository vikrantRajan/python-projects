// import * as THREE from "/static/js/three.module.js";
// // https://cors-anywhere.herokuapp.com/
// import Stats from "stats.module.js";

var camera, scene, renderer, stats;
var pointLight, pointLight2, pointLight3;
const raycaster = new THREE.Raycaster();
let timer = false;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 10, 40);

  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x111122));

  // lights

  function createLight(color) {
    var intensity = 2;

    var pointLight = new THREE.PointLight(color, intensity, 20);
    pointLight.castShadow = true;
    pointLight.shadow.camera.near = 1;
    pointLight.shadow.camera.far = 60;
    pointLight.shadow.bias = -0.005; // reduces self-shadowing on double-sided objects

    var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    var material = new THREE.MeshBasicMaterial({ color: color });
    material.color.multiplyScalar(intensity);
    var sphere = new THREE.Mesh(geometry, material);
    pointLight.add(sphere);

    var texture = new THREE.CanvasTexture(generateTexture());
    texture.magFilter = THREE.NearestFilter;
    texture.wrapT = THREE.RepeatWrapping;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.set(3, 10);

    var geometry = new THREE.BoxGeometry(3, 3, 3);
    var material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
      alphaMap: texture,
      alphaTest: 0.8,
    });

    var sphere = new THREE.Mesh(geometry, material);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    pointLight.add(sphere);

    // custom distance material
    var distanceMaterial = new THREE.MeshDistanceMaterial({
      alphaMap: material.alphaMap,
      alphaTest: material.alphaTest,
    });
    sphere.customDistanceMaterial = distanceMaterial;

    return pointLight;
  }
  pointLight = createLight(0x3400ff);
  pointLight2 = createLight(0x3400ff);
  pointLight3 = createLight(0x3400ff);
  scene.add(pointLight);

  //

  setTimeout(() => {
    scene.remove(pointLight);
    pointLight = createLight(0x0088ff);
    scene.add(pointLight);
  }, 4 * 1000);
  setTimeout(() => {
    scene.remove(pointLight);
    pointLight = createLight(0x32ff00);
    scene.add(pointLight);
  }, 8 * 1000);
  setTimeout(() => {
    scene.remove(pointLight);
    pointLight = createLight(0xff0000);
    scene.add(pointLight);
  }, 12 * 1000);
  setTimeout(() => {
    scene.remove(pointLight);
    pointLight2 = createLight(0x3400ff);
    scene.add(pointLight2);
  }, 20 * 1000);
  setTimeout(() => {
    scene.remove(pointLight2);
    pointLight2 = createLight(0x0088ff);
    scene.add(pointLight2);
  }, 26 * 1000);
  setTimeout(() => {
    scene.remove(pointLight2);
    pointLight2 = createLight(0x32ff00);
    scene.add(pointLight2);
  }, 30 * 1000);
  setTimeout(() => {
    scene.remove(pointLight2);
    pointLight2 = createLight(0xff0000);
    scene.add(pointLight2);
  }, 35 * 1000);
  setTimeout(() => {
    scene.remove(pointLight2);
    pointLight3 = createLight(0x3400ff);
    scene.add(pointLight3);
  }, 40 * 1000);
  setTimeout(() => {
    scene.remove(pointLight3);
    pointLight3 = createLight(0x0088ff);
    scene.add(pointLight3);
  }, 46 * 1000);
  setTimeout(() => {
    scene.remove(pointLight3);
    pointLight3 = createLight(0x32ff00);
    scene.add(pointLight3);
  }, 50 * 1000);
  setTimeout(() => {
    scene.remove(pointLight3);
    pointLight3 = createLight(0xff0000);
    scene.add(pointLight3);
  }, 55 * 1000);
  setTimeout(() => {
    scene.remove(pointLight3);
    pointLight = createLight(0x3400ff);
    scene.add(pointLight);
  }, 60 * 1000);

  var geometry = new THREE.BoxBufferGeometry(44, 30, 30);

  var material = new THREE.MeshPhongMaterial({
    color: 0xa0adaf,
    shininess: 10,
    specular: 0x111111,
    side: THREE.BackSide,
  });

  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 10;
  mesh.receiveShadow = true;
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  document.body.appendChild(renderer.domElement);
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function generateTexture() {
  var canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;

  var context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 1, 2, 1);

  return canvas;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  var time = performance.now() * 0.001;

  pointLight.position.x = Math.sin(time * 0.6) * 9;
  pointLight.position.y = Math.sin(time * 0.7) * 9 + 6;
  pointLight.position.z = Math.sin(time * 0.8) * 9;

  // pointLight.rotation.x = time;
  pointLight.rotation.y = time;
  // pointLight.rotation.z = time;

  time += 10000;

  pointLight2.position.x = Math.sin(time * 0.6) * -9;
  pointLight2.position.y = Math.sin(time * 0.7) * -9 + 9;
  pointLight2.position.z = Math.sin(time * 0.8) * -9;

  pointLight2.rotation.x = time;

  pointLight3.position.x = Math.sin(time * 0.6) * 9;
  pointLight3.position.y = Math.sin(time * 0.7) * 9 + 9;
  pointLight3.position.z = Math.sin(time * 0.8) * 9;

  pointLight3.rotation.z = time;

  renderer.render(scene, camera);
}
