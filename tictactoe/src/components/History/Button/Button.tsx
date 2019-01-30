import React, { Component } from 'react'
import * as types from '../../Board/BoardTypes'
import './Button.css'


interface IProps {
    obj : types.BoardWithMoves, 
    index : number, 
    x : number, 
    y : number, 
    whoIsClicked : number | null, 
    handleClick : any 
}

class Button extends Component<IProps> {

    constructor(props : IProps){
        super(props)
        this.toggleIsClicked = this.toggleIsClicked.bind(this)
    }


    public toggleIsClicked = () : void => {
        this.props.handleClick(this.props.index)
    }

    
    public genButton = (content : string, shouldHighlight : boolean) => 
        shouldHighlight ? <button onClick={ this.toggleIsClicked }><strong>{ content }</strong></button> 
                        : <button onClick={ this.toggleIsClicked }> {content} </button>  

    public outputingButton = (obj : types.BoardWithMoves, 
                              index : number, 
                              x : number, 
                              y : number) => {

        let complexButton = ` Player: ${obj.WhomMoved} Move :${index} Coordinate : (${x}, ${y}) `
        let originalButton

        switch(index){
            case 0 :
                originalButton = (
                    <React.Fragment key={index}>
                        { this.genButton("Start of Match", this.props.whoIsClicked===index) } 
                    </React.Fragment>
                )
            break 

           default :
                    originalButton = (
                    <React.Fragment key={index*Date.now()}>
                            { this.genButton(complexButton, this.props.whoIsClicked===index) }
                    </React.Fragment>
                    )
            break 
        }

        return originalButton
    }

    public render () {
       let { obj, index, x, y} = this.props
        return (
            <React.Fragment>
                { this.outputingButton(obj, index, x, y)}
            </React.Fragment>
        )
    }
}


export default Button 