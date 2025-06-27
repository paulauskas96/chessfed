import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const tournamentData = attributes.attributes;

	return (
		<div {...blockProps}>
			<div className="button-wrapper filter-btn">
				<div className="rapid-btn-wrapper">
					<button
						id="rapidButton"
						className="table-btn active"
						data-time-control="Rapid"
					>
						Greitieji
					</button>
				</div>
				<div className="blitz-btn-wrapper">
					<button
						id="blitzButton"
						className="table-btn"
						data-time-control="Blitz"
					>
						Žaibo
					</button>
				</div>
			</div>
			<div id="loading" style={{ display: "none" }}>
				<div className="spinner"></div>
			</div>

			<table id="myTable" width="100%">
				<thead>
					<tr className="">
						<th>Metai</th>
						<th className="none">Vieta ir Laikas</th>
						<th>Nugalėtojai</th>
						<th>Rezultatai</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
