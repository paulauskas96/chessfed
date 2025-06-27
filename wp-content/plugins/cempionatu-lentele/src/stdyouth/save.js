import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function Save() {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="button-wrapper filter-btn">
				<div className="rapid-btn-wrapper">
					<button id="boysButton" className="table-btn" data-gender="Boys">
						Berniukai
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
					<button id="girlsButton" className="table-btn" data-gender="Girls">
						Mergaitės
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
					<tr className="">
						<th>Metai</th>						
						<th style="max-width: 170px; min-width: 50px"></th>
						<th>Nugalėtojai</th>
						<th>Rezultatai</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
