import React from 'react';
import Tile from './components/tile';
import {N, fillArray, directions, rotate, joinLeft, slideLeft, matches} from './utils/utils';
import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: fillArray(N).map(() => fillArray(N))
    };
  }

  componentDidMount() {
    this.board.focus();
    this.insertRandom();
  }

  insertRandom = () => {
    const {board} = this.state;
    const x = Math.floor(Math.random() * N);
    const y = Math.floor(Math.random() * N);
    const value = 2 * Math.ceil(Math.random() * 2);

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!board[(i + x) % N][(j + y) % N]) {
          board[(i + x) % N][(j + y) % N] = value;
          return this.setState({board});
        }
      }
    }
  };

  slide = rotations => {
    let {board} = this.state;
    let i = 0;
    while (i < rotations) {
      board = rotate(board);
      i++;
    }

    board = board.map(row => joinLeft(row));
    board = board.map(row => slideLeft(row));

    while (i > 0 && i < 4) {
      board = rotate(board);
      i++;
    }

    if (!matches(board, this.state.board)) {
      this.setState({board}, this.insertRandom);
    }
  };

  handleKeyPress = ({key}) => {
    switch (key) {
      case directions.UP:
        return this.slide(3);
      case directions.DOWN:
        return this.slide(1);
      case directions.LEFT:
        return this.slide(0);
      case directions.RIGHT:
        return this.slide(2);
    }
  };

  render() {
    const {board} = this.state;

    return (
      <div className="app" tabIndex={0} ref={x => this.board = x} onKeyDown={this.handleKeyPress}>
        {
          board.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((value, j) => <Tile key={j} value={value}/>)}
            </React.Fragment>)
          )
        }
      </div>
    );
  }
}

export default App;
