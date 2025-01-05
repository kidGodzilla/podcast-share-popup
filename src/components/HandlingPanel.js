import '../styles/styles.css'; // Ensure styles are imported

export default class HandlingPanel {
    constructor(container, parent) {
        this.container = container;
        this.parent = parent;
        this.render();
    }

    render() {
        const handlingInfo = document.createElement('div');
        handlingInfo.classList.add('handling-info');

        handlingInfo.innerHTML = `
            <p>Handing over to Podcasts...</p>
            <p>Did something go wrong?</p>
            <button class="try-again-button">Try Again</button>
            <button class="back-button">Back</button>
            <button class="close-button">Close</button>
        `;

        // Add event listeners
        handlingInfo.querySelector('.try-again-button').addEventListener('click', () => {
            // Implement retry logic here
            alert('Retrying...');
        });

        handlingInfo.querySelector('.back-button').addEventListener('click', () => {
            this.parent.movePanels(1); // Go back to Clients Panel
        });

        handlingInfo.querySelector('.close-button').addEventListener('click', () => {
            this.parent.closePopup();
        });

        this.container.appendChild(handlingInfo);
    }
} 