// Get references to elements
const cubeContainer = document.getElementById('cube-container');
const generateCodeButton = document.getElementById('generateCodeButton');
const codeDisplay = document.getElementById('codeDisplay');
const codeOutput = document.getElementById('codeOutput');
const sliders = [document.getElementById('slider1'), document.getElementById('slider2'), document.getElementById('slider3')];

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(300, 300);
cubeContainer.appendChild(renderer.domElement);

// Create cubes with different colors
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
    new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue
    new THREE.MeshBasicMaterial({ color: 0xffa500 })  // Orange
];

const cubes = [];
for (let i = 0; i < cubeMaterials.length; i++) {
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, cubeMaterials[i]);
    cube.position.x = i * 2.5;
    scene.add(cube);
    cubes.push(cube);
}

// Function to update the cube's color based on slider values
function updateCubeColor() {
    const red = sliders[0].value;
    const green = sliders[1].value;
    const blue = sliders[2].value;

    cubes.forEach(cube => {
        cube.material.color.setRGB(red / 255, green / 255, blue / 255);
    });
}

// Event listeners for the sliders
sliders.forEach(slider => {
    slider.addEventListener('input', updateCubeColor);
});

// Function to generate code based on the cube's color
function generateCode() {
    const red = sliders[0].value;
    const green = sliders[1].value;
    const blue = sliders[2].value;

    const generatedCode = `
        // Create a cube with the selected color
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x${rgbToHex(red, green, blue)} });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    `;

    // Display the generated code in the codeOutput element
    codeOutput.textContent = generatedCode;

    // Show the code display div
    codeDisplay.style.display = 'block';
}

// Event listener for the generate code button
generateCodeButton.addEventListener('click', generateCode);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
};

animate();

// Utility function to convert RGB to hex
function rgbToHex(r, g, b) {
    return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
