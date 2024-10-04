import { sql } from "@vercel/postgres"

export async function initializeDatabase() {
	await sql`
    CREATE TABLE IF NOT EXISTS deaths (
      id SERIAL PRIMARY KEY,
      boss TEXT NOT NULL UNIQUE,
      count INTEGER DEFAULT 0
    )
  `
}

export async function getDeathCounts() {
	const result = await sql`SELECT boss, count FROM deaths ORDER BY count DESC`
	return result.rows
}

export async function incrementDeathCount(boss: string) {
	await sql`
    INSERT INTO deaths (boss, count)
    VALUES (${boss}, 1)
    ON CONFLICT (boss)
    DO UPDATE SET count = deaths.count + 1
  `
}

export async function decrementDeathCount(boss: string) {
	await sql`
    UPDATE deaths
    SET count = GREATEST(count - 1, 0)
    WHERE boss = ${boss}
  `
}

export async function resetAllCounts() {
	await sql`DELETE FROM deaths`
}
