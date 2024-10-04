import sqlite3 from "sqlite3"
import { open, Database } from "sqlite"

let db: Database | null = null

export async function openDb(): Promise<Database> {
	if (!db) {
		db = await open({
			filename: "./elden_ring_deaths.sqlite",
			driver: sqlite3.Database,
		})

		await db.exec(`
      CREATE TABLE IF NOT EXISTS deaths (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        boss TEXT NOT NULL,
        count INTEGER DEFAULT 0,
        UNIQUE(boss)
      )
    `)
	}
	return db
}

interface DeathCount {
	boss: string
	count: number
}

export async function getDeathCounts(): Promise<DeathCount[]> {
	const db = await openDb()
	return db.all<DeathCount[]>(
		"SELECT boss, count FROM deaths ORDER BY count DESC"
	)
}

export async function incrementDeathCount(boss: string): Promise<void> {
	const db = await openDb()
	await db.run(
		`
    INSERT INTO deaths (boss, count) 
    VALUES (?, 1) 
    ON CONFLICT(boss) DO UPDATE SET count = count + 1
  `,
		boss
	)
}

export async function resetAllCounts(): Promise<void> {
	const db = await openDb()
	await db.run("DELETE FROM deaths")
}

export async function decrementDeathCount(boss: string): Promise<void> {
	const db = await openDb()
	await db.run(
		`
    UPDATE deaths 
    SET count = CASE
      WHEN count > 0 THEN count - 1
      ELSE 0
    END
    WHERE boss = ?
  `,
		boss
	)
}
