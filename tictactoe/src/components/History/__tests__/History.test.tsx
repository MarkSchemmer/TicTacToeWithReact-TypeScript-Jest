import * as React from 'react'
import * as enzyme from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Board from '../Board'


enzyme.configure({ adapter: new Adapter() });

describe(' dummy test for History', () => {
    it('dummy it', () => {
        expect(true).toEqual(true)
    })
})