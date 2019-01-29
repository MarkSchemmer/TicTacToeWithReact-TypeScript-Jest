import * as React from 'react'
import * as enzyme from 'enzyme'
import  Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer'
import Board from '../Board'


/*

    Some quick notes on Shallow, Mount, Render : 
        Shallow:  rendering is testing the component as a unit, also this shallow rendering does 
        render any child elements...
        
        Mount: is full dom rendering of component and child components, and remember that mount actually 
            mounts the component in the DOM and any changes will affect other children... 

        Render: I guess it renders the component to static html but uses the cheerio api for traversing 
*/

enzyme.configure({ adapter: new Adapter() });

describe('testing that <Board /> has greetings tag with my name', () => {

    let greetings 
    beforeEach(() => {
        greetings = enzyme.shallow( <Board /> )
    })

    it(' Should be true! ', () => {
            expect(greetings.find('.greetings').text()).toEqual('Greetings Mark')
    }) 

    it(' should be false ', () => {
        let expected = greetings.find('.greetings').text() === 'Mark Greetingsw'
        expect(expected).toEqual(false)
    })

    // board renders with 3 rows and 3 columns...  

    it( ' has 3 rows ? ', () => {  
        expect(greetings.find('.row')).toHaveLength(3)
    })


    // board should have 9 columns... 

    it(' should have 9 columns?', () => {
        expect(greetings.find('.column')).toHaveLength(9)
    })
    
    // has proper state 

    it(' has state items Mark and Board', () => {
        const wrapper = enzyme.mount(<Board /> )

        expect(wrapper.state().name).toEqual('Mark')
        expect(wrapper.state().board.length).toEqual(3)
    })

    // setup snapshot testing...   
    // not using the enzyme  snapshot... 

    it('Snapshot test for <Board /> ', () => {
        const tree = renderer.create(<Board />).toJSON() 
        expect(tree).toMatchSnapshot() 
    })

})



