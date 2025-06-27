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
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useRef, useState } from "@wordpress/element";

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
		const calendarComponentRef = useRef(null);
		const [events, setEvents] = useState([]);

		useEffect(() => {
			fetch("/wp-json/wp/v2/varzybos")
				.then((response) => response.json())
				.then((posts) => {
					const events = posts.map((post) => {
						const formattedDate =
							post.acf.varzybu_data.slice(0, 4) +
							"-" +
							post.acf.varzybu_data.slice(4, 6) +
							"-" +
							post.acf.varzybu_data.slice(6);
						return {
							title: post.acf.varzybu_data,
							date: formattedDate,
							color: "red",
						};
					});
					setEvents(events);
				});
		}, []);

		return (
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={events}
				ref={calendarComponentRef}
			/>
		);
	},

	/**
	 * @see ./save.js
	 */
	save: () => {
		return <div id="calendar"></div>;
	},
});
