/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import metadata from "./block.json";
import { useEffect, useState } from "@wordpress/element";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../images/blue-map-marker.png";
/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: () => {
		const [locations, setLocations] = useState([]);
		const [map, setMap] = useState(null); // Store the map instance

		useEffect(() => {
			// Fetch event data from your API
			fetch("/wp-json/wp/v2/varzybos")
				.then((response) => response.json())
				.then((posts) => {
					const currentDate = new Date();
					// Format currentDate to match the '20231029' format
					const currentYear = currentDate.getFullYear();
					const currentMonth = (currentDate.getMonth() + 1)
						.toString()
						.padStart(2, "0"); // Add 1 to month as it's zero-based
					const currentDay = currentDate.getDate().toString().padStart(2, "0");
					const formattedCurrentDate = `${currentYear}${currentMonth}${currentDay}`;

					const upcomingEvents = posts.filter((post) => {
						const startDate = post.acf.varzybu_data;
						const endDate = post.acf.varzybu_data_iki;
						if (!endDate) {
							// If there is no end date, consider it as a single-day event
							const isUpcoming = formattedCurrentDate <= startDate;
							return isUpcoming;
						}
						if (endDate) {

							const isUpcoming =
								formattedCurrentDate <= startDate &&
								formattedCurrentDate <= endDate;
								return isUpcoming;
						}
					});
					const locationNames = upcomingEvents.map(
						(event) => event.acf.varzybu_vieta_map,
					);
					setLocations(locationNames);
				})
				.catch((error) => {
					console.error("Error fetching event data:", error);
				});
		}, []);
		useEffect(() => {
			if (!map) {
				// If the map hasn't been initialized, create it
				const newMap = L.map("map").setView([55.17, 23.8813], 7);
				L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
					maxZoom: 19,
				}).addTo(newMap);
				setMap(newMap); // Store the map instance in state
			}

			if (map) {
				locations.forEach((locationName) => {
					// Use the Nominatim API to obtain coordinates for the location name
					fetch(
						`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
							locationName,
						)}`,
					)
						.then((response) => response.json())
						.then((data) => {
							if (data.length > 0) {
								const lat = parseFloat(data[0].lat);
								const lon = parseFloat(data[0].lon);


								
								const customIcon = L.icon({
									iconUrl: markerIcon,
									iconSize: [38, 60],
									iconAnchor: [22, 60],
									popupAnchor: [-3, -60],
								});
								const marker = L.marker([lat, lon], { icon: customIcon }).addTo(
									map,
								);
								marker.bindPopup(`${locationName}`);
							}
						});
				});
			}
		}, [locations, map]);

		return <div id="map" style={{ height: "400px" }}></div>;
	},

	/**
	 * @see ./save.js
	 */
	save: () => {
		return (
			<div id="map" style={{ height: "400px" }}></div>
		)
	}
});
