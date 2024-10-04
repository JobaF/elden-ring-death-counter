"use client"

import { useState, useEffect } from "react"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { BossSelector } from "@/components/BossSelector"
import { CustomBossInput } from "@/components/CustomBossInput"
import { DeathCounter } from "@/components/DeathCounter"
import { DeathStatsList } from "@/components/DeathStatsList"
import { PasswordScreen } from "@/components/PasswordScreen"

// List of Elden Ring bosses
const ELDEN_RING_BOSSES = [
	"No Boss (Outside Fight)",
	"Margit, the Fell Omen",
	"Godrick the Grafted",
	"Rennala, Queen of the Full Moon",
	"Starscourge Radahn",
	"Rykard, Lord of Blasphemy",
	"Mohg, Lord of Blood",
	"Malenia, Blade of Miquella",
	"Morgott, the Omen King",
	"Fire Giant",
	"Maliketh, the Black Blade",
	"Dragonlord Placidusax",
	"Godfrey, First Elden Lord",
	"Radagon of the Golden Order",
	"Elden Beast",
]

export default function Home() {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [deathCounts, setDeathCounts] = useState<{ [key: string]: number }>({})
	const [selectedBoss, setSelectedBoss] = useState(ELDEN_RING_BOSSES[0])
	const [customBoss, setCustomBoss] = useState("")

	useEffect(() => {
		if (isAuthenticated) {
			fetchDeathCounts()
		}
	}, [isAuthenticated])

	const fetchDeathCounts = async () => {
		const response = await fetch("/api/deaths")
		const data = await response.json()
		const counts: { [key: string]: number } = {}
		data.forEach((item: { boss: string; count: number }) => {
			counts[item.boss] = item.count
		})
		setDeathCounts(counts)
	}
	const updateDeathCount = async (action: "increment" | "decrement") => {
		const bossToUpdate = customBoss || selectedBoss
		await fetch("/api/deaths", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ boss: bossToUpdate, action }),
		})
		fetchDeathCounts()
	}

	const incrementDeathCount = () => updateDeathCount("increment")
	const decrementDeathCount = () => updateDeathCount("decrement")

	const clearInputBoss = () => {
		setSelectedBoss("No Boss (Outside Fight)")
	}

	const clearCustomBoss = () => {
		setCustomBoss("")
	}

	const resetAllCounts = async () => {
		await fetch("/api/deaths", { method: "DELETE" })
		fetchDeathCounts()
	}

	const currentBoss = customBoss || selectedBoss
	const currentDeathCount = deathCounts[currentBoss] || 0

	if (!isAuthenticated) {
		return <PasswordScreen onCorrectPassword={() => setIsAuthenticated(true)} />
	}

	return (
		<div className="container mx-auto p-4">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Elden Ring Death Counter</CardTitle>
					<CardDescription>
						Track your deaths for each boss or outside fights
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-4">
						<BossSelector
							bosses={ELDEN_RING_BOSSES}
							selectedBoss={selectedBoss}
							onSelectBoss={setSelectedBoss}
							onClearBoss={clearInputBoss}
						/>
						<CustomBossInput
							customBoss={customBoss}
							onCustomBossChange={setCustomBoss}
							onClearCustomBoss={clearCustomBoss}
						/>
						<DeathCounter
							currentBoss={currentBoss}
							currentDeathCount={currentDeathCount}
							onIncrementDeathCount={incrementDeathCount}
							onDecrementDeathCount={decrementDeathCount}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<DeathStatsList
						deathCounts={deathCounts}
						onResetAllCounts={resetAllCounts}
					/>
				</CardFooter>
			</Card>
		</div>
	)
}
