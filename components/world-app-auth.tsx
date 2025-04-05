'use client';

import { useEffect, useState } from 'react';
import {
  MiniKit,
  VerifyCommandInput,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/minikit-js";

export default function WorldAppAuth() {
  const [isVerified, setIsVerified] = useState(false);
  const [miniKitStatus, setMiniKitStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [hasAttemptedVerify, setHasAttemptedVerify] = useState(false);
  
  const verifyPayload: VerifyCommandInput = {
    action: "verify_user", // This is your action ID from the Developer Portal
    verification_level: VerificationLevel.Device, // Orb | Device
  };

  // 检查是否已经验证过
  useEffect(() => {
    // 尝试从localStorage读取验证状态
    const storedVerificationState = localStorage.getItem('worldAppVerified');
    if (storedVerificationState === 'true') {
      console.log('User already verified, skipping verification');
      setIsVerified(true);
      setMiniKitStatus('ready');
      return;
    }
  }, []);

  const handleVerify = async () => {
    try {
      // 如果已经验证过或者已经尝试过验证，则不再重复验证
      if (isVerified || hasAttemptedVerify) {
        return;
      }
      
      // 标记已经尝试验证
      setHasAttemptedVerify(true);
      
      // 检查MiniKit是否安装
      if (!MiniKit.isInstalled()) {
        console.log("MiniKit is not installed yet");
        setMiniKitStatus('loading');
        return;
      }
      
      setMiniKitStatus('ready');
      
      // World App will open a drawer prompting the user to confirm the operation
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);
      if (finalPayload.status === "error") {
        console.log("Error payload", finalPayload);
        return;
      }

      // Verify the proof in the backend
      const verifyResponse = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
          action: "verify_user",
        }),
      });

      const verifyResponseJson = await verifyResponse.json();
      if (verifyResponseJson.status === 200) {
        console.log("Verification success!");
        setIsVerified(true);
        // 存储验证状态到localStorage，这样下次不需要重新验证
        localStorage.setItem('worldAppVerified', 'true');
      }
    } catch (error) {
      console.error("Verification error:", error);
      setMiniKitStatus('error');
    }
  };

  useEffect(() => {
    // 只在第一次加载和MiniKit未安装时执行
    if (typeof window !== 'undefined' && !isVerified && !hasAttemptedVerify) {
      const checkMiniKit = () => {
        if (MiniKit.isInstalled()) {
          setMiniKitStatus('ready');
          handleVerify();
        } else {
          // If not installed yet, retry after a delay
          setTimeout(checkMiniKit, 1000);
        }
      };
      
      checkMiniKit();
    }
  }, [isVerified, hasAttemptedVerify]);

  // 显示错误状态
  if (miniKitStatus === 'error') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="text-center p-6 max-w-md">
          <div className="mb-4 text-red-500 text-5xl">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="mb-4">Unable to connect to World App. Please make sure it's installed and try again.</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // 如果正在加载，显示加载状态
  if (miniKitStatus === 'loading' && !isVerified) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Initializing World App connection...</p>
        </div>
      </div>
    );
  }

  // 如果已验证或准备就绪，不显示任何内容
  return null;
} 