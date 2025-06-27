import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [gender, setGender] = useState("Male");

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

	const onGenderButtonClick = (selectedGender) => {
		setGender(selectedGender);

		// Use setAttributes to update the gender attribute in the block
		const updatedAttributes = { ...attributes, selectedGender };
		setAttributes(updatedAttributes);
	};
	// Display the data in the editor
	return (
		<div {...blockProps}>
			<div className="button-wrapper">
				<button
					onClick={() => onGenderButtonClick("Male")}
					className={gender === "Male" ? "active" : ""}
				>
					LŠL
				</button>

				<button
					onClick={() => onGenderButtonClick("Female")}
					className={gender === "Female" ? "active" : ""}
				>
					LMŠL
				</button>
			</div>

			<table>
				<thead>
					<tr className="table-heading team">
						<th>Metai</th>
						<th>Divizionas</th>
						<th>Prizininkai</th>
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
									tournament.config.time_control === "Std" &&
									tournament.config.format === "Team"
								);
							},
						);
						// Check if there are tournaments for the selected category
						if (filteredTournaments.length > 0) {
							return (
								<tbody className="table-body" key={attribute.name}>
									{filteredTournaments.map((tournament) => (
										<tr className="table-info team" key={tournament.name}>
											<td>{attribute.year}</td>
											<td></td>
											<td className="winner-row">
												{gender === "Male" && tournament.team_winners
													? tournament.team_winners.map((winner) => (
															<span key={winner.place}>
																{winner.place}. {winner.name} ({winner.city}){" "}
																<details>
																	<summary>Sudėtis</summary>
																	<ol>
																		{winner.members.map((member, index) => (
																			<li key={index}>{member}</li>
																		))}
																	</ol>
																</details>
															</span>
													  ))
													: gender === "Female" &&
													  tournament.female_team_winners
													? tournament.female_team_winners.map((winner) => (
															<span key={winner.place}>
																{winner.place}. {winner.name} ({winner.city}){" "}
																<details>
																	<summary>Sudėtis</summary>
																	<ol>
																		{winner.members.map((member, index) => (
																			<li key={index}>{member}</li>
																		))}
																	</ol>
																</details>
															</span>
													  ))
													: null}
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
