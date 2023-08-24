document.addEventListener("DOMContentLoaded", function () {
    const colorChangeCube = document.getElementById("color-change-cube");
    const redSlider = document.getElementById("red-slider");
    const greenSlider = document.getElementById("green-slider");
    const blueSlider = document.getElementById("blue-slider");
    const generateButton = document.getElementById("generate-button");
    const generatedCode = document.getElementById("generated-code");

    // Function to update the color of the cube based on slider values
    function updateCubeColor() {
        const redValue = redSlider.value;
        const greenValue = greenSlider.value;
        const blueValue = blueSlider.value;

        const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        colorChangeCube.style.backgroundColor = color;
    }

    // Event listeners for color sliders
    redSlider.addEventListener("input", updateCubeColor);
    greenSlider.addEventListener("input", updateCubeColor);
    blueSlider.addEventListener("input", updateCubeColor);

    // Event listener for generating random code
    generateButton.addEventListener("click", function () {
        const randomCode = generateRandomCode();
        generatedCode.textContent = randomCode;
    });

    // Function to generate random code
    function generateRandomCode() {
        // Replace this with your code generation logic
        const code = `// Your generated code:
        function myFunction() {
            console.log("Hello, EMERSA!");
        }
        myFunction();`;
        
        return code;
    }
});
