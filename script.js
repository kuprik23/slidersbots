// Get references to elements
const generateCodeButton = document.getElementById('generateCodeButton');
const codeDisplay = document.getElementById('codeDisplay');
const codeOutput = document.getElementById('codeOutput');
const colorSlider = document.getElementById('colorSlider');
const shapeSlider = document.getElementById('shapeSlider');
const personalitySlider = document.getElementById('personalitySlider');
const cubeContainer = document.getElementById('cube-container');

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, cubeContainer.offsetWidth / cubeContainer.offsetHeight, 0.1, 1000);
camera.position.z = 2;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(cubeContainer.offsetWidth, cubeContainer.offsetHeight);
cubeContainer.appendChild(renderer.domElement);

// Initialize cube geometry and material
let cubeGeometry = new THREE.BoxGeometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x7f7f7f }); // Initial gray color
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// Function to update cube color based on color slider
function updateCubeColor() {
    const colorValue = colorSlider.value;
    const hexColor = rgbToHex(colorValue, colorValue, colorValue);
    cube.material.color.set(hexColor);
}

// Event listener for color slider
colorSlider.addEventListener('input', updateCubeColor);

// Function to update cube shape based on shape slider
function updateCubeShape() {
    const shapeValue = parseInt(shapeSlider.value);
    
    // Dispose the current geometry
    cube.geometry.dispose();

    // Create new geometry based on shape slider value
    if (shapeValue === 1) {
        cubeGeometry = new THREE.BoxGeometry();
    } else if (shapeValue === 2) {
        cubeGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    } else if (shapeValue === 3) {
        cubeGeometry = new THREE.SphereGeometry(1, 32, 32);
    }

    // Create a new mesh with the updated geometry
    cube.geometry = cubeGeometry;
}

// Event listener for shape slider
shapeSlider.addEventListener('input', updateCubeShape);

// Function to update cube shape and scale based on personality and shape sliders
function updateCubeShapeAndScale() {
    const personalityValue = personalitySlider.value;
    const shapeValue = parseInt(shapeSlider.value);

    // Update shape based on shape slider
    updateCubeShape();

    // Update scale based on personality slider
    switch (personalityValue) {
        case "1":
            // Do nothing (default scale)
            break;
        case "2":
            cube.scale.set(1, 0.5, 1); // Scale for personality 2
            break;
        case "3":
            cube.scale.set(1, 2, 1); // Scale for personality 3
            break;
    }
}

// Event listener for personality slider
personalitySlider.addEventListener('input', updateCubeShapeAndScale);

// Function to generate Three.js code
function generateThreeJsCode() {
    const colorValue = colorSlider.value;
    const hexColor = rgbToHex(colorValue, colorValue, colorValue);
    const shapeValue = parseInt(shapeSlider.value);
    const personalityValue = personalitySlider.value;

    const generatedCode = `
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cubeGeometry = new THREE.${getShapeName(shapeValue)}Geometry();
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x${hexColor} });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();
`;

    codeOutput.textContent = generatedCode;
}

// Event listener for generate code button
generateCodeButton.addEventListener('click', generateThreeJsCode);

// Utility function to convert RGB to hex
function rgbToHex(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

// Utility function to get shape name
function getShapeName(shapeValue) {
    switch (shapeValue) {
        case 1:
            return "Box";
        case 2:
            return "Cylinder";
        case 3:
            return "Sphere";
    }
}

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
