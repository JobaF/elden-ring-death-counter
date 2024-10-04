import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface DeathCounterProps {
	currentBoss: string
	currentDeathCount: number
	onIncrementDeathCount: () => void
	onDecrementDeathCount: () => void
}

export function DeathCounter({
	currentBoss,
	currentDeathCount,
	onIncrementDeathCount,
	onDecrementDeathCount,
}: DeathCounterProps) {
	return (
		<div className="space-y-4">
			<div className="text-center">
				<h2 className="text-2xl font-bold">{currentBoss}</h2>
				<p className="text-4xl font-bold mt-2">{currentDeathCount}</p>
			</div>
			<div className="flex space-x-2">
				<Button
					onClick={onIncrementDeathCount}
					className="w-5/6 flex items-center justify-center"
				>
					<Plus className="h-4 w-4" /> Increment
				</Button>
				<Button
					onClick={onDecrementDeathCount}
					className="w-1/6"
					disabled={currentDeathCount === 0}
					variant={"secondary"}
				>
					<Minus className="mr-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
