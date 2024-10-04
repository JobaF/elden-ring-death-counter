import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface CustomBossInputProps {
	customBoss: string
	onCustomBossChange: (value: string) => void
	onClearCustomBoss: () => void
}

export function CustomBossInput({
	customBoss,
	onCustomBossChange,
	onClearCustomBoss,
}: CustomBossInputProps) {
	return (
		<div className="flex items-center space-x-2">
			<Input
				type="text"
				placeholder="Or enter custom boss/area"
				value={customBoss}
				onChange={(e) => onCustomBossChange(e.target.value)}
			/>
			<Button onClick={onClearCustomBoss} variant="outline" size="icon">
				<X className="h-4 w-4" />
				<span className="sr-only">Clear input</span>
			</Button>
		</div>
	)
}
