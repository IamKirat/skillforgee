export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
  explanation?: string;
}

export interface LanguageChallenge {
  id: string;
  language: string;
  slug: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Real-world Scenario' | 'Optimization Challenge' | 'Debugging Task' | 'Systems Programming' | 'Concurrency';
  estimatedMinutes: number;
  passThreshold: number;
  complexityWeight: number; // For fairness normalization (e.g. Rust 1.25, Python 1.0)
  description: string;
  realWorldScenario: string;
  learningObjectives: string[];
  constraints: string[];
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  strengths: string[];
  areasToImprove: string[];
}

export interface SupportedLanguageInfo {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  extension: string;
  complexityFactor: number;
  paradigms: string[];
  sampleRole: string;
  compiler: string;
}

export const SUPPORTED_LANGUAGES: SupportedLanguageInfo[] = [
  {
    id: 'python',
    name: 'Python',
    slug: 'python',
    iconName: 'Terminal',
    extension: 'py',
    complexityFactor: 1.0,
    paradigms: ['Object-Oriented', 'Functional', 'Dynamic'],
    sampleRole: 'Backend & Data/ML Systems',
    compiler: 'Python 3.12 (CPython)',
  },
  {
    id: 'rust',
    name: 'Rust',
    slug: 'rust',
    iconName: 'Cpu',
    extension: 'rs',
    complexityFactor: 1.28,
    paradigms: ['Systems', 'Zero-Cost Abstractions', 'Ownership/Borrowing'],
    sampleRole: 'Low-Latency & Concurrency Systems',
    compiler: 'rustc 1.80.0 (LLVM backend)',
  },
  {
    id: 'cpp',
    name: 'C++',
    slug: 'cpp',
    iconName: 'Code2',
    extension: 'cpp',
    complexityFactor: 1.24,
    paradigms: ['Multi-Paradigm', 'High-Performance', 'Manual Memory'],
    sampleRole: 'Infrastructure & Engine Architecture',
    compiler: 'g++ 14.1 (C++23 standard)',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    slug: 'javascript',
    iconName: 'FileCode2',
    extension: 'js',
    complexityFactor: 1.02,
    paradigms: ['Event-Driven', 'Asynchronous', 'Prototypes'],
    sampleRole: 'Full Stack & Web Client',
    compiler: 'Node.js v22.4 (V8 runtime)',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    slug: 'typescript',
    iconName: 'FileCode2',
    extension: 'ts',
    complexityFactor: 1.1,
    paradigms: ['Static Typing', 'Object-Oriented', 'Functional'],
    sampleRole: 'Enterprise Web Applications',
    compiler: 'tsc 5.5 (Node runtime)',
  },
  {
    id: 'go',
    name: 'Go',
    slug: 'go',
    iconName: 'Layers',
    extension: 'go',
    complexityFactor: 1.12,
    paradigms: ['Concurrent', 'Structural Typing', 'Garbage Collected'],
    sampleRole: 'Cloud Native & Microservices',
    compiler: 'go 1.22.5 (Native GC)',
  },
  {
    id: 'java',
    name: 'Java',
    slug: 'java',
    iconName: 'Coffee',
    extension: 'java',
    complexityFactor: 1.15,
    paradigms: ['Object-Oriented', 'Class-Based', 'JVM'],
    sampleRole: 'Distributed Enterprise Systems',
    compiler: 'OpenJDK 22 (HotSpot JVM)',
  },
  {
    id: 'csharp',
    name: 'C#',
    slug: 'csharp',
    iconName: 'Hash',
    extension: 'cs',
    complexityFactor: 1.14,
    paradigms: ['Multi-Paradigm', 'Managed', '.NET CLR'],
    sampleRole: 'Enterprise API & Game Engineering',
    compiler: '.NET 8.0 SDK (Roslyn)',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    slug: 'kotlin',
    iconName: 'Smartphone',
    extension: 'kt',
    complexityFactor: 1.13,
    paradigms: ['Concise Functional', 'Coroutines', 'JVM/Native'],
    sampleRole: 'Mobile Architecture & High-Concurrency APIs',
    compiler: 'kotlinc 2.0 (JVM target 21)',
  },
  {
    id: 'swift',
    name: 'Swift',
    slug: 'swift',
    iconName: 'Zap',
    extension: 'swift',
    complexityFactor: 1.16,
    paradigms: ['Protocol-Oriented', 'Actor Isolation', 'ARC'],
    sampleRole: 'High-Performance Apple Platforms & Services',
    compiler: 'Swift 6.0 (LLVM clang)',
  },
  {
    id: 'react',
    name: 'React',
    slug: 'react',
    iconName: 'Atom',
    extension: 'tsx',
    complexityFactor: 1.08,
    paradigms: ['Component-Driven', 'Declarative UI', 'Reactivity'],
    sampleRole: 'Modern Frontend Engineering',
    compiler: 'Next.js 15 & React 19 Runtime',
  },
];

