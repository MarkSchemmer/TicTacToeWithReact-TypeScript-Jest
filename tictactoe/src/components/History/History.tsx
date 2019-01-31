import React, { Component } from 'react'
import * as  BoardAttributes from '../Board/BoardTypes'
import Button from './Button/Button'
import './History.css'

interface IProps {
    history : Array<BoardAttributes.BoardWithMoves>, 
    goBackInTime : any
}

interface IState {
    whoIsClicked : number | null,
    ShouldReverseButtons : boolean 
}

class History extends Component<IProps, IState> {

    constructor(props : IProps) {
        super(props)
        this.handleClickButton = this.handleClickButton.bind(this)
    }


    public state : IState = {
            whoIsClicked : null ,
            ShouldReverseButtons : false 
    }

    public handleClickButton = (StepMove: number | null) => {
        this.setState({ whoIsClicked : StepMove}, () => this.props.goBackInTime(StepMove) )
    }

    public handleToggleButton = () => {
        this.setState((prevState) => ({ ShouldReverseButtons : !prevState.ShouldReverseButtons }))
    }

        public render () {
                let startMatch = this.props.history.findIndex(x => x.WhomMoved === null)

                let historyFiltered = this.props.history.filter((item,index) => index !== startMatch)

                if(this.state.ShouldReverseButtons)
                    historyFiltered.reverse() 

            return (
                    <div className="history">
                        <button onClick={() => this.handleToggleButton() }>Toggle Moves</button>
                        <button onClick={() => this.handleClickButton(startMatch)}>Start Match</button>
                            { historyFiltered.map((obj, index) => {
                                let [x, y] = obj.Move
                                return (
                                    <React.Fragment key={index*Date.now()}>
                                        <Button  obj={obj} index={index}
                                                 x={x} y={y} handleClick={this.handleClickButton} 
                                                 whoIsClicked={this.state.whoIsClicked} StepMove={obj.StepMove} /> 
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