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
						className="table-btn"
						data-time-control="Rapid"
					>
						Greitieji
					</button>
					<div className="age-btn-wrapper boy">
						<button className="table-btn active" data-category="18">
							U18
						</button>
						<button className="table-btn" data-category="16">
							U16
						</button>
						<button className="table-btn" data-category="14">
							U14
						</button>
						<button className="table-btn" data-category="12">
							U12
						</button>
						<button className="table-btn" data-category="10">
							U10
						</button>
						<button className="table-btn" data-category="8">
							U8
						</button>
					</div>
				</div>
				<div className="blitz-btn-wrapper">
					<button
						id="blitzButton"
						className="table-btn"
						data-time-control="Blitz"
					>
						Žaibo
					</button>
					<div className="age-btn-wrapper girl">
						<button className="table-btn active" data-category="18">
							U18
						</button>
						<button className="table-btn" data-category="16">
							U16
						</button>
						<button className="table-btn" data-category="14">
							U14
						</button>
						<button className="table-btn" data-category="12">
							U12
						</button>
						<button className="table-btn" data-category="10">
							U10
						</button>
						<button className="table-btn" data-category="8">
							U8
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
						<th>Vaikinų įskaita</th>
						<th>Merginų įskaita</th>
						<th>Rezultatai</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
