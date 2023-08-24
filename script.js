// Get references to elements
const generateCodeButton = document.getElementById('generateCodeButton');
const codeDisplay = document.getElementById('codeDisplay');
const codeOutput = document.getElementById('codeOutput');
const colorSliders = [document.getElementById('slider1'), document.getElementById('slider2'), document.getElementById('slider3')];
const personalitySliders = [document.getElementById('personality1'), document.getElementById('personality2'), document.getElementById('personality3')];

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(300, 300);
document.getElementById('cube-container').appendChild(renderer.domElement);

// Create cubes with different colors
const cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Green
    new THREE.MeshBasicMaterial({ color: 0x0000ff })  // Blue
];

const cubes = [];
for (let i = 0; i < cubeMaterials.length; i++) {
    const geometry = new THREE.BoxGeometry();
    const cube = new THREE.Mesh(geometry, cubeMaterials[i]);
    cube.position.x = i * 2.5;
    scene.add(cube);
    cubes.push(cube);
}

// Function to update cube colors based on color sliders
function updateCubeColor() {
    const red = colorSliders[0].value;
    const green = colorSliders[1].value;
    const blue = colorSliders[2].value;

    cubes.forEach(cube => {
        cube.material.color.setRGB(red / 255, green / 255, blue / 255);
    });
}

// Event listeners for color sliders
colorSliders.forEach(slider => {
    slider.addEventListener('input', updateCubeColor);
});

// Function to update cube scale based on personality traits
function updateCubeScale() {
    const scale1 = personality1.value / 50; // Scale value for Trait 1 (0 to 2)

    cubes[0].scale.set(1, scale1, 1); // Update scale for cube 1 (Trait 1)
}

// Event listeners for personality sliders
personalitySliders.forEach(slider => {
    slider.addEventListener('input', () => {
        updateCubeScale();
        updateCubeColor();
    });
});

// Function to generate Python code snippet for one cube
function generatePythonSnippet() {
    const red = colorSliders[0].value;
    const green = colorSliders[1].value;
    const blue = colorSliders[2].value;

    const personality1Value = personality1.value;

    const generatedCode = `
# Import the necessary Three.js library
from pythreejs import *

# Create a scene
scene = Scene()

# Create a camera
camera = PerspectiveCamera(position=[0, 0, 5])

# Create a renderer
renderer = Renderer(camera=camera, width=300, height=300)
renderer.background = "#f0f0f0"
renderer.camera = camera

# Create a cube with the selected color
cube_geometry = BoxGeometry(width=1, height=${personality1Value / 50}, depth=1)
cube_material = MeshBasicMaterial(color=0x${rgbToHex(red, green, blue)})
cube = Mesh(geometry=cube_geometry, material=cube_material)
scene.add(cube)

# Set personality traits for the cube
cube.scale = [1, ${personality1Value / 50}, 1]

# Display the scene
display(renderer)
    `;

    // Display the generated code in the codeOutput element
    codeOutput.textContent = generatedCode;

    // Show the code display div
    codeDisplay.style.display = 'block';
}

// Event listener for the generate code button
generateCodeButton.addEventListener('click', generatePythonSnippet);

// Utility function to convert RGB to hex
function rgbToHex(r, g, b) {
    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);
    return ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

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
