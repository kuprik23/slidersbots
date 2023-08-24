// Function to generate Three.js snippet for one cube
function generateThreejsSnippet() {
    const red = colorSliders[0].value;
    const green = colorSliders[1].value;
    const blue = colorSliders[2].value;

    const personality1Value = personality1.value;
    const personality2Value = personality2.value;
    const personality3Value = personality3.value;

    const generatedCode = `
        // Include Three.js library
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"></script>

        <script>
            // Create a scene
            const scene = new THREE.Scene();

            // Create a camera
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.z = 5;

            // Create a renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(300, 300);
            document.body.appendChild(renderer.domElement);

            // Create a cube with the selected color
            const geometry = new THREE.BoxGeometry();
            const material = new THREE.MeshBasicMaterial({ color: 0x${rgbToHex(red, green, blue)} });
            const cube = new THREE.Mesh(geometry, material);
            scene.add(cube);

            // Set personality traits for the cube
            cube.scale.set(1, ${personality1Value / 50}, 1);

            // Animation loop
            const animate = () => {
                requestAnimationFrame(animate);
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render(scene, camera);
            };

            animate();
        </script>
    `;

    // Display the generated code in the codeOutput element
    codeOutput.textContent = generatedCode;

    // Show the code display div
    codeDisplay.style.display = 'block';
}
