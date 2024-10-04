import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

interface PasswordScreenProps {
	onCorrectPassword: () => void
}

export function PasswordScreen({ onCorrectPassword }: PasswordScreenProps) {
	const [password, setPassword] = useState("")
	const [error, setError] = useState(false)

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Replace 'your-secret-password' with your chosen password
		if (password === "eldenring12345") {
			onCorrectPassword()
		} else {
			setError(true)
		}
	}

	return (
		<div className="container mx-auto p-4">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Elden Ring Death Counter</CardTitle>
					<CardDescription>
						Please enter the password to access the counter
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleSubmit}>
					<CardContent>
						<Input
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className={error ? "border-red-500" : ""}
						/>
						{error && (
							<p className="text-red-500 mt-2">
								Incorrect password. Please try again.
							</p>
						)}
					</CardContent>
					<CardFooter>
						<Button type="submit" className="w-full">
							Submit
						</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	)
}
