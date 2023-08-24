document.addEventListener("DOMContentLoaded", function () {
    const colorSlider = document.getElementById("colorSlider");
    const sizeSlider = document.getElementById("sizeSlider");
    const personalitySlider = document.getElementById("personalitySlider");
    const shapeSlider = document.getElementById("shapeSlider");
    const generateButton = document.getElementById("generateButton");
    const cubeContainer = document.getElementById("cube-container");
    const codeOutput = document.getElementById("codeOutput");

    const updateCube = () => {
        const color = `rgb(${colorSlider.value}, ${colorSlider.value}, ${colorSlider.value})`;
        const size = `${sizeSlider.value}px`;
        const personality = personalitySlider.value;
        const shape = shapeSlider.value;

        cubeContainer.style.backgroundColor = color;
        cubeContainer.style.width = size;
        cubeContainer.style.height = size;

        // You can modify cubeContainer here based on personality and shape
    };

    updateCube();

    const generateCode = () => {
        updateCube();
        const code = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EMERSA Studio - Customized Cube</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <section id="cube-container">
        <!-- Cube will be rendered here -->
    </section>
    <script src="script.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            ${updateCube.toString()}
            updateCube();
        });
    </script>
</body>
</html>
        `;
        codeOutput.value = code;
    };

    colorSlider.addEventListener("input", updateCube);
    sizeSlider.addEventListener("input", updateCube);
    personalitySlider.addEventListener("input", updateCube);
    shapeSlider.addEventListener("input", updateCube);
    generateButton.addEventListener("click", generateCode);
});
