const {Circle, Square, Triangle} = require("./shapes");


//circle test

describe('Circle', () => {
    test('renders correctly', () => {
        const shape = new Circle();
        var color = ('blue')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height= "100%" width ="100%" fill="${this.color}"/>`)
    })
});

//square test
describe('Square', () => {
    test('renders correctly', () => {
        const shape = new Square();
        var color = ('red')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<rect x="50" width="200" height="200" fill="${this.color}"/>`)
    })
});

//triangle test
describe('Triangle', () => {
    test('renders correctly', () => {
        const shape = new Triangle();
        var color = ('black')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<polygon width="200" height="200" points="0,200 300, 200 150,0" fill="${this.color}"/>`)
    })
});