# Alphabet Soup

> You have been contracted from a newspaper tasked with the job of providing an answer key to their word search for the Sunday print. The newspaper's word search is a traditional game consisting of a grid of characters in which a selection of words have been hidden. You are provided with the list of words that have been hidden and must find the words within the grid of characters. 

## Requirements
Load a character grid with scrambled words embedded within it and a words list of the words to find.  The following conditions apply:

- Within the grid of characters, the words may appear vertical, horizontal or diagonal.
- Within the grid of characters, the words may appear forwards or backwards. 
- Words that have spaces in them will not include spaces when hidden in the grid of characters.

### Input Format
The program is to accept a file as input. The file is an ASCII text file containing the word search board along with the words that need to be found. 

The file contains three parts. The first part is the first line, and specifies the number of rows and columns in the grid of characters, separated by an 'x'. The second part provides the grid of characters in the word search. The third part in the file specifies the words to be found.

The first line indicates how many following lines in the file contain the rows of characters that make up the word search grid. Each row in the word search grid will have the specified number of columns of characters, each separated with a space. The remaining lines in the file specify the words to be found.

The file format is as follows:

```
3x3
A B C
D E F
G H I
ABC
AEI
```

You may assume that the input files are correctly formatted. Error handling for invalid input files may be ommitted.

### Output Format
The output will specify the word found, along with the indices specifying where the beginning and ending characters of the word are located in the grid. A single space character will separate the word from the beginning and ending indices. The order of the words in the output should remain the same as the order of the words specified in the input file. The program will output to screen or console (and not to a file). 

The word search grid row and column numbers can be used to identify the location of individual characters in the board. For example, row 0 column 0 (represented as `0:0`) is the top-left character of a 3x3 board.  The bottom-right corner of a 3x3 board would be represented as `2:2`.

```
ABC 0:0 0:2
AEI 0:0 2:2
```

## Sample Data
The following may be used as sample input and output datasets.

### Input

```
5x5
H A S D F
G E Y B H
J K L Z X
C V B L N
G O O D O
HELLO
GOOD
BYE
```

### Ouput

```
HELLO 0:0 4:4
GOOD 4:0 4:3
BYE 1:3 1:1
```


Additional notes
React JavaScript
yarn
please run (assuming yarn is installed w/ npm)
`yarn add webpack-dev-server webpack-cli` on terminal

to run app:
run `yarn run dev-server` on terminal
open localhost:8080 on browser.

Room for improvements
1. componentDidMount / componentDidUpdate. save data in localstorage
2. Recurssion on function calls for finding words.
3. Organize method better.
4. Refactor more. Separate methods for similar codes (border, newArray)