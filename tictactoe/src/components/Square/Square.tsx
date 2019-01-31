import React, { Component } from 'react'
import './Square.css'

interface IProps {
    id : number, 
    coor: Array<number>,
    val : string | null,
    onClick(coor:Array<number>) : void,
    IsWinningSquare : boolean | null 
}

interface IState { }

class Square extends Component<IProps, IState> {


    
    constructor( props : IProps){
        super(props)
    }


    public render () {
        return (
            <React.Fragment>
                <span onClick={() => this.props.onClick(this.props.coor)} className="column" style={{ backgroundColor : this.props.IsWinningSquare === true ? 'yellow': ''}} > 
                       <div className="square-val">{ this.props.val }</div> 
                </span>
            </React.Fragment>
        )
    }
}

export default Square 

