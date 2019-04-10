import React from "react";
import "./main.css";
import { produceNextGenAliveCells } from "./lib";

const HEIGHT = 20;
const WIDTH = 20;

class Main extends React.Component {
  render() {
    return <Board />;
  }
}

function Cell(props) {
  let cls = "";
  if (props.aliveCells.includes(props.id)) cls = "alive";
  return <td onClick={props.onClick} id={props.id} className={cls} />;
}

class Board extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      aliveCells: []
		};
		this.timerId = ()=>{};
  }
  createAliveCells(e) {
    this.setState({
      aliveCells: this.state.aliveCells.concat(parseInt(e.target.id))
    });
  }

  createBoard() {
    let id = 1;
    let rows = [];

    for (let column = 0; column < HEIGHT; column++) {
      let cells = [];
      for (let row = 0; row < WIDTH; row++) {
        cells.push(
          <Cell
            key={row}
            onClick={this.createAliveCells.bind(this)}
            id={id++}
            aliveCells={this.state.aliveCells}
          />
        );
      }
      rows.push(
        <tr key={column} className="board-row">
          {cells}
        </tr>
      );
    }
    return rows;
  }

  startCellularAutomation() {
    this.timerId = setInterval(() => {
      const aliveCells = this.state.aliveCells.map(x => +x);
      const nextGen = produceNextGenAliveCells(HEIGHT, WIDTH, aliveCells);
      this.setState({ aliveCells: nextGen });
    }, 500);
  }

  stopCellularAutomation() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="board-and-buttob-area">
        <table>
          <tbody>{this.createBoard()}</tbody>
        </table>
        <div>
          <button onClick={this.startCellularAutomation.bind(this)}>
            Start
          </button>
          <button onClick={this.stopCellularAutomation.bind(this)}>Stop</button>
        </div>
      </div>
    );
  }
}

export default Main;
