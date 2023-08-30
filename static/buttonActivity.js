document.addEventListener('DOMContentLoaded', function() {
    const manuallyEnterButton = document.querySelector('#manually-enter');
    const randomlyGenerateButton = document.querySelector('#randomly-generate');
    const difficultyButtons = document.querySelectorAll('.difficulty-button');
    const selectedOption = document.querySelector('#selected-option'); // The paragraph to display the selected option

    manuallyEnterButton.addEventListener('click', function() {
        manuallyEnterButton.disabled = true;
        randomlyGenerateButton.disabled = false;
        difficultyButtons.forEach(button => button.disabled = true);
        selectedOption.textContent = "Selected Option: Manually Enter"; // Update the displayed option
    });

    randomlyGenerateButton.addEventListener('click', function() {
        randomlyGenerateButton.disabled = true;
        manuallyEnterButton.disabled = false;
        difficultyButtons.forEach(button => button.disabled = false);
        selectedOption.textContent = "Selected Option: Randomly Generated"; // Update the displayed option
    });

    difficultyButtons.forEach(button => {
        button.addEventListener('click', function() {
            selectedOption.textContent = "Difficulty: " + button.textContent; // Update the displayed option
        });
    });
});