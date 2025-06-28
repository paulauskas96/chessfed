import { __ } from "@wordpress/i18n";
import { useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";
import React, { useState } from "react";
import data from "../PhpScraping/data.json";
import { CheckboxControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

export default function Edit({ attributes, setAttributes }) {
	const [tableData, setTableData] = useState(data.general);
	const [youthOpen, setYouthOpen] = useState(false);
	const [activeCategory, setActiveCategory] = useState("general");

	const { showButtons } = attributes;

	const handleButtonClick = (category) => {
		setTableData(data[category]);

		if (["youthU18", "youthU14", "youthU10"].includes(category)) {
			setYouthOpen(true);
		} else {
			setYouthOpen(false);
		}

		setActiveCategory(category);
		setAttributes({ category: category });
	};

	const youthBtnHandler = () => {
		setTableData(data.youthU18);
		setYouthOpen(!youthOpen);

		setActiveCategory("youthU18");
		setAttributes({ category: "youthU18" });
	};

	return (
		<>
			<InspectorControls>
				<CheckboxControl
					label="Show Buttons"
					checked={showButtons}
					onChange={(value) => setAttributes({ showButtons: value })}
				/>
			</InspectorControls>
			<div className="table-button-wrapper">
				{attributes.showButtons && (
					<div className="button-wrapper">
						<button
							data-category="general"
							className={`table-btn ${
								activeCategory === "general" ? "active" : ""
							}`}
							onClick={() => handleButtonClick("general")}
						>
							Bendras
						</button>
						<button
							data-category="men"
							className={`table-btn ${
								activeCategory === "men" ? "active" : ""
							}`}
							onClick={() => handleButtonClick("men")}
						>
							Vyrai
						</button>
						<button
							data-category="female"
							className={`table-btn ${
								activeCategory === "female" ? "active" : ""
							}`}
							onClick={() => handleButtonClick("female")}
						>
							Moterys
						</button>
						<button
							data-category="youthU14"
							className={`table-btn ${
								activeCategory === "youthU18" ||
								activeCategory === "youthU14" ||
								activeCategory === "youthU10"
									? "active"
									: ""
							}`}
							onClick={youthBtnHandler}
						>
							Jauniai
						</button>
						<div className="youth-btn-wrapper">
							{youthOpen && (
								<>
									<button
										className={`table-btn ${
											activeCategory === "youthU18" ? "active" : ""
										}`}
										onClick={() => handleButtonClick("youthU18")}
									>
										U18
									</button>
									<button
										className={`table-btn ${
											activeCategory === "youthU14" ? "active" : ""
										}`}
										onClick={() => handleButtonClick("youthU14")}
									>
										U14
									</button>
									<button
										className={`table-btn ${
											activeCategory === "youthU10" ? "active" : ""
										}`}
										onClick={() => handleButtonClick("youthU10")}
									>
										U10
									</button>
								</>
							)}
						</div>

						<button
							data-category="senior"
							className={`table-btn ${
								activeCategory === "senior" ? "active" : ""
							}`}
							onClick={() => handleButtonClick("senior")}
						>
							Senjoraiiii
						</button>
					</div>
				)}
				<div className="table-wrapper">
					<h3 className="table-title"></h3>
					<table className="rating-table">
						<thead>
							<tr className="table-heading">
								<th>Nr.</th>
								<th>FIDE Title</th>
								<th>Žaidėjas</th>
								<th>Reitingas</th>
							</tr>
						</thead>
						<tbody className="table-body">
							{tableData.map((row, index) => {
								return (
									<tr className="table-info" key={index}>
										<td className="playerNr">{row.nr}</td>
										<td className="playerTitle">{row.playerTitle}</td>
										<td className="playerName">{row.playerName}</td>
										<td className="playerRating">{row.playerRating}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
