import React, { Component } from 'react'


interface ISquareAttributes {
    id : number, 
    coor : Array<number> 
    val : string | null 
}

interface IBoardWithMove {
    history : Array<Array<ISquareAttributes>>,
    Move : Array<Array<number>> | null,
    WhomMoved : string | null 
}


export class SquareAttributes implements ISquareAttributes {
    public id : number; 
    public coor : Array<number>;
    public val : string | null;

    constructor(id : number, coor : Array<number>, val : string | null = null){
        this.id = id
        this.coor = coor 
        this.val = val 
    }
}

export class BoardWithMoves implements IBoardWithMove {
    
    public history : Array<Array<SquareAttributes>>

    public Move : Array<Array<number>>

    public WhomMoved : string | null 
    
    constructor(history:Array<Array<SquareAttributes>>,
         Move : Array<Array<number>>, 
         WhomMoved : string | null = null ){
        this.history = history
        this.Move = Move 
        this.WhomMoved = WhomMoved
    }
}