import * as React from 'react'
import * as enzyme from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'

import Button from '../Button'

import * as types from '../../../Board/BoardTypes'

import * as api from '../../../../API/api.js'

 
enzyme.configure({ adapter: new Adapter() });


describe(' dummy for Button ', () => {
    it(' dummy it test', () => {
        expect(true).toEqual(true)
    })
})



/*
    create fakes props for tests
        - Does function get called when button clicked 
        - Test both outputs, such as index === 0 and output for index > 0 
*/

describe(' Testing <Button /> with fake props ', () => {

    let buttonFakeProps, handleClick

    beforeEach(() => {

        handleClick = jest.fn()

        buttonFakeProps = {
            obj : api.genBoard(),
            index : 1,
            x : 0,
            y : 0, 
            whoIsClicked :  1,
        }
    })

    it(' will handle click be called ', () => {
        const wrapper = enzyme.shallow( 
            <Button 
                {...buttonFakeProps} 
                handleClick={handleClick} /> )
        wrapper.find('button').simulate('click')
        wrapper.update()

        expect(handleClick).toHaveBeenCalled() 
    })

    it(' what is the output of click ', () => {
        const wrapper = enzyme.shallow(
            <Button 
                {...buttonFakeProps}
                handleClick={handleClick} /> )

         wrapper.find('button').simulate('click')
         wrapper.update()

        const { obj, index, x, y, whoIsClicked } = buttonFakeProps

        
         expect(wrapper.find('button').text()).toEqual("  Player: null Move :undefined Coordinate : (0, 0)  ")
        
    })
})



// snapshot testing 



describe(' snapshot test for <Button /> ', () => {


    let buttonFakeProps, handleClick

    beforeAll(() => {

        handleClick = jest.fn()

        buttonFakeProps = {
            obj : api.genBoard(),
            index : 1,
            x : 0,
            y : 0, 
            whoIsClicked :  null,
        }
    })

    it(' snapshot test', () => {
        let handleClick = jest.fn()
        const tree = renderer.create( <Button 
                {...buttonFakeProps} 
                handleClick={handleClick} /> ).toJSON()

        expect(tree).toMatchSnapshot() 
    })
})