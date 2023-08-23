// Get references to the sliders, code display div, and close button
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const slider3 = document.getElementById('slider3');
const generateButton = document.getElementById('generateButton');
const codeDisplay = document.getElementById('codeDisplay');
const codeOutput = document.getElementById('codeOutput');
const closeCodeDisplay = document.getElementById('closeCodeDisplay');
const mouth = document.getElementById('mouth');

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
