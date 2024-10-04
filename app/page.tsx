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
	const [isUpdating, setIsUpdating] = useState(false)

	useEffect(() => {
		if (isAuthenticated) {
			fetchDeathCounts()
		}
	}, [isAuthenticated])

	const fetchDeathCounts = async () => {
		const response = await fetch("/api/deaths")
		const data = await response.json()
		setDeathCounts(
			Object.fromEntries(
				data.map((item: { boss: string; count: number }) => [
					item.boss,
					item.count,
				])
			)
		)
	}

	const updateDeathCount = async (action: "increment" | "decrement") => {
		const bossToUpdate = customBoss || selectedBoss

		// Optimistic update
		setDeathCounts((prev) => ({
			...prev,
			[bossToUpdate]: Math.max(
				(prev[bossToUpdate] || 0) + (action === "increment" ? 1 : -1),
				0
			),
		}))

		setIsUpdating(true)

		try {
			const response = await fetch("/api/deaths", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ boss: bossToUpdate, action }),
			})

			if (!response.ok) {
				throw new Error("Failed to update death count")
			}

			// Fetch the latest counts to ensure consistency
			await fetchDeathCounts()
		} catch (error) {
			console.error("Error updating death count:", error)
			// Revert the optimistic update
			await fetchDeathCounts()
		} finally {
			setIsUpdating(false)
		}
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
		// Optimistic update
		setDeathCounts({})
		setIsUpdating(true)

		try {
			const response = await fetch("/api/deaths", { method: "DELETE" })
			if (!response.ok) {
				throw new Error("Failed to reset death counts")
			}
		} catch (error) {
			console.error("Error resetting death counts:", error)
			// Revert the optimistic update
			await fetchDeathCounts()
		} finally {
			setIsUpdating(false)
		}
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
							isUpdating={isUpdating}
						/>
					</div>
				</CardContent>
				<CardFooter>
					<DeathStatsList
						deathCounts={deathCounts}
						onResetAllCounts={resetAllCounts}
						isUpdating={isUpdating}
					/>
				</CardFooter>
			</Card>
		</div>
	)
}
