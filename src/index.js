import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)) {
      return true;
    }else if(noMove(squares)){
      return true;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const nextState = !this.state.xIsNext;
    this.setState({
      history: history.concat([{ squares: squares }]),
      stepNumber: history.length,
      xIsNext: nextState,
    });
  }

  jumpTo(step) {
    if (step >= 0) {
      this.setState({
        stepNumber: step,
        xIsNext: step % 2 === 0,
      });
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const move = noMove(current.squares)
    const winner = calculateWinner(current.squares);
    // const moves = history.map((step, move) => {
    //   const desc = move ? "Go to move #" + move : "Go to game start";
    //   return (
    //     <li key={move}>
    //       <button className="move" onClick={() => this.jumpTo(move)}>
    //         {desc}
    //       </button>
    //     </li>
    //   );
    // });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (move) {
      status = "Draw";
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <h1 className="h1 mt-3 text-center Name col-md-12">TIC TAC TOE</h1>
        <div className="row">
          <div className="game-board g-0 col-md-6">
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info g-0 col-md-6">
            <div className="status text-center col-12">{status}</div>
            <div className="row">
              <div className="buttons g-2 text-center col-12">
                <button className="reset m-1 col-12" onClick={() => this.jumpTo(0)}>
                  Reset
                </button>
                {/* <br /> */}
                <button
                  className="undo m-1 col-12"
                  onClick={() => this.jumpTo(this.state.stepNumber - 1)}
                >
                  Undo
                </button>
              </div>
              {/* <ol className="col-6 g-0 text-center">{moves}</ol> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function noMove(squares) {
  for(let i = 0; i<squares.length;i++){
    if(squares[i]===null){
      return false;
    }
  }
  return true;
}
