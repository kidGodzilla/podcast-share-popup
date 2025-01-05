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

        const message = document.createElement('p');
        message.textContent = 'You have successfully subscribed!'; // Customize as needed
        finishInfo.appendChild(message);

        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'Close';
        closeButton.addEventListener('click', () => this.parent.closePopup());
        finishInfo.appendChild(closeButton);

        this.container.appendChild(finishInfo);
    }
}
