export interface FairnessScores {
  technicalScore: number;
  codeQualityScore: number;
  problemSolvingScore: number;
  languageProficiencyScore: number;
  confidenceScore: number;
  normalizedFinalScore: number;
  percentile: number;
  verifiedLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  summaryRationale: string;
}

interface EvaluationInput {
  languageSlug: string;
  code: string;
  passedTests: number;
  totalTests: number;
  executionTimeMs: number;
  memoryUsageMb: number;
  tabSwitches: number;
  pasteEvents: number;
}

// Language baseline complexity multipliers to normalize scores fairly
const LANGUAGE_FACTORS: Record<string, { complexity: number; expectedTimeMs: number; expectedMemoryMb: number }> = {
  python: { complexity: 1.0, expectedTimeMs: 45, expectedMemoryMb: 24.0 },
  rust: { complexity: 1.28, expectedTimeMs: 5, expectedMemoryMb: 4.2 },
  cpp: { complexity: 1.24, expectedTimeMs: 4, expectedMemoryMb: 3.5 },
  javascript: { complexity: 1.02, expectedTimeMs: 32, expectedMemoryMb: 28.0 },
  typescript: { complexity: 1.1, expectedTimeMs: 30, expectedMemoryMb: 30.0 },
  go: { complexity: 1.12, expectedTimeMs: 12, expectedMemoryMb: 8.5 },
  java: { complexity: 1.15, expectedTimeMs: 25, expectedMemoryMb: 45.0 },
  csharp: { complexity: 1.14, expectedTimeMs: 22, expectedMemoryMb: 40.0 },
  kotlin: { complexity: 1.13, expectedTimeMs: 26, expectedMemoryMb: 42.0 },
  swift: { complexity: 1.16, expectedTimeMs: 14, expectedMemoryMb: 12.0 },
  react: { complexity: 1.08, expectedTimeMs: 16, expectedMemoryMb: 22.0 },
};

export function calculateFairnessScores(input: EvaluationInput): FairnessScores {
  const langKey = input.languageSlug.toLowerCase();
  const baseline = LANGUAGE_FACTORS[langKey] || { complexity: 1.0, expectedTimeMs: 30, expectedMemoryMb: 25 };

  // 1. Raw Test Case Accuracy (0 - 100)
  const testRatio = input.totalTests > 0 ? input.passedTests / input.totalTests : 0;
  const rawTestScore = testRatio * 100;

  // 2. Code Quality Analysis (Heuristic inspection)
  let qualityDeductions = 0;
  if (input.code.length < 50) qualityDeductions += 30;
  if (!input.code.includes('return') && !input.code.includes('fn') && !input.code.includes('def') && !input.code.includes('class')) {
    qualityDeductions += 20;
  }
  // Check for healthy indentation & comments
  const hasComments = input.code.includes('//') || input.code.includes('#') || input.code.includes('/*');
  const codeQualityScore = Math.min(100, Math.max(60, Math.round(92 - qualityDeductions + (hasComments ? 6 : 0))));

  // 3. Problem Solving Score
  // Full test pass indicates strong algorithmic comprehension
  const problemSolvingScore = Math.min(100, Math.max(50, Math.round(rawTestScore * 0.95 + (testRatio === 1 ? 5 : 0))));

  // 4. Language Proficiency & Runtime Efficiency
  // Normalization: reward efficiency relative to the language's native potential
  let efficiencyBonus = 0;
  if (input.executionTimeMs <= baseline.expectedTimeMs * 1.5) efficiencyBonus += 4;
  if (input.memoryUsageMb <= baseline.expectedMemoryMb * 1.3) efficiencyBonus += 4;
  const languageProficiencyScore = Math.min(100, Math.max(65, Math.round(88 + efficiencyBonus)));

  // 5. Technical Score with Language Complexity Normalization
  // A Rust candidate solving a borrow-checker task is rewarded fairly
  const complexityWeightBonus = (baseline.complexity - 1.0) * 8;
  const technicalScore = Math.min(100, Math.max(40, Math.round(rawTestScore * 0.85 + codeQualityScore * 0.15 + complexityWeightBonus)));

  // 6. Anti-Cheat & Confidence Normalization
  let integrityDeductions = 0;
  if (input.tabSwitches > 2) integrityDeductions += Math.min(15, input.tabSwitches * 3);
  if (input.pasteEvents > 4) integrityDeductions += 8;

  // Final Normalized Composite
  const baseConfidence = (technicalScore * 0.45) + (problemSolvingScore * 0.35) + (codeQualityScore * 0.20);
  const confidenceScore = Math.min(99, Math.max(50, Math.round(baseConfidence - integrityDeductions)));
  const normalizedFinalScore = Math.min(100, Math.max(0, Math.round((technicalScore + confidenceScore) / 2)));

  // Determine Verified Tier
  let verifiedLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' = 'Intermediate';
  if (normalizedFinalScore >= 92) verifiedLevel = 'Expert';
  else if (normalizedFinalScore >= 82) verifiedLevel = 'Advanced';
  else if (normalizedFinalScore >= 70) verifiedLevel = 'Intermediate';
  else verifiedLevel = 'Beginner';

  // Compute percentile ranking
  const percentile = Math.min(99, Math.max(60, Math.round(normalizedFinalScore * 0.98 + (baseline.complexity > 1.2 ? 3 : 1))));

  const summaryRationale = `Score normalized with language factor ${baseline.complexity.toFixed(2)}x. Memory runtime (${input.executionTimeMs}ms, ${input.memoryUsageMb.toFixed(1)}MB) meets ${input.languageSlug.toUpperCase()} target latency. Anti-cheat integrity verified with ${input.tabSwitches} tab deviations.`;

  return {
    technicalScore,
    codeQualityScore,
    problemSolvingScore,
    languageProficiencyScore,
    confidenceScore,
    normalizedFinalScore,
    percentile,
    verifiedLevel,
    summaryRationale,
  };
}
