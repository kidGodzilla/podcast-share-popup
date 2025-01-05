// src/components/FinishPanel.js
import '../styles/styles.css'; // Ensure styles are imported

export default class FinishPanel {
    constructor(container, parent) {
        this.container = container;
        this.parent = parent;
        this.podcast = this.parent.podcast;
        this.options = this.parent.options;
        this.render();
    }

    render() {
        const finishInfo = document.createElement('div');
        finishInfo.classList.add('finish-info');

        finishInfo.innerHTML = `
            <p>Subscription Successful!</p>
            <button class="close-button">Close</button>
            <button class="back-button">Choose a Different App</button>
        `;

        // Add event listeners
        finishInfo.querySelector('.close-button').addEventListener('click', () => {
            this.parent.closePopup();
        });

        finishInfo.querySelector('.back-button').addEventListener('click', () => {
            this.parent.movePanels(1); // Go back to Clients Panel
        });

        this.container.appendChild(finishInfo);
    }
}
