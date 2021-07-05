import {MeshBasicMaterial, SphereGeometry, Mesh, Object3D} from 'three';

class SpaceBody {
    radius: number;
    segment: number;
    spin: number;
    orbitRotation: number;
    meshProps: any;
    body: Mesh;
    orbit: Object3D;

    constructor (
        radius: number,
        segment: number,
        spin: number,
        orbitRotation: number,
        meshProps: any,
        initPosition?: any | undefined,
    ) {
        this.radius = radius;
        this.segment = segment;
        this.spin = spin;
        this.orbitRotation = orbitRotation;
        this.meshProps = meshProps;

        // creating the body
        const material = new MeshBasicMaterial(meshProps);
        const geo = new SphereGeometry(radius, segment, segment);
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
