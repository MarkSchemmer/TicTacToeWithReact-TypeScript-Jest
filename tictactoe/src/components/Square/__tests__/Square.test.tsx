import * as React from 'react'
import * as enzyme from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Board from '../../Board/Board'
import Square from '../Square'

let fakeProps = {
    id : 1, 
    coor: [0,0],
    val : null 
}
 
enzyme.configure({ adapter: new Adapter() });

describe('dummy test for Square ', () => {

    it('dummy', () => {
        expect(true).toEqual(true)
    })

})

describe(' Simulating events on <Square />', () => {

    it(' Will onClick be fired when clicked ', () => { 
        const onClickSpy = jest.fn()
        const wrapper = enzyme.shallow( <Square {...fakeProps} onClick={onClickSpy} /> )
        wrapper.find('.column').simulate('click')
        expect(onClickSpy).toHaveBeenCalled() 
    })

    it('render <Board /> and simulate change on first <Square /> ', () => {
        const onClickSpy = jest.fn()
        const wrapper = enzyme.shallow( <Square {...fakeProps} onClick={onClickSpy} /> )

        wrapper.find('.column').simulate('click')

        expect(onClickSpy).toHaveBeenCalled()
        
        wrapper.setProps({ val : 'X' })

        expect(wrapper.find('.square-val').text()).toBe('X')
    })

    it(' test update for <Square /> component ', () => {

        const onClickSpy = jest.fn()

        const wrapper = enzyme.mount( <Board /> )

        expect(wrapper.find('.column')).toHaveLength(9)

        wrapper.find('.column').at(0).simulate('click')

        wrapper.update() 

        expect( wrapper.find('.column').at(0).text() ).toEqual('X')

    })
})

describe(' snapshot testing for <Square /> ', () => {
    it('snapshot of square... ', () => {
        const tree = renderer.create(<Square {...fakeProps} onClick={jest.fn()} /> ).toJSON()
        expect(tree).toMatchSnapshot() 
    })
})