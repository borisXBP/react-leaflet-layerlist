# react-leaflet-styled-layerlist

> A react leaflet layerlist control

[![NPM](https://img.shields.io/npm/v/react-leaflet-styled-layerlist.svg)](https://www.npmjs.com/package/react-leaflet-styled-layerlist) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-leaflet-styled-layerlist
```

## About

This is a toggle control for react-leaflet that allows you can put arbitrary react components inside.  It's perfect for replacing the default layer control with something more stylish and powerful.  Clicking the control will open it and either clicking the map or the close button will close it.


## Usage

```jsx
import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import { ReactLeafletLayerList, LayerListItem } from 'react-leaflet-styled-layerlist'

class Example extends Component {
  render () {
    return (
      <Map
        center={[44.635, 22.653]}
        zoom={12}>

        <TileLayer
          attribution=""
          url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"/>

        <ReactLeafletLayerList>
          <LayerListItem>
            <h2>My awesome layerlist!</h2>
          </LayerListItem>
        </ReactLeafletLayerList>
      </Map>
    )
  }
}
```

## Props

| name             | default        |  values                                               |
|------------------|----------------|-------------------------------------------------------|
| position         | 'topright'     |  'topright', 'bottomright', 'topleft',  'bottomleft'  |
| style            | null           |  see below                                            |
| openButtonStyle  | null           |  see below                                            |
| closeButtonStyle | null           |  see below                                            |

## Styling

Styles are applied by adding key-value pairs directly to the DOM so please use standard CSS keys and not React's.  For example, if you wanted a rounded open button you should use:

```jsx
<ReactLeafletLayerList
	openButtonStyle={{
		'width': '32px',
		'height': '32px',
		'border-radius':  '16px'
}}>
```

## A word on LayerListItem

The example shows your elements wrapped inside a `LayerListItem`.  This isn't strictly necessary as all this component does is return it's children.  However it does apply some CSS to make the transitions smoother and pushes the first child down a little to make room for the close button.  You can leave it out if and replicate those style tweaks in your own components.

## A word on Leaflet <-> React

Both React and Leaflet have their own opinions on how to manage the DOM which is why something like this is tricky to pull off.  The heart of this component involves creating a container with L.DomUtil.create and then ReactDOM.portal to create a little island of React and finally ReactDOM.render to render it's children.

There might be some strange behaviour if you push things too far.  For example I've not tested how `context`, `refs`, or complex state changes behave so your milage may vary.

## Development

This was created with `create-react-library`. Checkout the project then in the root directory

```
  npm install
  npm start
```

In a seperate terminal run the example project

```
  cd example
  npm install
  npm start
```

If you run into errors with the `file:..` link between the example and library (ie react-leaflet-styled-layerlist not found) remove the `node_modules` directory and reinstall. 


## License

MIT © [ChrisLowe-Takor](https://github.com/ChrisLowe-Takor)
