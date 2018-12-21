
export interface ISquare {
    _id : number 
    val : string,
    coordinates : Array<number>
}

export class Square implements ISquare {
    constructor(x:number,y:number) {
        this._id = Math.floor(Date.now() * Math.random() * 100000)
        this.coordinates = [x,y]
    }
    _id : number
    val : string 
    coordinates : Array<number>
}
