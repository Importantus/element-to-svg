# ElementToSVG
![ElementToSVG](https://img.shields.io/badge/ElementToSVG-alpha-blue.svg)

The ElementToSVG class is a small package created for a personal website project. It provides functionality to animate HTML elements to SVG paths. 

<img src="./image/ElementToSVG.gif" width="600" style="border-radius: 5px"/>



## Installation

To use ElementToSVG, you need to download the `elementToSVG.js` file and include the script in your HTML file:

```html
<script src="elementToSvg.js"></script>
```

Then you can import the class in your code, create an instance of ElementToSVG and start animating elements to SVG paths.

## Usage

To create an instance of ElementToSVG, you need to provide the following parameters:

- `elementContainer`: The ID of the container element where the HTML elements will be appended.
- `paths`: An array of SVG paths to animate the elements to.
- `options`: An optional object containing additional options.

The options object can contain the following properties:

- `numElements`: The number of HTML elements to create. (Default: 300)
- `blink`: Whether the elements should blink. (Default: false)
- `blinkOptions`: An object with the following blink options:
    - `blinkInterval`: The interval between each blink in seconds. (Default: 1)
    - `blinkOpacity`: The opacity of the blinking element. (Default: 0.5)
    - `blinkDuration`: The duration of each blink animation in milliseconds. (Default: 1000)
- `animationDuration`: The duration for animating the elements to the path. (Default: 1000)
- `transition`: A transition function for animating the elements to the path. (Default: none/linear)
- `element`: A function for creating an HTML element. (Default: DEFAULT_ELEMENT)

Here's an example of how to create an instance of ElementToSVG:

```js	
const paths = document.querySelectorAll('path');
const options = {
  numElements: 50,
  blink: true,
  blinkOptions: {
    blinkInterval: 0.5,
    blinkOpacity: 0.8,
    blinkDuration: 500
  },
  animationDuration: 2000,
  transition: (x, y) => [
    { left: x + 'px', top: y + 'px' },
    { left: (x + 50) + 'px', top: (y + 50) + 'px' },
    { left: (x - 50) + 'px', top: (y - 50) + 'px' },
  ],
  element: (index) => {
    const element = document.createElement('div');
    element.classList.add('element');
    element.innerText = index;
    return element;
  }
};

const elementToSVG = new ElementToSVG('container', paths, options);
```

## Methods
### registerPath(path)

Register a new path to be used for animating the elements. The path should be an `SVGPathElement`.
### toPath(pathNumber, toPathOptions)

Animate the elements to a specific path.

- `pathNumber`: The index of the path to animate to.
- `toPathOptions`: An optional object containing additional options:
    - `scale`: The scale of the path. Defaults to 1.
    - `animate`: Whether to animate the transition. Defaults to true.

## Example

Here's an example of how you can use ElementToSVG to animate elements to an SVG path:

```js
import ElementToSVG from './elementToSvg.js';

const paths = document.querySelectorAll('path');

const elementToSVG = new ElementToSVG('container', paths, {
  numElements: 100,
  blink: true,
  blinkOptions: {
    blinkInterval: 0.5,
    blinkOpacity: 0.8,
    blinkDuration: 500
  },
  animationDuration: 2000,
  transition: (x, y) => [
    { left: x + 'px', top: y + 'px' },
    { left: (x + 50) + 'px', top: (y + 50) + 'px' },
    { left: (x - 50) + 'px', top: (y - 50) + 'px' },
  ],
  element: (index) => {
    const element = document.createElement('div');
    element.classList.add('element');
    element.innerText = index;
    return element;
  }
});

elementToSVG.registerPath(document.querySelector('#path1'));
elementToSVG.registerPath(document.querySelector('#path2'));

elementToSVG.toPath(0);
```

In this example, we create an instance of ElementToSVG with 100 HTML elements, and we register two paths using the registerPath method. Then, we animate the elements to the first path using the toPath method. The elements will blink every 0.5 seconds with an opacity of 0.8 and a duration of 500 milliseconds.

## Contributing
This project is ~~still~~ in an early stage of development. If you have any suggestions or ideas, feel free to open an issue or submit a pull request.

If you want to contribute to the project, please use [gitmoji](https://gitmoji.dev/) in your commit messages. You can use the following command to install the gitmoji-cli tool:

```bash
npm install -g gitmoji-cli
```

And then initialize the gitmoji hook in your project:

```bash
gitmoji -i
```
