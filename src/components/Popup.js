// src/components/Popup.js
import ClientsPanel from './ClientsPanel.js';
import PodcastPanel from './PodcastPanel.js';
import FinishPanel from './FinishPanel.js';
import '../styles/styles.css'; // Import your styles

export default class Popup {
    constructor(podcast, options) {
        this.podcast = podcast;
        this.options = options;
        this.platform = this.detectPlatform();
        this.render();
        this.initPanels();
    }

    detectPlatform() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        if (/android/i.test(ua)) return 'android';
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
        // Add more platform detections as needed
        return 'other';
    }

    render() {
        const popup = document.createElement('div');
        popup.id = 'podlove-subscribe-popup';
        popup.classList.add('podlove-subscribe-popup');

        popup.innerHTML = `
      <div class="podlove-subscribe-popup-modal">
        <div class="podlove-subscribe-popup-inner">
          <div class="podlove-subscribe-popup-header">
            <button class="close-button">&times;</button>
            <h2>Subscribe</h2>
          </div>
          <div id="podlove-subscribe-panel-podcast"></div>
          <div id="podlove-subscribe-panel-clients" style="display: none;"></div>
          <div id="podlove-subscribe-panel-finish" style="display: none;"></div>
        </div>
      </div>
    `;

        document.body.appendChild(popup);

        // Event listeners for closing the popup
        popup.querySelector('.close-button').addEventListener('click', () => this.closePopup());
        popup.querySelector('.podlove-subscribe-popup-modal').addEventListener('click', (e) => {
            if (e.target === popup.querySelector('.podlove-subscribe-popup-modal')) this.closePopup();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closePopup();
        });
    }

    initPanels() {
        const podcastContainer = document.querySelector('#podlove-subscribe-panel-podcast');
        const clientsContainer = document.querySelector('#podlove-subscribe-panel-clients');
        const finishContainer = document.querySelector('#podlove-subscribe-panel-finish');

        this.podcastPanel = new PodcastPanel(podcastContainer, this);
        this.clientsPanel = new ClientsPanel(clientsContainer, this);
        this.finishPanel = new FinishPanel(finishContainer, this);
    }

    movePanels(step) {
        const podcastPanel = document.querySelector('#podlove-subscribe-panel-podcast');
        const clientsPanel = document.querySelector('#podlove-subscribe-panel-clients');
        const finishPanel = document.querySelector('#podlove-subscribe-panel-finish');

        // Simple panel navigation logic
        if (step === 1) {
            podcastPanel.style.display = 'none';
            clientsPanel.style.display = 'block';
            // Update header text when showing clients
            document.querySelector('.podlove-subscribe-popup-header h2').textContent = 'Choose App';
        } else if (step === 2) {
            clientsPanel.style.display = 'none';
            finishPanel.style.display = 'block';
            // Update header text when showing finish panel
            document.querySelector('.podlove-subscribe-popup-header h2').textContent = 'Subscribed!';
        } else if (step === 0) {
            clientsPanel.style.display = 'none';
            podcastPanel.style.display = 'block';
            // Reset header text when going back to podcast panel
            document.querySelector('.podlove-subscribe-popup-header h2').textContent = 'Subscribe';
        }
    }

    closePopup() {
        const popup = document.querySelector('#podlove-subscribe-popup');
        if (popup) {
            popup.remove();
        }
    }
}
