import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

interface DeathStatsListProps {
	deathCounts: { [key: string]: number }
	onResetAllCounts: () => void
}

export function DeathStatsList({
	deathCounts,
	onResetAllCounts,
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
			{/* <Button
				onClick={onResetAllCounts}
				variant="destructive"
				className="w-full"
			>
				<Trash2 className="mr-2 h-4 w-4" /> Reset All Counts
			</Button> */}
		</div>
	)
}
