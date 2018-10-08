import {html, LitElement} from '@polymer/lit-element';
window.initMap = function () { window.dispatchEvent(new CustomEvent('google-map-ready')); }; // eslint-disable-line no-unused-vars

/**
 * `google-maps-limited`
 * A limited use case of google maps with clickable markers.
 *
 * @customElement
 * @demo demo/index.html
 */
class GoogleMapsLimited extends LitElement {

  static get properties() {
    return {
      apiKey: {type: String}
    };
  }
  render() {
    return html`
      <style>
        :host {
          display: block
        }
        #map {
          width: 100%;
          height: 200px;
        }
      </style>
      <div id="map"></div>
    `;
  }

  firstUpdated (p) {
    this.shadowRoot.appendChild(this._mapScriptTag());
    super.firstUpdated(p);
  }

  constructor() {
    super();
    window.addEventListener('google-map-ready', () => {
      this._mapRef = new google.maps.Map(this.shadowRoot.querySelector('#map'), {
        center: { lat: 40, lng: -112 },
        zoom: 5,
        streetViewControl: false,
      });
    });
  }

  _mapScriptTag() {
    const lang = 'en'
    // init google maps
    const googleMapsLoader = document.createElement('script');
    googleMapsLoader.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=initMap`;
    googleMapsLoader.async = true;
    googleMapsLoader.defer = true;
    return googleMapsLoader;
  }

}

window.customElements.define('google-maps-limited', GoogleMapsLimited);
