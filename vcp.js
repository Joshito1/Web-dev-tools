/* 
    vcp.js
    description: Creates a Visual Color Palette on screen.
    v1.6D11225
    DC: 103125
*/

export const VCP = (() => {
    const altclass = 'vcp-buttons'
    const panel = document.createElement("div");
    const dragInd = document.createElement("div");
    const resizeInd = document.createElement("div");
    const toggleInd = document.createElement("button");
    let isDragging = false, offsetx, offsety, isResizing = false, startY, startSize;

    function buildPalette() {
        const styles = getComputedStyle(document.documentElement);
        const colors = [];

        for (let i = 0; i < styles.length; i++) {
            const name = styles[i];
            if (name.startsWith("--color-")) {
                const value = styles.getPropertyValue(name).trim();
                colors.push({ name, value });
            }
        }

        const order = [
            "--color-primary",
            "--color-secondary",
            "--color-tertiary",
            "--color-quaternary",
            "--color-quinary"
        ];

        colors.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));

        panel.className = "vcp";
        dragInd.className = `drag-indicator ${altclass}`;
        toggleInd.className = `orient-indicator`;
        resizeInd.className = `resize-indicator ${altclass}`;

        panel.prepend(dragInd, resizeInd, toggleInd);

        colors.forEach(({ name, value }) => {
            const swatch = document.createElement("div");
            // swatch.className = "swatch";
            swatch.style.background = value;
            swatch.title = `${name}: ${value}`;
            panel.appendChild(swatch);
        });
        document.body.appendChild(panel);

        // CSS Path Creation
        const moduleUrl = import.meta.url;
        const basePath = moduleUrl.substring(0, moduleUrl.lastIndexOf("/"));
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `${basePath}/vcp.css`;
        document.head.appendChild(link);
        console.log("Loaded CSS from", link.href);
    }


    // ====== Features ====== //
    // Visibility Toggle
    function toggle() {
        document.addEventListener("keydown", e => {
            const key = e.key.toLowerCase();
            const togglesc = (e.altKey && key === "p") || (e.metaKey && key === "p");
            if (togglesc) {
                e.preventDefault();
                panel.classList.toggle("toggle");
            }
        });
    }

    // Drag
    function drag() {
        dragInd.addEventListener("mousedown", e => {
            if (e.target !== dragInd) return;
            isDragging = true;
            offsetx = e.clientX - panel.offsetLeft;
            offsety = e.clientY - panel.offsetTop;
            dragInd.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", e => {
            if (!isDragging) return;
            panel.style.left = e.clientX - offsetx + "px";
            panel.style.top = e.clientY - offsety + "px";
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            dragInd.style.cursor = "grab";
        });
    }

    // Orientation Toggle
    function orient() {
        const toggleIndIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 10.5858L21.8284 8.75736L23.2426 10.1716L19 14.4142L14.7574 10.1716L16.1716 8.75736L18 10.5858V8C18 6.34315 16.6569 5 15 5H11V3H15C17.7614 3 20 5.23858 20 8V10.5858ZM13 9C13.5523 9 14 9.44772 14 10V20C14 20.5523 13.5523 21 13 21H3C2.44772 21 2 20.5523 2 20V10C2 9.44772 2.44772 9 3 9H13ZM12 11H4V19H12V11Z"></path></svg>`
        toggleInd.innerHTML = toggleIndIcon;
        toggleInd.onclick = () => {
            panel.classList.toggle("horizontal");
        };
    }

    // Resize
    function resize() {
        resizeInd.addEventListener("mousedown", e => {
            isResizing = true;
            startY = e.clientY;
            startSize = parseInt(getComputedStyle(panel).getPropertyValue("--size-vcp"));
            e.stopPropagation();
        });

        document.addEventListener("mousemove", e => {
            if (!isResizing) return;
            const delta = e.clientY - startY;
            const newSize = Math.max(17, startSize + delta);
            panel.style.setProperty("--size-vcp", `${newSize}px`);
        });

        document.addEventListener("mouseup", () => (isResizing = false));
    }

    function init() {
        buildPalette();
        toggle();
        drag();
        orient();
        resize();
    }

    return { init };
})();
