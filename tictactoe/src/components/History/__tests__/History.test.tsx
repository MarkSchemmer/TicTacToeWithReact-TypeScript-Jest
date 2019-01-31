import * as React from 'react'
import * as enzyme from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Board from '../../Board/Board'
import History from '../History'

import * as types from '../../Board/BoardTypes'

import * as api from '../../../API/api.js'


enzyme.configure({ adapter: new Adapter() });

describe(' dummy test for History', () => {
    it('dummy it', () => {
        expect(true).toEqual(true)
    })
})


describe(' simulating clicks on board and on history buttons ', () => {
    
    it(' click board 3 time should have 4 buttons for history ', () => {
        const wrapper = enzyme.mount( <Board /> )
        let findSquares = wrapper.find('.column')
        let historyButtons = wrapper.find('.history button')
        let seriesOfClicksOnSquares = [0,1,5,2]

        seriesOfClicksOnSquares.forEach(x => {
            findSquares.at(x).simulate('click')
            wrapper.update()
        })

        expect(wrapper.find('.hist-btn')).toHaveLength(4)
    })

    /*  statement P:
        click board 3 times and then click 3rd history button button 
        should be highlight and board should show only pos 0 should
        be X and pos 1 should be O
    */

    it(' Please refer to comment statement P ', () => {
        const wrapper = enzyme.mount(<Board/> )
        let findSquares = wrapper.find('.column')
        let historyButtons = wrapper.find('.hist-btn')
        let seriesOfClicksOnSquares = [0, 1, 5, 2]

        // should be empty Baord 
       //  expect(findSquares.everyWhere(x => x.text() )).toEqual('')

        seriesOfClicksOnSquares.forEach(x => {
            findSquares.at(x).simulate('click')
            wrapper.update()
        })

        expect(wrapper.find('.hist-btn')).toHaveLength(4)

        expect(wrapper.find('.hist-btn').at(2).html()).toEqual("<button class=\"hist-btn\">  Player: X Move :3 Coordinate : (1, 2)  </button>")

        wrapper.find('.hist-btn').at(2).simulate('click')
        wrapper.update()

        expect(wrapper.find('.hist-btn').at(2).html()).toEqual("<button class=\"hist-btn\"><strong> Player: X Move :3 Coordinate : (1, 2) </strong></button>")

        let findUpdatedSquares = wrapper.find('.column')

        expect(findUpdatedSquares.at(0).text()).toEqual('X')
        expect(findUpdatedSquares.at(1).text()).toEqual('O')

        expect(findUpdatedSquares.at(2).text()).toEqual('')
        expect(findUpdatedSquares.at(3).text()).toEqual('')
        expect(findUpdatedSquares.at(4).text()).toEqual('')
        expect(findUpdatedSquares.at(5).text()).toEqual('X')
        expect(findUpdatedSquares.at(6).text()).toEqual('')
        expect(findUpdatedSquares.at(7).text()).toEqual('')
        expect(findUpdatedSquares.at(8).text()).toEqual('')


        expect(findUpdatedSquares).toHaveLength(9)
        
    })
})


describe(' first two buttons are always Toggle Moves and Start Match...', () => {

    let props, goBackInTime, board 

    beforeEach(() => {
        props = {
            history : [api.genBoard()]
        }

        goBackInTime = jest.fn()

        board = enzyme.mount( <Board /> )
    })

    it('Toggle is first', () => {
        const wrapper = enzyme.shallow( <History {...props} goBackInTime={goBackInTime} /> )

        expect(wrapper.find('button').at(0).text()).toEqual('Toggle Moves')
    })

    it(' Start Match is seconded ', () => {
        const wrapper = enzyme.shallow( <History {...props} goBackInTime={goBackInTime} /> )
        
        expect(wrapper.find('button').at(1).text()).toEqual('Start Match')
    })

    it(' simulate click on board and should have 3 buttons in history ', () => {
        board.find('.column').at(0).simulate('click')
        board.update()

        expect(board.find('.history button')).toHaveLength(3)
    })
})


describe(' Snapshot for <History /> ', () => {

    let props, goBackInTime

    beforeEach(() => {
        goBackInTime = jest.fn()
        props = {
            history : [api.genBoard()], 
        }
    })

    it(' Snapshot of <History /> ', () => {
        const tree = renderer.create( <History {...props} goBackInTime={goBackInTime} /> ).toJSON()
        expect(tree).toMatchSnapshot() 
    })
})