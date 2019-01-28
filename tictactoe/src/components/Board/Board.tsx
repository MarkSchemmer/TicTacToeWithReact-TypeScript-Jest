import React, { Component } from 'react'
import './Board.css'


interface IProps {

}

interface IState {
    name : string, 
    board : any
}

class Board extends Component<IProps, IState> {

    public state : IState = {
        name : 'Mark',
        board : genBoard()
    }

    public render () {
        return (
            <React.Fragment>
                <div className="main">
                  <div className="greetings">Greetings { this.state.name }</div>
                    <div className="board">
                            { this.state.board.map((x:any) => 
                               <div className="row" key={Date.now()*(Math.random()*100)}>
                                    { x.map((z:any) => <span className="column" key={z.id}> { z.val } </span> )}
                               </div> )}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Board 


//let genBoard = () => [...Array(3)].map(x => [...Array(3)].map( y => ({ val: null, coor : [x,y]  }) ))
let id = 0
let genBoard = () => Array.from(new Array(3), (val, x) => {
    return Array.from(new Array(3), (otherVal, y) => ({
        id : id++,
        coor : [x,y], 
        val : null 
    }))
} )
