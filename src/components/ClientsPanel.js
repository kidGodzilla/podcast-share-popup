// src/components/ClientsPanel.js
import '../styles/styles.css';

export default class ClientsPanel {
    constructor(container, parent) {
        this.container = container;
        this.parent = parent;
        this.podcast = this.parent.podcast;
        this.options = this.parent.options;
        this.platform = this.detectPlatform();
        this.clients = this.getClients();
        this.render();
    }

    detectPlatform() {
        const ua = window.navigator?.userAgent || "";
        
        // Match original platform detection logic
        if (/Windows NT 10.0/.test(ua)) return 'windows10';
        if (/Windows NT 6.3/.test(ua)) return 'windows81';
        if (/Windows NT 6.2/.test(ua)) return 'windows8';
        if (/Windows NT 6.1/.test(ua)) return 'windows7';
        if (/trident/i.test(ua)) return 'windowsphone';
        if (/android/i.test(ua)) return 'android';
        if (/(ipad|iphone|ipod)/i.test(ua)) return 'ios';
        if (/(linux|openbsd|freebsd|netbsd)/i.test(ua)) return 'unix';
        if (/macintosh/i.test(ua)) return 'osx';
        
        return 'cloud';
    }

    getClients() {
        const feedUrl = this.podcast.feeds[0]?.url || '';
        
        // Base RSS client that's always available
        const baseClients = [{
            title: 'Other (Feed URL)',
            url: feedUrl,
            icon: 'generic/rss.png'
        }];

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
                    title: 'Player.fm',
                    scheme: `https://player.fm/subscribe?id=${encodeURIComponent(feedUrl)}`,
                    icon: 'android/playerfm.png',
                    store: 'https://play.google.com/store/apps/details?id=fm.player'
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
                },
                {
                    title: 'Podcast Republic',
                    scheme: `podcastrepublic://subscribe/${encodeURIComponent(feedUrl)}`,
                    icon: 'android/podcastrepublic.png',
                    store: 'https://play.google.com/store/apps/details?id=com.itunestoppodcastplayer.app'
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
                },
                {
                    title: 'Downcast',
                    scheme: `downcast://${encodeURIComponent(feedUrl)}`,
                    icon: 'ios/downcast.png',
                    store: 'https://apps.apple.com/app/downcast/id393858566'
                }
            ],
            osx: [
                {
                    title: 'Podcasts',
                    scheme: `podcast://${encodeURIComponent(feedUrl)}`,
                    icon: 'osx/podcasts_big_sur.png'
                },
                {
                    title: 'iTunes',
                    scheme: `itpc://${encodeURIComponent(feedUrl)}`,
                    icon: 'osx/itunes.png',
                    install: 'http://www.apple.com/itunes/'
                },
                {
                    title: 'Downcast',
                    scheme: `downcast://${encodeURIComponent(feedUrl)}`,
                    icon: 'osx/downcast.png',
                    store: 'https://apps.apple.com/app/downcast/id668429425'
                },
                {
                    title: 'Instacast',
                    scheme: `instacast://${encodeURIComponent(feedUrl)}`,
                    icon: 'osx/instacast.png'
                }
            ],
            windows10: [
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
                },
                {
                    title: 'Pocket Casts',
                    url: `http://pcasts.in/feed/${encodeURIComponent(feedUrl)}`,
                    icon: 'cloud/pocketcasts.png',
                    register: 'https://play.pocketcasts.com/'
                }
            ]
        };

        // Use windows10 clients for other Windows versions
        platformClients.windows81 = platformClients.windows10;
        platformClients.windows8 = platformClients.windows10;
        platformClients.windows7 = platformClients.windows10;
        platformClients.unix = platformClients.cloud;

        // Get clients for detected platform, fallback to cloud if platform not found
        const platformSpecificClients = platformClients[this.platform] || platformClients.cloud;
        
        // Always include cloud clients and base clients
        return [...baseClients, ...platformSpecificClients, ...platformClients.cloud];
    }

    render() {
        const clientsContainer = document.createElement('div');
        clientsContainer.classList.add('clients-container');

        const platformTitle = document.createElement('h3');
        platformTitle.textContent = `Available on ${this.platform.charAt(0).toUpperCase() + this.platform.slice(1)}`;
        clientsContainer.appendChild(platformTitle);

        const list = document.createElement('ul');
        list.classList.add('clients-list');

        this.clients.forEach(client => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            // Use scheme or URL depending on what's available
            link.href = client.scheme || client.url;
            
            // If there's a store/install/register link and we're on mobile web, use that instead
            if ((this.platform === 'android' || this.platform === 'ios') && !link.href.startsWith('http')) {
                link.href = client.store || client.install || client.register || link.href;
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
