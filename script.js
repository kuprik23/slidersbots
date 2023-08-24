document.addEventListener("DOMContentLoaded", function () {
    const colorChangeCube = document.getElementById("color-change-cube");
    const redSlider = document.getElementById("red-slider");
    const greenSlider = document.getElementById("green-slider");
    const blueSlider = document.getElementById("blue-slider");
    const generateButton = document.getElementById("generate-button");
    const generatedCode = document.getElementById("generated-code");
    const personalitySlider1 = document.getElementById("personality-slider-1");
    const personalitySlider2 = document.getElementById("personality-slider-2");
    const personalitySlider3 = document.getElementById("personality-slider-3");

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

    // Function to generate real code based on slider values and personality
    function generateRealCode() {
        const redValue = redSlider.value;
        const greenValue = greenSlider.value;
        const blueValue = blueSlider.value;

        const personalityTrait1 = personalitySlider1.value;
        const personalityTrait2 = personalitySlider2.value;
        const personalityTrait3 = personalitySlider3.value;

        // Replace this with your actual code generation logic
        const code = `
        // Your generated code:
        function customizeCube() {
            const cube = new Cube();
            cube.setColor(${redValue}, ${greenValue}, ${blueValue});
            cube.setPersonality(${personalityTrait1}, ${personalityTrait2}, ${personalityTrait3});
            return cube;
        }
        `;
        
        return code;
    }

    // Event listener for generating real code
    generateButton.addEventListener("click", function () {
        const realCode = generateRealCode();
        generatedCode.textContent = realCode;
    });
});
