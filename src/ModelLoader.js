import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
import MTLLoader from 'three-mtl-loader';


OBJLoader(THREE);
MTLLoader(THREE);

export default class {

    constructor() {
        this.cache = {};
    }

    load(model) {

        if(this.cache[model]) {
            let cacheEntry = this.cache[model];
            if(cacheEntry instanceof Promise) {
                return cacheEntry.then((mesh) => mesh.clone());
            }

            return new Promise((resolve, reject) => resolve(cacheEntry.clone()));
        }

        let promise = new Promise((resolve, reject) => {                    
            var mtlLoader = new MTLLoader();
            var loader = new THREE.OBJLoader();

            mtlLoader.setTexturePath('assets/');
            mtlLoader.load(`assets/${model}.mtl`, matl => {          
                loader.setMaterials(matl);
                loader.load( `assets/${model}.obj`, (mesh) => {
                    this.cache[model] = mesh;
                    resolve(mesh);
                });
            }); 
        });

        this.cache[model] = promise;
        return promise;
    }
}