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
            <p>Handing over to your selected app...</p>
            <p>Did something go wrong?</p>
            <button class="try-again-button">Try Again</button>
            <button class="back-button">Back</button>
        `;

        // Add event listeners
        handlingInfo.querySelector('.try-again-button').addEventListener('click', () => {
            // Implement retry logic here
            alert('Retrying...');
            this.parent.movePanels(2); // Optionally, retry opening the client
        });

        handlingInfo.querySelector('.back-button').addEventListener('click', () => {
            this.parent.movePanels(1); // Go back to Clients Panel
        });

        this.container.appendChild(handlingInfo);
    }
} 