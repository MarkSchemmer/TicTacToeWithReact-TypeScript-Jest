import * as React from 'react'

interface IProps {
    coordinates : Array<number>,
    val : string | null 
}


class Square extends React.Component<IProps> {
    render() {
    const { coordinates, val } = this.props 
        return (
            <div className="square">
                Square: { coordinates } { val }
            </div>
        )
    }
}


export default Square



