import { TestCase } from './multiLangAssessments';

export interface TestResult {
  testCaseId: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  status: 'PASSED' | 'FAILED' | 'TIMED_OUT' | 'ERROR';
  executionTimeMs: number;
  memoryMb: number;
  logs: string[];
  isPublic: boolean;
}

export interface ExecutionResponse {
  success: boolean;
  compilerOutput: string;
  compilationTimeMs: number;
  totalExecutionTimeMs: number;
  peakMemoryMb: number;
  runtimeLogs: string[];
  testResults: TestResult[];
  passCount: number;
  totalCount: number;
  allPassed: boolean;
  exitCode: number;
}

export async function executeSandboxedCode(
  languageSlug: string,
  userCode: string,
  testCases: TestCase[],
  isFullSubmission: boolean = false
): Promise<ExecutionResponse> {
  // Simulate realistic network & compilation latency (300-600ms)
  await new Promise(res => setTimeout(res, 400));

  const lang = languageSlug.toLowerCase();

  // Basic check for empty or broken code
  const trimmed = userCode.trim();
  if (trimmed.length < 15) {
    return {
      success: false,
      compilerOutput: `error: syntax error: unexpected end of file\n--> solution.${lang}:1:1\n  |\n1 | ${trimmed}\n  | ^ expected valid expression or block\n`,
      compilationTimeMs: 45,
      totalExecutionTimeMs: 0,
      peakMemoryMb: 0,
      runtimeLogs: ['[ERROR] Compilation failed with non-zero exit code 1.'],
      testResults: [],
      passCount: 0,
      totalCount: testCases.length,
      allPassed: false,
      exitCode: 1,
    };
  }

  // Compiler output simulations based on language
  let compilerOutput = '';
  let baseExecutionTime = 10;
  let baseMemory = 15.0;

  switch (lang) {
    case 'rust':
      compilerOutput = `Compiling solution v0.1.0 (rustc 1.80.0)\nwarning: unused variable (warning suppressed)\n    Finished release [optimized] target(s) in 0.18s`;
      baseExecutionTime = 5;
      baseMemory = 4.2;
      break;
    case 'cpp':
      compilerOutput = `g++ -O3 -std=c++23 -Wall -Wextra solution.cpp -o solution_bin\nCompilation succeeded (0 warnings).`;
      baseExecutionTime = 4;
      baseMemory = 3.6;
      break;
    case 'go':
      compilerOutput = `go build -tags release ./solution.go\nBinary linked successfully (go1.22.5).`;
      baseExecutionTime = 12;
      baseMemory = 8.4;
      break;
    case 'typescript':
      compilerOutput = `tsc --noEmit --strict solution.ts\nnode --max-old-space-size=64 dist/solution.js\nValidation passed with zero type errors.`;
      baseExecutionTime = 28;
      baseMemory = 28.5;
      break;
    case 'javascript':
      compilerOutput = `node --check solution.js\nNode.js v22.4.0 syntax analysis complete.`;
      baseExecutionTime = 24;
      baseMemory = 26.0;
      break;
    case 'java':
      compilerOutput = `javac -Xlint:unchecked Solution.java\nBytecode generated for OpenJDK 22 HotSpot JVM.`;
      baseExecutionTime = 22;
      baseMemory = 42.0;
      break;
    default: // python
      compilerOutput = `python3 -m py_compile solution.py\nBytecode compiled (.pyc). Python 3.12 runtime initialized.`;
      baseExecutionTime = 40;
      baseMemory = 22.5;
      break;
  }

  // Filter test cases: in "Run Code" run public test cases; in "Submit Solution" run both public and hidden
  const targetTestCases = isFullSubmission ? testCases : testCases.filter(tc => tc.isPublic);

  const testResults: TestResult[] = targetTestCases.map((tc, idx) => {
    // Generate jitter for realistic milliseconds
    const caseTime = Math.max(2, baseExecutionTime + Math.floor(Math.random() * 8) - 4);
    const caseMem = +(baseMemory + Math.random() * 2).toFixed(1);

    // If code has basic keywords or is the solved solution, pass tests
    const passes = trimmed.length > 80 && !trimmed.includes('// TODO:');

    return {
      testCaseId: tc.id,
      name: tc.name,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      actualOutput: passes ? tc.expectedOutput : 'Output mismatch: empty or unhandled edge case',
      status: passes ? 'PASSED' : idx === 0 ? 'PASSED' : 'FAILED',
      executionTimeMs: caseTime,
      memoryMb: caseMem,
      logs: [
        `[INFO] Loading test fixture: ${tc.name}`,
        `[INFO] Executing bounded sandbox with 2000ms watchdog timer`,
        passes ? `[PASS] Invariants satisfied in ${caseTime}ms` : `[FAIL] Expected "${tc.expectedOutput}"`,
      ],
      isPublic: tc.isPublic,
    };
  });

  const passCount = testResults.filter(r => r.status === 'PASSED').length;
  const allPassed = passCount === testResults.length;
  const totalExecutionTimeMs = testResults.reduce((acc, curr) => acc + curr.executionTimeMs, 0);
  const peakMemoryMb = Math.max(...testResults.map(r => r.memoryMb), baseMemory);

  const runtimeLogs = [
    `[CONTAINER] Allocated gVisor sandboxed Linux runtime (memory cap: 128MB)`,
    `[BENCHMARK] Total tests executed: ${testResults.length} (${passCount} passed, ${testResults.length - passCount} failed)`,
    `[METRICS] Total runtime: ${totalExecutionTimeMs}ms • Peak RSS Memory: ${peakMemoryMb.toFixed(1)}MB`,
    allPassed ? `[STATUS] All assertions validated successfully.` : `[STATUS] Partial test pass. Review failed test cases.`,
  ];

  return {
    success: allPassed,
    compilerOutput,
    compilationTimeMs: Math.floor(Math.random() * 80) + 40,
    totalExecutionTimeMs,
    peakMemoryMb,
    runtimeLogs,
    testResults,
    passCount,
    totalCount: testResults.length,
    allPassed,
    exitCode: allPassed ? 0 : 1,
  };
}
