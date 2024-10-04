import { Button } from "@/components/ui/button"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { X } from "lucide-react"

interface BossSelectorProps {
	bosses: string[]
	selectedBoss: string
	onSelectBoss: (boss: string) => void
	onClearBoss: () => void
}

export function BossSelector({
	bosses,
	selectedBoss,
	onSelectBoss,
	onClearBoss,
}: BossSelectorProps) {
	return (
		<div className="flex items-center space-x-2">
			<Select onValueChange={onSelectBoss} value={selectedBoss}>
				<SelectTrigger className="w-full">
					<SelectValue placeholder="Select a boss" />
				</SelectTrigger>
				<SelectContent>
					{bosses.map((boss) => (
						<SelectItem key={boss} value={boss}>
							{boss}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button onClick={onClearBoss} variant="outline" size="icon">
				<X className="h-4 w-4" />
				<span className="sr-only">Clear input</span>
			</Button>
		</div>
	)
}
