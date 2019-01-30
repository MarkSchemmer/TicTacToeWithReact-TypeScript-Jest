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
                                                <React.Fragment key={index}>
                                                    <button>Start of Match</button>
                                                </React.Fragment>
                                            )
                                    } else {
                                        let [x,y] = obj.Move
                                            return (
                                                <React.Fragment key={index*Date.now()}>
                                                    <button>{` Player: ${obj.WhomMoved} Move :${index} Coordinate : (${x},${y}) `}</button>   
                                                </React.Fragment>
                                            )
                                    }}
                                )}
                    </div>
            )
    }
}

export default History