import React, { Component } from 'react'
import * as types from '../../Board/BoardTypes'
import './Button.css'


interface IProps {
    obj : types.BoardWithMoves, 
    index : number, 
    x : number, 
    y : number, 
    whoIsClicked : number | null, 
    handleClick : any, 
    StepMove : number
}

class Button extends Component<IProps> {

    constructor(props : IProps){
        super(props)
        this.toggleIsClicked = this.toggleIsClicked.bind(this)
    }


    public toggleIsClicked = () : void => {
        this.props.handleClick(this.props.StepMove)
    }

    
    public genButton = (content : string, shouldHighlight : boolean) => 
        shouldHighlight ? <button className="hist-btn" onClick={() =>  this.toggleIsClicked() }><strong>{ content }</strong></button> 
                        : <button className="hist-btn" onClick={() =>  this.toggleIsClicked() }> {content} </button>  

    public outputingButton = (obj : types.BoardWithMoves, 
                              index : number, 
                              x : number, 
                              y : number, StepMove : number) => {

        

        let complexButton = ` Player: ${obj.WhomMoved} Move :${StepMove} Coordinate : (${x}, ${y}) `

        return (
                <React.Fragment key={index*Date.now()}>
                        { this.genButton(complexButton, this.props.whoIsClicked===StepMove) }
                </React.Fragment>
            )
    }

    public render () {
       let { obj, index, x, y, StepMove } = this.props
        return (
            <React.Fragment>
                { this.outputingButton(obj, index, x, y, StepMove) }
            </React.Fragment>
        )
    }
}


export default Button 