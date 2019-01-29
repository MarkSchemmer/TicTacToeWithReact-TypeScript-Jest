import * as React from 'react'
import * as enzyme from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Board from '../Board'


enzyme.configure({ adapter: new Adapter() });


describe(' X Should be able to Win Lose and Should have Tie... ', () => {
    it(' X should be winner ', () => {
        const wrapper = enzyme.mount( <Board /> )
        let squares = wrapper.find('.column')


        squares.at(0).simulate('click')
        wrapper.update()
        expect(wrapper.find('.column').at(0).text()).toEqual('X')


        squares.at(1).simulate('click')
        wrapper.update()
        expect(wrapper.find('.column').at(1).text()).toEqual('O')

        squares.at(3).simulate('click')
        wrapper.update()
        expect(wrapper.find('.column').at(3).text()).toEqual('X')

        squares.at(4).simulate('click')
        wrapper.update()
        expect(wrapper.find('.column').at(4).text()).toEqual('O')


        squares.at(2).simulate('click')
        wrapper.update()
        expect(wrapper.find('.column').at(2).text()).toEqual('X')


        squares.at(7).simulate('click')
        wrapper.update()
        expect(wrapper.find('.column').at(7).text()).toEqual('O')


        // final assertion to determine if Player O wins?

        expect(wrapper.find('.whoms-turn').text()).toEqual("  Player O You Win! ")

    })

    it(' Should be Tie Game! ', () => {
        const wrapper = enzyme.mount( <Board /> )
        let squares = wrapper.find('.column')
        let seriesOfMoves = [ 0,1,3,4,7,6,8,5,2 ]

        seriesOfMoves.forEach(x => {
            squares.at(x).simulate('click')
            wrapper.update()
        })

        expect(wrapper.find('.whoms-turn').text()).toEqual("  TIE GAME! ")
    })


    it(' Should say that X wins ', () => {
        const wrapper = enzyme.mount( <Board /> )
        let squares = wrapper.find('.column')
        let seriesOfMoves = [ 0, 1, 4, 2, 8]

        seriesOfMoves.forEach( x => {
            squares.at(x).simulate('click')
            wrapper.update()
        })

        expect(wrapper.find('.whoms-turn').text()).toEqual("  Player X You Win! ")
        
    })

})