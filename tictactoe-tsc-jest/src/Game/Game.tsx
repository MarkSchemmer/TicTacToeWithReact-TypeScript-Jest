import * as React from 'react';
import * as _ from '../Helpers/helpers'
import Square from '../Square/Square'
import './Game.css';


interface IProps {

}


interface IState {
  squares : Array<Array<_.Square>>;
  xIsNext : boolean 
}

let createSquares = () : Array<Array<_.Square>> => {
  return [...Array(3)]
  .map((level,idx) => [...Array(3)].map((sublevel,subIdx) => new _.Square(idx,subIdx)))
}

class App extends React.Component<IProps, IState> {

  private constructor(props:any){
    super(props)
    this.state  = { squares :  createSquares(), xIsNext : true }
  }


  public render() {
    return (
      <div className="App">
            
      </div>
    );
  }
}

export default App;
