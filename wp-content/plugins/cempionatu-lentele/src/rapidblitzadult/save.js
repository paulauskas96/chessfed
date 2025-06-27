import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const tournamentData = attributes.attributes;

	return (
		<div {...blockProps}>
			<div className="button-wrapper filter-btn">
				<button
					id="rapidButton"
					className="table-btn active"
					data-gender="Male"
				>
					Greitieji
				</button>

				<button id="blitzButton" className="table-btn" data-gender="Female">
					Žaibo
				</button>
			</div>
			<div id="loading" style={{ display: "none" }}>
				<div className="spinner"></div>
			</div>
			<table id="myTable" width="100%">
				<thead>
					<tr>
						<th>Metai</th>
						<th style="max-width: 170px; min-width: 50px;"></th>
						<th>Vyrai</th>
						<th>Moterys</th>
						<th>Rezultatai</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
