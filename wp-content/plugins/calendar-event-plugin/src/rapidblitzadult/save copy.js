import { useBlockProps } from "@wordpress/block-editor";
import "./style.scss";

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const tournamentData = attributes.attributes;

	return (
		<div {...blockProps}>
			<div className="button-wrapper">
				<div className="rapid-btn-wrapper">
					<button className="table-btn active" data-time-control="Rapid">
						Greitieji
					</button>
				</div>
				<div className="blitz-btn-wrapper">
					<button className="table-btn" data-time-control="Blitz">
						Žaibo
					</button>
				</div>
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
						const filteredTournaments = attribute.tournaments;
						if (filteredTournaments.length > 0) {
							return (
								<tbody className="table-body" key={attribute.name}>
									{filteredTournaments.map((tournament) => (
										<tr
											className="table-info"
											key={tournament.name}
											data-time-control={tournament.config.time_control}
											data-category={tournament.config.age_group}
											data-format={tournament.config.format}
										>
											<td>{attribute.year}</td>
											<td>Miestas ir laikas</td>
											<td className="winner-row">
												{tournament.winners && (
													<span>
														{tournament.winners.map((winner) => (
															<span key={winner.place}>
																{winner.place}. {winner.name} ({winner.rating})
															</span>
														))}
													</span>
												)}
												<div>
													{tournament.ltu_winners && (
														<span>
															<h4>Tarp lietuviu</h4>
															{tournament.ltu_winners.map((ltuWinners) => (
																<span key={ltuWinners.place}>
																	{ltuWinners.place}. {ltuWinners.name} (
																	{ltuWinners.rating})
																</span>
															))}
														</span>
													)}
												</div>
											</td>
											<td className="winner-row">
												{/* Female Winners */}
												{tournament.female_winners && (
													<span>
														{tournament.female_winners.map((femaleWinner) => (
															<span key={femaleWinner.place}>
																{femaleWinner.place}. {femaleWinner.name} (
																{femaleWinner.rating})
															</span>
														))}
													</span>
												)}
												<div>
													{tournament.ltu_women_winners && (
														<span>
															<h4>Tarp lietuviu</h4>
															{tournament.ltu_women_winners.map((ltuWinners) => (
																<span key={ltuWinners.place}>
																	{ltuWinners.place}. {ltuWinners.name} (
																	{ltuWinners.rating})
																</span>
															))}
														</span>
													)}
												</div>
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
