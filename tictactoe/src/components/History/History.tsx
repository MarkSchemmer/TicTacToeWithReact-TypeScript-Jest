import React, { Component } from 'react'
import * as  BoardAttributes from '../Board/BoardTypes'
import './History.css'

interface IProps {
    history : Array<BoardAttributes.BoardWithMoves>
}

class History extends Component<IProps> {

    constructor(props : IProps) {
        super(props)
    }


        public render () {
            return (
                    <div className="history">
                            { this.props.history.map((obj, index) => 
                                
                                    {if(index === 0) {
                                            return (
                                                <React.Fragment>
                                                    <button key={index}>Start of Match</button>
                                                </React.Fragment>
                                            )
                                    } else {
                                        console.log(obj.Move)
                                        let [x,y] = obj.Move
                                            return (
                                                <React.Fragment>
                                                    <button key={index}>{` Player: ${obj.WhomMoved} Move :${index} Coordinate : (${x},${y}) `}</button>   
                                                </React.Fragment>
                                            )
                                    }}
                                )}
                    </div>
            )
    }
}

export default History