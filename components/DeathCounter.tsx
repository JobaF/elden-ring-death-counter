import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"

interface DeathCounterProps {
	currentBoss: string
	currentDeathCount: number
	onIncrementDeathCount: () => void
	onDecrementDeathCount: () => void
	isUpdating: boolean
}

export function DeathCounter({
	currentBoss,
	currentDeathCount,
	onIncrementDeathCount,
	onDecrementDeathCount,
	isUpdating,
}: DeathCounterProps) {
	return (
		<div className="space-y-4">
			<div className="text-center">
				<h2 className="text-2xl font-bold">{currentBoss}</h2>
				<p className="text-4xl font-bold mt-2">
					{currentDeathCount}
					{isUpdating && (
						<span className="text-sm text-gray-500 ml-2">(Updating...)</span>
					)}
				</p>
			</div>
			<div className="flex space-x-2">
				<Button
					onClick={onIncrementDeathCount}
					className="w-5/6 flex items-center justify-center"
					disabled={isUpdating}
				>
					<Plus className="mr-2 h-4 w-4" /> Increment
				</Button>
				<Button
					onClick={onDecrementDeathCount}
					className="w-1/6 px-0"
					disabled={currentDeathCount === 0 || isUpdating}
				>
					<Minus className="h-4 w-4" />
				</Button>
			</div>
		</div>
	)
}