export const MULTI_LANG_CHALLENGES: Record<string, LanguageChallenge> = {
  // =====================================================================
  // 1. PYTHON: In-Memory LRU Cache with TTL Expiration & Hit-Ratio Metrics
  // =====================================================================
  python: {
    id: 'py-lru-cache-01',
    language: 'Python',
    slug: 'python',
    title: 'High-Throughput LRU Cache with TTL Expiry',
    difficulty: 'Intermediate',
    category: 'Real-world Scenario',
    estimatedMinutes: 25,
    passThreshold: 75,
    complexityWeight: 1.0,
    description:
      'Design and implement a production-grade Least Recently Used (LRU) Cache in Python that supports key-value eviction, time-to-live (TTL) expiration in seconds, and tracks cache hit-ratio metrics for observability.',
    realWorldScenario:
      'In high-throughput API gateways like Stripe and Mercury, rate limiters and session verification tokens require fast sub-millisecond memory stores with automatic staleness expiration.',
    learningObjectives: [
      'Implement O(1) average lookup and eviction using collections.OrderedDict or Doubly-Linked Hashmaps',
      'Manage wall-clock time expiration without blocking read operations',
      'Track real-time telemetry metrics (hits, misses, evictions, hit-ratio percentage)',
    ],
    constraints: [
      'Cache capacity: 1 <= capacity <= 100,000',
      'get(key) and put(key, value, ttl) must execute in O(1) average time complexity',
      'Expired keys must return None and count towards cache misses',
    ],
    starterCode: `import time
from collections import OrderedDict
from typing import Any, Optional, Dict

class ProductionLRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # TODO: Initialize data structures for O(1) retrieval and TTL tracking
        self.cache: OrderedDict[str, Any] = OrderedDict()
        self.expiries: Dict[str, float] = {}
        self.hits = 0
        self.misses = 0

    def get(self, key: str) -> Optional[Any]:
        """
        Retrieves key value. If expired or absent, returns None.
        Updates LRU recency on valid hits.
        """
        now = time.time()
        # Your implementation here
        pass

    def put(self, key: str, value: Any, ttl_seconds: Optional[float] = None) -> None:
        """
        Inserts or updates key with optional TTL in seconds.
        Evicts least recently used non-expired item if capacity exceeded.
        """
        now = time.time()
        # Your implementation here
        pass

    def get_hit_ratio(self) -> float:
        """
        Returns hit ratio as a percentage (0.0 to 100.0).
        """
        total = self.hits + self.misses
        return (self.hits / total * 100.0) if total > 0 else 0.0
`,
    solutionCode: `import time
from collections import OrderedDict
from typing import Any, Optional, Dict

class ProductionLRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: OrderedDict[str, Any] = OrderedDict()
        self.expiries: Dict[str, float] = {}
        self.hits = 0
        self.misses = 0

    def get(self, key: str) -> Optional[Any]:
        now = time.time()
        if key not in self.cache:
            self.misses += 1
            return None
        
        # Check TTL expiration
        expiry = self.expiries.get(key)
        if expiry is not None and now > expiry:
            del self.cache[key]
            del self.expiries[key]
            self.misses += 1
            return None

        # Mark as most recently used
        self.cache.move_to_end(key)
        self.hits += 1
        return self.cache[key]

    def put(self, key: str, value: Any, ttl_seconds: Optional[float] = None) -> None:
        now = time.time()
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value

        if ttl_seconds is not None and ttl_seconds > 0:
            self.expiries[key] = now + ttl_seconds
        elif key in self.expiries:
            del self.expiries[key]

        # Evict least recently used if exceeding capacity
        if len(self.cache) > self.capacity:
            oldest_key, _ = self.cache.popitem(last=False)
            if oldest_key in self.expiries:
                del self.expiries[oldest_key]

    def get_hit_ratio(self) -> float:
        total = self.hits + self.misses
        return (self.hits / total * 100.0) if total > 0 else 0.0
`,
    testCases: [
      {
        id: 'py-tc-1',
        name: 'Basic Put and Get',
        input: 'cache.put("user_101", {"name": "Alex"}); cache.get("user_101")',
        expectedOutput: '{"name": "Alex"}',
        isPublic: true,
        explanation: 'Key is retrieved with O(1) latency and recorded as hit.',
      },
      {
        id: 'py-tc-2',
        name: 'LRU Capacity Eviction',
        input: 'cache(cap=2); put("A"); put("B"); get("A"); put("C"); get("B")',
        expectedOutput: 'None (Key B was evicted)',
        isPublic: true,
        explanation: 'Key A was recently accessed so key B was evicted when key C arrived.',
      },
      {
        id: 'py-tc-3',
        name: 'TTL Expiration Invalidation',
        input: 'put("token_9", "auth_val", ttl=0.01); time.sleep(0.02); get("token_9")',
        expectedOutput: 'None (TTL expired)',
        isPublic: true,
        explanation: 'Stale keys are purged automatically on access.',
      },
      {
        id: 'py-tc-4',
        name: 'Stress Test: 10,000 Operations',
        input: '10,000 interleaved puts and gets with capacity=500',
        expectedOutput: 'Correct LRU invariants with zero memory leak',
        isPublic: false,
        explanation: 'Validates O(1) complexity under burst traffic.',
      },
    ],
    strengths: ['Algorithmic Efficiency', 'Collections & Memory Primitives', 'Observability Metrics'],
    areasToImprove: ['Async Locking for Distributed Workers', 'Batch Pre-Eviction'],
  },

  // =====================================================================
  // 2. RUST: Memory-Safe Concurrent Work-Stealing Ring Buffer
  // =====================================================================
  rust: {
    id: 'rs-ring-buffer-01',
    language: 'Rust',
    slug: 'rust',
    title: 'Zero-Allocation Concurrent Lock-Free Ring Buffer',
    difficulty: 'Advanced',
    category: 'Systems Programming',
    estimatedMinutes: 30,
    passThreshold: 75,
    complexityWeight: 1.28,
    description:
      'Implement a memory-safe, bounded Ring Buffer in Rust adhering strictly to ownership, borrowing rules, and safe concurrent access using std::sync::atomic primitives without standard mutex blocking.',
    realWorldScenario:
      'Low-latency financial matching engines and real-time audio/network packet handlers use lock-free bounded ring buffers to transmit high-throughput byte payloads between OS threads without GC pauses.',
    learningObjectives: [
      'Master Rust ownership, borrowing, and Send/Sync traits',
      'Use AtomicUsize with Acquire/Release memory orderings to prevent race conditions',
      'Handle buffer wraps, wrap-around head/tail pointers, and overflow backpressure',
    ],
    constraints: [
      'Capacity must be power of two (e.g. 64, 256, 1024)',
      'Push and Pop must be non-blocking and return Result<T, BufferError>',
      'No unsafe blocks unless strictly verifying pointer bounds',
    ],
    starterCode: `use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

pub enum BufferError {
    Full,
    Empty,
}

pub struct AtomicRingBuffer<T: Copy> {
    buffer: Vec<Option<T>>,
    capacity: usize,
    mask: usize,
    head: AtomicUsize,
    tail: AtomicUsize,
}

impl<T: Copy> AtomicRingBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        assert!(capacity.is_power_of_two(), "Capacity must be power of two");
        Self {
            buffer: vec![None; capacity],
            capacity,
            mask: capacity - 1,
            head: AtomicUsize::new(0),
            tail: AtomicUsize::new(0),
        }
    }

    pub fn push(&mut self, item: T) -> Result<(), BufferError> {
        // TODO: Implement atomic push respecting capacity and memory ordering
        let head = self.head.load(Ordering::Relaxed);
        let tail = self.tail.load(Ordering::Acquire);

        if head.wrapping_sub(tail) >= self.capacity {
            return Err(BufferError::Full);
        }

        self.buffer[head & self.mask] = Some(item);
        self.head.store(head.wrapping_add(1), Ordering::Release);
        Ok(())
    }

    pub fn pop(&mut self) -> Result<T, BufferError> {
        // TODO: Implement atomic pop respecting empty state and memory ordering
        let tail = self.tail.load(Ordering::Relaxed);
        let head = self.head.load(Ordering::Acquire);

        if tail == head {
            return Err(BufferError::Empty);
        }

        let item = self.buffer[tail & self.mask].take().ok_or(BufferError::Empty)?;
        self.tail.store(tail.wrapping_add(1), Ordering::Release);
        Ok(item)
    }
}
`,
    solutionCode: `use std::sync::atomic::{AtomicUsize, Ordering};

pub enum BufferError {
    Full,
    Empty,
}

pub struct AtomicRingBuffer<T: Copy> {
    buffer: Vec<Option<T>>,
    capacity: usize,
    mask: usize,
    head: AtomicUsize,
    tail: AtomicUsize,
}

impl<T: Copy> AtomicRingBuffer<T> {
    pub fn new(capacity: usize) -> Self {
        assert!(capacity.is_power_of_two(), "Capacity must be power of two");
        Self {
            buffer: vec![None; capacity],
            capacity,
            mask: capacity - 1,
            head: AtomicUsize::new(0),
            tail: AtomicUsize::new(0),
        }
    }

    pub fn push(&mut self, item: T) -> Result<(), BufferError> {
        let head = self.head.load(Ordering::Relaxed);
        let tail = self.tail.load(Ordering::Acquire);

        if head.wrapping_sub(tail) >= self.capacity {
            return Err(BufferError::Full);
        }

        self.buffer[head & self.mask] = Some(item);
        self.head.store(head.wrapping_add(1), Ordering::Release);
        Ok(())
    }

    pub fn pop(&mut self) -> Result<T, BufferError> {
        let tail = self.tail.load(Ordering::Relaxed);
        let head = self.head.load(Ordering::Acquire);

        if tail == head {
            return Err(BufferError::Empty);
        }

        let item = self.buffer[tail & self.mask].take().ok_or(BufferError::Empty)?;
        self.tail.store(tail.wrapping_add(1), Ordering::Release);
        Ok(item)
    }
}
`,
    testCases: [
      {
        id: 'rs-tc-1',
        name: 'Single Thread FIFO Ordering',
        input: 'buffer.push(10); buffer.push(20); buffer.pop(); buffer.pop()',
        expectedOutput: 'Ok(10), Ok(20)',
        isPublic: true,
        explanation: 'Pushed elements maintain exact First-In-First-Out sequencing.',
      },
      {
        id: 'rs-tc-2',
        name: 'Buffer Full Backpressure',
        input: 'buffer(capacity=2); push(1); push(2); push(3)',
        expectedOutput: 'Err(BufferError::Full)',
        isPublic: true,
        explanation: 'Buffer refuses insertions past capacity without data corruption.',
      },
      {
        id: 'rs-tc-3',
        name: 'Wrap-Around Arithmetic',
        input: 'push and pop 10,000 items continuously',
        expectedOutput: 'Ok across boundary wrapping with zero buffer allocation',
        isPublic: false,
        explanation: 'Bitwise mask and wrapping arithmetic prevent integer overflow faults.',
      },
    ],
    strengths: ['Memory Safety Without GC', 'Atomic Memory Semantics', 'Zero-Allocation Systems Design'],
    areasToImprove: ['SIMD Vectorized Batch Reads', 'Cross-Core Cacheline Padding'],
  },

  // =====================================================================
  // 3. C++: High-Throughput Thread-Safe Memory Pool Allocator
  // =====================================================================
  cpp: {
    id: 'cpp-memory-pool-01',
    language: 'C++',
    slug: 'cpp',
    title: 'Custom RAII Fixed-Block Memory Pool Allocator',
    difficulty: 'Advanced',
    category: 'Optimization Challenge',
    estimatedMinutes: 28,
    passThreshold: 75,
    complexityWeight: 1.24,
    description:
      'Construct a cache-friendly fixed-size memory pool allocator in modern C++20 using custom FreeList pointer chaining, RAII lifecycle management, and custom alignment guarantees.',
    realWorldScenario:
      'Game engines and high-frequency trading market data handlers avoid the operating system malloc/free overhead by pre-allocating contiguous memory blocks and recycling node pointers in O(1) time.',
    learningObjectives: [
      'Master pointer arithmetic, alignment restrictions, and reinterpret_cast safety',
      'Implement RAII deallocation semantics to prevent memory leaks',
      'Achieve sub-5-nanosecond node allocation and zero heap fragmentation',
    ],
    constraints: [
      'Chunk size >= sizeof(void*)',
      'allocate() and deallocate() must execute in strict O(1) time',
      'Zero calls to malloc/new during steady-state loop execution',
    ],
    starterCode: `#include <cstddef>
#include <vector>
#include <stdexcept>
#include <iostream>

template <typename T, size_t BlockSize = 1024>
class FixedMemoryPool {
private:
    union Node {
        T data;
        Node* next;
        Node() {}
        ~Node() {}
    };

    Node* freeList = nullptr;
    std::vector<void*> allocatedPages;

    void allocatePage() {
        // TODO: Allocate a contiguous page of Nodes and chain them into freeList
    }

public:
    FixedMemoryPool() {
        allocatePage();
    }

    ~FixedMemoryPool() {
        for (void* page : allocatedPages) {
            ::operator delete(page);
        }
    }

    T* allocate() {
        // TODO: Return node from freeList in O(1), allocate page if exhausted
        return nullptr;
    }

    void deallocate(T* ptr) {
        // TODO: Recycle ptr into freeList in O(1)
    }
};
`,
    solutionCode: `#include <cstddef>
#include <vector>
#include <stdexcept>
#include <iostream>

template <typename T, size_t BlockSize = 1024>
class FixedMemoryPool {
private:
    union Node {
        T data;
        Node* next;
        Node() {}
        ~Node() {}
    };

    Node* freeList = nullptr;
    std::vector<void*> allocatedPages;

    void allocatePage() {
        size_t pageSize = BlockSize * sizeof(Node);
        void* page = ::operator new(pageSize);
        allocatedPages.push_back(page);

        Node* nodes = static_cast<Node*>(page);
        for (size_t i = 0; i < BlockSize - 1; ++i) {
            nodes[i].next = &nodes[i + 1];
        }
        nodes[BlockSize - 1].next = freeList;
        freeList = nodes;
    }

public:
    FixedMemoryPool() {
        allocatePage();
    }

    ~FixedMemoryPool() {
        for (void* page : allocatedPages) {
            ::operator delete(page);
        }
    }

    T* allocate() {
        if (!freeList) {
            allocatePage();
        }
        Node* node = freeList;
        freeList = freeList->next;
        return reinterpret_cast<T*>(node);
    }

    void deallocate(T* ptr) {
        if (!ptr) return;
        Node* node = reinterpret_cast<Node*>(ptr);
        node->next = freeList;
        freeList = node;
    }
};
`,
    testCases: [
      {
        id: 'cpp-tc-1',
        name: 'Allocate and Recycle Node',
        input: 'int* p1 = pool.allocate(); *p1 = 42; pool.deallocate(p1); int* p2 = pool.allocate()',
        expectedOutput: 'p2 reuses same memory address as p1',
        isPublic: true,
        explanation: 'Confirms O(1) recycling without fragmentation.',
      },
      {
        id: 'cpp-tc-2',
        name: 'Exceed Single Page Capacity',
        input: 'Allocate 2048 integers across 1024-block pool',
        expectedOutput: 'Clean page expansion with zero faults',
        isPublic: true,
        explanation: 'Ensures dynamic block chained allocation.',
      },
    ],
    strengths: ['Cache-Friendly Architecture', 'Low-Level Memory Semantics', 'RAII Robustness'],
    areasToImprove: ['Thread-Local Lock-Free FreeList Partitioning'],
  },

  // =====================================================================
  // 4. JAVASCRIPT: Resilient Event Emitter with Async Middleware Pipeline
  // =====================================================================
  javascript: {
    id: 'js-async-emitter-01',
    language: 'JavaScript',
    slug: 'javascript',
    title: 'Async Middleware Event Bus with Error Isolation',
    difficulty: 'Intermediate',
    category: 'Real-world Scenario',
    estimatedMinutes: 20,
    passThreshold: 70,
    complexityWeight: 1.02,
    description:
      'Build a robust, asynchronous EventEmitter in JavaScript supporting sequential middleware execution, wildcards, debouncing, and per-handler error isolation that never crashes the event loop.',
    realWorldScenario:
      'Modern web apps like Linear and Notion rely on client-side event dispatchers for real-time collaboration, WebSocket syncing, and undo/redo state coordination.',
    learningObjectives: [
      'Construct a pipeline executing async handlers in series and parallel',
      'Implement unsubscribe callbacks and wildcard event dispatching ("user:*")',
      'Ensure unhandled errors inside one subscriber do not disrupt other subscribers',
    ],
    constraints: [
      'emit(event, ...args) must return a Promise that resolves when all listeners finish',
      'Wildcard listener "order.*" must receive "order.created" and "order.shipped"',
    ],
    starterCode: `class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
    this.middlewares = [];
  }

  use(middlewareFn) {
    this.middlewares.push(middlewareFn);
    return this;
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(handler);

    // Return unsubscribe function
    return () => this.events.get(event)?.delete(handler);
  }

  async emit(event, ...args) {
    // Run middlewares
    for (const mw of this.middlewares) {
      await mw(event, args);
    }

    const handlers = this.events.get(event) || new Set();
    const promises = [];

    for (const handler of handlers) {
      try {
        promises.push(Promise.resolve(handler(...args)));
      } catch (err) {
        console.error("Handler error isolated:", err);
      }
    }

    return Promise.allSettled(promises);
  }
}
`,
    solutionCode: `class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
    this.middlewares = [];
  }

  use(middlewareFn) {
    this.middlewares.push(middlewareFn);
    return this;
  }

  on(event, handler) {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }
    this.events.get(event).add(handler);

    return () => this.events.get(event)?.delete(handler);
  }

  async emit(event, ...args) {
    for (const mw of this.middlewares) {
      await mw(event, args);
    }

    const handlers = this.events.get(event) || new Set();
    const promises = [];

    for (const handler of handlers) {
      try {
        promises.push(Promise.resolve(handler(...args)));
      } catch (err) {
        console.error("Handler error isolated:", err);
      }
    }

    return Promise.allSettled(promises);
  }
}
`,
    testCases: [
      {
        id: 'js-tc-1',
        name: 'Subscribe and Emit Payload',
        input: 'bus.on("sync", val => val * 2); bus.emit("sync", 21)',
        expectedOutput: 'Resolved with results: 42',
        isPublic: true,
        explanation: 'Payload delivered cleanly to active listener.',
      },
      {
        id: 'js-tc-2',
        name: 'Unsubscribe Cleanup',
        input: 'const unsub = bus.on("ping", fn); unsub(); bus.emit("ping")',
        expectedOutput: '0 handlers triggered',
        isPublic: true,
        explanation: 'Unsubscribe callback safely detaches handler reference.',
      },
    ],
    strengths: ['Event-Driven Architecture', 'Promise Pipelines & Concurrency', 'Fault Isolation'],
    areasToImprove: ['Backpressure Queueing on Heavy Traffic'],
  },

  // =====================================================================
  // 5. TYPESCRIPT: Strongly-Typed Schema Validator with Type Inference
  // =====================================================================
  typescript: {
    id: 'ts-schema-validator-01',
    language: 'TypeScript',
    slug: 'typescript',
    title: 'Zero-Dependency Type-Safe Schema Validator',
    difficulty: 'Intermediate',
    category: 'Real-world Scenario',
    estimatedMinutes: 24,
    passThreshold: 75,
    complexityWeight: 1.1,
    description:
      'Create a micro schema validation library similar to Zod in pure TypeScript that guarantees compile-time type inference and runtime object parsing with structured validation errors.',
    realWorldScenario:
      'Validating untrusted external webhooks, API requests, and environment variables with runtime safety and autocomplete.',
    learningObjectives: [
      'Harness conditional types, template literal types, and type inference (infer T)',
      'Produce structured error reports with exact field path identifiers',
      'Chain validation rules: .string().min(3).email()',
    ],
    constraints: [
      'Zero external dependencies (pure TypeScript)',
      'Schema.parse(data) must return strongly typed parsed payload or throw ValidationError',
    ],
    starterCode: `type ValidationResult<T> = { success: true; data: T } | { success: false; errors: string[] };

export abstract class Schema<T> {
  abstract parse(input: unknown): T;
  
  safeParse(input: unknown): ValidationResult<T> {
    try {
      return { success: true, data: this.parse(input) };
    } catch (err: any) {
      return { success: false, errors: [err.message || 'Validation failed'] };
    }
  }
}

export class StringSchema extends Schema<string> {
  private minLength?: number;

  min(length: number): this {
    this.minLength = length;
    return this;
  }

  parse(input: unknown): string {
    if (typeof input !== 'string') {
      throw new Error('Expected string, received ' + typeof input);
    }
    if (this.minLength !== undefined && input.length < this.minLength) {
      throw new Error(\`String must contain at least \${this.minLength} character(s)\`);
    }
    return input;
  }
}

export const z = {
  string: () => new StringSchema(),
};
`,
    solutionCode: `type ValidationResult<T> = { success: true; data: T } | { success: false; errors: string[] };

export abstract class Schema<T> {
  abstract parse(input: unknown): T;
  
  safeParse(input: unknown): ValidationResult<T> {
    try {
      return { success: true, data: this.parse(input) };
    } catch (err: any) {
      return { success: false, errors: [err.message || 'Validation failed'] };
    }
  }
}

export class StringSchema extends Schema<string> {
  private minLength?: number;

  min(length: number): this {
    this.minLength = length;
    return this;
  }

  parse(input: unknown): string {
    if (typeof input !== 'string') {
      throw new Error('Expected string, received ' + typeof input);
    }
    if (this.minLength !== undefined && input.length < this.minLength) {
      throw new Error(\`String must contain at least \${this.minLength} character(s)\`);
    }
    return input;
  }
}

export const z = {
  string: () => new StringSchema(),
};
`,
    testCases: [
      {
        id: 'ts-tc-1',
        name: 'Validate Valid String',
        input: 'z.string().min(3).parse("SkillForge")',
        expectedOutput: '"SkillForge"',
        isPublic: true,
        explanation: 'String passes minimum length constraint.',
      },
      {
        id: 'ts-tc-2',
        name: 'Reject Below Min Length',
        input: 'z.string().min(5).safeParse("hi")',
        expectedOutput: '{ success: false, errors: ["String must contain at least 5 character(s)"] }',
        isPublic: true,
        explanation: 'Fails cleanly without uncaught exceptions.',
      },
    ],
    strengths: ['Advanced Type Narrowing', 'API Usability Design', 'Robust Defensive Validation'],
    areasToImprove: ['Recursive Object & Discriminated Union Schemas'],
  },

  // =====================================================================
  // 6. GO: Distributed Worker Pool with Context Cancellation
  // =====================================================================
  go: {
    id: 'go-worker-pool-01',
    language: 'Go',
    slug: 'go',
    title: 'Concurrent Worker Pool with Graceful Context Cancellation',
    difficulty: 'Intermediate',
    category: 'Concurrency',
    estimatedMinutes: 22,
    passThreshold: 75,
    complexityWeight: 1.12,
    description:
      'Design a robust worker pool in Go that consumes tasks from buffered channels, limits concurrency to N goroutines, aggregates results safely, and handles context.Context cancellation without leaking goroutines.',
    realWorldScenario:
      'Cloud-native backends in Kubernetes schedule batch asynchronous jobs, database migrations, and rate-limited API scraping using bounded goroutine pools.',
    learningObjectives: [
      'Safely coordinate goroutines with sync.WaitGroup and sync.Mutex',
      'Listen for ctx.Done() to terminate worker routines gracefully',
      'Prevent deadlocks and channel blocking on full buffers',
    ],
    constraints: [
      'Number of workers: 1 <= N <= 128',
      'When context times out, all workers must return within 50ms',
    ],
    starterCode: `package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

type Task struct {
	ID    int
	Data  string
	Run   func() (string, error)
}

type Result struct {
	TaskID int
	Output string
	Err    error
}

func RunWorkerPool(ctx context.Context, numWorkers int, tasks []Task) []Result {
	taskChan := make(chan Task, len(tasks))
	resultChan := make(chan Result, len(tasks))
	var wg sync.WaitGroup

	// TODO: Spawn numWorkers goroutines that listen to taskChan or ctx.Done()
	for w := 0; w < numWorkers; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case task, ok := <-taskChan:
					if !ok {
						return
					}
					out, err := task.Run()
					resultChan <- Result{TaskID: task.ID, Output: out, Err: err}
				}
			}
		}()
	}

	for _, task := range tasks {
		taskChan <- task
	}
	close(taskChan)

	wg.Wait()
	close(resultChan)

	var results []Result
	for r := range resultChan {
		results = append(results, r)
	}
	return results
}
`,
    solutionCode: `package main

import (
	"context"
	"sync"
)

type Task struct {
	ID    int
	Data  string
	Run   func() (string, error)
}

type Result struct {
	TaskID int
	Output string
	Err    error
}

func RunWorkerPool(ctx context.Context, numWorkers int, tasks []Task) []Result {
	taskChan := make(chan Task, len(tasks))
	resultChan := make(chan Result, len(tasks))
	var wg sync.WaitGroup

	for w := 0; w < numWorkers; w++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case task, ok := <-taskChan:
					if !ok {
						return
					}
					out, err := task.Run()
					resultChan <- Result{TaskID: task.ID, Output: out, Err: err}
				}
			}
		}()
	}

	for _, task := range tasks {
		taskChan <- task
	}
	close(taskChan)

	wg.Wait()
	close(resultChan)

	var results []Result
	for r := range resultChan {
		results = append(results, r)
	}
	return results
}
`,
    testCases: [
      {
        id: 'go-tc-1',
        name: 'Process 10 Tasks across 3 Workers',
        input: '10 tasks with 5ms sleep each, 3 workers',
        expectedOutput: 'All 10 results collected in under 25ms',
        isPublic: true,
        explanation: 'Concurrent workers deliver 3x throughput improvement.',
      },
      {
        id: 'go-tc-2',
        name: 'Context Timeout Cancellation',
        input: 'Context cancelled after 10ms with 20 long-running tasks',
        expectedOutput: 'Graceful worker exit without goroutine leak',
        isPublic: true,
        explanation: 'Listens to ctx.Done() to terminate immediately.',
      },
    ],
    strengths: ['Idiomatic Channel Usage', 'Goroutine Lifecycle Management', 'Context Propagation'],
    areasToImprove: ['Dynamic Worker Auto-Scaling Under Load'],
  },

  // =====================================================================
  // 7. JAVA: High-Throughput Concurrent Cache with ReadWriteLock
  // =====================================================================
  java: {
    id: 'java-concurrent-cache-01',
    language: 'Java',
    slug: 'java',
    title: 'Thread-Safe High-Throughput ReadWrite Cache',
    difficulty: 'Intermediate',
    category: 'Real-world Scenario',
    estimatedMinutes: 24,
    passThreshold: 75,
    complexityWeight: 1.15,
    description:
      'Implement an enterprise thread-safe cache in Java using ReentrantReadWriteLock, optimistic reading, and concurrent memory segmentation to allow multiple simultaneous readers without lock contention.',
    realWorldScenario:
      'Banking systems and high-throughput order books use ReadWriteLock caches to serve millions of simultaneous account balance queries while safely serializing writes.',
    learningObjectives: [
      'Implement ReentrantReadWriteLock with proper finally blocks',
      'Optimize read operations under heavy 95% read / 5% write traffic',
      'Prevent thread deadlocks and lock acquisition starvation',
    ],
    constraints: [
      'Multiple threads must be able to read simultaneously',
      'Writes must have exclusive access to prevent race conditions',
    ],
    starterCode: `import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ConcurrentEnterpriseCache<K, V> {
    private final Map<K, V> store = new HashMap<>();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public V get(K key) {
        lock.readLock().lock();
        try {
            return store.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            store.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int size() {
        lock.readLock().lock();
        try {
            return store.size();
        } finally {
            lock.readLock().unlock();
        }
    }
}
`,
    solutionCode: `import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ConcurrentEnterpriseCache<K, V> {
    private final Map<K, V> store = new HashMap<>();
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();

    public V get(K key) {
        lock.readLock().lock();
        try {
            return store.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    public void put(K key, V value) {
        lock.writeLock().lock();
        try {
            store.put(key, value);
        } finally {
            lock.writeLock().unlock();
        }
    }

    public int size() {
        lock.readLock().lock();
        try {
            return store.size();
        } finally {
            lock.readLock().unlock();
        }
    }
}
`,
    testCases: [
      {
        id: 'java-tc-1',
        name: 'Concurrent Readers Access',
        input: '10 threads reading simultaneously',
        expectedOutput: 'All 10 reads complete concurrently without blocking',
        isPublic: true,
        explanation: 'Shared read locks allow non-blocking concurrent access.',
      },
    ],
    strengths: ['Thread Safety & Concurrency Primitives', 'Clean RAII finally unlocking', 'Enterprise Design'],
    areasToImprove: ['StampedLock Optimistic Reads'],
  },

  // =====================================================================
  // 8. C#: Async Pipeline with IAsyncEnumerable & Rate Limiting
  // =====================================================================
  csharp: {
    id: 'cs-async-pipeline-01',
    language: 'C#',
    slug: 'csharp',
    title: 'Streaming Data Pipeline with IAsyncEnumerable',
    difficulty: 'Intermediate',
    category: 'Real-world Scenario',
    estimatedMinutes: 25,
    passThreshold: 75,
    complexityWeight: 1.14,
    description:
      'Construct a streaming data pipeline in C# using IAsyncEnumerable, Channel<T>, and CancellationToken to process large telemetry datasets with zero high-watermark memory consumption.',
    realWorldScenario:
      'Cloud event aggregators stream millions of IoT sensor events or user clickstreams with backpressure regulation.',
    learningObjectives: [
      'Master C# async streams with yield return and cancellation tokens',
      'Apply System.Threading.Channels for producer-consumer buffering',
    ],
    constraints: [
      'Must support cancellation via CancellationToken',
      'Memory footprint must remain flat regardless of stream size',
    ],
    starterCode: `using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

public class TelemetryPipeline
{
    public static async IAsyncEnumerable<int> FilterAndTransformStreamAsync(
        IAsyncEnumerable<int> source,
        Func<int, bool> predicate,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        await foreach (var item in source.WithCancellation(cancellationToken))
        {
            if (predicate(item))
            {
                yield return item * 2;
            }
        }
    }
}
`,
    solutionCode: `using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;

public class TelemetryPipeline
{
    public static async IAsyncEnumerable<int> FilterAndTransformStreamAsync(
        IAsyncEnumerable<int> source,
        Func<int, bool> predicate,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        await foreach (var item in source.WithCancellation(cancellationToken))
        {
            if (predicate(item))
            {
                yield return item * 2;
            }
        }
    }
}
`,
    testCases: [
      {
        id: 'cs-tc-1',
        name: 'Stream Filter and Transform',
        input: 'Stream [1, 2, 3, 4] with isEven filter',
        expectedOutput: '[4, 8]',
        isPublic: true,
        explanation: 'Correctly transforms filtered elements asynchronously.',
      },
    ],
    strengths: ['Asynchronous Streaming', 'Cancellation Token Safety', 'Memory Efficiency'],
    areasToImprove: ['Parallel Chunk Batches'],
  },

  // =====================================================================
  // 9. KOTLIN: Coroutine Flow Processing with Backpressure
  // =====================================================================
  kotlin: {
    id: 'kt-coroutine-flow-01',
    language: 'Kotlin',
    slug: 'kotlin',
    title: 'Reactive Coroutine Flow Pipeline with Backpressure Buffer',
    difficulty: 'Intermediate',
    category: 'Concurrency',
    estimatedMinutes: 22,
    passThreshold: 75,
    complexityWeight: 1.13,
    description:
      'Design a reactive event stream in Kotlin using Coroutine Flows, buffer(Channel.CONFLATED), and custom intermediate operators to prevent memory crashes on fast producers.',
    realWorldScenario:
      'Real-time financial ticker displays and Android UI state flows discard stale intermediate values when rendering at 120 FPS.',
    learningObjectives: [
      'Master Kotlin Flow lifecycle, buffer strategies, and catch operators',
      'Execute CPU-bound transformations on Dispatchers.Default',
    ],
    constraints: [
      'Must handle cancellation exceptions without swallowing them',
      'Conflate fast emitter signals to match consumer rendering capacity',
    ],
    starterCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

class MarketDataProcessor {
    fun processQuotes(rawFlow: Flow<Double>): Flow<String> {
        return rawFlow
            .filter { it > 0.0 }
            .map { String.format("$%.2f", it) }
            .buffer(Channel.CONFLATED)
            .flowOn(Dispatchers.Default)
    }
}
`,
    solutionCode: `import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

class MarketDataProcessor {
    fun processQuotes(rawFlow: Flow<Double>): Flow<String> {
        return rawFlow
            .filter { it > 0.0 }
            .map { String.format("$%.2f", it) }
            .buffer(Channel.CONFLATED)
            .flowOn(Dispatchers.Default)
    }
}
`,
    testCases: [
      {
        id: 'kt-tc-1',
        name: 'Filter and Format Price Quotes',
        input: 'Quotes: [-5.0, 142.50, 143.10]',
        expectedOutput: '["$142.50", "$143.10"]',
        isPublic: true,
        explanation: 'Negative quotes discarded; valid quotes formatted.',
      },
    ],
    strengths: ['Modern Coroutine Idioms', 'Structured Concurrency', 'Backpressure Handling'],
    areasToImprove: ['StateFlow Replay Caching'],
  },

  // =====================================================================
  // 10. SWIFT: Actor-Isolated State Machine with Task Concurrency
  // =====================================================================
  swift: {
    id: 'swift-actor-state-01',
    language: 'Swift',
    slug: 'swift',
    title: 'Actor-Isolated Thread-Safe Bank Account Ledger',
    difficulty: 'Intermediate',
    category: 'Concurrency',
    estimatedMinutes: 20,
    passThreshold: 75,
    complexityWeight: 1.16,
    description:
      'Implement an actor-isolated state machine in Swift 6 protecting shared mutable balance states from data races across asynchronous Task groups.',
    realWorldScenario:
      'Fintech iOS apps and backend Swift microservices require strict actor isolation to prevent race conditions during simultaneous payment debits.',
    learningObjectives: [
      'Use Swift actors for compile-time data race safety',
      'Implement async/await deposit, withdraw, and audit log methods',
    ],
    constraints: [
      'Zero data races allowed (Swift 6 strict concurrency enabled)',
      'Withdrawals exceeding balance must throw InsufficientFundsError',
    ],
    starterCode: `enum AccountError: Error {
    case insufficientFunds(available: Double, requested: Double)
    case invalidAmount
}

actor SecureAccountLedger {
    private(set) var balance: Double = 0.0
    private var transactionHistory: [String] = []

    init(initialDeposit: Double) {
        self.balance = max(0.0, initialDeposit)
    }

    func deposit(amount: Double) {
        guard amount > 0 else { return }
        balance += amount
        transactionHistory.append("Deposit: +\(amount)")
    }

    func withdraw(amount: Double) throws {
        guard amount > 0 else { throw AccountError.invalidAmount }
        guard balance >= amount else {
            throw AccountError.insufficientFunds(available: balance, requested: amount)
        }
        balance -= amount
        transactionHistory.append("Withdraw: -\(amount)")
    }
}
`,
    solutionCode: `enum AccountError: Error {
    case insufficientFunds(available: Double, requested: Double)
    case invalidAmount
}

actor SecureAccountLedger {
    private(set) var balance: Double = 0.0
    private var transactionHistory: [String] = []

    init(initialDeposit: Double) {
        self.balance = max(0.0, initialDeposit)
    }

    func deposit(amount: Double) {
        guard amount > 0 else { return }
        balance += amount
        transactionHistory.append("Deposit: +\(amount)")
    }

    func withdraw(amount: Double) throws {
        guard amount > 0 else { throw AccountError.invalidAmount }
        guard balance >= amount else {
            throw AccountError.insufficientFunds(available: balance, requested: amount)
        }
        balance -= amount
        transactionHistory.append("Withdraw: -\(amount)")
    }
}
`,
    testCases: [
      {
        id: 'swift-tc-1',
        name: 'Concurrent Withdrawals Isolation',
        input: 'Balance $100; Two concurrent withdraw requests for $60',
        expectedOutput: 'First succeeds, second throws insufficientFunds',
        isPublic: true,
        explanation: 'Actor serialization ensures balance never drops below zero.',
      },
    ],
    strengths: ['Swift Concurrency Actors', 'Data Race Freedom', 'Compile-Time Safety'],
    areasToImprove: ['Distributed Actor Serialization'],
  },

  // =====================================================================
  // 11. REACT: High-Performance Virtualized Data Grid with Memoization
  // =====================================================================
  react: {
    id: 'react-virtual-grid-01',
    language: 'React',
    slug: 'react',
    title: 'High-Performance Virtualized Infinite Grid with Memoization',
    difficulty: 'Advanced',
    category: 'Real-world Scenario',
    estimatedMinutes: 25,
    passThreshold: 75,
    complexityWeight: 1.08,
    description:
      'Build a high-performance React component managing 50,000 tabular records using windowing virtualization, avoiding unnecessary re-renders with React.memo, useCallback, and custom window slice computation.',
    realWorldScenario:
      'Data dashboards in Stripe, Linear, and Ramp display tens of thousands of real-time transactions with smooth 60 FPS scrolling and zero DOM bloat.',
    learningObjectives: [
      'Calculate visible viewport window indices from scrollTop and rowHeight',
      'Prevent stale closures using state updater callbacks',
      'Avoid layout thrashing using CSS transform translation',
    ],
    constraints: [
      'Render at most 25-30 DOM elements at any time, even with 100,000 records',
      'Smooth scroll with zero micro-stutter',
    ],
    starterCode: `import React, { useState, useMemo, useCallback } from 'react';

interface RowItem {
  id: string;
  customer: string;
  amount: number;
  status: 'succeeded' | 'pending' | 'failed';
}

interface VirtualGridProps {
  items: RowItem[];
  rowHeight: number;
  containerHeight: number;
}

export const VirtualDataGrid: React.FC<VirtualGridProps> = ({
  items,
  rowHeight = 40,
  containerHeight = 400,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const visibleCount = Math.ceil(containerHeight / rowHeight) + 4;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      top: (startIndex + index) * rowHeight,
    }));
  }, [items, startIndex, endIndex, rowHeight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      onScroll={handleScroll}
      style={{ height: containerHeight, overflowY: 'auto', position: 'relative' }}
      className="border rounded-xl font-mono text-xs"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(row => (
          <div
            key={row.id}
            style={{
              position: 'absolute',
              top: row.top,
              height: rowHeight,
              left: 0,
              right: 0,
            }}
            className="flex items-center justify-between px-4 border-b hover:bg-slate-50"
          >
            <span>{row.customer}</span>
            <span className="font-bold">\${row.amount.toFixed(2)}</span>
            <span>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
`,
    solutionCode: `import React, { useState, useMemo, useCallback } from 'react';

interface RowItem {
  id: string;
  customer: string;
  amount: number;
  status: 'succeeded' | 'pending' | 'failed';
}

interface VirtualGridProps {
  items: RowItem[];
  rowHeight: number;
  containerHeight: number;
}

export const VirtualDataGrid: React.FC<VirtualGridProps> = ({
  items,
  rowHeight = 40,
  containerHeight = 400,
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * rowHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
  const visibleCount = Math.ceil(containerHeight / rowHeight) + 4;
  const endIndex = Math.min(items.length, startIndex + visibleCount);

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      top: (startIndex + index) * rowHeight,
    }));
  }, [items, startIndex, endIndex, rowHeight]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  return (
    <div
      onScroll={handleScroll}
      style={{ height: containerHeight, overflowY: 'auto', position: 'relative' }}
      className="border rounded-xl font-mono text-xs"
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(row => (
          <div
            key={row.id}
            style={{
              position: 'absolute',
              top: row.top,
              height: rowHeight,
              left: 0,
              right: 0,
            }}
            className="flex items-center justify-between px-4 border-b hover:bg-slate-50"
          >
            <span>{row.customer}</span>
            <span className="font-bold">\${row.amount.toFixed(2)}</span>
            <span>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
`,
    testCases: [
      {
        id: 'react-tc-1',
        name: 'DOM Element Bounding Test',
        input: 'Mount grid with 50,000 items, containerHeight=400, rowHeight=40',
        expectedOutput: 'Exactly 14 items rendered in DOM tree simultaneously',
        isPublic: true,
        explanation: 'Keeps DOM lightweight and scrolls at constant 60 FPS.',
      },
    ],
    strengths: ['DOM Virtualization Math', 'Component Lifecycle Optimization', 'Zero Memory Leaks'],
    areasToImprove: ['Dynamic Variable Row Heights Measurement'],
  },
};

export const getChallengeForLanguage = (slug: string): LanguageChallenge => {
  const normalized = slug.toLowerCase();
  if (MULTI_LANG_CHALLENGES[normalized]) {
    return MULTI_LANG_CHALLENGES[normalized];
  }
  // Fallbacks based on common keywords
  if (normalized.includes('py')) return MULTI_LANG_CHALLENGES['python'];
  if (normalized.includes('rust')) return MULTI_LANG_CHALLENGES['rust'];
  if (normalized.includes('cpp') || normalized.includes('c++')) return MULTI_LANG_CHALLENGES['cpp'];
  if (normalized.includes('ts') || normalized.includes('type')) return MULTI_LANG_CHALLENGES['typescript'];
  if (normalized.includes('js') || normalized.includes('java') && !normalized.includes('script')) return MULTI_LANG_CHALLENGES['java'];
  if (normalized.includes('go')) return MULTI_LANG_CHALLENGES['go'];
  if (normalized.includes('c#') || normalized.includes('csharp')) return MULTI_LANG_CHALLENGES['csharp'];
  if (normalized.includes('kt') || normalized.includes('kotlin')) return MULTI_LANG_CHALLENGES['kotlin'];
  if (normalized.includes('swift')) return MULTI_LANG_CHALLENGES['swift'];
  return MULTI_LANG_CHALLENGES['python'];
};
