// Get references to the sliders, code display div, and close button
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const slider3 = document.getElementById('slider3');
const generateButton = document.getElementById('generateButton');
const codeDisplay = document.getElementById('codeDisplay');
const codeOutput = document.getElementById('codeOutput');
const closeCodeDisplay = document.getElementById('closeCodeDisplay');
const mouth = document.getElementById('mouth');
// Get references to elements
const avatarContainer = document.getElementById('avatar-container');
const toggleAvatarButton = document.getElementById('toggleAvatarButton');
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const slider3 = document.getElementById('slider3');

// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
avatarContainer.appendChild(renderer.domElement);

// Create a simple cube as an example of an avatar (replace with your FBX model)
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const avatar = new THREE.Mesh(geometry, material);
scene.add(avatar);

// Camera position
camera.position.z = 5;

// Variable to keep track of the avatar visibility
let isAvatarVisible = true;

// Function to toggle the avatar visibility
function toggleAvatar() {
    isAvatarVisible = !isAvatarVisible;
    avatar.visible = isAvatarVisible;
}

// Event listener for the toggle button
toggleAvatarButton.addEventListener('click', toggleAvatar);

// Function to update the avatar based on slider values
function updateAvatar() {
    // Example: Update avatar properties based on slider values
    const personalityTrait1 = slider1.value;
    const personalityTrait2 = slider2.value;
    const personalityTrait3 = slider3.value;

    // Modify the avatar based on slider values
    // Example: avatar.scale.set(personalityTrait1 / 100, personalityTrait2 / 100, personalityTrait3 / 100);
}

// Event listeners for the sliders
slider1.addEventListener('input', updateAvatar);
slider2.addEventListener('input', updateAvatar);
slider3.addEventListener('input', updateAvatar);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();

// Function to generate Three.js code and open the mouth
function generateThreeJsCode() {
    const personalityTrait1 = slider1.value;
    const personalityTrait2 = slider2.value;
    const personalityTrait3 = slider3.value;

    // Generate Three.js code based on slider values
    const generatedCode = `
        // Your Three.js code here
        const avatar = new Avatar();
        avatar.setPersonality(${personalityTrait1}, ${personalityTrait2}, ${personalityTrait3});
        // ...
    `;

    // Display the generated code in the codeOutput element
    codeOutput.textContent = generatedCode;

    // Open the mouth (add the 'open-mouth' class)
    mouth.classList.add('open-mouth');

    // Show the code display div
    codeDisplay.style.display = 'block';
}

// Event listener for the generate button
generateButton.addEventListener('click', generateThreeJsCode);

// Event listener to close the code display and close the mouth
closeCodeDisplay.addEventListener('click', () => {
    codeDisplay.style.display = 'none';

    // Close the mouth (remove the 'open-mouth' class)
    mouth.classList.remove('open-mouth');
});
