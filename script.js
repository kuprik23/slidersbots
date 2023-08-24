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
        updateCubeShape(); // Update cube shape
    });
});

// Function to update cube shape based on personality traits
function updateCubeShape() {
    const personality1Value = personalitySliders[0].value;
    const personality2Value = personalitySliders[1].value;
    const personality3Value = personalitySliders[2].value;

    const cubeShapes = [
        new THREE.BoxGeometry(),               // Cube
        new THREE.CylinderGeometry(1, 1, 1),   // Cylinder
        new THREE.SphereGeometry(1, 32, 32),   // Sphere
    ];

    cubes[0].geometry = cubeShapes[personality1Value - 1]; // Update shape for cube 1
}

// Event listener for the generate code button
generateCodeButton.addEventListener('click', generatePythonSnippet);

// Initialize cube shape
updateCubeShape();

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
