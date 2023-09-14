var txtFile = new XMLHttpRequest();
const sudokuCells = document.querySelectorAll("td");

function clearBoard() {
    const sudokuCells = document.querySelectorAll("td");
    sudokuCells.forEach(cell => {
        cell.textContent = "";
    });
}

/* makes the buttons not work for some reason, come back to this later
function saveBoard(board) {
    const sudokuCells = document.querySelectorAll("td");
    let board = [];
    sudokuCells.forEach(cell => {
        board.push(cell.textContent);
    });
    return board;
}
*/

function updateBoard(fileName) {
    txtFile.open("GET", "/static/numberFiles/" + fileName, true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {
            if (txtFile.status === 200) {
                var allText = txtFile.responseText;
                // Check if the response is not empty
                if (allText.length === 81) { // Sudoku grid is 9x9
                    for (var i = 0; i < allText.length; i++) {
                        if (allText.charAt(i) === "0") {
                            sudokuCells[i].textContent = "";
                        }
                        else {
                            sudokuCells[i].textContent = allText.charAt(i);
                        }
                    }
                } 
                else {
                    console.error("Invalid content in the file. Expected 81 characters.");
                }
            }
        }
    };
    txtFile.send(null);
}

document.addEventListener('DOMContentLoaded', function() {
    const manuallyEnterButton = document.querySelector('#manually-enter');
    const randomlyGenerateButton = document.querySelector('#randomly-generate');
    const selectedOption = document.querySelector('#selected-option'); // The paragraph to display the selected option
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

    easyButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + easyButton.textContent; // Update the displayed option
        updateBoard("easy.txt");
    });

    mediumButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + mediumButton.textContent; // Update the displayed option
        updateBoard("medium.txt");
    });

    hardButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + hardButton.textContent; // Update the displayed option
        updateBoard("hard.txt");
    });

    expertButton.addEventListener('click', function() {
        selectedOption.textContent = "Difficulty Selected: " + expertButton.textContent; // Update the displayed option
        updateBoard("expert.txt");
    });

    solve.addEventListener('click', function() {
        // might write this in python
    });

    sudokuCells.forEach(cell => {
        cell.addEventListener('input', function() {
            if (cell.textContent.length > 1) {
                cell.textContent = cell.textContent.slice(0, 1);
            }
        });
    });
});