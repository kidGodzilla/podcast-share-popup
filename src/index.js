// src/index.js
import SubscribeButton from './components/SubscribeButton.js';

// Expose the API globally
window.PodlovePopup = {
    open: () => SubscribeButton.openAllPopups(),
    // You can add more methods as needed
};
