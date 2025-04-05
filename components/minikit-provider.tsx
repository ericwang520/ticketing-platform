'use client' // Required for Next.js

import { ReactNode, useEffect, useState } from 'react'
import { MiniKit } from '@worldcoin/minikit-js'
const appId = process.env.NEXT_PUBLIC_APP_ID as `app_${string}`

export default function MiniKitProvider({ children }: { children: ReactNode }) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [isInitialized, setIsInitialized] = useState(false)

	useEffect(() => {
		const initializeMiniKit = async () => {
			try {
				// Passing appId in the install is optional 
				// but allows you to access it later via `window.MiniKit.appId`
				await MiniKit.install(appId)
				// Set loaded state to true after successful initialization
				setIsLoaded(true)
				setIsInitialized(true)
			} catch (error) {
				console.error('Failed to initialize MiniKit:', error)
				setIsLoaded(true)
				setIsInitialized(false)
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

	// Show error state if MiniKit failed to initialize
	if (!isInitialized) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-background">
				<div className="text-center text-red-500">
					<p>Failed to initialize MiniKit. Please refresh the page.</p>
				</div>
			</div>
		)
	}

	return <>{children}</>
}
