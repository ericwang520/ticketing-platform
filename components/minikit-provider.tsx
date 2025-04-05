'use client' // Required for Next.js

import { ReactNode, useEffect, useState } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
const appId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`

export default function MiniKitProvider({ children }: { children: ReactNode }) {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		const initializeMiniKit = async () => {
			try {
				// Passing appId in the install is optional 
				// but allows you to access it later via `window.MiniKit.appId`
				await MiniKit.install(appId)
				// Set loaded state to true after successful initialization
				setIsLoaded(true)
			} catch (error) {
				console.error('Failed to initialize MiniKit:', error)
				// Still set to loaded, but you might want to handle this differently
				setIsLoaded(true)
			}
		}
		
		initializeMiniKit()
	}, [])

	// Show loading state while MiniKit is initializing
	if (!isLoaded) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-background">
				<div className="text-center">
					<div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
					<p>Loading...</p>
				</div>
			</div>
		)
	}

	return <>{children}</>
}
