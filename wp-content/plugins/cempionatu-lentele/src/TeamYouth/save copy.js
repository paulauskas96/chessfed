import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const tournamentData = attributes.attributes;

	return (
		<div {...blockProps}>
			<div className="button-wrapper">
				<div className="rapid-btn-wrapper">
					<button className="table-btn" data-gender="Boys">
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
					<button className="table-btn" data-gender="Girls">
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
			<div class="table-scroll-wrapper">
				<table>
					<thead>
						<tr className="table-heading team">
							<th>Metai</th>
							<th className="none">Vieta ir laikas</th>
							<th>Nugalėtojai</th>
							<th>Rezultatai</th>
						</tr>
					</thead>
					{tournamentData &&
						tournamentData.map((attribute) => {
							const filteredTournaments = attribute.tournaments;
							if (filteredTournaments.length > 0) {
								return (
									<tbody className="table-body" key={attribute.name}>
										{filteredTournaments.map((tournament) => (
											<>
												<tr
													className="table-info team"
													key={tournament.name}
													data-category={tournament.config.age_group}
													data-time-control={tournament.config.time_control}
													data-format={tournament.config.format}
													data-gender="Boys"
												>
													<td>
														{attribute.year} {tournament.config.time_control}{" "}
													</td>
													<td className="none"></td>
													<td className="winner-row boys">
														{tournament.team_winners && (
															<span>
																{tournament.team_winners.map((winner) => (
																	<>
																		<span key={winner.place}>
																			{winner.place}. {winner.name} (
																			{winner.city}){" "}
																			<details>
																				<summary>Sudėtis</summary>
																				<ol>
																					{winner.members.map(
																						(member, index) => (
																							<li key={index}>{member}</li>
																						),
																					)}
																				</ol>
																			</details>
																		</span>
																	</>
																))}
															</span>
														)}
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
																href={tournament.download_link.replace(
																	/"/g,
																	"",
																)}
																target="_blank"
																rel="noopener"
															>
																Atsisiųsti
															</a>
														)}
													</td>
												</tr>
												<tr
													className="table-info team women"
													key={tournament.name}
													data-category={tournament.config.age_group}
													data-time-control={tournament.config.time_control}
													data-format={tournament.config.format}
													data-gender="Girls"
												>
													<td>
														{attribute.year} {tournament.config.time_control}
													</td>
													<td className="none"></td>
													<td className="winner-row girls">
														{tournament.female_team_winners && (
															<span>
																{tournament.female_team_winners.map(
																	(winner) => (
																		<>
																			<span key={winner.place}>
																				{winner.place}. {winner.name} (
																				{winner.city}){" "}
																				<details>
																					<summary>Sudėtis</summary>
																					<ol>
																						{winner.members.map(
																							(member, index) => (
																								<li key={index}>{member}</li>
																							),
																						)}
																					</ol>
																				</details>
																			</span>
																		</>
																	),
																)}
															</span>
														)}
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
																href={tournament.download_link.replace(
																	/"/g,
																	"",
																)}
																target="_blank"
																rel="noopener"
															>
																Atsisiųsti
															</a>
														)}
													</td>
												</tr>
											</>
										))}
									</tbody>
								);
							}
							return null; // Don't render empty tables
						})}
				</table>
			</div>
		</div>
	);
}
