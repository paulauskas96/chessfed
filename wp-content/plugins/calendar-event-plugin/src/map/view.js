import L from "leaflet";
import "leaflet/dist/leaflet.css";
import blueMarkerIcon from "../images/blue-map-marker.png";
import redMarkerIcon from "../images/red-map-marker.png";
import blackMarkerIcon from "../images/black-map-marker.png";

document.addEventListener("DOMContentLoaded", async () => {
	// Get the map container
	const mapContainer = document.getElementById("map");

	// if (mapContainer) {
	// 	const map = L.map("map", {
	// 		center: [55.17, 23.8813],
	// 		zoom: 7,
	// 		scrollWheelZoom: false,
	// 	});
	// 	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	// 		maxZoom: 19,
	// 	}).addTo(map);

	// 	const upcomingEvents = await fetch("/wp-json/wp/v2/varzybos?per_page=70")
	// 		.then((response) => response.json())
	// 		.then((posts) => {
	// 			const currentDate = new Date();
	// 			const formattedCurrentDate = currentDate
	// 				.toISOString()
	// 				.slice(0, 10)
	// 				.replace(/-/g, "");

	// 			return posts
	// 				.filter((post) => {
	// 					const startDate = post.acf.varzybu_data;
	// 					const endDate = post.acf.varzybu_data_iki;
	// 					return formattedCurrentDate <= (endDate || startDate);
	// 				})
	// 				.map((event) => ({
	// 					locationName: event.acf.varzybu_vieta_map,
	// 					kiekDienu: event.acf.kiek_dienu,
	// 					eventName: event.acf.pavadinimas || event.title.rendered,
	// 					lietuvosMastu: event.acf.lietuvos_mastu,
	// 					federacijosVeikla: event.acf.federacijos_veikla,
	// 					url: event.link,
	// 					startDate: event.acf.varzybu_data,
	// 					endDate: event.acf.varzybu_data_iki,
	// 					tipas: event.acf.sachmatu_tipas,
	// 				}));
	// 		})
	// 		.catch((error) => console.error("Error fetching event data:", error));

	// 	const getFromCache = (key) => {
	// 		const cached = localStorage.getItem(key);
	// 		return cached ? JSON.parse(cached) : null;
	// 	  };

	// 	  const setToCache = (key, value) => {
	// 		localStorage.setItem(key, JSON.stringify(value));
	// 	  };

	// 	  const fetchLocationWithDelay = async (locationName, delay) => {
	// 		const cacheKey = `location_${locationName}`;
	// 		const cachedData = getFromCache(cacheKey);

	// 		if (cachedData) {
	// 		  console.log(`Cache hit for location: ${locationName}`);
	// 		  return Promise.resolve(cachedData);
	// 		}

	// 		console.log(`Cache miss for location: ${locationName}. Fetching from API.`);
	// 		await new Promise((resolve) => setTimeout(resolve, delay));
	// 		const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(locationName)}`);
	// 		const data = await response.json();
	// 		setToCache(cacheKey, data);
	// 		return data;
	// 	  };

	// 	upcomingEvents.forEach((event, index) => {
	// 		let howDelay = index * 1;

	// 		fetchLocationWithDelay(event.locationName, howDelay)
	// 			.then((data) => {
	// 				if (data.length > 0) {
	// 					const lat = parseFloat(data[0].lat);
	// 					const lon = parseFloat(data[0].lon);
	// 					let eventTipas = event.tipas.toLowerCase().replace(
	// 						/[ąčęėįšųūž]/g,
	// 						(char) =>
	// 							({
	// 								ą: "a",
	// 								č: "c",
	// 								ę: "e",
	// 								ė: "e",
	// 								į: "i",
	// 								š: "s",
	// 								ų: "u",
	// 								ū: "u",
	// 								ž: "z",
	// 							})[char],
	// 					);

	// 					let varzybuDataFormatted = `${event.startDate.slice(
	// 						0,
	// 						4,
	// 					)}-${event.startDate.slice(4, 6)}-${event.startDate.slice(6, 8)}`;
	// 					let varzybuPabaigaFormatted = event.endDate
	// 						? `${event.endDate.slice(0, 4)}-${event.endDate.slice(
	// 								4,
	// 								6,
	// 						  )}-${event.endDate.slice(6, 8)}`
	// 						: "";

	// 					let markerIconUrl = event.federacijosVeikla
	// 						? blackMarkerIcon
	// 						: event.lietuvosMastu
	// 						? redMarkerIcon
	// 						: blueMarkerIcon;

	// 					const customIcon = L.icon({
	// 						iconUrl: markerIconUrl,
	// 						iconSize: [38, 40],
	// 						iconAnchor: [22, 40],
	// 						popupAnchor: [-3, -60],
	// 					});

	// 					const marker = L.marker([lat, lon], { icon: customIcon }).addTo(
	// 						map,
	// 					);
	// 					const popupContent = `
	// 			  <a href="${event.url}" target="_blank">
	// 				<h3 class="turnyro-title underline">${event.eventName}</h3>
	// 			  </a>
	// 			  <ul class="turnyro-info">
	// 				<li class="turnyro-data">
	// 				  ${
	// 						event.kiekDienu
	// 							? `Nuo ${varzybuDataFormatted} iki ${varzybuPabaigaFormatted}`
	// 							: `${varzybuDataFormatted}`
	// 					}
	// 				</li>
	// 				<li class="turnyro-tipas ${event.lietuvosMastu ? "red" : "blue"} ${eventTipas}">
	// 				  ${event.tipas}
	// 				</li>
	// 				<li class="turnyro-vieta">${event.locationName}</li>
	// 			  </ul>
	// 			`;

	// 					marker.bindPopup(popupContent);
	// 				}
	// 			})
	// 			.catch((error) =>
	// 				console.error("Error fetching location data:", error),
	// 			);
	// 	});

	// 	console.log("Upcoming events after filtering:", upcomingEvents.length);
	// }

	// if (mapContainer) {
	// 	const map = L.map("map", {
	// 		center: [55.17, 23.8813],
	// 		zoom: 7,
	// 		scrollWheelZoom: false,
	// 	});
	// 	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	// 		maxZoom: 19,
	// 	}).addTo(map);

	// 	const getFromCache = (key) => {
	// 		const itemStr = localStorage.getItem(key);
	// 		if (!itemStr) return null;

	// 		const item = JSON.parse(itemStr);
	// 		const now = new Date().getTime();

	// 		if (now > item.expiry) {
	// 			localStorage.removeItem(key);
	// 			return null;
	// 		}
	// 		return item.value;
	// 	};

	// 	const setToCache = (key, value, expirationInDays = 30) => {
	// 		const item = {
	// 			value: value,
	// 			expiry: new Date().getTime() + expirationInDays * 24 * 60 * 60 * 1000,
	// 		};
	// 		localStorage.setItem(key, JSON.stringify(item));
	// 	};

	// 	const fetchLocation = async (locationName) => {
	// 		const cacheKey = `location_${locationName}`;
	// 		const cachedData = getFromCache(cacheKey);

	// 		if (cachedData) {
	// 			console.log(`Cache hit for location: ${locationName}`);
	// 			return cachedData;
	// 		}

	// 		try {
	// 			const response = await fetch(
	// 				`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
	// 					locationName,
	// 				)}`,
	// 			);
	// 			const data = await response.json();
	// 			setToCache(cacheKey, data);
	// 			return data;
	// 		} catch (error) {
	// 			console.error("Error fetching location:", locationName, error);
	// 			return null;
	// 		}
	// 	};

	// 	const fetchEvents = async () => {
	// 		try {
	// 			const response = await fetch("/wp-json/wp/v2/varzybos?per_page=70");
	// 			const posts = await response.json();
	// 			const currentDate = new Date()
	// 				.toISOString()
	// 				.slice(0, 10)
	// 				.replace(/-/g, "");

	// 			return posts
	// 				.filter((post) => {
	// 					const startDate = post.acf.varzybu_data;
	// 					const endDate = post.acf.varzybu_data_iki;
	// 					return currentDate <= (endDate || startDate);
	// 				})
	// 				.map((event) => ({
	// 					locationName: event.acf.varzybu_vieta_map,
	// 					kiekDienu: event.acf.kiek_dienu,
	// 					eventName: event.acf.pavadinimas || event.title.rendered,
	// 					lietuvosMastu: event.acf.lietuvos_mastu,
	// 					federacijosVeikla: event.acf.federacijos_veikla,
	// 					url: event.link,
	// 					startDate: event.acf.varzybu_data,
	// 					endDate: event.acf.varzybu_data_iki,
	// 					tipas: event.acf.sachmatu_tipas,
	// 				}));
	// 		} catch (error) {
	// 			console.error("Error fetching event data:", error);
	// 			return [];
	// 		}
	// 	};

	// 	const addMarkersToMap = (events) => {
	// 		events.forEach(async (event) => {
	// 			const locationData = await fetchLocation(event.locationName);
	// 			if (locationData && locationData.length > 0) {
	// 				const { lat, lon } = locationData[0];
	// 				const eventTipas = event.tipas.toLowerCase().replace(
	// 					/[ąčęėįšųūž]/g,
	// 					(char) =>
	// 						({
	// 							ą: "a",
	// 							č: "c",
	// 							ę: "e",
	// 							ė: "e",
	// 							į: "i",
	// 							š: "s",
	// 							ų: "u",
	// 							ū: "u",
	// 							ž: "z",
	// 						})[char],
	// 				);

	// 				const varzybuDataFormatted = `${event.startDate.slice(
	// 					0,
	// 					4,
	// 				)}-${event.startDate.slice(4, 6)}-${event.startDate.slice(6, 8)}`;
	// 				const varzybuPabaigaFormatted = event.endDate
	// 					? `${event.endDate.slice(0, 4)}-${event.endDate.slice(
	// 							4,
	// 							6,
	// 					  )}-${event.endDate.slice(6, 8)}`
	// 					: "";

	// 				const markerIconUrl = event.federacijosVeikla
	// 					? blackMarkerIcon
	// 					: event.lietuvosMastu
	// 					? redMarkerIcon
	// 					: blueMarkerIcon;

	// 				const customIcon = L.icon({
	// 					iconUrl: markerIconUrl,
	// 					iconSize: [38, 40],
	// 					iconAnchor: [22, 40],
	// 					popupAnchor: [-3, -60],
	// 				});

	// 				const marker = L.marker([parseFloat(lat), parseFloat(lon)], {
	// 					icon: customIcon,
	// 				}).addTo(map);
	// 				const popupContent = `
	// 			<a href="${event.url}" target="_blank">
	// 			  <h3 class="turnyro-title underline">${event.eventName}</h3>
	// 			</a>
	// 			<ul class="turnyro-info">
	// 			  <li class="turnyro-data">
	// 				${
	// 					event.kiekDienu
	// 						? `Nuo ${varzybuDataFormatted} iki ${varzybuPabaigaFormatted}`
	// 						: `${varzybuDataFormatted}`
	// 				}
	// 			  </li>
	// 			  <li class="turnyro-tipas ${
	// 					event.lietuvosMastu ? "red" : "blue"
	// 				} ${eventTipas}">
	// 				${event.tipas}
	// 			  </li>
	// 			  <li class="turnyro-vieta">${event.locationName}</li>
	// 			</ul>
	// 		  `;
	// 				marker.bindPopup(popupContent);
	// 			}
	// 		});
	// 	};

	// 	(async () => {
	// 		const upcomingEvents = await fetchEvents();
	// 		addMarkersToMap(upcomingEvents);
	// 		console.log("Upcoming events after filtering:", upcomingEvents.length);
	// 	})();
	// }

	if (mapContainer) {
		const map = L.map("map", {
			center: [55.17, 23.8813],
			zoom: 7,
			scrollWheelZoom: false,
		});
		L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
			maxZoom: 19,
		}).addTo(map);

		const getFromCache = (key) => {
			const itemStr = localStorage.getItem(key);
			if (!itemStr) return null;

			const item = JSON.parse(itemStr);
			const now = new Date().getTime();

			if (now > item.expiry) {
				localStorage.removeItem(key);
				return null;
			}
			return item.value;
		};

		const setToCache = (key, value, expirationInDays = 30) => {
			const item = {
				value: value,
				expiry: new Date().getTime() + expirationInDays * 24 * 60 * 60 * 1000,
			};
			localStorage.setItem(key, JSON.stringify(item));
		};

		const fetchLocation = async (locationName, lat, lon) => {
			const cacheKey = `location_${locationName}_${lat}_${lon}`;
			const cachedData = getFromCache(cacheKey);

			if (cachedData) {
				console.log(`Cache hit for location: ${locationName}`);
				return cachedData;
			}

			try {
				let url;
				if (locationName && !lat && !lon) {
					// If we only have a location name, use the search endpoint
					url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
						locationName,
					)}`;
				} else if (lat && lon) {
					// If we have coordinates, use the reverse endpoint
					url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
				} else {
					throw new Error("Invalid location data");
				}

				const response = await fetch(url);
				const data = await response.json();

				// Process the data based on which endpoint was used
				let processedData;
				if (locationName && !lat && !lon) {
					processedData = data[0]; // For search endpoint, take the first result
				} else {
					// For reverse endpoint, format the data to match the search endpoint format
					processedData = {
						lat: data.lat,
						lon: data.lon,
						display_name: data.display_name,
					};
				}

				setToCache(cacheKey, processedData);
				return processedData;
			} catch (error) {
				console.error("Error fetching location:", locationName, error);
				return null;
			}
		};

		const fetchEvents = async () => {
			try {
				const response = await fetch("/wp-json/wp/v2/varzybos?per_page=70");
				const posts = await response.json();
				const currentDate = new Date()
					.toISOString()
					.slice(0, 10)
					.replace(/-/g, "");

				return posts
					.filter((post) => {
						const startDate = post.acf.varzybu_data;
						const endDate = post.acf.varzybu_data_iki;
						return currentDate <= (endDate || startDate);
					})
					.map((event) => ({
						locationName: event.acf.varzybu_vieta_map,
						lat: event.acf.latitude, // Add these new fields
						lon: event.acf.longitude, // Add these new fields
						kiekDienu: event.acf.kiek_dienu,
						eventName: event.acf.pavadinimas || event.title.rendered,
						lietuvosMastu: event.acf.lietuvos_mastu,
						federacijosVeikla: event.acf.federacijos_veikla,
						url: event.link,
						startDate: event.acf.varzybu_data,
						endDate: event.acf.varzybu_data_iki,
						tipas: event.acf.sachmatu_tipas,
					}));
			} catch (error) {
				console.error("Error fetching event data:", error);
				return [];
			}
		};

		const addMarkersToMap = (events) => {
			events.forEach(async (event) => {
				let locationData;
				if (event.lat && event.lon) {
					// If we have lat and lon, use them
					locationData = await fetchLocation(
						event.locationName,
						event.lat,
						event.lon,
					);
				} else {
					// Otherwise, try with the location name
					locationData = await fetchLocation(event.locationName);
				}

				if (locationData) {
					const { lat, lon } = locationData;
					const eventTipas = event.tipas.toLowerCase().replace(
						/[ąčęėįšųūž]/g,
						(char) =>
							({
								ą: "a",
								č: "c",
								ę: "e",
								ė: "e",
								į: "i",
								š: "s",
								ų: "u",
								ū: "u",
								ž: "z",
							})[char],
					);

					const varzybuDataFormatted = `${event.startDate.slice(
						0,
						4,
					)}-${event.startDate.slice(4, 6)}-${event.startDate.slice(6, 8)}`;
					const varzybuPabaigaFormatted = event.endDate
						? `${event.endDate.slice(0, 4)}-${event.endDate.slice(
								4,
								6,
						  )}-${event.endDate.slice(6, 8)}`
						: "";

					const markerIconUrl = event.federacijosVeikla
						? blackMarkerIcon
						: event.lietuvosMastu
						? redMarkerIcon
						: blueMarkerIcon;

					const customIcon = L.icon({
						iconUrl: markerIconUrl,
						iconSize: [38, 40],
						iconAnchor: [22, 40],
						popupAnchor: [-3, -60],
					});

					const marker = L.marker([parseFloat(lat), parseFloat(lon)], {
						icon: customIcon,
					}).addTo(map);
					const popupContent = `
				<a href="${event.url}" target="_blank">
				  <h3 class="turnyro-title underline">${event.eventName}</h3>
				</a>
				<ul class="turnyro-info">
				  <li class="turnyro-data">
					${
						event.kiekDienu
							? `Nuo ${varzybuDataFormatted} iki ${varzybuPabaigaFormatted}`
							: `${varzybuDataFormatted}`
					}
				  </li>
				  <li class="turnyro-tipas ${
						event.lietuvosMastu ? "red" : "blue"
					} ${eventTipas}">
					${event.tipas}
				  </li>
				  <li class="turnyro-vieta">${event.locationName}</li>
				</ul>
			  `;
					marker.bindPopup(popupContent);
				}
			});
		};

		(async () => {
			const upcomingEvents = await fetchEvents();
			addMarkersToMap(upcomingEvents);
			console.log("Upcoming events after filtering:", upcomingEvents.length);
		})();
	}
});
