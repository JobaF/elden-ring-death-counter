interface DeathStatsListProps {
	deathCounts: { [key: string]: number }
	onResetAllCounts: () => void
	isUpdating: boolean
}

export function DeathStatsList({
	deathCounts,
	isUpdating,
}: DeathStatsListProps) {
	return (
		<div className="w-full">
			<h3 className="text-lg font-semibold mb-2">All Death Counts:</h3>
			<ul className="space-y-1 mb-4">
				{Object.entries(deathCounts)
					.filter(([, count]) => count > 0)
					.sort(([, a], [, b]) => b - a)
					.map(([boss, count]) => (
						<li key={boss} className="flex justify-between">
							<span>{boss}</span>
							<span className="font-bold">{count}</span>
						</li>
					))}
			</ul>
			{isUpdating && (
				<p className="text-sm text-gray-500 mt-2 text-center">Updating...</p>
			)}
		</div>
	)
}
