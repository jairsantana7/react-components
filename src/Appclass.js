import logo from "./logo.svg";
import { Component, component } from "react";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false
    };
  }

  toggle = () => {
    this.setState({ showImage: !this.state.showImage });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button type="button" onClick={this.toggle}>
            {this.state.showImage ? "Esconder imagem" : "Mostar imagem"}
          </button>
          {this.state.showImage && (
            <img src={logo} className="App-logo" alt="logo" />
          )}

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
