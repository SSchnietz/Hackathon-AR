import * as THREE from 'three';

import ModelLoader from 'ModelLoader';
import Logo from 'Logo';
import * as THREEx from 'ar.js';

class Game {

    constructor() {     
        this.camera = new THREE.Camera(); //(75, window.innerWidth / window.innerHeight, 0.1, 10000);

        this.renderer = new THREE.WebGLRenderer({antialias: true,
            alpha: true});
        this.renderer.setSize(window.innerWidth, window.innerHeight, true);
        document.body.appendChild(this.renderer.domElement);

        this.modelLoader = new ModelLoader();

        this.clock = new THREE.Clock(true);

        this.createScene();
    }

    createScene() {
        this.scene = new THREE.Scene();  
        this.scene.add(this.camera);
        //this.renderer.setClearColor(new THREE.Color(0,0,0),1); 

        //this.camera.position.set(0,10,20);
        //this.camera.lookAt(new THREE.Vector3(0,0,0));

        let light = new THREE.DirectionalLight(0xffffff,1);
        light.position.set(0.25,1,0.75);
        this.scene.add(light);

        let ambientLight = new THREE.AmbientLight(0xffffff,0.5);
        this.scene.add(ambientLight);
        
        let light2 = new THREE.DirectionalLight(0xffffff,0.25);
        light2.position.set(-0.25,-1,-0.75);
        this.scene.add(light2);

        this.logo = new Logo(this.modelLoader);
        this.logo.position.set(0,0,0);
        this.scene.add(this.logo);
        
        console.log( THREEx );

        this.arToolkitSource = new THREEx.ArToolkitSource({
            // to read from the webcam 
            sourceType : 'webcam',
            	
        })

        this.arToolkitSource.init(() => {
            this.resize()
        });

        this.arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: 'assets/camera_para.dat',
            detectionMode: 'mono',
        });

        // initialize it
        this.arToolkitContext.init(() =>{
            // copy projection matrix to camera
            this.camera.projectionMatrix.copy( this.arToolkitContext.getProjectionMatrix() );
        });

        this.markerControls = new THREEx.ArMarkerControls(this.arToolkitContext, this.camera, {
            type : 'pattern',
            patternUrl : 'assets/patt.hiro',
            changeMatrixMode: 'cameraTransformMatrix'
        })
        // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
        this.scene.visible = false
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const deltaSeconds = this.clock.getDelta();      

        this.logo.update(deltaSeconds);
        
		if( this.arToolkitSource.ready !== false ){
            this.arToolkitContext.update( this.arToolkitSource.domElement );
            
            this.scene.visible = this.camera.visible;
        }

        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        //this.camera.aspect = window.innerWidth / window.innerHeight;
        //this.camera.updateProjectionMatrix();
        //this.renderer.setSize(window.innerWidth, window.innerHeight, true);

        this.arToolkitSource.onResize()	
		this.arToolkitSource.copySizeTo(this.renderer.domElement)	
		if( this.arToolkitContext.arController !== null ){
			this.arToolkitSource.copySizeTo(this.arToolkitContext.arController.canvas)	
		}
    }
}

const game = new Game();

window.game = game;
window.addEventListener("resize", () => game.resize());

game.animate();
