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
        if (/Windows/.test(ua)) return 'windows';
        // if (/trident/i.test(ua)) return 'windowsphone';
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
            title: 'Other (RSS Feed URL)',
            url: feedUrl,
            icon: 'generic/rss.png'
        }];

        // Platform specific clients
        const platformClients = {
            android: [
                {
                    title: 'AntennaPod',
                    scheme: 'antennapod-subscribe://',
                    icon: 'android/antennapod.png',
                    store: 'https://play.google.com/store/apps/details?id=de.danoeh.antennapod'
                },
                {
                    title: 'BeyondPod',
                    scheme: 'beyondpod://',
                    icon: 'android/beyondpod.png',
                    store: 'https://play.google.com/store/apps/details?id=mobi.beyondpod'
                },
                {
                    title: 'Player.fm',
                    scheme: 'https://player.fm/subscribe?id=',
                    icon: 'android/playerfm.png',
                    store: 'https://play.google.com/store/apps/details?id=fm.player'
                },
                {
                    title: 'PocketCasts',
                    scheme: 'pktc://subscribe/',
                    icon: 'android/pocketcasts.png',
                    install: 'https://play.google.com/store/apps/details?id=au.com.shiftyjelly.pocketcasts',
                    encodePath: true
                },
                {
                    title: 'Podcast Addict',
                    scheme: 'podcastaddict://',
                    icon: 'android/podcastaddict.png',
                    store: 'https://play.google.com/store/apps/details?id=com.bambuna.podcastaddict'
                },
                {
                    title: 'Podcast Republic',
                    scheme: 'podcastrepublic://subscribe/',
                    icon: 'android/podcastrepublic.png',
                    store: 'https://play.google.com/store/apps/details?id=com.itunestoppodcastplayer.app'
                },
                {
                    title: 'Podcatcher Deluxe',
                    scheme: 'pcd://',
                    icon: 'android/podcatcher-deluxe.png',
                    store: 'https://play.google.com/store/search?q=pub:Kevin%20Hausmann'
                },
                {
                    title: 'Podkicker',
                    scheme: 'podkicker://subscribe/',
                    icon: 'android/podkicker.png',
                    store: 'https://play.google.com/store/apps/details?id=ait.podka'
                },
                {
                    title: 'uPod',
                    scheme: 'upod://',
                    icon: 'android/upod.png'
                }
            ],
            ios: [
                {
                    title: 'Castro',
                    scheme: 'castro://subscribe/',
                    icon: 'ios/castro.png',
                    store: 'https://apps.apple.com/app/castro-2/id1080840241'
                },
                {
                    title: 'Downcast',
                    scheme: 'downcast://',
                    icon: 'ios/downcast.png',
                    store: 'https://apps.apple.com/app/downcast/id393858566'
                },
                {
                    title: 'iCatcher',
                    scheme: 'icatcher://',
                    icon: 'ios/icatcher.png',
                    store: 'https://apps.apple.com/app/icatcher!-podcast-app/id414419105'
                },
                {
                    title: 'Instacast',
                    scheme: 'instacast://',
                    icon: 'ios/instacast.png'
                },
                {
                    title: 'Overcast',
                    scheme: 'overcast://x-callback-url/add?url=',
                    icon: 'ios/overcast.png',
                    store: 'https://apps.apple.com/app/overcast-podcast-player/id888422857',
                    http: true
                },
                {
                    title: 'PocketCasts',
                    scheme: 'pktc://subscribe/',
                    icon: 'ios/pocketcasts.png',
                    store: 'https://apps.apple.com/app/pocket-casts/id414834813'
                },
                {
                    title: 'Podcasts',
                    scheme: 'podcast://',
                    icon: 'ios/podcasts.png',
                    store: 'https://apps.apple.com/app/podcasts/id525463029'
                },
                {
                    title: 'Podcat',
                    scheme: 'podcat://',
                    icon: 'ios/podcat.png',
                    store: 'https://apps.apple.com/app/podcat/id845960230'
                },
                {
                    title: 'RSSRadio',
                    scheme: 'rssradio://',
                    icon: 'ios/rssradio.png',
                    store: 'https://apps.apple.com/app/rssradio-premium-podcast-downloader/id679025359'
                }
            ],
            osx: [
                {
                    title: 'Podcasts',
                    scheme: 'podcast://',
                    icon: 'osx/podcasts_big_sur.png'
                },
                {
                    title: 'Downcast',
                    scheme: 'downcast://',
                    icon: 'osx/downcast.png',
                    store: 'https://apps.apple.com/app/downcast/id668429425'
                },
                {
                    title: 'Instacast',
                    scheme: 'instacast://',
                    icon: 'osx/instacast.png'
                }
            ],
            windows: [
                {
                    title: 'gPodder',
                    scheme: 'gpodder://',
                    icon: 'windows/gpodder.png',
                    install: 'http://gpodder.org/downloads'
                },
                {
                    title: 'iTunes',
                    scheme: 'itpc://',
                    icon: 'osx/itunes.png',
                    install: 'http://www.apple.com/itunes/',
                    customFeedType: 'itunes-url'
                },
                {
                    title: 'Podscout',
                    scheme: 'podscout://',
                    icon: 'windows/podscout.png',
                    store: 'http://apps.microsoft.com/windows/de-de/app/podscout/f4316b46-7682-4cea-948b-53d135b2df17'
                }
            ],
            cloud: [
                {
                    title: 'gpodder.net',
                    scheme: 'http://gpodder.net/subscribe?url=',
                    icon: 'cloud/gpoddernet.png',
                    register: 'https://gpodder.net/',
                    http: true
                },
                {
                    title: 'Player.fm',
                    scheme: 'https://player.fm/subscribe?id=',
                    icon: 'cloud/playerfm.png',
                    register: 'https://player.fm/',
                    http: true
                },
                {
                    title: 'Pocket Casts',
                    scheme: 'http://pcasts.in/feed/',
                    icon: 'cloud/pocketcasts.png',
                    register: 'https://play.pocketcasts.com/',
                    encodePath: false
                }
            ],
            unix: [
                {
                    title: 'Clementine',
                    scheme: 'itpc://',
                    icon: 'unix/clementine.png',
                    install: 'https://www.clementine-player.org/downloads'
                },
                {
                    title: 'gPodder',
                    scheme: 'gpodder://',
                    icon: 'unix/gpodder.png',
                    install: 'http://gpodder.org/downloads'
                }
            ]
        };

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
            // link.href = client.scheme || client.url;

            // // Format URLs based on type
            if (client.scheme) {
                let strippedProtocol = this.podcast.feeds[0].url;
                if (strippedProtocol.includes('//')) strippedProtocol = strippedProtocol.split('//')[1];
                link.href = `${client.scheme}${strippedProtocol}`;
            } else {
                link.href = client.url || '#';
            }
            
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
