import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import React, { useEffect, useRef } from "react";
import { CheckboxControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
	const containerRef = useRef(null);
	const { showButtons, category = "general" } = attributes;

	useEffect(() => {
		if (containerRef.current && typeof window.renderRatingsTable === 'function') {
			window.renderRatingsTable({
				container: containerRef.current,
				dataUrl: "/wp-content/plugins/table-plugin/PhpScraping/data.json",
				nameMapUrl: "/wp-content/plugins/table-plugin/src/nameMap.json",
				initialCategory: category,
				showButtons: showButtons !== false,
			});
		}
	}, [showButtons, category]);

	return (
		<>
			<InspectorControls>
				<CheckboxControl
					label="Show Buttons"
					checked={showButtons}
					onChange={(value) => setAttributes({ showButtons: value })}
				/>
			</InspectorControls>
			<div
				ref={containerRef}
				id="ratings-table-container"
				className="table-button-wrapper"
			></div>
		</>
	);
}
