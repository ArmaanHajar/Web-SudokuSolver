var txtFile = new XMLHttpRequest();

function clearBoard() {
    const sudokuCells = document.querySelectorAll("td");
    sudokuCells.forEach(cell => {
        cell.textContent = "";
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const manuallyEnterButton = document.querySelector('#manually-enter');
    const randomlyGenerateButton = document.querySelector('#randomly-generate');
    const selectedOption = document.querySelector('#selected-option'); // The paragraph to display the selected option
    const sudokuCells = document.querySelectorAll("td");
    const solve = document.querySelector('#solve');

    const easyButton = document.querySelector('#easy-button');
    const mediumButton = document.querySelector('#medium-button');
    const hardButton = document.querySelector('#hard-button');
    const expertButton = document.querySelector('#expert-button');
    const difficultyButtons = [easyButton, mediumButton, hardButton, expertButton];

    manuallyEnterButton.addEventListener('click', function() {
        clearBoard();
        manuallyEnterButton.disabled = true;
        randomlyGenerateButton.disabled = false;
        difficultyButtons.forEach(button => button.disabled = true);
        selectedOption.textContent = "Selected Option: Manually Enter"; // Update the displayed option
        sudokuCells.forEach(cell => {
            cell.setAttribute("contenteditable", "true");
        });
        solve.disabled = false;
    });

    randomlyGenerateButton.addEventListener('click', function() {
        clearBoard();
        randomlyGenerateButton.disabled = true;
        manuallyEnterButton.disabled = false;
        difficultyButtons.forEach(button => button.disabled = false);
        selectedOption.textContent = "Selected Option: Randomly Generated"; // Update the displayed option
        sudokuCells.forEach(cell => {
            cell.setAttribute("contenteditable", "false");
        });
    });

    // needs to be fixed
    easyButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + easyButton.textContent; // Update the displayed option
        txtFile.open("GET", "/static/easy.txt", true);
        txtFile.onreadystatechange = function() {
            if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
                if (txtFile.status === 200) {  // Makes sure it's found the file.
                    allText = txtFile.responseText;
                    let textByLine = allText.split("\n");
                    let i = 0;
                    sudokuCells.forEach(cell => {
                        cell.textContent = textByLine[i];
                        i++;
                    });
                }
            }
        }
    });

    mediumButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + mediumButton.textContent; // Update the displayed option
    });

    hardButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + hardButton.textContent; // Update the displayed option
    });

    expertButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + expertButton.textContent; // Update the displayed option
    });

    sudokuCells.forEach(cell => {
        cell.addEventListener('input', function() {
            if (cell.textContent.length > 1) {
                cell.textContent = cell.textContent.slice(0, 1);
            }
        });
    });

});