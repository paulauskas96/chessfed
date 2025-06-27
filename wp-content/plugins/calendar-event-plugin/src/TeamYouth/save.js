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
						id="boysButton"
						className="table-btn"
						data-gender="Boys"
					>
						Berniukų
					</button>
					<div className="age-btn-wrapper boy">
						<button className="table-btn active" data-category="18">
							U18
						</button>
						<button className="table-btn" data-category="14">
							U14
						</button>
						<button className="table-btn" data-category="10">
							U10/U11
						</button>
					</div>
				</div>
				<div className="blitz-btn-wrapper">
					<button
						id="girlsButton"
						className="table-btn"
						data-gender="Girls"
					>
						Mergaičių
					</button>
					<div className="age-btn-wrapper girl">
						<button className="table-btn active" data-category="18">
							U18
						</button>
						<button className="table-btn" data-category="14">
							U14
						</button>
						<button className="table-btn" data-category="10">
							U10/U11
						</button>
					</div>
				</div>
			</div>
			<div id="loading" style={{ display: "none" }}>
				<div className="spinner"></div>
			</div>
			<table id="myTable" width="100%">
				<thead>
					<tr>
						<th>Metai</th>
						<th style="max-width: 50px; min-width: 50px"></th>
						<th>Prizininkai</th>
						<th>Rezultatai</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
