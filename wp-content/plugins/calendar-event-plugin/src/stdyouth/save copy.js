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
					<button className="table-btn" data-gender="Girls">
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
			<table>
				<thead>
					<tr className="table-heading">
						<th>Metai</th>
						<th></th>
						<th>Vieta ir laikas</th>
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
										<tr
											className="table-info"
											key={tournament.name}
											data-category={tournament.config.age_group}
											data-time-control={tournament.config.time_control}
										>
											<td>{attribute.year}</td>
											<td>Finalas (u{tournament.config.age_group})</td>
											<td>Miestas</td>
											<td className="winner-row boys">
												{tournament.winners && (
													<span>
														{tournament.winners.map((winner) => (
															<span key={winner.place}>
																{winner.place}. {winner.name} ({winner.rating})
															</span>
														))}
													</span>
												)}
											</td>
											<td className="winner-row girls">
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
