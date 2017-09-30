import * as THREE from 'three';
import MTLLoader from 'three-mtl-loader';

export default class extends THREE.Object3D {
    constructor(loader) {
        super();    
        
        loader.load('Hackathon').then((mesh) => this.add(mesh));

        this.rotationAxis = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5).normalize();
        this.rotationSpeed = Math.random() * 0.4;

        this.isDestroyed = false;
    }

    update(deltaSeconds) {  
        this.rotateOnAxis(this.rotationAxis, this.rotationSpeed * deltaSeconds);
    }
}