import { NextResponse } from "next/server"
import {
	getDeathCounts,
	incrementDeathCount,
	decrementDeathCount,
	resetAllCounts,
	initializeDatabase,
} from "@/lib/db"

export async function GET() {
	try {
		await initializeDatabase()
		const deaths = await getDeathCounts()
		return NextResponse.json(deaths)
	} catch (error) {
		console.error("Error in GET /api/deaths:", error)
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}

export async function POST(request: Request) {
	try {
		const { boss, action } = await request.json()
		if (action === "increment") {
			await incrementDeathCount(boss)
			return NextResponse.json({ message: "Death count incremented" })
		} else if (action === "decrement") {
			await decrementDeathCount(boss)
			return NextResponse.json({ message: "Death count decremented" })
		} else {
			return NextResponse.json({ error: "Invalid action" }, { status: 400 })
		}
	} catch (error) {
		console.error("Error in POST /api/deaths:", error)
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}

export async function DELETE() {
	try {
		await resetAllCounts()
		return NextResponse.json({ message: "All death counts reset" })
	} catch (error) {
		console.error("Error in DELETE /api/deaths:", error)
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
