import React, { Component } from 'react'
import History from '../History/History'
import Square from '../Square/Square'
import './Board.css'

import * as api from '../../API/api'

import  * as BoardAttributes from './BoardTypes'

interface IProps {

}

interface IState {
    name : string, 
    board : Array<BoardAttributes.BoardWithMoves>,
    turn : number,
    IsWinner : number | null,
}

class Board extends Component<IProps, IState> {


    constructor(props : IProps){
        super(props)

        this.goBackInTime = this.goBackInTime.bind(this)
    }

    public state : IState = {
        name : 'Mark',
        board : [api.genBoard()],
        turn : 0,
        IsWinner : null, 
    }


    public goBackInTime = (index : number) => {
        let copyOfBaord = this.state.board.slice(0, index+1)
        let newTurn = index
        this.setState({ 
           // board : copyOfBaord,
            turn : newTurn 
         }, () => {
            // console.log(this.state.board)
            // console.log(this.state.turn)
            // console.log(this.state.board[this.state.turn])
         })
    } 



    public resetGame = () : void => {
        this.setState({
            board: [api.genBoard()], 
            turn : 0, 
            IsWinner : null 
        })
    }



    public onClick = (coor:Array<number>) => {
        const [x,y] = coor

        if(this.state.board[this.state.turn].history[x][y].val !== null) return  

        if(this.state.IsWinner !== null) return 

        let copyOfBoard  = this.state.board.slice(0, this.state.turn+1)


        // copy of history
        let copyOfHistory = JSON.parse(JSON.stringify(this.state.board.slice()[this.state.turn].history.slice().map(x => x).slice()))

        // copy of Move 
        let copyOfMove = this.state.board[this.state.turn].Move.slice()
        copyOfMove = [x,y]


        let whosMoving
    

        if(this.state.turn%2==0)
            whosMoving = 'X'
        else 
            whosMoving = 'O'

        copyOfHistory[x][y].val = whosMoving

        let newCopy = new BoardAttributes.BoardWithMoves(copyOfHistory, copyOfMove, whosMoving, this.state.turn+1)

            this.setState((prevState) => {
                return {
                    turn : prevState.turn+1,
                    board : copyOfBoard.concat(newCopy)
                }
            }, () => this.checkForWinner())
    }
 

    public checkForWinner = () => {
        const hasWinner = api.IsWinner(this.state.board[this.state.turn].history)
        let whichOption = null 

        if(hasWinner===api.OPTIONS.XWIN)
            whichOption = api.OPTIONS.XWIN
        else if (hasWinner === api.OPTIONS.XLOSE) 
              whichOption = api.OPTIONS.XLOSE
        else if (hasWinner === api.OPTIONS.TIE)
                whichOption = api.OPTIONS.TIE

     if (whichOption)
        this.setState( { IsWinner : whichOption }, () => this.setWinner() ) 
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
                <History history={this.state.board} goBackInTime={this.goBackInTime}  /> 
                  <div className="greetings">Greetings { this.state.name }</div>
                  <div className="whoms-turn">  { this.setWinner() } </div>
                    <div className="board">
                            { this.state.board[this.state.turn].history.map((x:any) => 
                               <div className="row" key={ Date.now() * (Math.random() * 100) }>
                                    { x.map((z:any) => <Square key={z.id * Date.now()} {...z} 
                                        onClick={this.onClick.bind(this)} /> )}
                               </div> )}
                    </div>
                   { this.state.IsWinner ? <div className="play-again">
                                <button onClick={() => this.resetGame() }>Click to play again.</button>
                   </div> : null  }
                </div>
            </React.Fragment>
        )
    }
}

export default Board 

