import * as React from 'react'
import { Map, TileLayer, ZoomControl } from 'react-leaflet'
import { ReactLeafletLayerList, LayerListItem } from 'react-leaflet-styled-layerlist'
import { Container, Row, Col, Button } from 'reactstrap';

export default class App extends React.Component {

	render () {
		return (
			<div className="map">
				<Map
					ref={(ref) => this.ref}
					center={[44.635, 22.653]}
					zoom={12}
					zoomControl={false} >

					<TileLayer
							attribution=""
							url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"/>
				
					<ZoomControl />

					<ReactLeafletLayerList position="topright">
						<LayerListItem>
							<div>foo</div>
						</LayerListItem>
					</ReactLeafletLayerList>

					<ReactLeafletLayerList position="topleft">

						<LayerListItem>
							<Container>
								<Row>
									<Col md={6}>reactstrap</Col>
									<Col md={6}>enabled</Col>
								</Row>
							</Container>
						</LayerListItem>

						<LayerListItem>
							<Container>
								<Row>
									<Button onClick={() => alert('clicked!') }>Button</Button>
								</Row>
							</Container>
						</LayerListItem>

						<LayerListItem>
							<div>
								<h2>Elements in a div</h2>
								<p>With nested stuff</p>
							</div>
						</LayerListItem>

						<LayerListItem>
							<h2>Element in a div</h2>
						</LayerListItem>

						<LayerListItem>
							Bare string in a div
						</LayerListItem>

						<LayerListItem>
							<ul>
								<li>List</li>
								<li>List</li>
								<li>List</li>
								<li>List</li>
								<li>List</li>
								<li>List</li>
							</ul>
						</LayerListItem>

						<LayerListItem>
							<div>
								<h2>Image in a div</h2>
								<img alt="Sample" src="https://i.imgur.com/BSBVtHJ.jpg" width={200} />
							</div>
						</LayerListItem>
							

						<LayerListItem>
							<p>My thing</p>
						</LayerListItem>

						<LayerListItem>
							<div>
								<h2>Forcing overflow of the container</h2>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
								</p>
								<p>
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
								</p>
							</div>
						</LayerListItem>
					
					</ReactLeafletLayerList>
		
				</Map>
			</div>
		)
	}
}
