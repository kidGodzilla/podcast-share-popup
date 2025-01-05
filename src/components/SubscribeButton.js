// src/components/SubscribeButton.js
import Popup from './Popup.js';
import { extend, fetchJSON } from '../utils.js';
import '../styles/styles.css'; // Import your styles

export default class SubscribeButton {
    constructor(element) {
        console.log('SubscribeButton constructor called');
        this.element = element;
        this.options = this.getOptions();
        this.podcast = null;
        this.init(); // Ensure init is defined
    }

    static init(selector = '.podlove-subscribe-button') {
        console.log('Initializing SubscribeButton');
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) return;

        window.subscribeButtons = Array.from(elements).map(elem => new SubscribeButton(elem));
        console.log(`Initialized ${window.subscribeButtons.length} SubscribeButton instances`);
    }

    static openAllPopups() {
        console.log('Opening all popups');
        if (window.subscribeButtons) {
            window.subscribeButtons.forEach(button => button.openPopup());
        }
    }

    getOptions() {
        const defaultOptions = {
            size: 'medium',
            style: 'filled',
            format: 'rectangle',
        };

        const options = {
            scriptPath: this.element.src.match(/(^.*\/)/)[0].replace(/javascripts\/$/, '').replace(/\/$/, ''),
            size: this.element.dataset.size,
            buttonId: this.element.dataset.buttonid,
            hide: this.element.dataset.hide,
            style: this.element.dataset.style,
            format: this.element.dataset.format,
            id: this.element.dataset.buttonid || Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
            color: this.element.dataset.color || this.element.dataset.colors || 'default-color', // Handle color logic
            title: this.element.dataset.title || 'Podcast Title',
            subtitle: this.element.dataset.subtitle || 'Podcast Subtitle',
            cover: this.element.dataset.cover || '',
            // Initialize feeds as empty; will populate based on data source
            feeds: [],
        };

        console.log('SubscribeButton options:', options);
        return extend(defaultOptions, options);
    }

    async init() {
        console.log('SubscribeButton init called');
        await this.getPodcastData();
    }

    async getPodcastData() {
        const jsonUrl = this.element.dataset.jsonUrl;
        const feedUrl = this.element.dataset.feedUrl; // New attribute for RSS/XML feed

        console.log('Fetching podcast data from:', jsonUrl || feedUrl);

        if (jsonUrl) {
            // Handle JSON Configuration
            try {
                const data = await fetchJSON(jsonUrl);
                console.log('Fetched podcast JSON data:', data);
                this.podcast = data;
                extend(this.options, data.configuration);
                this.renderButton();
            } catch (error) {
                console.error('Error fetching podcast JSON data:', error);
            }
        } else if (feedUrl) {
            // Handle XML RSS Feed
            try {
                const response = await fetch(feedUrl);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, 'application/xml');
                const parsedData = this.parseXML(xmlDoc);
                if (parsedData) {
                    console.log('Parsed podcast XML data:', parsedData);
                    this.podcast = parsedData;
                    // Extend options if necessary based on XML data
                    extend(this.options, {}); // Update as needed
                    this.renderButton();
                } else {
                    throw new Error('Failed to parse XML podcast data.');
                }
            } catch (error) {
                console.error('Error fetching or parsing podcast XML data:', error);
            }
        } else {
            console.log('No data source provided. Rendering button without podcast data.');
            this.renderButton();
        }
    }

    parseXML(xmlDoc) {
        try {
            const title = xmlDoc.querySelector('channel > title')?.textContent || 'Podcast Title';
            const subtitle = xmlDoc.querySelector('channel > description')?.textContent || '';
            const cover = xmlDoc.querySelector('channel > image > url')?.textContent || '';
            
            // Instead of using enclosure URLs, we'll use the feed URL itself
            const feeds = [{
                url: this.element.dataset.feedUrl, // Use the original feed URL
                format: 'rss'  // Mark it as an RSS feed
            }];

            return { title, subtitle, cover, feeds };
        } catch (error) {
            console.error('Error parsing XML:', error);
            return null;
        }
    }

    renderButton() {
        console.log('Rendering Subscribe Button');
        // Create a button element
        const button = document.createElement('button');
        button.classList.add('podlove-subscribe-button', this.options.size, this.options.style, this.options.format);
        button.textContent = 'Subscribe'; // Customize text as needed

        // Apply color if specified
        if (this.options.color) {
            button.style.backgroundColor = this.options.color;
        }

        // Attach event listener
        button.addEventListener('click', () => this.openPopup());

        // Insert the button into the DOM
        this.element.parentNode.insertBefore(button, this.element);
        this.element.parentNode.removeChild(this.element);
        console.log('Subscribe Button rendered');
    }

    openPopup() {
        console.log('Opening Popup');
        if (document.querySelector('#podlove-subscribe-popup')) return;
        new Popup(this.podcast, this.options);
    }
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => SubscribeButton.init());
