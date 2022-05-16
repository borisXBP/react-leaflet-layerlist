import PropTypes from 'prop-types';
import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';

var ReactDOM = require('react-dom');

import './styles.css';


L.Control.LayerListControl = L.Control.extend({
	_layerListContainer: null,
	_isOpen: false,
	_layerlistItems: [],
	_children: [],
	_openButton: null,
	_closeButton: null,
	_openButtonStyle: null,
	_closeButtonStyle: null,
	_layerListStyle: null,
	_position: null,
	_style: null,
	initialize: function(element) {
		console.log(element);
		this._position = element.position;
		this._children = element.children;
		this._layerListItems = new Array();
		this._style = element.style;
		this._openButtonStyle = element.openButtonStyle;
		this._closeButtonStyle = element.closeButtonStyle;
	},
	onAdd: function(map) {

		this.options.position  = this._position;
		this._layerListContainer = L.DomUtil.create('div', 'layer-list-container closed');		
		this._openButton = L.DomUtil.create('div', 'layer-list-open-button visible', this._layerListContainer);
		this._closeButton = L.DomUtil.create('div', 'layer-list-close-button hidden', this._layerListContainer);
		
		if (this._openButtonStyle) {
			Object.keys(this._openButtonStyle).forEach(key => {
				this._openButton.style[key] = this._openButtonStyle[key];
			});
		}

		if (this._closeButtonStyle) {
			Object.keys(this._closeButtonStyle).forEach(key => {
				this._closeButton.style[key] = this._closeButtonStyle[key];
			});
		}

		L.DomEvent.on(this._openButton, 'click', () => {
			this.open(map);
		});

		L.DomEvent.on(this._closeButton, 'click', () => {
			this.close(map);
		});

		L.DomEvent.on(this._map, 'click', () => {
			if (this._isOpen) {
				this.close(map);
			}
		});

		L.DomEvent.disableClickPropagation(this._openButton);
		L.DomEvent.disableClickPropagation(this._closeButton);
		L.DomEvent.disableClickPropagation(this._layerListContainer);
		L.DomEvent.disableScrollPropagation(this._layerListContainer);
		return this._layerListContainer;
	},
	onRemove: function(map) {
		// Do nothing
	},
	open: function(map) {
		if (!this._isOpen) {
			L.DomUtil.removeClass(this._openButton, 'visible');
			L.DomUtil.addClass(this._openButton, 'hidden');

			L.DomUtil.removeClass(this._closeButton, 'hidden');
			L.DomUtil.addClass(this._closeButton, 'visible');

			L.DomUtil.removeClass(this._layerListContainer, 'closed');
			L.DomUtil.addClass(this._layerListContainer, 'open');

			if (this._style) {
				Object.keys(this._style).forEach(key => {
					this._layerListContainer.style[key] = this._style[key];
				});
			}

			this._showLayerlistElements(map);
			this._isOpen = true;			
		}
	},
	close: function(map) {
		L.DomUtil.removeClass(this._openButton, 'hidden');
		L.DomUtil.addClass(this._openButton, 'visible');

		L.DomUtil.removeClass(this._closeButton, 'visible');
		L.DomUtil.addClass(this._closeButton, 'hidden');

		L.DomUtil.removeClass(this._layerListContainer, 'open');
		L.DomUtil.addClass(this._layerListContainer, 'closed');
		this._removeLayerlistElements(map);

		if (this._style) {
			Object.keys(this._style).forEach(key => {
				this._layerListContainer.style[key] = null;
			});
		}

		this._isOpen = false;
	},
	_showLayerlistElements: function(map) {
		for (var index = 0; index < this._children.length; index++) {
			var item = this._children[index];
			var container = L.DomUtil.create('div', 'layer-list-item-container item-' + index, this._layerListContainer);
			this._layerListItems.push(container);
			const el = ReactDOM.createPortal(item, container);
			ReactDOM.render(el, container);
		}
	},
	_removeLayerlistElements: function(map) {
		for (var index = 0; index < this._layerListItems.length; index++) {
			var item = this._layerListItems[index];
			L.DomUtil.remove(item);
		}
		this._layerListItems = [];
	}
});

L.control.layerListControl = (opts) => {
    return new L.Control.LayerListControl({...opts});
}

class ReactLeafletLayerList extends MapControl {

	constructor(props) {
		super(props);
	}

	createLeafletElement(props) {
		return L.control.layerListControl({position: props.position || 'topright', style: props.style, openButtonStyle: props.openButtonStyle, ...props});
	}
}

export default withLeaflet(ReactLeafletLayerList);


ReactLeafletLayerList.propTypes = {
	position: PropTypes.oneOf(['topright', 'topleft', 'bottomright', 'bottomleft']),
	style: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])),
	openButtonStyle: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	])),
	closeButtonStyle: PropTypes.objectOf(PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]))
};
