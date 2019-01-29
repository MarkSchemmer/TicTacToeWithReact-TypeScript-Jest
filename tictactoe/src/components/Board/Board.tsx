import React, { Component } from 'react'
import Square from '../Square/Square'
import './Board.css'

import * as api from '../../API/api'


interface IProps {

}

interface IState {
    name : string, 
    board : any,
    turn : number,
    IsWinner : number | null 
}

class Board extends Component<IProps, IState> {


    public state : IState = {
        name : 'Mark',
        board : genBoard(),
        turn : 0,
        IsWinner : null 
    }


    public onClick = (coor:Array<number>) => {
        const [x,y] = coor
        if(this.state.board[x][y].val !== null) return  
        let copy = Object.assign({}, 
            { board : this.state.board, turn : this.state.turn+1, name: 'Mark' })
        if(this.state.turn%2==0)
            copy.board[x][y].val = 'X'
        else 
            copy.board[x][y].val = 'O'
        this.setState(copy, () => {
            this.checkForWinner()
        })
    }

    private SetIsWinner = (option:number|null) => this.setState({ IsWinner : option })  

    public checkForWinner = () => {
        const hasWinner = api.IsWinner(this.state.board)
        let whichOption = null 

        console.log(hasWinner)

        if(hasWinner===api.OPTIONS.XWIN)
            whichOption = api.OPTIONS.XWIN
        else if (hasWinner === api.OPTIONS.XLOSE) 
              whichOption = api.OPTIONS.XLOSE
        else if (hasWinner === api.OPTIONS.TIE)
                whichOption = api.OPTIONS.TIE

     if (whichOption)
        this.setState( { IsWinner : whichOption }, () => {
            this.setWinner()
        } )
        
    }

    public setWinner = () => {
        if(this.state.IsWinner !== null){

            if(this.state.IsWinner===api.OPTIONS.TIE){
                return (
                    <React.Fragment>
                        TIE GAME!
                    </React.Fragment>
                )
            } else {
                if(this.state.IsWinner===api.OPTIONS.XWIN){
                    return (
                        <React.Fragment>
                            Player X You Win!
                        </React.Fragment>
                    )
                } else {
                   return ( <React.Fragment>
                        Player O You Win!
                   </React.Fragment> )
                }
            }

        } else { 
            return (
                <React.Fragment>
                    Player { this.state.turn % 2 === 0 ? <strong>{'X'}</strong> : <strong>{'O'}</strong> } your move!
                </React.Fragment>
            )
        }
    }

    public render () {
        return (
            <React.Fragment>
                <div className="main">
                  <div className="greetings">Greetings { this.state.name }</div>
                  <div className="whoms-turn">  { this.setWinner() } </div>
                    <div className="board">
                            { this.state.board.map((x:any) => 
                               <div className="row" key={ Date.now() * (Math.random() * 100) }>
                                    { x.map((z:any) => <Square key={z.id} {...z} 
                                        onClick={this.onClick.bind(this)} /> )}
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
