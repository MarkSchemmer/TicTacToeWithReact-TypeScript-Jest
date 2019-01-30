import * as BoardTypes from '../components/Board/BoardTypes'

export const OPTIONS = {
    XWIN : 1,
    XLOSE : 2,
    TIE : 3, 
    MOREMOVES : 4
}


let threeInRow = (chr, [a,b,c], nb) =>  nb[a] === nb[b] && nb[b] === nb[c] && nb[a] === chr

export function IsWinner (board){

    let nb = board
    .reduce((acc,cur) => acc.concat(cur), [])
    .map( x => x.val )

    let waysToWin = [
        [0,1,2],
        [0,4,8],
        [0,3,6],
        [1,4,7],
        [2,4,6],
        [2,5,8],
        [3,4,5],
        [6,7,8]
    ]

    for(let i = 0; i < waysToWin.length; i++) {

        if(threeInRow('X', waysToWin[i], nb))
            return OPTIONS.XWIN
        else if (threeInRow('O', waysToWin[i], nb))
            return OPTIONS.XLOSE
    }

    return nb.every(x => x !== null ) ? OPTIONS.TIE : OPTIONS.MOREMOVES
}


export function genBoard () {
    let id = 0
    let squareObj = BoardTypes.SquareAttributes
    let BoardObjWithMoves = BoardTypes.BoardWithMoves
    let board = [...Array(3).keys()].map((val, x) => {
        return [...Array(3).keys()].map((innerVal, y) => {
            return new squareObj(id++, [x,y], null)
        })
    })


    return new BoardObjWithMoves(board, [], null)
}
