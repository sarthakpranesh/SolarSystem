import * as THREE from 'three';
import {PointLight, Vector3} from 'three';
import {OrbitControls} from './src/lib/OrbitControls.js';
import SpaceBody, {SpaceBodyParams} from './src/components/SpaceBody';

// loading images
const s = require('./assets/texture/sun.jpg');
const m = require('./assets/texture/mercury.jpeg');
const v = require('./assets/texture/venus.jpg');
const e = require('./assets/texture/earth.jpeg')
const em = require('./assets/texture/moon.jpg');
const ma = require('./assets/texture/mars.jpeg');
const j = require('./assets/texture/jupiter.jpeg');
const sa = require('./assets/texture/saturn.jpeg');
const u = require('./assets/texture/uranus.jpg');
const n = require('./assets/texture/neptune.jpeg');

const loader = new THREE.TextureLoader();
// loading textures
const sunTexture = loader.load(s);
const mercuryTexture = loader.load(m);
const venusTexture = loader.load(v);
const earthTexture = loader.load(e);
const moonTexture = loader.load(em);
const marsTexture = loader.load(ma);
const jupiterTexture = loader.load(j);
const saturnTexture = loader.load(sa);
const uranusTexture = loader.load(u);
const neptuneTexture = loader.load(n);

// Basic setup for scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// some offsets to keep everything sane
const offsets = {
    radius: 2000,
    spin: 1000000,
    orbitRotation: 10000,
    distanceOffset: 100000,
}

const spaceBodies = [];

// sun
const sunProps: SpaceBodyParams = {
    radius: 696340/offsets.radius,
    spin: 119.82/offsets.spin,
    orbitRotation: 0,
    meshMaterial: {
        map: sunTexture,
    },
    initPosition: new Vector3(),
}
const sun = new SpaceBody(sunProps);
scene.add(sun.orbit);
spaceBodies.push(sun);
// add sunlight
const sunLight = new PointLight('white', 1, 1000, 0.1);
scene.add(sunLight);

// add sun light :>, no lights :< material texture needed
const light = new THREE.PointLight( 'yellow', 10, 1000 );
light.position.set(100, 0, 0);
scene.add(light);

// mercury - all other planets follow the same prop definitions 
const mercuryProps: SpaceBodyParams = {
    radius: 2439.7/offsets.radius, // actual size of mercury in km divided by offset
    spin: -10.83/offsets.spin, // actual spin speed of mercury in km/h divided by offset and negative because almost all spin counter-clockwise
    orbitRotation: 47.36/offsets.orbitRotation, // actual mean orbit velocity in km/s divided by offset and relevant sign to say about direction or rotation
    meshMaterial: {
        map: mercuryTexture,
    }, // close to actual texture - taken from online resources
    initPosition: new Vector3(
        57900000/offsets.distanceOffset
    ), // actual distance of mercury from sun in km divided by offset
}
const mercury = new SpaceBody(mercuryProps);
scene.add(mercury.orbit);
spaceBodies.push(mercury);

// venus
const venusProps: SpaceBodyParams = {
    radius: 6051.8/offsets.radius,
    spin: -6.52/offsets.spin,
    orbitRotation: 35.02/offsets.orbitRotation,
    meshMaterial: {
        map: venusTexture,
    },
    initPosition: new Vector3(
        108200000/offsets.distanceOffset,
    ),
}
const venus = new SpaceBody(venusProps);
scene.add(venus.orbit);
spaceBodies.push(venus);

// earth
const earthProps: SpaceBodyParams = {
    radius: 6378.1/offsets.radius,
    spin: -1674/offsets.spin,
    orbitRotation: 29.78/offsets.orbitRotation,
    meshMaterial: {
        map: earthTexture,
    },
    initPosition: new Vector3(
        149600000/offsets.distanceOffset,
    ),
}
const earth = new SpaceBody(earthProps);
scene.add(earth.orbit);
spaceBodies.push(earth);
const moonProps: SpaceBodyParams = {
    radius: 1738.1/offsets.radius,
    spin: -0.002,
    orbitRotation: 0.004,
    meshMaterial: {
        map: moonTexture,
    },
    initPosition: new Vector3(
        20,
    )
}
const moon = new SpaceBody(moonProps);
earth.body.add(moon.orbit);
spaceBodies.push(moon);

// mars
const marsProps: SpaceBodyParams = {
    radius: 3396.2/offsets.radius,
    spin: -866/offsets.spin,
    orbitRotation: 24/offsets.orbitRotation,
    meshMaterial: {
        map: marsTexture,
    },
    initPosition: new Vector3(
        227900000/offsets.distanceOffset,
    ),
}
const mars = new SpaceBody(marsProps);
scene.add(mars.orbit);
spaceBodies.push(mars);

// jupiter
const jupiterProps: SpaceBodyParams = {
    radius: 71492/offsets.radius,
    spin: -45583/offsets.spin,
    orbitRotation: 13.07/offsets.orbitRotation,
    meshMaterial: {
        map: jupiterTexture,
    },
    initPosition: new Vector3(
        778600000/offsets.distanceOffset,
    ),
}
const jupiter = new SpaceBody(jupiterProps);
scene.add(jupiter.orbit);
spaceBodies.push(jupiter);

// saturn
const saturnProps: SpaceBodyParams = {
    radius: 60268/offsets.radius,
    spin: -36840/offsets.spin,
    orbitRotation: 9.68/offsets.orbitRotation,
    meshMaterial: {
        map: saturnTexture,
    },
    initPosition: new Vector3(
        1433500000/offsets.distanceOffset,
    ),
}
const saturn = new SpaceBody(saturnProps);
scene.add(saturn.orbit);
spaceBodies.push(saturn);

// uranus
const uranusProps: SpaceBodyParams = {
    radius: 25559/offsets.radius,
    spin: -14794/offsets.spin,
    orbitRotation: 6.8/offsets.orbitRotation,
    meshMaterial: {
        map: uranusTexture,
    },
    initPosition: new Vector3(
        2872500000/offsets.distanceOffset,
    ),
}
const uranus = new SpaceBody(uranusProps);
scene.add(uranus.orbit);
spaceBodies.push(uranus);

// neptune
const neptuneProps:SpaceBodyParams = {
    radius: 24764/offsets.radius,
    spin: -9719/offsets.spin,
    orbitRotation: 5.43/offsets.orbitRotation,
    meshMaterial: {
        map: neptuneTexture,
    },
    initPosition: new Vector3(
        4495100000/offsets.distanceOffset,
    ),
}
const neptune = new SpaceBody(neptuneProps);
scene.add(neptune.orbit);
spaceBodies.push(neptune);

// adding a orbit controller
const orbitController = new OrbitControls(camera, renderer.domElement);
orbitController.update();

// shift camera
camera.position.z = 1000;

function animate () {
    requestAnimationFrame(animate);
    spaceBodies.forEach((b) => {
        b.animate();
    });

    renderer.render(scene, camera);
}


const planetDiv = document.getElementById('planets');
const planetNames = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
[
    sun,
    mercury,
    venus,
    earth,
    mars,
    jupiter,
    saturn,
    uranus,
    neptune
].forEach((planet, index) => {
    const selectPlanet = () => {
        planet.body.add(camera);
        camera.position.z = planet.radius*8;
    }
    const a = document.createElement('a');
    a.onclick = selectPlanet;
    a.innerText = planetNames[index];
    planetDiv.append(a);
});

animate();
