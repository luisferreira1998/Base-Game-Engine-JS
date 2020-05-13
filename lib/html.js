MH.requires(
    "lib/engine.js"
);

MH.scope(() => {

    const {GAME_CONTAINER_ID} = MH.module("engine.constants");

    const html = MH.create("engine.html");

    let _idCounter = 0;
    function getId() {
        return (_idCounter++).toString();
    }

    /**
     * 
     * @param {string} id 
     * @param {boolean} absolute 
     */
    function createContainer(id, absolute = false) {
        const container = document.createElement("div");
        const containerType = absolute ? "absolute" : "relative";

        container.id = id;
        container.classList.add("container", containerType);

        return container;
    }

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     */
    function createKeepRatioCanvas(width, height) {
        const canvas = document.createElement("canvas");
        const resize = () => {
            const container = canvas.parentElement;
            const canvasRatio = canvas.width / canvas.height;
            const containerRatio = container.clientWidth / container.clientHeight;

            if (canvasRatio < containerRatio) {
                canvas.classList.add("fit-height");
                canvas.classList.remove("fit-width");
            } else {
                canvas.classList.add("fit-width");
                canvas.classList.remove("fit-height");
            }
        }

        const destroy = () => {
            window.removeEventListener("resize", resize);
        }

        canvas.resize = resize;
        canvas.destroy = destroy;
        canvas.width = width;
        canvas.height = height;

        window.addEventListener("resize", resize);
        return canvas;
    }

    /**
     * Used to destroy custom html elements made by this module, making sure to remove
     * event listeners that may have been added.
     * @param {HTMLElement} element 
     */
    function destroyElement(element) {
        for(let child of element.children) {
            destroyElement(child);
        }
        element.parentElement.removeChild(element);

        if(element.destroy) {
            element.destroy();
        }
    }

    const gameContainer = createContainer(GAME_CONTAINER_ID, false);

    html.getId = getId;
    html.createContainer = createContainer;
    html.destroyElement = destroyElement;
    html.createKeepRatioCanvas = createKeepRatioCanvas;
    html.gameContainer = gameContainer;

});