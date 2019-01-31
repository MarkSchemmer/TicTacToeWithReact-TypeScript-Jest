import React, { Component } from 'react'


interface ISquareAttributes {
    id : number, 
    coor : Array<number> 
    val : string | null,
    IsWinningSquare : boolean | null 
}

interface IBoardWithMove {
    history : Array<Array<ISquareAttributes>>,
    Move : Array<number> | null,
    StepMove : number,
    WhomMoved : string | null 
}


export class SquareAttributes implements ISquareAttributes {
    public id : number; 
    public coor : Array<number>;
    public val : string | null;
    public IsWinningSquare : boolean | null 

    constructor(id : number, coor : Array<number>, val : string | null = null){
        this.id = id
        this.coor = coor 
        this.val = val 
        this.IsWinningSquare = null 
    }
}

export class BoardWithMoves implements IBoardWithMove {
    
    public history : Array<Array<SquareAttributes>>

    public Move : Array<number>

    public StepMove : number 

    public WhomMoved : string | null 
    
    constructor(history:Array<Array<SquareAttributes>>,
         Move : Array<number>, 
         WhomMoved : string | null = null, StepMove : number ){
        this.history = history
        this.Move = Move 
        this.WhomMoved = WhomMoved
        this.StepMove = StepMove
    }
}