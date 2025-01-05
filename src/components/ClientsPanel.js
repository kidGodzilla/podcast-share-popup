// src/components/ClientsPanel.js
import '../styles/styles.css';

export default class ClientsPanel {
    constructor(container, parent) {
        this.container = container;
        this.parent = parent;
        this.podcast = this.parent.podcast;
        this.options = this.parent.options;
        this.platform = this.parent.platform;
        this.clients = this.getClients();
        this.render();
    }

    getClients() {
        const feedUrl = this.podcast.feeds[0]?.url || '';
        const platform = this.detectPlatform();
        
        // Base clients that work everywhere
        const baseClients = [
            {
                title: 'RSS Feed',
                url: feedUrl,
                icon: 'generic/rss.png'
            }
        ];

        // Platform specific clients
        const platformClients = {
            android: [
                {
                    title: 'AntennaPod',
                    scheme: `antennapod-subscribe://${encodeURIComponent(feedUrl)}`,
                    icon: 'android/antennapod.png',
                    store: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
                },
                {
                    title: 'BeyondPod',
                    scheme: `beyondpod://${encodeURIComponent(feedUrl)}`,
                    icon: 'android/beyondpod.png',
                    store: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
                },
                {
                    title: 'Pocket Casts',
                    scheme: `pktc://subscribe/${encodeURIComponent(feedUrl)}`,
                    icon: 'android/pocketcasts.png',
                    store: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts'
                },
                {
                    title: 'Podcast Addict',
                    scheme: `podcastaddict://${encodeURIComponent(feedUrl)}`,
                    icon: 'android/podcastaddict.png',
                    store: 'https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict'
                }
            ],
            ios: [
                {
                    title: 'Apple Podcasts',
                    scheme: `podcast://${encodeURIComponent(feedUrl)}`,
                    icon: 'ios/podcasts.png',
                    store: 'https://apps.apple.com/app/podcasts/id525463029'
                },
                {
                    title: 'Castro',
                    scheme: `castro://subscribe/${encodeURIComponent(feedUrl)}`,
                    icon: 'ios/castro.png',
                    store: 'https://apps.apple.com/app/castro-2/id1080840241'
                },
                {
                    title: 'Overcast',
                    scheme: `overcast://x-callback-url/add?url=${encodeURIComponent(feedUrl)}`,
                    icon: 'ios/overcast.png',
                    store: 'https://apps.apple.com/app/overcast-podcast-player/id888422857'
                },
                {
                    title: 'Pocket Casts',
                    scheme: `pktc://subscribe/${encodeURIComponent(feedUrl)}`,
                    icon: 'ios/pocketcasts.png',
                    store: 'https://apps.apple.com/app/pocket-casts/id414834813'
                }
            ],
            cloud: [
                {
                    title: 'gpodder.net',
                    url: `http://gpodder.net/subscribe?url=${encodeURIComponent(feedUrl)}`,
                    icon: 'cloud/gpoddernet.png',
                    register: 'https://gpodder.net/'
                },
                {
                    title: 'Player.fm',
                    url: `https://player.fm/subscribe?id=${encodeURIComponent(feedUrl)}`,
                    icon: 'cloud/playerfm.png',
                    register: 'https://player.fm/'
                }
            ],
            desktop: [
                {
                    title: 'iTunes',
                    scheme: `itpc://${encodeURIComponent(feedUrl)}`,
                    icon: 'osx/itunes.png',
                    install: 'http://www.apple.com/itunes/'
                },
                {
                    title: 'gPodder',
                    scheme: `gpodder://${encodeURIComponent(feedUrl)}`,
                    icon: 'windows/gpodder.png',
                    install: 'http://gpodder.org/downloads'
                }
            ]
        };

        // Combine base clients with platform-specific clients
        return [...baseClients, ...(platformClients[platform] || platformClients.cloud)];
    }

    detectPlatform() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        
        if (/android/i.test(ua)) return 'android';
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return 'ios';
        if (/Windows/.test(ua)) return 'desktop';
        if (/Macintosh/.test(ua)) return 'desktop';
        if (/Linux/.test(ua)) return 'desktop';
        
        return 'cloud';
    }

    render() {
        const clientsContainer = document.createElement('div');
        clientsContainer.classList.add('clients-container');

        // Add platform section title
        const platformTitle = document.createElement('h3');
        platformTitle.textContent = `Available on ${this.platform.charAt(0).toUpperCase() + this.platform.slice(1)}`;
        clientsContainer.appendChild(platformTitle);

        // Create clients list
        const list = document.createElement('ul');
        list.classList.add('clients-list');

        this.clients.forEach(client => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            // Use scheme or URL depending on what's available
            link.href = client.scheme || client.url;
            
            // If there's a store/install link and we're on mobile web, use that instead
            if (this.platform === 'android' || this.platform === 'ios') {
                link.href = client.store || client.install || link.href;
            }

            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `
                <img src="/src/images/${client.icon}" alt="${client.title} icon">
                <span>${client.title}</span>
            `;
            
            listItem.appendChild(link);
            list.appendChild(listItem);
        });

        clientsContainer.appendChild(list);
        this.container.appendChild(clientsContainer);
    }
}
