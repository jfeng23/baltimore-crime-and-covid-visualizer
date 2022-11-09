import React, { useEffect } from "react";
import axios from "axios";
import Selector from "../components/Selector";
import L from "leaflet";
import HeatmapOverlay from 'leaflet-heatmap';

const Maps = () => {

	const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  	const mapStyles = {
    	overflow: "hidden",
    	height: "100vh"
	};

	const row = {
		display: 'flex',
		flexWrap: 'wrap'
	};

	const selectorFlex = {
		flex: '25%',
	};

	const bodyFlex = {
		flex: '75%'
	};

	// DEFAULT MAP, WITH NO INFO LOAD
	var map;

	function makeReq(reqURL)
	{
		var defData;
		axios.get(reqURL)
		.then((response) => {
			defData = response.data;
			
			var testData = {
				max: 100000,
				data: defData
			};
			
			var cfg = {
				// radius should be small ONLY if scaleRadius is true (or small radius is intended)
				// if scaleRadius is false it will be the constant radius used in pixels
				"radius": .028,
				"maxOpacity": 0.5,
				// scales the radius based on map zoom
				"scaleRadius": true,
				// if set to false the heatmap uses the global maximum for colorization
				// if activated: uses the data maximum within the current map boundaries
				//   (there will always be a red spot with useLocalExtremas true)
				"useLocalExtrema": true,
				latField: 'lat',
				lngField: 'lng',
				valueField: 'count'
			};
	
			var heatmapLayer = new HeatmapOverlay(cfg);
			
			const mapParams = {
				center: [39.268236, -76.609383],
				zoom: 12.4,
				zoomControl: false,
				maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
				layers: [MAP_TILE, heatmapLayer]
			};
	
			if (map !== undefined) { map.remove(); }

			map = L.map("map", mapParams);
			heatmapLayer.setData(testData);

			console.log(testData);

		});
	}

	function covidDataWithDate()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;
		
		console.log(startDate);
		console.log(endDate);

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/covid_cases");
		} else {
			makeReq("http://localhost:80/api/map/covid_cases/" + startDate + "/" + endDate);
		}
	}

	function commonAssaultFunc()
	{
		makeReq("http://localhost:80/api/map/crime/4E");
	}

	function larcenyFunc()
	{
		makeReq("http://localhost:80/api/map/crime/6C");
	}

	function homicideFunc()
	{
		makeReq("http://localhost:80/api/map/crime/1A");
	}

	function burglaryFunc()
	{
		makeReq("http://localhost:80/api/map/crime/5D");
	}

	function rapeFunc()
	{
		makeReq("http://localhost:80/api/map/crime/2A");
	}

	function autoTheftFunc()
	{
		makeReq("http://localhost:80/api/map/crime/7A");
	}

	function shootingFunc()
	{
		makeReq("http://localhost:80/api/map/crime/9S");
	}

	function aggAssaultFunc()
	{
		makeReq("http://localhost:80/api/map/crime/4C");
	}

	function autoLarcenyFunc()
	{
		makeReq("http://localhost:80/api/map/crime/6D");
	}

	function carJackingFunc()
	{
		makeReq("http://localhost:80/api/map/crime/3AJF");
	}

	useEffect(() => {
		const defParams = {
			center: [39.268236, -76.609383],
			zoom: 12.4,
			zoomControl: false,
			maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
			layers: [MAP_TILE]
		};
		map = L.map("map", defParams)

		// set button onclick event
		document.getElementById("covid").onclick = covidDataWithDate;
		document.getElementById("commonAssault").onclick = commonAssaultFunc; // 4E
		document.getElementById("larceny").onclick = larcenyFunc; // 6C
		document.getElementById("homicide").onclick = homicideFunc; // 1A
		document.getElementById("burglary").onclick = burglaryFunc; // 5D
		document.getElementById("rape").onclick = rapeFunc; // 2A
		document.getElementById("autoTheft").onclick = autoTheftFunc; // 7A
		document.getElementById("shooting").onclick = shootingFunc; // 9S
		document.getElementById("aggAssault").onclick = aggAssaultFunc; // 4C
		document.getElementById("autoLarceny").onclick = autoLarcenyFunc; // 6D
		document.getElementById("carJacking").onclick = carJackingFunc; // 3AJF
	}, []);

	return (
		<div>
			<div style={row}>
				
				<div style={selectorFlex}>
					<Selector></Selector>
				</div>

				<div style={bodyFlex}>
					<div id="map" style={mapStyles}></div>
				</div>

			</div>
		</div>
	);
};

export default Maps;