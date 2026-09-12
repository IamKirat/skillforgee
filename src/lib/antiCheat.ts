import { useState, useEffect, useCallback } from 'react';

export interface AntiCheatAudit {
  tabSwitches: number;
  pasteCount: number;
  maxPastedLength: number;
  aiProbabilityScore: number;
  suspiciousAnomalies: string[];
  trustScore: number;
  verificationScore: number;
  integrityPassed: boolean;
}

export function useAntiCheat(isActive: boolean = true) {
  const [tabSwitches, setTabSwitches] = useState(0);
  const [pasteCount, setPasteCount] = useState(0);
  const [maxPastedLength, setMaxPastedLength] = useState(0);
  const [anomalies, setAnomalies] = useState<string[]>([]);

  // Listen for tab switching and visibility changes
  useEffect(() => {
    if (!isActive) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches(prev => {
          const next = prev + 1;
          setAnomalies(curr => [
            ...curr,
            `Tab switch detected at ${new Date().toLocaleTimeString()} (Total: ${next})`,
          ]);
          return next;
        });
      }
    };

    const handleBlur = () => {
      // Secondary check for window focus lost
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
    };
  }, [isActive]);

  // Track paste events in code editor
  const recordPaste = useCallback((textLength: number) => {
    setPasteCount(prev => prev + 1);
    setMaxPastedLength(prev => Math.max(prev, textLength));

    if (textLength > 300) {
      setAnomalies(curr => [
        ...curr,
        `Large code block paste detected (${textLength} chars) at ${new Date().toLocaleTimeString()}`,
      ]);
    }
  }, []);

  // Compute final anti-cheat audit report
  const getAuditReport = useCallback((code: string): AntiCheatAudit => {
    let trustScore = 98;
    let verificationScore = 95;
    const detectedAnomalies = [...anomalies];

    // Penalty for frequent tab switching
    if (tabSwitches > 1) {
      const penalty = Math.min(25, tabSwitches * 5);
      trustScore -= penalty;
      verificationScore -= penalty;
    }

    // Check for large multi-line bulk paste
    if (maxPastedLength > 400) {
      trustScore -= 10;
      detectedAnomalies.push('Large bulk paste exceeds standard human keystroke velocity.');
    }

    // AI boilerplate heuristic (e.g., standard ChatGPT disclaimers or perfect markdown comments)
    let aiProbability = 12;
    if (code.includes('Here is the implementation') || code.includes('Note that in production')) {
      aiProbability = 85;
      trustScore -= 30;
      detectedAnomalies.push('Detected conversational AI boilerplate markers.');
    }

    trustScore = Math.max(40, Math.min(100, trustScore));
    verificationScore = Math.max(45, Math.min(100, verificationScore));

    return {
      tabSwitches,
      pasteCount,
      maxPastedLength,
      aiProbabilityScore: aiProbability,
      suspiciousAnomalies: detectedAnomalies,
      trustScore,
      verificationScore,
      integrityPassed: trustScore >= 70,
    };
  }, [tabSwitches, pasteCount, maxPastedLength, anomalies]);

  return {
    tabSwitches,
    pasteCount,
    recordPaste,
    getAuditReport,
  };
}
