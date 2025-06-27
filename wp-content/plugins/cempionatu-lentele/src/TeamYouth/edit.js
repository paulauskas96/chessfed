import { useBlockProps } from "@wordpress/block-editor";
import apiFetch from "@wordpress/api-fetch";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const [category, setCategory] = useState("18"); // Default category
	const [gender, setGender] = useState("Boys");
	const [showBoysAgeGroups, setShowBoysAgeGroups] = useState(true);
	const [showGirlsAgeGroups, setShowGirlsAgeGroups] = useState(false);

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

	const handleAgeGroupButtonClick = (ageGroup) => {
		setCategory(ageGroup);
	};

	const onGenderButtonClick = (selectedGender) => {
		setGender(selectedGender);

		if (selectedGender === "Boys") {
			setShowBoysAgeGroups(true);
			setShowGirlsAgeGroups(false);
		}
		if (selectedGender === "Girls") {
			setShowGirlsAgeGroups(true);
			setShowBoysAgeGroups(false);
		}

		// Use setAttributes to update the gender attribute in the block
		const updatedAttributes = { ...attributes, selectedGender };
		setAttributes(updatedAttributes);
	};
	// Display the data in the editor
	return (
		<div {...blockProps}>
			<div className="button-wrapper">
				<button
					onClick={() => onGenderButtonClick("Boys")}
					className={gender === "Boys" ? "active" : ""}
				>
					Berniukų
				</button>

				{showBoysAgeGroups && (
					<div className="age-btn-wrapper">
						<button
							onClick={() => handleAgeGroupButtonClick("18")}
							className={category === "18" ? "active" : ""}
						>
							U18
						</button>
						<button
							onClick={() => handleAgeGroupButtonClick("14")}
							className={category === "14" ? "active" : ""}
						>
							U14
						</button>
						<button
							onClick={() => handleAgeGroupButtonClick("10")}
							className={category === "10" ? "active" : ""}
						>
							U10/U11
						</button>
					</div>
				)}
				<button
					onClick={() => onGenderButtonClick("Girls")}
					className={gender === "Girls" ? "active" : ""}
				>
					Mergaitės
				</button>

				{showGirlsAgeGroups && (
					<div className="age-btn-wrapper">
						<button
							onClick={() => handleAgeGroupButtonClick("18")}
							className={category === "18" ? "active" : ""}
						>
							U18
						</button>
						<button
							onClick={() => handleAgeGroupButtonClick("14")}
							className={category === "14" ? "active" : ""}
						>
							U14
						</button>
						<button
							onClick={() => handleAgeGroupButtonClick("10")}
							className={category === "10" ? "active" : ""}
						>
							U10/U11
						</button>
					</div>
				)}
			</div>

			<table>
				<thead>
					<tr className="table-heading team">
						<th>Metai</th>
						<th>Vieta ir laikas</th>
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
									tournament.config.age_group === parseInt(category) &&
									tournament.config.time_control !== "Std" &&
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
											<td>{attribute.year} {tournament.config.time_control}</td>
											<td></td>
											<td className="winner-row">
												{gender === "Boys" && tournament.team_winners
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
													: gender === "Girls" &&
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
