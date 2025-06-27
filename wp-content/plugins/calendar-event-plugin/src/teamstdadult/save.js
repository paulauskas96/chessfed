import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();

	return (
		<div {...blockProps}>
			<div className="button-wrapper filter-btn">
				<button id="maleButton" className="table-btn active" data-gender="Male">
					Vyrų čempionatai
				</button>

				<button id="femaleButton" className="table-btn" data-gender="Female">
					Moterų čempionatai
				</button>
			</div>
			<div id="loading" style={{ display: "none" }}>
				<div className="spinner"></div>
			</div>

			<table id="myTable" width="100%">
				<thead>
					<tr className="">
						<th>Metai</th>
						<th>Nugalėtojai</th>
						<th>Rezultatai</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	);
}
