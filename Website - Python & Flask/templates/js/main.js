"use strict";

/* global THREE */

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.physicallyCorrectLights = true;

  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20);
  camera.lookAt(0, 0, 0);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");
  var controls = new THREE.OrbitControls(camera, renderer.domElement);

  //controls.update() must be called after any manual changes to the camera's transform
  camera.position.set(1, 15, 20);
  controls.update();

  function animate() {
    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    // controls.update();

    renderer.render(scene, camera);
  }

  const loader = new THREE.TextureLoader();

  {
    const planeSize = 200;
    const texture = loader.load(
      "https://cors-anywhere.herokuapp.com/https://previews.123rf.com/images/vectora/vectora1601/vectora160100138/51198785-contrasty-checkered-background-abstract-surreal-texture-vector-.jpg"
    );
    // const texture = loader.load('https://cors-anywhere.herokuapp.com/https://opengameart.org/sites/default/files/StoneFloorTexture.png');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 4;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    planeMat.color.setRGB(1.5, 1.5, 1.5);
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh);
  }

  const shadowTexture = loader.load(
    "https://threejsfundamentals.org/threejs/resources/images/roundshadow.png"
  );
  const sphereShadowBases = [];
  {
    const sphereRadius = 1;
    const sphereWidthDivisions = 16;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereBufferGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    );

    const planeSize = 1;
    const shadowGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);

    const numSpheres = 10;
    for (let i = 0; i < numSpheres; ++i) {
      // make a base for the shadow and the sphere.
      // so they move together.
      const base = new THREE.Object3D();
      scene.add(base);

      // add the shadow to the base
      // note: we make a new material for each sphere
      // so we can set that sphere's material transparency
      // separately.
      const shadowMat = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true, // so we can see the ground
        depthWrite: false // so we don't have to sort
      });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.position.y = 0.001; // so we're above the ground slightly
      shadowMesh.rotation.x = Math.PI * -0.5;
      const shadowSize = sphereRadius * 4;
      shadowMesh.scale.set(shadowSize, shadowSize, shadowSize);
      base.add(shadowMesh);

      // add the sphere to the base
      const u = i / numSpheres;
      const boxWidth = 2;
      const boxHeight = 2;
      const boxDepth = 2;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
      // const sphereMat = new THREE.MeshBasicMaterial({
      //   map: loader.load(
      //     "assets/Logo.jpg"
      //   )
      // });
      const sphereMat = [
        new THREE.MeshBasicMaterial({map: loader.load('assets/Logo.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('assets/Logo.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-3.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-4.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-5.jpg')}),
        new THREE.MeshBasicMaterial({map: loader.load('resources/images/flower-6.jpg')}),
      ];
      // const sphereMat = new THREE.MeshPhongMaterial();
      // sphereMat.color.setHSL(u, 1, .75);
      // const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      const sphereMesh = new THREE.Mesh(geometry, sphereMat);
      sphereMesh.position.set(0, sphereRadius + 2, 0);
      base.add(sphereMesh);

      // remember all 3 plus the y position
      sphereShadowBases.push({
        base,
        sphereMesh,
        shadowMesh,
        y: sphereMesh.position.y
      });
    }
  }

  {
    const skyColor = 0xffffff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 2;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 5);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001; // convert to seconds

    resizeRendererToDisplaySize(renderer);

    {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    sphereShadowBases.forEach((sphereShadowBase, ndx) => {
      const { base, sphereMesh, shadowMesh, y } = sphereShadowBase;

      // u is a value that goes from 0 to 1 as we iterate the spheres
      const u = ndx / sphereShadowBases.length;

      // compute a position for there base. This will move
      // both the sphere and its shadow
      const speed = time * 0.2;
      const angle = speed + u * Math.PI * 2 * (ndx % 1 ? 1 : -1);
      const radius = Math.sin(speed - ndx) * 12;
      base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

      // yOff is a value that goes from 0 to 1
      const yOff = Math.abs(Math.sin(time * 2 + ndx));
      // move the sphere up and down
      sphereMesh.position.y = y + THREE.Math.lerp(-2, 2, yOff);
      // fade the shadow as the sphere goes up
      shadowMesh.material.opacity = THREE.Math.lerp(1, 0.25, yOff);
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
