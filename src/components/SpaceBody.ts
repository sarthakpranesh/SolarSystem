import {MeshBasicMaterial, SphereGeometry, Mesh, Object3D, Vector3, MeshBasicMaterialParameters} from 'three';

export type SpaceBodyParams = {
    radius: number,
    spin: number,
    orbitRotation: number,
    meshMaterial: MeshBasicMaterialParameters,
    initPosition?: Vector3,
}

class SpaceBody {
    radius: number;
    segment: number;
    spin: number;
    orbitRotation: number;
    meshMaterial: MeshBasicMaterialParameters;
    body: Mesh;
    orbit: Object3D;

    constructor ({
        radius,
        spin,
        orbitRotation,
        meshMaterial,
        initPosition,
    }: SpaceBodyParams) {
        this.radius = radius;
        this.segment = 32;
        this.spin = spin;
        this.orbitRotation = orbitRotation;
        this.meshMaterial = meshMaterial;

        // creating the body
        const material = new MeshBasicMaterial(meshMaterial);
        const geo = new SphereGeometry(radius, this.segment, this.segment);
        this.body = new Mesh(geo, material);
        // body's orbit, to make it revolve around another body
        this.orbit = new Object3D();
        // reposition the body
        if (initPosition !== undefined) {
            this.body.position.x = initPosition.x || 0;
            this.body.position.y = initPosition.y || 0;
            this.body.position.z = initPosition.z || 0;
        }
        // add body to the orbit
        this.orbit.add(this.body);
    }

    // animate body
    animate () {
        // spin the body
        this.body.rotation.z -= this.spin;
        // revolve the orbit bodies
        this.orbit.rotation.z -= this.orbitRotation;
    }
}

export default SpaceBody;
