'use client'

import { useEffect, useState } from 'react'

export default function DebugPanel() {
  const [messages, setMessages] = useState<string[]>([]);
  
  useEffect(() => {
    // Function to check for new issue bread messages
    const checkIssueBread = () => {
      // @ts-ignore - Next.js issue bread
      if (typeof window !== 'undefined' && window.__NEXT_DATA__) {
        // @ts-ignore - Next.js issue bread
        const currentMessage = window.__NEXT_DATA__.props.pageProps.issueBread;
        if (currentMessage && !messages.includes(currentMessage)) {
          setMessages(prev => [...prev, currentMessage]);
        }
      }
    };
    
    // Check for new messages every second
    const interval = setInterval(checkIssueBread, 1000);
    
    return () => clearInterval(interval);
  }, [messages]);
  
  if (messages.length === 0) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 max-h-48 overflow-auto bg-black/80 p-4 text-white">
      <h3 className="mb-2 font-bold">Debug Log:</h3>
      <ul className="space-y-1 text-sm">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
} 