import React from 'react';

import FileInput from './FileInput';
import ResultOutput from './ResultOutput';
import Header from './Header';

export default class AlphabetSoup extends React.Component {
  functionArr = [
    this.findWordLeft,
    this.findWordRight,
    this.findWordTop,
    this.findWordBottom,
    this.findWordLeftDown,
    this.findWordLeftUp,
    this.findWordRightDown,
    this.findWordRightUp
  ];
  state = {
    currentFile: [],
    dimension: {
      x: null,
      y: null
    },
    puzzle: [],
    output: {
      found: undefined,
      word: undefined,
      start: undefined,
      end: undefined
    },
    outputs: []
  };

  handleFileInput = (file) => {
    if (!file.files) {
      return 'Please select a file.';
    } else if (this.state.currentFile.indexOf(file.files) > -1) {
      return 'This file currently exist';
    }
    const reader = new FileReader();
    reader.onload = () => {
      const lines = reader.result.split('\n').map(line => line.split(','));
      const dimensions = lines[0][0].split('x')
      this.setState(() => ({
        currentFile: lines,
        dimension: {
          x: parseInt(dimensions[0], 10),
          y: parseInt(dimensions[1], 10)
        }
      }));
      this.createPuzzle(this.state.dimension.x, this.state.dimension.y);
      this.createOutputs(this.state.dimension.x, this.state.dimension.y);
    }
    reader.readAsText(file.files[0])
  };

  createPuzzle(yDimension) {
    let puzzle = [];
    let newArray = [];
    
    for (var i = 1; i <= yDimension; i++) {
      newArray[i] = Array.from(this.state.currentFile[i][0]);
      puzzle[i-1] = [];
      for (var j = 0; j < newArray[i].length; j++) {
        if (newArray[i][j] !== " ") {
          puzzle[i-1].push(newArray[i][j]);
        }
      }
    }
    this.setState(() => ({puzzle: puzzle}));
  }

  createOutputs(xDimension, yDimension) {
    for (var i = yDimension + 1; i <= this.state.currentFile.length; i++) {
      console.warn('currentFile word', this.state.currentFile[i][0].split(" ").join(""))
      this.setState(() => (
        {output: {found: false, word: this.state.currentFile[i][0].split(" ").join("")}}
      ));
      let currentWord = this.state.output.word;
      if (this.state.output.found === false) {
        for (var j = 0; j < yDimension; j++) {
          for (var k = 0; k < xDimension; k++) {
            if (currentWord[0] === this.state.puzzle[j][k]) {
              for (var dir = 0; dir < this.functionArr.length; dir++) {
                let returnedArray = this.functionArr[dir](
                  currentWord, this.state.puzzle, k, j, this.state.dimension.x, this.state.dimension.y
                );
                if (returnedArray[0] === true) {
                  this.setState(() => ({output: {
                    found: true,
                    word: currentWord,
                    start: returnedArray[1],
                    end: returnedArray[2]
                  }}));
                  this.setState((prevState) => ({outputs: prevState.outputs.concat([this.state.output])}));
                }
                this.setState((prevState) => ({outputs: prevState.outputs}));
              }
            }
          }
        }
      }
    }
  }
  
  findWordLeft(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
  
      if (xDimension + i === borderX || currentWord[i] !== puzzle[yDimension][xDimension+i]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension}:${xDimension+currentWord.length-1}`);
    return newArray;
  }

  findWordRight(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (xDimension - i < 0 || currentWord[i] !== puzzle[yDimension][xDimension-i]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension}:${xDimension-currentWord.length+1}`);
    return newArray;
  }

  findWordTop(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (yDimension + i === borderY || currentWord[i] !== puzzle[yDimension+i][xDimension]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension+currentWord.length-1}:${xDimension}`);
    return newArray;
  }

  findWordBottom(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (yDimension - i < 0 || currentWord[i] !== puzzle[yDimension-i][xDimension]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension-currentWord.length+1}:${xDimension}`);
    return newArray;
  }

  findWordLeftDown(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (xDimension + i === borderX || yDimension + i === borderY || currentWord[i] !== puzzle[yDimension+i][xDimension+i]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension+currentWord.length-1}:${xDimension+currentWord.length-1}`);
    return newArray;
  }

  findWordLeftUp(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (xDimension + i === borderX || yDimension - i < 0 || currentWord[i] !== puzzle[yDimension-i][xDimension+i]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension-currentWord.length+1}:${xDimension+currentWord.length-1}`);
    return newArray;
  }

  findWordRightDown(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (xDimension - i < 0 || yDimension + i === borderY || currentWord[i] !== puzzle[yDimension+i][xDimension-i]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension+currentWord.length-1}:${xDimension-currentWord.length+1}`);
    return newArray;
  }

  findWordRightUp(currentWord, puzzle, xDimension, yDimension, borderX, borderY) {
    var newArray = [];
    for (var i = 1; i < currentWord.length; i++) {
      if (xDimension - i < 0 || yDimension - i < 0 || currentWord[i] !== puzzle[yDimension-i][xDimension-i]) {
        return newArray;
      }
    }
    newArray[0] = true;
    newArray.push(`${yDimension}:${xDimension}`);
    newArray.push(`${yDimension-currentWord.length+1}:${xDimension-currentWord.length+1}`);
    return newArray;
  }

  render() {
    const title = 'Alphabet Soup';
    const subtitle = 'Can you find the word(s)?';
    return (
      <div>
        <Header title={title} subtitle={subtitle} />
        {this.state.outputs && <ResultOutput
          key={this.state.currentFile}
          currentFile={this.state.currentFile}
          xParameter={this.state.dimension.x}
          yParameter={this.state.dimension.y}
          outputs={this.state.outputs}
        />}
        <FileInput handleFileInput={this.handleFileInput} />
      </div>
    )
  }
}