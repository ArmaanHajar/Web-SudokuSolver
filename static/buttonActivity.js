import { generateEasyBoard, generateMediumBoard, generateHardBoard, generateExpertBoard } from "../static/boardActivity.js";
import { newBoard } from "../static/boardActivity.js";

var board;
board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

const sudokuCells = document.querySelectorAll("td");

function clearBoard() {
    const sudokuCells = document.querySelectorAll("td");
    sudokuCells.forEach(cell => {
        cell.textContent = "";
    });
}

function updateBoard(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                sudokuCells[i * 9 + j].textContent = board[i][j];
            }
        }
    }
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
        console.log("Manually Enter");
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
        console.log("Randomly Generate");
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
        clearBoard();
        generateEasyBoard(board);
        selectedOption.textContent = "Difficulty Selected: " + easyButton.textContent; // Update the displayed option
        updateBoard(newBoard);
    });

    mediumButton.addEventListener('click', function() {
        clearBoard();
        generateMediumBoard(board);
        selectedOption.textContent = "Difficulty Selected: " + mediumButton.textContent; // Update the displayed option
        updateBoard(newBoard);
    });

    hardButton.addEventListener('click', function() {
        clearBoard();
        generateHardBoard(board);
        selectedOption.textContent = "Difficulty Selected: " + hardButton.textContent; // Update the displayed option
        updateBoard(newBoard);
    });

    expertButton.addEventListener('click', function() {
        clearBoard();
        generateExpertBoard(board);
        selectedOption.textContent = "Difficulty Selected: " + expertButton.textContent; // Update the displayed option
        updateBoard(newBoard);
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