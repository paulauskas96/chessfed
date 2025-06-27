import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [timeControl, setTimeControl] = useState("Rapid"); // Default time control

	useEffect(() => {
		const fetchData = async () => {
			const response = await apiFetch({ path: "/sample/v1/data" });
			const newAttributes = response.map((item) => ({
				year: item.year,
				tournaments: item.tournaments,
			}));
			setAttributes({
				attributes: newAttributes,
			});
		};
		fetchData();
	}, [setAttributes]); // dependencies

	const tournamentData = attributes.attributes;

	const handleTimeControlButtonClick = (selectedTimeControl) => {
		setTimeControl(selectedTimeControl);
	};
	// Display the data in the editor
	return (
		<div {...blockProps}>
			<div className="button-wrapper">
				<button
					onClick={() => handleTimeControlButtonClick("Rapid")}
					className={timeControl === "Rapid" ? "active" : ""}
				>
					Greitieji
				</button>
				<button
					onClick={() => handleTimeControlButtonClick("Blitz")}
					className={timeControl === "Blitz" ? "active" : ""}
				>
					Žaibo
				</button>
			</div>

			<table>
				<thead>
					<tr className="table-heading">
						<th>Metai</th>
						<th>Vieta ir laikas</th>
						<th>Vaikinų įskaita</th>
						<th>Merginų įskaita</th>
						<th>Rezultatai</th>
					</tr>
				</thead>

				{tournamentData &&
					tournamentData.map((attribute) => {
						const filteredTournaments = attribute.tournaments.filter(
							(tournament) => {
								return (
									// filtruojam turnyrus palei amziaus grupe ir std kategorija
									tournament.config.age_group === null &&
									tournament.config.time_control === timeControl &&
									tournament.config.format === "Individual"
								);
							},
						);
						// Check if there are tournaments for the selected category
						if (filteredTournaments.length > 0) {
							return (
								<tbody className="table-body" key={attribute.name}>
									{filteredTournaments.map((tournament) => (
										<tr className="table-info" key={tournament.name}>
											<td>{attribute.year}</td>
											<td>Miestas ir laikas</td>
											<td className="winner-row boys">
												{tournament.winners &&
													tournament.winners.map((winner) => (
														<span key={winner.place}>
															{winner.place}. {winner.name} ({winner.rating}){" "}
														</span>
													))}
											</td>
											<td className="winner-row girls">
												{tournament.female_winners &&
													tournament.female_winners.map((femaleWinner) => (
														<span key={femaleWinner.place}>
															{femaleWinner.place}. {femaleWinner.name} (
															{femaleWinner.rating}){" "}
														</span>
													))}
											</td>
											<td className="underline">
												{tournament.results_link && (
													<a
														href={tournament.results_link.replace(/"/g, "")}
														target="_blank"
														rel="noopener"
													>
														Rezultatai
													</a>
												)}
												{tournament.games_link && (
													<a
														href={tournament.games_link.replace(/"/g, "")}
														target="_blank"
														rel="noopener"
													>
														Partijos
													</a>
												)}
												{tournament.download_link && (
													<a
														href={tournament.download_link.replace(/"/g, "")}
														target="_blank"
														rel="noopener"
													>
														Atsisiųsti
													</a>
												)}
											</td>
										</tr>
									))}
								</tbody>
							);
						}

						return null; // Don't render empty tables
					})}
			</table>
		</div>
	);
}
