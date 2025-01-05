// src/components/PodcastPanel.js
import '../styles/styles.css'; // Ensure styles are imported

export default class PodcastPanel {
    constructor(container, parent) {
        this.container = container;
        this.parent = parent;
        this.podcast = this.parent.podcast;
        this.options = this.parent.options;
        this.render();
    }

    render() {
        const podcastInfo = document.createElement('div');
        podcastInfo.classList.add('podcast-info');

        if (this.podcast.cover) {
            const coverImg = document.createElement('img');
            coverImg.src = this.podcast.cover;
            coverImg.alt = `${this.podcast.title} cover`;
            podcastInfo.appendChild(coverImg);
        }

        const title = document.createElement('h2');
        title.textContent = this.podcast.title;
        podcastInfo.appendChild(title);

        if (this.podcast.subtitle) {
            const subtitle = document.createElement('p');
            subtitle.textContent = this.podcast.subtitle;
            podcastInfo.appendChild(subtitle);
        }

        const subscribeButton = document.createElement('button');
        subscribeButton.classList.add('subscribe-button');
        subscribeButton.textContent = 'Choose Client'; // You can customize this text
        subscribeButton.addEventListener('click', () => this.parent.movePanels(1));
        podcastInfo.appendChild(subscribeButton);

        this.container.appendChild(podcastInfo);
    }
}
