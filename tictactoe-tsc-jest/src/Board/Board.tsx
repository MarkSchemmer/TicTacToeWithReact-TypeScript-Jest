import * as React from 'react'
import Square from '../Square/Square'
import * as _ from '../Helpers/helpers'
interface IProps  {
    squares : Array<Array<_.Square>>
}

class Board extends React.Component<IProps> {
    render() {
        const { squares } = this.props
        return (
            <div>
                { squares.map((level) => level.map((sublevel) => {
                        return <Square
                                val={sublevel.val} 
                                coordinates={sublevel.coordinates}  /> 
                }))}          
            </div>
        )
    }
}

export default Board 