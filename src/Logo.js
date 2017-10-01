import * as THREE from 'three';
import MTLLoader from 'three-mtl-loader';

export default class extends THREE.Object3D {
    constructor(loader) {
        super();    
        
        loader.load('Hackathon').then((mesh) => this.add(mesh));

        this.rotationAxis = new THREE.Vector3(1,2,3).normalize();
        this.rotationSpeed = 1;
        this.scale.set(0.2,0.2,0.2);

        this.isDestroyed = false;
    }

    update(deltaSeconds) {  
        this.rotateOnAxis(this.rotationAxis, this.rotationSpeed * deltaSeconds);
    }
}