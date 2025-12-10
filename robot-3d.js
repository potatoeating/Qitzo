/* 
================================================
3D ROBOT CHARACTER - THREE.JS
Animated 3D Robot Assistant for Hero Section
================================================
*/

// Wait for Three.js to load
window.addEventListener('load', () => {
    if (typeof THREE !== 'undefined') {
        init3DRobot();
    } else {
        console.warn('Three.js not loaded - 3D robot disabled');
    }
});

function init3DRobot() {
    const canvas = document.getElementById('robot-canvas');
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 8);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvas.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    
    const pointLight1 = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight1.position.set(3, 3, 3);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x8b5cf6, 0.8, 100);
    pointLight2.position.set(-3, 2, 3);
    scene.add(pointLight2);
    
    // Create Robot
    const robot = createRobot();
    scene.add(robot);
    
    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });
    
    // Floating animation
    let time = 0;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.01;
        
        // Floating effect
        robot.position.y = Math.sin(time) * 0.3;
        
        // Rotation
        robot.rotation.y = Math.sin(time * 0.5) * 0.3 + mouseX * 0.5;
        robot.rotation.x = Math.cos(time * 0.3) * 0.1 + mouseY * 0.3;
        
        // Animate robot parts
        const head = robot.getObjectByName('head');
        const leftArm = robot.getObjectByName('leftArm');
        const rightArm = robot.getObjectByName('rightArm');
        
        if (head) {
            head.rotation.y = Math.sin(time * 2) * 0.2;
        }
        
        if (leftArm) {
            leftArm.rotation.z = Math.sin(time * 1.5) * 0.3 + 0.3;
        }
        
        if (rightArm) {
            rightArm.rotation.z = Math.sin(time * 1.5 + Math.PI) * 0.3 - 0.3;
        }
        
        // Animate lights
        pointLight1.position.x = Math.sin(time) * 3;
        pointLight1.position.z = Math.cos(time) * 3;
        
        pointLight2.position.x = Math.cos(time + Math.PI) * 3;
        pointLight2.position.z = Math.sin(time + Math.PI) * 3;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (!canvas) return;
        
        camera.aspect = canvas.offsetWidth / canvas.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    });
}

// ===== CREATE ROBOT FUNCTION =====
function createRobot() {
    const robotGroup = new THREE.Group();
    
    // Materials
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        shininess: 100,
        specular: 0x8b5cf6
    });
    
    const accentMaterial = new THREE.MeshPhongMaterial({
        color: 0x8b5cf6,
        shininess: 100,
        specular: 0xec4899
    });
    
    const eyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 0.8
    });
    
    // Head
    const headGeometry = new THREE.BoxGeometry(1.2, 1, 1.2);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.y = 1.5;
    head.name = 'head';
    robotGroup.add(head);
    
    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8);
    const antenna = new THREE.Mesh(antennaGeometry, accentMaterial);
    antenna.position.y = 2.25;
    head.add(antenna);
    
    const antennaBallGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const antennaBall = new THREE.Mesh(antennaBallGeometry, eyeMaterial);
    antennaBall.position.y = 0.35;
    antenna.add(antennaBall);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 0.2, 0.55);
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 0.2, 0.55);
    head.add(rightEye);
    
    // Mouth (LED strip)
    const mouthGeometry = new THREE.BoxGeometry(0.6, 0.1, 0.05);
    const mouth = new THREE.Mesh(mouthGeometry, eyeMaterial);
    mouth.position.set(0, -0.2, 0.6);
    head.add(mouth);
    
    // Body (Torso)
    const bodyGeometry = new THREE.BoxGeometry(1.5, 1.8, 1);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    robotGroup.add(body);
    
    // Chest Panel
    const chestGeometry = new THREE.BoxGeometry(1, 1, 0.1);
    const chest = new THREE.Mesh(chestGeometry, accentMaterial);
    chest.position.z = 0.55;
    body.add(chest);
    
    // Chest Lights
    for (let i = 0; i < 3; i++) {
        const lightGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const light = new THREE.Mesh(lightGeometry, eyeMaterial);
        light.position.set(0, 0.4 - (i * 0.3), 0.06);
        chest.add(light);
    }
    
    // Left Arm
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 8);
    const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
    leftArm.position.set(-0.9, 0.3, 0);
    leftArm.rotation.z = 0.3;
    leftArm.name = 'leftArm';
    robotGroup.add(leftArm);
    
    // Left Hand
    const handGeometry = new THREE.SphereGeometry(0.25, 16, 16);
    const leftHand = new THREE.Mesh(handGeometry, accentMaterial);
    leftHand.position.y = -0.7;
    leftArm.add(leftHand);
    
    // Right Arm
    const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
    rightArm.position.set(0.9, 0.3, 0);
    rightArm.rotation.z = -0.3;
    rightArm.name = 'rightArm';
    robotGroup.add(rightArm);
    
    // Right Hand
    const rightHand = new THREE.Mesh(handGeometry, accentMaterial);
    rightHand.position.y = -0.7;
    rightArm.add(rightHand);
    
    // Left Leg
    const legGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1.2, 8);
    const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    leftLeg.position.set(-0.4, -1.5, 0);
    robotGroup.add(leftLeg);
    
    // Left Foot
    const footGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.5);
    const leftFoot = new THREE.Mesh(footGeometry, accentMaterial);
    leftFoot.position.set(0, -0.7, 0.15);
    leftLeg.add(leftFoot);
    
    // Right Leg
    const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
    rightLeg.position.set(0.4, -1.5, 0);
    robotGroup.add(rightLeg);
    
    // Right Foot
    const rightFoot = new THREE.Mesh(footGeometry, accentMaterial);
    rightFoot.position.set(0, -0.7, 0.15);
    rightLeg.add(rightFoot);
    
    // Add floating particles around robot
    createParticles(robotGroup);
    
    return robotGroup;
}

// ===== CREATE PARTICLES =====
function createParticles(parent) {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 8;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x6366f1,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    parent.add(particlesMesh);
    
    // Animate particles
    function animateParticles() {
        const positions = particlesGeometry.attributes.position.array;
        
        for (let i = 0; i < particlesCount; i++) {
            const i3 = i * 3;
            positions[i3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ===== ALTERNATIVE: SIMPLE GEOMETRIC ROBOT (Fallback) =====
function createSimpleRobot() {
    // Simpler version for lower-end devices
    const robotGroup = new THREE.Group();
    
    const material = new THREE.MeshPhongMaterial({
        color: 0x6366f1,
        flatShading: true
    });
    
    // Simple geometric shapes
    const body = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1.5, 0.8),
        material
    );
    robotGroup.add(body);
    
    const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 8, 8),
        material
    );
    head.position.y = 1.2;
    robotGroup.add(head);
    
    return robotGroup;
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeFor3D() {
    // Detect device performance
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency <= 4;
    
    if (isMobile || isLowEnd) {
        // Use simpler robot or disable 3D
        console.log('Using simplified 3D robot for performance');
        return 'simple';
    }
    
    return 'full';
}

// ===== CONSOLE LOG =====
console.log('%c🤖 3D Robot Loaded', 'color: #6366f1; font-size: 16px; font-weight: bold;');