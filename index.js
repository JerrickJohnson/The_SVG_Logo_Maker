const fileSystem = require('fs');
const inquirer = require("inquirer");
// const fs = require('fs');
const {Circle, Square, Triangle} = require("./lib/shapes");

class Svg {
    constructor() {
        this.textElement = ''
        this.shapeElement = ''
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    
    setTextElement(text,color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }

    setShapeElement(shape) {
        this.shapeElement = shape.render()
    }
}

//Questions for SVQ build

const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to 3 characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: Enter a color (or a hexadecimal number):",
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Enter a color (or a hexadecimal number):",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which shape you would like:",
        choices: ["Circle", "Square", "Triangle"],
    },
];

//function to write to file

function writeToFile(filename, data) {
    console.log("Writing [" + data + "] to file [" + filename + "]")
    fileSystem.writeFile(filename, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("You generated a logo.svg!");
    });
}


async function init() {
    console.log("Starting init");
        var svgString = "";
        var svg_file = "logo.svg";

    const answers = await inquirer.prompt(questions);

        var userText = "";
        if (answers.text.length > 0 && answers.text.length < 4) {
            userText = answers.text;
        } else {
            console.log("You can only enter 1-3 characters!");
        
            return;
        }

        console.log("User text: [" + userText + "]");
        userFontColor = answers["text-color"];
        console.log("User font color: [" + userFontColor + "]");
        userShapeColor = answers.shape;

        console.log("User shape color: [" + userShapeColor + "]");
        userShapeType = answers["pixel-image"];

        console.log("User shape selected: [" + userShapeType + "]");

        let userShape;
        if (userShapeType === "Square" || userShapeType === "square") {
            userShape = new Square();
            console.log("User selected square shape");
        }
        else if (userShapeType === "Circle" || userShapeType === "circle") {
            userShape = new Circle();
            console.log("User selected circle shape");
        }
        else if (userShapeType === "Triangle" || userShapeType === "triangle") {
            userShape = new Triangle();
            console.log("User selected triangle shape");
        }
        else {
            console.log("Invalid shape selected!")
        }
        userShape.setColor(userShapeColor);

        //Create new SVG
        var svg = new Svg();
        svg.setTextElement(userText, userFontColor);
        svg.setShapeElement(userShape);
        svgString = svg.render();

        console.log("Shape generated!");
        console.log("Writing shape to file");
        writeToFile(svg_file, svgString);
}
init()