/**
     * Class for animating HTML elements to SVG paths.
     */
export default class ElementToSVG {

    /**
     * Default number of elements.
     * @type {number}
     */
    static DEFAULT_NUM_ELEMENTS = 300;

    /**
     * Default blink interval in seconds.
     * @type {number}
     */
    static DEFAULT_BLINK_INTERVAL = 1;

    /**
     * Default blink opacity.
     * @type {number}
     */
    static DEFAULT_BLINK_OPACITY = 0.5;

    /**
     * Default blink duration in milliseconds.
     * @type {number}
     */
    static DEFAULT_BLINK_DURATION = 1000;

    /**
     * Default duration for animating to path.
     * @type {number}
     */
    static DEFAULT_ANIMATION_DURATION = 1000;

    /**
     * Default transition function for animating to path.
     */
    static ANIMATIONS = {
        "mix": () => [
            { left: Math.random() * 500 + "px", top: Math.random() * 500 + "px" },
            { left: Math.random() * 500 + "px", top: Math.random() * 500 + "px" },
            { left: Math.random() * 500 + "px", top: Math.random() * 500 + "px" },
        ],
        "turn": (x, y) => [
            { left: y + "px", top: y + "px" },
        ],
    }

    /**
     * Default function for creating an HTML element.
     */
    static DEFAULT_ELEMENT = () => {
        const element = document.createElement('div');
        element.classList.add('htmlElement');
        element.innerText = Math.round(Math.random());
        return element;
    }

    /**
     * Creates an instance of ElementToSVG.
     * @param {string} elementContainer - The ID of the container element.
     * @param {Array<SVGPathElement>} paths - An array of SVG paths.
     * @param {Object} options - The options for initializing the BlinkingElements.
     * @param {number} options.numElements - The number of HTML elements to create.
     * @param {boolean} options.blink - Whether the elements should blink.
     * @param {Object} options.blinkOptions - The options for blinking.
     * @param {number} options.blinkOptions.blinkInterval - The interval between each blink.
     * @param {number} options.blinkOptions.blinkOpacity - The opacity of the blinking element.
     * @param {number} options.blinkOptions.blinkDuration - The duration of each blink animation.
     * @param {number} options.animationDuration - The duration for animating to path.
     * @param {function} options.transition - The transition function for animating to path.
     * @param {function} options.element - The function for creating an HTML element.
     */
    constructor(elementContainer, paths, options = {}) {
        /**
         * The container element.
         * @type {HTMLElement}
         */
        this.container = document.getElementById(elementContainer || 'container');

        /**
         * The array of HTML elements.
         * @type {Array}
         */
        this.htmlElements = Array.from({ length: options.numElements || ElementToSVG.DEFAULT_NUM_ELEMENTS }, (_, index) => {
            let element
            if (options.element) {
                element = options.element(index);
            } else {
                element = ElementToSVG.DEFAULT_ELEMENT(index);
            }
            this.container.appendChild(element);
            return element;
        });

        /**
         * The transition function for animating to path.
         * @type {function}
         */
        this.transition = options.transition || (() => [])

        if (options.blink) {
            /**
       * The interval for blinking elements.
       * @type {number}
       */
            this.interval = setInterval(() => this._blink(), options.blinkOptions.blinkInterval || ElementToSVG.DEFAULT_BLINK_INTERVAL);
        }

        /**
         * The array of SVG paths.
         * @type {Array<SVGPathElement>}
         */
        this.svgPaths = Array.from(paths);

        this.toPath(0, { animate: false });
    }

    /**
     * Blinks a random element.
     */
    _blink() {
        const element = this.htmlElements[Math.floor(Math.random() * this.htmlElements.length)];
        if (element.getAttribute('data-blink') !== 'true') {
            element.setAttribute('data-blink', 'true');
            element.animate(
                [
                    { opacity: 1 },
                    { opacity: options.blinkOptions.blinkOpacity || ElementToSVG.DEFAULT_BLINK_OPACITY },
                    { opacity: 1 }
                ],
                { duration: options.blinkOptions.blinkDuration || ElementToSVG.DEFAULT_BLINK_DURATION, iterations: 1 }
            ).addEventListener('finish', () => {
                element.removeAttribute('data-blink');
            });
        }
    }

    /**
     * Registers a path.
     * @param {SVGPathElement} path - The path to register.
     */
    registerPath(path) {
        this.svgPaths.push(path);
    }

    /**
     * Aligns the elements to a path.
     * @param {number} pathNumber - The index of the path to animate to.
     * @param {Object} toPathOptions - The toPathOptions for animating to path.
     * @param {number} toPathOptions.scale - The scale of the path. Defaults to 1.
     * @param {boolean} toPathOptions.animate - Whether to animate the transition. Defaults to true.
     */
    toPath(pathNumber, toPathOptions = {}) {
        const scale = toPathOptions.scale || 1;
        const animate = toPathOptions.animate !== false;

        const pathLength = this.svgPaths[pathNumber].getTotalLength();
        this.htmlElements.forEach((htmlElement, index) => {
            const pathPos = (index + 1) / (this.htmlElements.length + 1);
            const point = this.svgPaths[pathNumber].getPointAtLength(pathLength * pathPos);

            htmlElement.style.position = 'absolute';

            const goalLeft = point.x * scale;
            const goalTop = point.y * scale;

            if (animate) {
                htmlElement.animate(
                    [
                        { left: htmlElement.offsetLeft + 'px', top: htmlElement.offsetTop + 'px' },


                        ...this.transition(point.x, point.y),


                        { left: goalLeft + 'px', top: goalTop + 'px' }
                    ],
                    { duration: options.animationDuration || ElementToSVG.DEFAULT_PATH_DURATION, iterations: 1, fill: 'forwards' }
                );
            } else {
                htmlElement.style.left = goalLeft + 'px';
                htmlElement.style.top = goalTop + 'px';
            }

        });
    }

}
