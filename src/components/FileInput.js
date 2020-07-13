import React from 'react';
 
export default class FileInput extends React.Component { 
  fileInput = React.createRef();
  state = {
    error: undefined
  }
  handleSubmit = (e) => {
    e.preventDefault();
    let file = document.querySelector('input[type="file"]');
    console.log(file.files);
    const error = this.props.handleFileInput(file);
    this.setState(() =>  ({ error }) )
    if (!error) {
      e.target.elements.file.value = null;
    }
  };
  
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="file" />
          <button>Submit Text File</button>
        </form>
      </div>
    )
  }
}