# board generation works by generating a full board sudoku, then removing numbers until the desired difficulty is reached

import random

board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]]

def generate_full_board(board): # Backtracking algorithm
    find = find_empty(board)
    if not find: # If find is None, board is solved
        return True
    else: # If find is not None, board is not solved
        row, column = find
    for i in range(1, 10): 
        i = random.randint(1, 9) # Generate a random number
        if check_valid(board, i, (row, column)): # If the number is valid, add it to the board
            board[row][column] = i
            if generate_full_board(board): # If the board is solved, return True
                return True
            else: # If the board is not solved, backtrack
                board[row][column] = 0
    return False 

def check_valid(board, number, position): # Check if the number is valid
    # Check row
    for i in range(len(board[0])): # Iterate through the row
        if board[position[0]][i] == number and position[1] != i: # If the number is already in the row, return False
            return False
    # Check column
    for i in range(len(board)): # Iterate through the column
        if board[i][position[1]] == number and position[0] != i: # If the number is already in the column, return False
            return False
    # Check box
    box_x = position[1] // 3 # Get the boxes x coordinate
    box_y = position[0] // 3 # Get the boxes y coordinate
    for i in range(box_y * 3, box_y * 3 + 3): # Iterate through the box
        for j in range(box_x * 3, box_x * 3 + 3):
            if board[i][j] == number and (i, j) != position: # If the number is already in the box, return False
                return False
    return True # If the number is not in the row, column, or box, return True

def find_empty(board): # Find the next empty space
    for i in range(len(board)): # Iterate through the board
        for j in range(len(board[0])):
            if board[i][j] == 0: # If the space is empty,
                return (i, j) # Return the position
    return None # If there are no empty spaces, return None

'''
easy: avg 38 numbers on board, ~47% chance of a number being given
medium: avg 30 numbers on board, ~37% chance of a number being given
hard: avg 22 numbers on board, ~27% chance of a number being given
expert: avg 17 numbers on board, ~21% chance of a number being given
'''

def remove_numbers(board, difficulty): # Remove numbers until the desired difficulty is reached
    if difficulty == 0: # easy difficulty
        remOrNo = 47
    elif difficulty == 1: # medium difficulty
        remOrNo = 37
    elif difficulty == 2: # hard difficulty
        remOrNo = 27
    elif difficulty == 3: # expert difficulty
        remOrNo = 21
    for i in range(len(board)):
            for j in range(len(board[0])):
                removeNum = random.randInt(0, 100)
                if removeNum > remOrNo:
                    board[i][j] = 0

def save_board(board, difficulty): # Save the solution in a text file
    if (difficulty == 0): # easy difficulty
        textFile = "easy.txt"
    elif (difficulty == 1): # medium difficulty
        textFile = "medium.txt"
    elif (difficulty == 2): # hard difficulty
        textFile = "hard.txt"
    elif (difficulty == 3): # expert difficulty
        textFile = "expert.txt"
    file = open(textFile, "w")
    for i in range(len(board)): # Iterate through the board
        for j in range(len(board[0])): # Iterate through the row
            file.write(str(board[i][j])) # Write the number to the file
        file.write("\n")
    file.close()

def print_board(board): # Print the sudoku board
    print("-----------------------")
    for i in range(len(board)): # Iterate through the board
        if i % 3 == 0 and i != 0: # Print a line every 3 rows
            print("-----------------------")
        for j in range(len(board[0])): # Iterate through the row
            if j % 3 == 0 and j != 0: # Print a line every 3 columns
                print(" | ", end = "")
            if j == 8: # Print the last number in the row
                print(board[i][j])
            else: # Print the number in the row
                print(str(board[i][j]) + " ", end = "")
    print("-----------------------")

def generate_easy_board(board): # Generate an easy board
    generate_full_board(board) # Generate a full board
    remove_numbers(board, 0) # Remove numbers until the desired difficulty is reached
    save_board(board, 0) # Save the board

def generate_medium_board(board): # Generate a medium board
    generate_full_board(board) # Generate a full board
    remove_numbers(board, 1) # Remove numbers until the desired difficulty is reached
    save_board(board, 1) # Save the board

def generate_hard_board(board): # Generate a hard board
    generate_full_board(board) # Generate a full board
    remove_numbers(board, 2) # Remove numbers until the desired difficulty is reached
    save_board(board, 2) # Save the board

def generate_expert_board(board): # Generate an expert board
    generate_full_board(board) # Generate a full board
    remove_numbers(board, 3) # Remove numbers until the desired difficulty is reached
    save_board(board, 3) # Save the board