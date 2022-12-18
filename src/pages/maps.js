import React, { useEffect } from "react";
import axios from "axios";
import Selector from "../components/Selector";
import L from "leaflet";
import HeatmapOverlay from 'leaflet-heatmap';
import MARKER from "./marker.png"

const Maps = () => {

	const MAP_TILE = L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  	const mapStyles = {
    	overflow: "hidden",
    	height: "100vh"
	};

	const currentViewStyle = {
		fontSize: "1.8em",
		fontFamily: "Verdana",
		display: "block",
		padding: "10px",
		textAlign: "center",
		color: "white",
		background: "#a3a3c2"
	}

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

	function makeReq(reqURL, current)
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
				center: [39.288236, -76.609383],
				zoomSnap: 0.1,
				zoom: 11.8,
				zoomControl: true,
				maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
				layers: [MAP_TILE, heatmapLayer]
			};
	
			if (map !== undefined) { map.remove(); }

			map = L.map("map", mapParams);
			heatmapLayer.setData(testData);

			map.setMaxBounds(map.getBounds());

			console.log(defData);
			var markerIcon = L.icon({
				iconUrl: MARKER,
				iconSize:     [30, 30],
				iconAnchor:   [15, 30],
				popupAnchor:  [0, -30]
			});

			// ADD MARKERS TO MAP HERE
			Object.keys(defData).forEach(k => {
				var marker = L.marker([defData[k].lat, defData[k].lng], {icon: markerIcon, autoPan: false}).addTo(map);
				marker.bindPopup(String("The count for this " + defData[k].zipcode + " is " + defData[k].count)).openPopup();
			});
			map.closePopup();

			var startDate = document.getElementById("start").value;
			var endDate = document.getElementById("end").value;

			console.log(startDate);

			// set currentView div
			if (startDate === '' && endDate === ''){
				if (current === "COVID-19"){
					document.getElementById("currentView").textContent = "Currently Viewing: All " + current + " Cases In Dataset (2020-04-01 to 2022-10-31)";
				}
				else {
					document.getElementById("currentView").textContent = "Currently Viewing: All " + current + " Cases In Dataset (2019-01-01 to 2022-10-31)";
				}
			}
			else{
				document.getElementById("currentView").textContent = "Currently Viewing: " + current + " Cases From " + startDate + " To " + endDate;
			}
		});
	}

	function covidDataWithDate()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/covid_cases", "COVID-19");
		} else {
			makeReq("http://localhost:80/api/map/covid_cases/" + startDate + "/" + endDate, "COVID-19");
		}
	}

	function commonAssaultFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/4E", "Common Assault");
		} else {
			makeReq("http://localhost:80/api/map/crime/4E/" + startDate + "/" + endDate, "Common Assault");
		}
	}

	function larcenyFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/6C", "Larceny");
		} else {
			makeReq("http://localhost:80/api/map/crime/6C/" + startDate + "/" + endDate, "Larceny");
		}
	}

	function homicideFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/1A", "Homicide");
		} else {
			makeReq("http://localhost:80/api/map/crime/1A/" + startDate + "/" + endDate, "Homicide");
		}
	}

	function burglaryFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/5D", "Burglary");
		} else {
			makeReq("http://localhost:80/api/map/crime/5D/" + startDate + "/" + endDate, "Burglary");
		}
	}

	function rapeFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/2A", "Rape");
		} else {
			makeReq("http://localhost:80/api/map/crime/2A/" + startDate + "/" + endDate, "Rape");
		}
	}

	function autoTheftFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/7A", "Auto Theft");
		} else {
			makeReq("http://localhost:80/api/map/crime/7A/" + startDate + "/" + endDate, "Auto Theft");
		}
	}

	function shootingFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/9S", "Shooting");
		} else {
			makeReq("http://localhost:80/api/map/crime/9S/" + startDate + "/" + endDate, "Shooting");
		}
	}

	function aggAssaultFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/4C", "Aggrevated Assault");
		} else {
			makeReq("http://localhost:80/api/map/crime/4C/" + startDate + "/" + endDate, "Aggrevated Assault");
		}
	}

	function autoLarcenyFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/6D", "Auto Larceny");
		} else {
			makeReq("http://localhost:80/api/map/crime/6D/" + startDate + "/" + endDate, "Auto Larceny");
		}
	}

	function carJackingFunc()
	{
		var startDate = document.getElementById("start").value;
		var endDate = document.getElementById("end").value;

		if (startDate === '' && endDate === ''){
			makeReq("http://localhost:80/api/map/crime/3AJF", "Car Jacking");
		} else {
			makeReq("http://localhost:80/api/map/crime/3AJF/" + startDate + "/" + endDate, "Car Jacking");
		}
	}

	useEffect(() => {
		const defParams = {
			center: [39.288236, -76.609383],
			zoomSnap: 0.1,
			zoom: 11.8,
			zoomControl: true,
			maxBounds: L.latLngBounds(L.latLng(-150, -240), L.latLng(150, 240)),
			layers: [MAP_TILE]
		};
		map = L.map("map", defParams)
		map.setMaxBounds(map.getBounds());

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
					<div id="currentView" style={currentViewStyle}></div>
					<div id="map" style={mapStyles}></div>
				</div>

			</div>
		</div>
	);
};

export default Maps;