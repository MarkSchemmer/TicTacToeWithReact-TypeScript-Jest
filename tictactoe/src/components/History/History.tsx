import React, { Component } from 'react'
import * as  BoardAttributes from '../Board/BoardTypes'
import Button from './Button/Button'
import './History.css'

interface IProps {
    history : Array<BoardAttributes.BoardWithMoves>, 
    goBackInTime : any 
}

interface IState {
    whoIsClicked : number | null 
}

class History extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props)
        this.handleClickButton = this.handleClickButton.bind(this)
    }


    public state : IState = {
            whoIsClicked : null 
    }


    public handleClickButton = (index: number | null) => {
        this.setState({ whoIsClicked : index}, () => this.props.goBackInTime(index) )
    }

        public render () {
            
            return (
                    <div className="history">
                            { this.props.history.map((obj, index) => {
                                let [x, y] = obj.Move
                                return (
                                    <React.Fragment>
                                        <Button key={index} obj={obj} index={index}
                                                 x={x} y={y} handleClick={this.handleClickButton} 
                                                 whoIsClicked={this.state.whoIsClicked} /> 
                                    </React.Fragment>
                                )
                            })}
                    </div>
            )
    }
}

export default History


// Select button and move to that point in history. and see all moves up to that point -> in process 
// Highlight selected move in history -> waiting ... 