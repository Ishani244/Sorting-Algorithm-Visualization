/**
 * DAA SORTING ALGORITHM VISUALIZER
 * Educational Step-by-Step Architecture for Viva & Algorithm Demonstrations
 * Pure Vanilla JavaScript (Zero External Dependencies)
 */

// Global Element Selectors
const $ = (id) => document.getElementById(id);

const els = {
  // Topbar
  themeBtn: $("themeBtn"),
  soundBtn: $("soundToggleBtn"),
  soundIcon: $("soundIcon"),
  soundStatusText: $("soundStatusText"),
  mobileControlToggle: $("mobileControlToggle"),

  // Hero & Views
  heroAlgorithm: $("heroAlgorithm"),
  heroSummary: $("heroSummary"),
  algoCategoryBadge: $("algoCategoryBadge"),
  viewModeCard: $("viewModeCard"),
  viewModeBar: $("viewModeBar"),

  // Controls & Sidebar
  controlPanel: $("controlPanel"),
  algorithm: $("algorithmSelect"),
  preset: $("presetSelect"),
  size: $("sizeRange"),
  sizeValue: $("sizeValue"),
  speed: $("speedRange"),
  speedValue: $("speedValue"),
  autoPause: $("autoPauseCheck"),
  custom: $("customInput"),
  applyCustom: $("applyCustomBtn"),
  generate: $("generateBtn"),

  // Step Toolbar & Scrubber
  resetStepBtn: $("resetStepBtn"),
  prevStepBtn: $("prevStepBtn"),
  playPauseBtn: $("playPauseBtn"),
  nextStepBtn: $("nextStepBtn"),
  stepScrubber: $("stepScrubber"),
  scrubberFill: $("scrubberFill"),

  // Viva Narration Card
  actionTag: $("actionTag"),
  phaseTag: $("phaseTag"),
  stepCounter: $("stepCounter"),
  stepPercent: $("stepPercent"),
  narrationExpression: $("narrationExpression"),
  narrationWhy: $("narrationWhy"),
  narrationInvariant: $("narrationInvariant"),

  // Visualizer Canvas & Aux
  visualizerTitle: $("visualizerTitle"),
  statusText: $("statusText"),
  visualizer: $("visualizer"),
  auxContainer: $("auxContainer"),
  minValue: $("minValue"),
  maxValue: $("maxValue"),
  currentSize: $("currentSize"),
  inversionCount: $("inversionCount"),
  orderState: $("orderState"),

  // Metrics
  comparisons: $("comparisons"),
  swaps: $("swaps"),
  writes: $("writes"),
  accesses: $("accesses"),
  stepMetric: $("stepMetric"),
  elapsedMetric: $("elapsedMetric"),

  // Python Code Display
  pythonCodeDisplay: $("pythonCodeDisplay"),
  copyCodeBtn: $("copyCodeBtn"),

  // Complexity & Properties
  bestCase: $("bestCase"),
  bestCondition: $("bestCondition"),
  averageCase: $("averageCase"),
  worstCase: $("worstCase"),
  worstCondition: $("worstCondition"),
  spaceCase: $("spaceCase"),
  spaceCondition: $("spaceCondition"),
  stableBadge: $("stableBadge"),
  inPlaceBadge: $("inPlaceBadge"),
  adaptiveBadge: $("adaptiveBadge"),
  comparisonBadge: $("comparisonBadge"),
  algorithmIdea: $("algorithmIdea"),
  vivaAccordion: $("vivaAccordion"),

  // Benchmark
  benchmarkBtn: $("benchmarkBtn"),
  benchmarkBody: $("benchmarkBody")
};

// ==========================================================================
// CLEAN PYTHON PSEUDOCODE FOR ALL 8 ALGORITHMS
// ==========================================================================
const pythonCodeMap = {
  bubble: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap adjacent elements if out of order
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # Adaptive optimization: break early if array is already sorted
        if not swapped:
            break
    return arr`,

  selection: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        # Find minimum element in unsorted suffix
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap found minimum into its sorted position
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,

  insertion: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift elements of sorted prefix that are > key to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        # Place key into the opened slot
        arr[j + 1] = key
    return arr`,

  merge: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    # Two-finger merge of two sorted lists
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:  # Stable comparison
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    # Append any remaining elements
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,

  quick: `def quick_sort(arr, low, high):
    if low < high:
        # Partition array and obtain pivot index
        p = partition(arr, low, high)
        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)

def partition(arr, low, high):
    pivot = arr[high]  # Lomuto partition scheme
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    # Place pivot in its permanent final position
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,

  heap: `def heap_sort(arr):
    n = len(arr)
    # Step 1: Build max-heap bottom-up in O(n)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Step 2: Repeatedly extract maximum element
    for end in range(n - 1, 0, -1):
        arr[0], arr[end] = arr[end], arr[0]
        heapify(arr, end, 0)
    return arr

def heapify(arr, n, root):
    largest = root
    left = 2 * root + 1
    right = 2 * root + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != root:
        arr[root], arr[largest] = arr[largest], arr[root]
        heapify(arr, n, largest)`,

  shell: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    # Diminishing gap sequence
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            # Gapped insertion sort
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,

  counting: `def counting_sort(arr):
    if not arr:
        return arr
    min_val, max_val = min(arr), max(arr)
    range_k = max_val - min_val + 1
    count = [0] * range_k
    
    # Phase 1: Frequency counts
    for x in arr:
        count[x - min_val] += 1
        
    # Phase 2: Reconstruction
    idx = 0
    for val in range(range_k):
        while count[val] > 0:
            arr[idx] = val + min_val
            idx += 1
            count[val] -= 1
    return arr`
};

// ==========================================================================
// ALGORITHM THEORETICAL & VIVA METADATA
// ==========================================================================
const algorithmMetadata = {
  bubble: {
    name: "Bubble Sort",
    category: "Comparison-based · Exchange",
    summary: "Stable · In-place · Adaptive with early break",
    best: "O(n)", bestCond: "Already sorted (0 swaps)",
    average: "O(n²)",
    worst: "O(n²)", worstCond: "Reverse sorted array",
    space: "O(1)", spaceCond: "Strictly in-place",
    stable: true, inPlace: true, adaptive: true, comparison: true,
    idea: "Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. After pass i, the i-th largest element is guaranteed to be 'bubbled' to the end of the array.",
    code: [
      { no: 1, text: "procedure BUBBLE-SORT(A):" },
      { no: 2, text: "  for i ← 0 to n - 2 do" },
      { no: 3, text: "    swapped ← false" },
      { no: 4, text: "    for j ← 0 to n - i - 2 do" },
      { no: 5, text: "      if A[j] > A[j + 1] then" },
      { no: 6, text: "        swap(A[j], A[j + 1])" },
      { no: 7, text: "        swapped ← true" },
      { no: 8, text: "    if not swapped then break  // Adaptive exit" },
      { no: 9, text: "  return A" }
    ],
    viva: [
      {
        q: "What is the Loop Invariant of Bubble Sort?",
        a: "<b>Invariant:</b> At the end of iteration <i>i</i> of the outer loop, the subarray <code>A[n - i - 1 .. n - 1]</code> contains the <i>i + 1</i> largest elements of the array in sorted order, and every element in <code>A[0 .. n - i - 2]</code> is ≤ every element in <code>A[n - i - 1 .. n - 1]</code>."
      },
      {
        q: "Why does Bubble Sort have O(n) best-case time complexity?",
        a: "By adding a boolean flag <code>swapped</code> initialized to <code>false</code> at the start of each pass. If the array is already sorted, no adjacent elements are swapped during the very first pass. The flag remains <code>false</code>, triggering the <code>break</code> statement after just <i>n - 1</i> comparisons."
      },
      {
        q: "Is Bubble Sort stable? Why?",
        a: "<b>Yes, it is stable.</b> We swap only if <code>A[j] > A[j + 1]</code> (strict inequality). When two elements have equal keys (<code>A[j] == A[j + 1]</code>), no swap occurs. Therefore, their initial relative order is strictly preserved."
      },
      {
        q: "How many total swaps are required in the worst case?",
        a: "The number of swaps equals the number of <b>inversions</b> in the input. In the worst case (reverse sorted array), the number of inversions is <i>n(n - 1) / 2</i>, which is Θ(n²)."
      }
    ]
  },

  selection: {
    name: "Selection Sort",
    category: "Comparison-based · Selection",
    summary: "In-place · Unstable · Minimum writes: O(n) swaps",
    best: "O(n²)", bestCond: "Still scans entire suffix",
    average: "O(n²)",
    worst: "O(n²)", worstCond: "All permutations",
    space: "O(1)", spaceCond: "Strictly in-place",
    stable: false, inPlace: true, adaptive: false, comparison: true,
    idea: "Divides the array into a sorted prefix and an unsorted suffix. In each pass, it scans the unsorted suffix to find the minimum element, and swaps it with the first unsorted position.",
    code: [
      { no: 1, text: "procedure SELECTION-SORT(A):" },
      { no: 2, text: "  for i ← 0 to n - 2 do" },
      { no: 3, text: "    min_idx ← i" },
      { no: 4, text: "    for j ← i + 1 to n - 1 do" },
      { no: 5, text: "      if A[j] < A[min_idx] then" },
      { no: 6, text: "        min_idx ← j" },
      { no: 7, text: "    if min_idx ≠ i then" },
      { no: 8, text: "      swap(A[i], A[min_idx])" },
      { no: 9, text: "  return A" }
    ],
    viva: [
      {
        q: "What is the main practical advantage of Selection Sort?",
        a: "<b>Minimal Memory Writes:</b> It performs at most <i>n - 1</i> swaps (O(n) writes). If writing to memory or Flash EEPROM is very expensive compared to reading, Selection Sort can outperform other algorithms in write overhead."
      },
      {
        q: "Why is standard Selection Sort not stable?",
        a: "Because it makes non-adjacent, long-distance swaps. For example, sorting <code>[4a, 4b, 2]</code>: in the first pass, <code>2</code> is swapped with <code>4a</code>, yielding <code>[2, 4b, 4a]</code>. The relative order of <code>4a</code> and <code>4b</code> was inverted."
      },
      {
        q: "Why is the best-case time complexity still O(n²)?",
        a: "Because the inner loop always runs from <code>i + 1</code> to <code>n - 1</code> regardless of whether the array is already sorted. The algorithm cannot know an element is the minimum without comparing it against every other element in the unsorted suffix."
      }
    ]
  },

  insertion: {
    name: "Insertion Sort",
    category: "Comparison-based · Insertion",
    summary: "Stable · In-place · Highly adaptive O(n) on nearly sorted",
    best: "O(n)", bestCond: "Already sorted (1 cmp per elem)",
    average: "O(n²)",
    worst: "O(n²)", worstCond: "Reverse sorted array",
    space: "O(1)", spaceCond: "In-place auxiliary",
    stable: true, inPlace: true, adaptive: true, comparison: true,
    idea: "Builds the sorted array one element at a time, exactly like sorting playing cards in hand. Each new element ('key') is inserted into its proper relative position within the already sorted prefix.",
    code: [
      { no: 1, text: "procedure INSERTION-SORT(A):" },
      { no: 2, text: "  for i ← 1 to n - 1 do" },
      { no: 3, text: "    key ← A[i]" },
      { no: 4, text: "    j ← i - 1" },
      { no: 5, text: "    while j ≥ 0 and A[j] > key do" },
      { no: 6, text: "      A[j + 1] ← A[j]  // Shift right" },
      { no: 7, text: "      j ← j - 1" },
      { no: 8, text: "    A[j + 1] ← key   // Insert key" },
      { no: 9, text: "  return A" }
    ],
    viva: [
      {
        q: "What is the Loop Invariant of Insertion Sort?",
        a: "<b>Invariant:</b> At the start of each iteration <i>i</i>, the subarray <code>A[0 .. i - 1]</code> consists of the original elements from <code>A[0 .. i - 1]</code>, but in fully sorted order."
      },
      {
        q: "Why is Insertion Sort used in real-world standard libraries (e.g., Timsort, Introsort)?",
        a: "Because for small subarrays (typically n ≤ 16 to 32) or nearly-sorted data, Insertion Sort has extremely low overhead, cache-friendly sequential memory access, and runs in linear O(n) time when few inversions exist."
      },
      {
        q: "Why is it stable?",
        a: "The condition in the while loop is <code>A[j] > key</code>. If <code>A[j] == key</code>, the while loop terminates immediately, and the key is placed directly after <code>A[j]</code>, never jumping over an identical element."
      }
    ]
  },

  merge: {
    name: "Merge Sort",
    category: "Comparison-based · Divide & Conquer",
    summary: "Guaranteed O(n log n) · Stable · O(n) Auxiliary space",
    best: "O(n log n)", bestCond: "Guaranteed all cases",
    average: "O(n log n)",
    worst: "O(n log n)", worstCond: "Guaranteed all cases",
    space: "O(n)", spaceCond: "Auxiliary buffer for merge",
    stable: true, inPlace: false, adaptive: false, comparison: true,
    idea: "Divides the array recursively into two equal halves until subarrays contain 1 element (trivially sorted), then repeatedly merges sorted pairs of subarrays back together in linear time.",
    code: [
      { no: 1, text: "procedure MERGE-SORT(A, left, right):" },
      { no: 2, text: "  if left ≥ right then return" },
      { no: 3, text: "  mid ← ⌊(left + right) / 2⌋" },
      { no: 4, text: "  MERGE-SORT(A, left, mid)" },
      { no: 5, text: "  MERGE-SORT(A, mid + 1, right)" },
      { no: 6, text: "  MERGE(A, left, mid, right)" },
      { no: 7, text: "procedure MERGE(A, left, mid, right):" },
      { no: 8, text: "  copy A[left..mid] → L, A[mid+1..right] → R" },
      { no: 9, text: "  while L and R have elements: write smaller to A" },
      { no: 10, text: "  copy any remaining elements to A" }
    ],
    viva: [
      {
        q: "State and solve the Recurrence Relation for Merge Sort.",
        a: "<b>Recurrence:</b> <code>T(n) = 2T(n/2) + Θ(n)</code>. By Case 2 of the <b>Master Theorem</b>, since <code>log_b(a) = log_2(2) = 1</code> and <code>f(n) = Θ(n¹)</code>, we have <code>T(n) = Θ(n log n)</code> for best, average, and worst cases."
      },
      {
        q: "Why is standard Merge Sort NOT in-place for arrays?",
        a: "Because merging two sorted contiguous blocks of memory in linear time without extra buffer would require shifting all subsequent elements, which degrades merging to O(n²). Thus, O(n) auxiliary storage is required."
      },
      {
        q: "Why is Merge Sort preferred for Linked Lists over Quick Sort?",
        a: "In a linked list, elements can be merged in O(1) auxiliary space just by changing pointer links without extra copying! Furthermore, linked lists do not support O(1) random access which Quick Sort requires for partitioning."
      }
    ]
  },

  quick: {
    name: "Quick Sort",
    category: "Comparison-based · Divide & Conquer",
    summary: "Fastest average O(n log n) · In-place · Unstable",
    best: "O(n log n)", bestCond: "Balanced partitions (n/2)",
    average: "O(n log n)",
    worst: "O(n²)", worstCond: "Already sorted + extreme pivot",
    space: "O(log n)", spaceCond: "Call stack recursion depth",
    stable: false, inPlace: true, adaptive: false, comparison: true,
    idea: "Chooses a 'pivot' element and partitions the array such that all elements smaller than the pivot are placed to its left, and all elements larger are placed to its right. The pivot is then in its permanent final position.",
    code: [
      { no: 1, text: "procedure QUICK-SORT(A, low, high):" },
      { no: 2, text: "  if low < high then" },
      { no: 3, text: "    p ← PARTITION(A, low, high)" },
      { no: 4, text: "    QUICK-SORT(A, low, p - 1)" },
      { no: 5, text: "    QUICK-SORT(A, p + 1, high)" },
      { no: 6, text: "procedure PARTITION(A, low, high):" },
      { no: 7, text: "  pivot ← A[high], i ← low - 1" },
      { no: 8, text: "  for j ← low to high - 1 do" },
      { no: 9, text: "    if A[j] < pivot then i ← i + 1; swap(A[i], A[j])" },
      { no: 10, text: "  swap(A[i + 1], A[high]); return i + 1" }
    ],
    viva: [
      {
        q: "When does Quick Sort degrade to O(n²) worst-case?",
        a: "When the partition is extremely unbalanced at every level (e.g. 0 elements on one side and <i>n - 1</i> on the other). This happens when the array is already sorted (or reverse sorted) and the pivot is chosen as the first or last element."
      },
      {
        q: "How do we prevent O(n²) in practice?",
        a: "By using <b>Randomized Pivot Selection</b> or <b>Median-of-Three</b> (picking the median of first, middle, and last elements). This guarantees O(n log n) with extremely high probability."
      },
      {
        q: "Why is Quick Sort called in-place if it uses O(log n) space?",
        a: "Because it sorts the array elements directly within the existing memory without allocating an auxiliary data array. The O(log n) space is purely stack memory for recursive function calls."
      }
    ]
  },

  heap: {
    name: "Heap Sort",
    category: "Comparison-based · Selection with Heap",
    summary: "Guaranteed O(n log n) · In-place O(1) · Not stable",
    best: "O(n log n)", bestCond: "Distinct elements",
    average: "O(n log n)",
    worst: "O(n log n)", worstCond: "Guaranteed all cases",
    space: "O(1)", spaceCond: "Array as implicit binary tree",
    stable: false, inPlace: true, adaptive: false, comparison: true,
    idea: "Builds a Max-Heap where parent A[i] ≥ children A[2i+1] and A[2i+2]. Then repeatedly swaps the root (the maximum element) with the last element of the unsorted heap, reduces heap size, and calls heapify.",
    code: [
      { no: 1, text: "procedure HEAP-SORT(A):" },
      { no: 2, text: "  BUILD-MAX-HEAP(A)  // O(n) bottom-up" },
      { no: 3, text: "  for end ← n - 1 down to 1 do" },
      { no: 4, text: "    swap(A[0], A[end])  // Move max to sorted end" },
      { no: 5, text: "    HEAPIFY(A, 0, end)  // Sift root down in O(log n)" },
      { no: 6, text: "procedure HEAPIFY(A, root, size):" },
      { no: 7, text: "  largest ← max of root, 2*root+1, 2*root+2" },
      { no: 8, text: "  if largest ≠ root then swap & recurse" }
    ],
    viva: [
      {
        q: "Why is BUILD-MAX-HEAP O(n) and not O(n log n)?",
        a: "Because most nodes are near the leaves where height is small! The sum is <code>∑ (h / 2^h)</code> for h = 0 to ⌊log n⌋. Since the infinite series <code>∑ (h / 2^h) = 2</code>, the total work converges to O(n)."
      },
      {
        q: "Compare Heap Sort vs Quick Sort.",
        a: "<b>Heap Sort</b> has guaranteed O(n log n) worst case and O(1) space. However, <b>Quick Sort</b> has much better cache locality (Heap Sort jumps between indices <code>i</code> and <code>2i+1</code> across cache lines), so Quick Sort is typically 2x faster in practice."
      }
    ]
  },

  shell: {
    name: "Shell Sort",
    category: "Comparison-based · Diminishing Gap",
    summary: "In-place · Gap-based generalized insertion sort",
    best: "O(n log n)", bestCond: "Depends on gap sequence",
    average: "≈ O(n^1.5)",
    worst: "O(n²)", worstCond: "Shell's n/2 sequence",
    space: "O(1)", spaceCond: "Strictly in-place",
    stable: false, inPlace: true, adaptive: true, comparison: true,
    idea: "An extension of insertion sort that compares and swaps elements that are far apart using a decreasing gap sequence. Large gaps move out-of-place elements quickly, reducing inversions before the final gap=1 pass.",
    code: [
      { no: 1, text: "procedure SHELL-SORT(A):" },
      { no: 2, text: "  gap ← ⌊n / 2⌋" },
      { no: 3, text: "  while gap > 0 do" },
      { no: 4, text: "    for i ← gap to n - 1 do" },
      { no: 5, text: "      temp ← A[i], j ← i" },
      { no: 6, text: "      while j ≥ gap and A[j - gap] > temp do" },
      { no: 7, text: "        A[j] ← A[j - gap]; j ← j - gap" },
      { no: 8, text: "      A[j] ← temp" },
      { no: 9, text: "    gap ← ⌊gap / 2⌋" }
    ],
    viva: [
      {
        q: "Why does Shell Sort outperform simple Insertion Sort?",
        a: "Insertion sort only swaps adjacent elements, fixing at most 1 inversion per comparison. Shell Sort compares elements separated by <code>gap</code>, resolving multiple inversions in a single move."
      },
      {
        q: "What determines Shell Sort's actual complexity?",
        a: "The choice of <b>gap sequence</b>. Shell's original sequence ⌊n/2⌋ has O(n²) worst case. Better sequences like Hibbard's (2^k - 1) yield O(n^1.5), and Sedgewick's yields O(n^1.33)."
      }
    ]
  },

  counting: {
    name: "Counting Sort",
    category: "Non-comparison · Integer Keys",
    summary: "O(n + k) Linear Time · Stable · Auxiliary O(k) Space",
    best: "O(n + k)", bestCond: "Linear time always",
    average: "O(n + k)",
    worst: "O(n + k)", worstCond: "Where k = max - min + 1",
    space: "O(n + k)", spaceCond: "Count frequency array + output",
    stable: true, inPlace: false, adaptive: false, comparison: false,
    idea: "Bypasses the Ω(n log n) comparison lower bound by counting frequencies of each integer value in a count array, then writing back elements in order of their values.",
    code: [
      { no: 1, text: "procedure COUNTING-SORT(A, k):" },
      { no: 2, text: "  min ← min(A), max ← max(A)" },
      { no: 3, text: "  C ← array of zeros of size (max - min + 1)" },
      { no: 4, text: "  for each x in A: C[x - min]++" },
      { no: 5, text: "  idx ← 0" },
      { no: 6, text: "  for val ← 0 to C.length - 1 do" },
      { no: 7, text: "    while C[val] > 0 do A[idx++] ← val + min; C[val]--" },
      { no: 8, text: "  return A" }
    ],
    viva: [
      {
        q: "Why does Counting Sort break the Ω(n log n) lower bound?",
        a: "The Ω(n log n) lower bound only applies to <b>comparison-based</b> sorting (derived via the decision-tree model with <i>n!</i> leaves). Counting sort uses array indexing arithmetic rather than key comparisons!"
      },
      {
        q: "When is Counting Sort impractical?",
        a: "When the range of values <i>k = max - min + 1</i> is much larger than <i>n</i> (e.g. sorting 10 numbers where one number is 1,000,000,000), causing huge memory consumption and O(k) runtime."
      }
    ]
  }
};

// ==========================================================================
// SYSTEM STATE
// ==========================================================================
let originalArray = [];
let steps = [];
let currentStepIndex = 0;
let isPlaying = false;
let playInterval = null;
let currentViewMode = "card"; // "card" or "bar"
let soundEnabled = true;
let audioCtx = null;

// ==========================================================================
// AUDIO SYNTHESIZER (WEB AUDIO API)
// ==========================================================================
function playTone(value, maxVal = 100) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    const minFreq = 180;
    const maxFreq = 880;
    const freq = minFreq + (Math.max(1, value) / Math.max(1, maxVal)) * (maxFreq - minFreq);
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.085);
  } catch (e) {
    // Audio context may fail if blocked by browser policy until interaction
  }
}

// ==========================================================================
// STEP GENERATORS FOR ALL 8 ALGORITHMS
// ==========================================================================

function createStep(arr, props) {
  return {
    array: [...arr],
    highlight: {
      compare: props.compare || [],
      swap: props.swap || [],
      pivot: props.pivot || [],
      sorted: props.sorted || [],
      key: props.key !== undefined ? props.key : null
    },
    pointers: props.pointers || [],
    codeLine: props.codeLine || 1,
    variables: props.variables || {},
    actionTag: props.actionTag || "STEP",
    actionClass: props.actionClass || "",
    phase: props.phase || "In Progress",
    expression: props.expression || "",
    why: props.why || "",
    invariant: props.invariant || "",
    isMilestone: !!props.isMilestone,
    aux: props.aux || null,
    metrics: { ...props.metrics }
  };
}

// 1. Bubble Sort Generator
function generateBubbleSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Array size n = ${n}. Ready for adjacent bubble passes.`,
    why: "Bubble Sort will make up to n - 1 passes, comparing adjacent pairs and bubbling the largest value to the end in each pass.",
    invariant: "Initial state: No elements are yet confirmed to be in their final sorted positions.",
    codeLine: 1,
    variables: { n },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    const currentPass = i + 1;

    for (let j = 0; j < n - i - 1; j++) {
      accesses += 2;
      comps++;
      const valA = arr[j];
      const valB = arr[j + 1];
      const needsSwap = valA > valB;

      steps.push(createStep(arr, {
        compare: [j, j + 1],
        sorted: [...sortedSet],
        pointers: [
          { index: j, label: "j", type: "j" },
          { index: j + 1, label: "j+1", type: "i" }
        ],
        codeLine: 5,
        variables: { i, j, "A[j]": valA, "A[j+1]": valB, swapped },
        actionTag: "COMPARING",
        actionClass: "compare",
        phase: `Pass ${currentPass} of ${n - 1}`,
        expression: `A[${j}] (${valA}) > A[${j + 1}] (${valB}) → ${needsSwap ? "TRUE (Out of order!)" : "FALSE (Correct order)"}`,
        why: needsSwap 
          ? `${valA} is strictly greater than ${valB}. They violate ascending order and must be swapped.`
          : `${valA} ≤ ${valB}. They are already in proper relative order; no swap needed.`,
        invariant: `Loop Invariant: Subarray A[${n - i} .. ${n - 1}] is sorted. Comparing inside unsorted window A[0 .. ${n - i - 1}].`,
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      if (needsSwap) {
        swaps++;
        writes += 2;
        accesses += 2;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;

        steps.push(createStep(arr, {
          swap: [j, j + 1],
          sorted: [...sortedSet],
          pointers: [
            { index: j, label: "j", type: "j" },
            { index: j + 1, label: "j+1", type: "i" }
          ],
          codeLine: 6,
          variables: { i, j, "A[j]": arr[j], "A[j+1]": arr[j + 1], swapped: true },
          actionTag: "SWAPPED",
          actionClass: "swap",
          phase: `Pass ${currentPass} of ${n - 1}`,
          expression: `Swapped: A[${j}] ⇄ A[${j + 1}] (values ${valA} and ${valB})`,
          why: `Values ${valA} and ${valB} exchanged. The larger value (${valA}) continues its journey toward the end.`,
          invariant: `swapped flag set to true. Bubble Sort knows the array was not yet fully sorted.`,
          metrics: { comparisons: comps, swaps, writes, accesses }
        }));
      }
    }

    const fixedIdx = n - i - 1;
    sortedSet.add(fixedIdx);
    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pointers: [{ index: fixedIdx, label: "Fixed", type: "pivot" }],
      codeLine: 8,
      variables: { i, "placed": arr[fixedIdx], swapped },
      actionTag: "FIXED IN PLACE",
      actionClass: "sorted",
      phase: `Pass ${currentPass} Complete`,
      expression: `Element ${arr[fixedIdx]} is now permanently placed at index ${fixedIdx}.`,
      why: `Pass ${currentPass} finished: The largest element among the unsorted prefix has successfully bubbled to position ${fixedIdx}.`,
      invariant: `Loop Invariant: Suffix A[${fixedIdx} .. ${n - 1}] is now sorted and all elements are ≥ any element in A[0 .. ${fixedIdx - 1}].`,
      isMilestone: true,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    if (!swapped) {
      for (let k = 0; k < n; k++) sortedSet.add(k);
      steps.push(createStep(arr, {
        sorted: [...sortedSet],
        codeLine: 8,
        variables: { i, swapped: false },
        actionTag: "EARLY EXIT",
        actionClass: "sorted",
        phase: "Adaptive Termination",
        expression: "swapped == false: Zero swaps occurred in this pass!",
        why: "Adaptive optimization: Because an entire pass finished without a single swap, every adjacent pair is in order. The entire array is sorted!",
        invariant: "Best-case early termination achieved in O(n) time.",
        isMilestone: true,
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));
      break;
    }
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 9,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "All n elements are fully sorted in ascending order.",
    why: "Bubble sort complete. Invariant holds over the entire array A[0 .. n - 1].",
    invariant: "Array is verified sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 2. Selection Sort Generator
function generateSelectionSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Selection Sort initialized on array of size ${n}.`,
    why: "Selection Sort will perform n - 1 passes, finding the minimum element in the unsorted suffix and swapping it to the front.",
    invariant: "Prefix A[0 .. i - 1] is sorted; suffix A[i .. n - 1] is unsorted.",
    codeLine: 1,
    variables: { n },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    accesses++;

    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pivot: [minIdx],
      pointers: [
        { index: i, label: "i (Target)", type: "i" },
        { index: minIdx, label: "min_idx", type: "min" }
      ],
      codeLine: 3,
      variables: { i, min_idx: minIdx, "min_val": arr[minIdx] },
      actionTag: "INIT MIN",
      actionClass: "pivot",
      phase: `Pass ${i + 1}: Scanning Suffix [${i} .. ${n - 1}]`,
      expression: `Assumed initial minimum candidate: A[${minIdx}] = ${arr[minIdx]}`,
      why: `At the start of pass ${i + 1}, we assume the first unsorted element at index ${i} is the minimum until we find something smaller.`,
      invariant: `Searching for the true minimum element in the remaining unsorted range [${i} .. ${n - 1}].`,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    for (let j = i + 1; j < n; j++) {
      comps++;
      accesses += 2;
      const isSmaller = arr[j] < arr[minIdx];

      steps.push(createStep(arr, {
        compare: [j, minIdx],
        pivot: [minIdx],
        sorted: [...sortedSet],
        pointers: [
          { index: i, label: "i", type: "i" },
          { index: minIdx, label: "min_idx", type: "min" },
          { index: j, label: "j (Scan)", type: "j" }
        ],
        codeLine: 5,
        variables: { i, j, min_idx: minIdx, "A[j]": arr[j], "A[min]": arr[minIdx] },
        actionTag: "COMPARING",
        actionClass: "compare",
        phase: `Pass ${i + 1}: Finding Minimum`,
        expression: `A[${j}] (${arr[j]}) < A[${minIdx}] (${arr[minIdx]}) → ${isSmaller ? "TRUE (New min candidate!)" : "FALSE (Keep current min)"}`,
        why: isSmaller
          ? `Found a smaller value ${arr[j]} at index ${j}. We update min_idx.`
          : `${arr[j]} is not smaller than our current minimum ${arr[minIdx]}. Continue scanning.`,
        invariant: `min_idx holds the index of the smallest element inspected so far in range [${i} .. ${j}].`,
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      if (isSmaller) {
        minIdx = j;
        steps.push(createStep(arr, {
          pivot: [minIdx],
          sorted: [...sortedSet],
          pointers: [
            { index: i, label: "i", type: "i" },
            { index: minIdx, label: "New min_idx", type: "min" }
          ],
          codeLine: 6,
          variables: { i, min_idx: minIdx, "new_min": arr[minIdx] },
          actionTag: "MIN UPDATED",
          actionClass: "pivot",
          phase: `Pass ${i + 1}`,
          expression: `min_idx updated to ${minIdx} (Value: ${arr[minIdx]})`,
          why: `Index ${minIdx} now points to the new smallest candidate found so far.`,
          invariant: `Smallest element in A[${i} .. ${j}] is at index ${minIdx}.`,
          metrics: { comparisons: comps, swaps, writes, accesses }
        }));
      }
    }

    if (minIdx !== i) {
      swaps++;
      writes += 2;
      accesses += 2;
      const valI = arr[i];
      const valMin = arr[minIdx];
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];

      steps.push(createStep(arr, {
        swap: [i, minIdx],
        sorted: [...sortedSet],
        pointers: [
          { index: i, label: "i", type: "i" },
          { index: minIdx, label: "min_idx", type: "min" }
        ],
        codeLine: 8,
        variables: { i, min_idx: minIdx, swapped: `${valI} ⇄ ${valMin}` },
        actionTag: "SWAPPED MIN",
        actionClass: "swap",
        phase: `Pass ${i + 1} Swap`,
        expression: `Swapped A[${i}] ⇄ A[${minIdx}] (${valI} ⇄ ${valMin})`,
        why: `Placed the verified minimum value (${valMin}) into its permanent position at index ${i}.`,
        invariant: `Selection Sort uses at most 1 swap per pass. Total swaps ≤ n - 1.`,
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));
    }

    sortedSet.add(i);
    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pointers: [{ index: i, label: "Fixed", type: "pivot" }],
      codeLine: 2,
      variables: { i, "fixed": arr[i] },
      actionTag: "PREFIX EXTENDED",
      actionClass: "sorted",
      phase: `Pass ${i + 1} Complete`,
      expression: `Index ${i} (${arr[i]}) locked into sorted prefix.`,
      why: `Pass ${i + 1} complete. Sorted prefix now extends from 0 to ${i}.`,
      invariant: `Loop Invariant: Subarray A[0 .. ${i}] contains the ${i + 1} smallest elements of the entire array, sorted.`,
      isMilestone: true,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 9,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Selection Sort complete. Array is completely sorted.",
    why: "All elements placed via minimum selection.",
    invariant: "Total comparisons: n(n - 1) / 2 regardless of input.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 3. Insertion Sort Generator
function generateInsertionSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set([0]);

  steps.push(createStep(arr, {
    sorted: [0],
    pointers: [{ index: 0, label: "Sorted Prefix", type: "pivot" }],
    codeLine: 1,
    variables: { n, prefixLength: 1 },
    actionTag: "START",
    actionClass: "sorted",
    phase: "Algorithm Initialized",
    expression: `Initial prefix A[0] (${arr[0]}) is trivially sorted.`,
    why: "A single-element array is always sorted. Insertion sort proceeds by inserting elements from index 1 to n - 1 into this growing sorted prefix.",
    invariant: "Prefix A[0 .. 0] is sorted.",
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  for (let i = 1; i < n; i++) {
    accesses++;
    const key = arr[i];
    let j = i - 1;

    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      key: i,
      pointers: [
        { index: i, label: "Key", type: "key" },
        { index: j, label: "j", type: "j" }
      ],
      codeLine: 3,
      variables: { i, key, j },
      actionTag: "KEY EXTRACTED",
      actionClass: "key",
      phase: `Inserting Element ${i} of ${n - 1}`,
      expression: `Extracted key = ${key} at index ${i}.`,
      why: `We lift ${key} out of the array into a holding variable. Now we compare it against sorted elements to its left to find where it belongs.`,
      invariant: `Subarray A[0 .. ${i - 1}] is sorted. We will shift larger elements right to open a slot for key.`,
      aux: { type: "key", keyVal: key, keyIdx: i },
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    while (j >= 0) {
      comps++;
      accesses++;
      const leftVal = arr[j];
      const shouldShift = leftVal > key;

      steps.push(createStep(arr, {
        compare: [j],
        sorted: [...sortedSet],
        key: i,
        pointers: [
          { index: j, label: "j", type: "j" },
          { index: j + 1, label: "Open Slot", type: "key" }
        ],
        codeLine: 5,
        variables: { i, j, "A[j]": leftVal, key },
        actionTag: "COMPARING",
        actionClass: "compare",
        phase: `Finding Insertion Slot for Key (${key})`,
        expression: `A[${j}] (${leftVal}) > key (${key}) → ${shouldShift ? "TRUE (Shift right)" : "FALSE (Slot found!)"}`,
        why: shouldShift
          ? `${leftVal} is larger than key ${key}. It must shift one slot to the right.`
          : `${leftVal} ≤ key ${key}. We have found the correct position for key right after index ${j}!`,
        invariant: `All elements to the right of slot j + 1 are already shifted and > key.`,
        aux: { type: "key", keyVal: key, keyIdx: i },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      if (!shouldShift) break;

      writes++;
      accesses++;
      arr[j + 1] = arr[j];

      steps.push(createStep(arr, {
        swap: [j + 1],
        sorted: [...sortedSet],
        pointers: [
          { index: j, label: "Shifted", type: "i" },
          { index: j + 1, label: "Shifted →", type: "swap" }
        ],
        codeLine: 6,
        variables: { i, j, "A[j+1]": arr[j + 1], key },
        actionTag: "SHIFTED RIGHT",
        actionClass: "swap",
        phase: `Shifting Elements`,
        expression: `Shifted A[${j}] (${leftVal}) → A[${j + 1}]`,
        why: `Moved ${leftVal} one position to the right, vacating index ${j} for a possible key placement.`,
        invariant: `Shift leaves room for inserting key at position ${j}.`,
        aux: { type: "key", keyVal: key, keyIdx: i },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      j--;
    }

    writes++;
    arr[j + 1] = key;
    sortedSet.add(i);

    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pointers: [{ index: j + 1, label: "Inserted Key", type: "pivot" }],
      codeLine: 8,
      variables: { i, insertedAt: j + 1, key },
      actionTag: "KEY INSERTED",
      actionClass: "sorted",
      phase: `Element ${i} Placed`,
      expression: `Inserted key ${key} into vacated slot A[${j + 1}].`,
      why: `Key ${key} dropped into its exact sorted position. The sorted prefix now has length ${i + 1}.`,
      invariant: `Loop Invariant: Subarray A[0 .. ${i}] is now completely sorted.`,
      isMilestone: true,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 9,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Insertion Sort complete. All elements placed adaptively.",
    why: "Insertion Sort achieves O(n) when input has O(n) inversions.",
    invariant: "Array is completely sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 4. Merge Sort Generator
function generateMergeSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Merge Sort initialized on array of size ${n}. Divide & Conquer.`,
    why: "Merge sort recursively divides the array in halves, sorts each half, and merges the two sorted halves using an auxiliary buffer.",
    invariant: "Master recurrence: T(n) = 2T(n/2) + Θ(n) → Θ(n log n).",
    codeLine: 1,
    variables: { n, left: 0, right: n - 1 },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  function mergeSortHelper(left, right) {
    if (left >= right) return;
    const mid = Math.floor((left + right) / 2);

    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pointers: [
        { index: left, label: "Left", type: "left" },
        { index: mid, label: "Mid", type: "pivot" },
        { index: right, label: "Right", type: "right" }
      ],
      codeLine: 3,
      variables: { left, mid, right },
      actionTag: "DIVIDE",
      actionClass: "pivot",
      phase: `Dividing Subarray [${left} .. ${right}]`,
      expression: `mid = ⌊(${left} + ${right}) / 2⌋ = ${mid}. Splitting into [${left}..${mid}] and [${mid + 1}..${right}].`,
      why: "Divide step: Subproblem partitioned into two halves of roughly equal size.",
      invariant: "Problem size halved at each recursive level. Tree depth is ⌈log₂ n⌉.",
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);
    merge(left, mid, right);
  }

  function merge(left, mid, right) {
    const L = arr.slice(left, mid + 1);
    const R = arr.slice(mid + 1, right + 1);
    accesses += L.length + R.length;

    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pointers: [
        { index: left, label: "Start", type: "left" },
        { index: right, label: "End", type: "right" }
      ],
      codeLine: 8,
      variables: { left, mid, right, "LeftHalf": L.join(", "), "RightHalf": R.join(", ") },
      actionTag: "PREPARE MERGE",
      actionClass: "compare",
      phase: `Merging [${left}..${mid}] with [${mid + 1}..${right}]`,
      expression: `Auxiliary buffers copied: Left [${L}] and Right [${R}]`,
      why: "Merge step: We compare the front of Left buffer with front of Right buffer and copy the smaller one into main array.",
      invariant: "Both Left and Right buffers are independently sorted.",
      aux: { type: "merge", L: [...L], R: [...R], lIdx: 0, rIdx: 0, target: left },
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    let i = 0, j = 0, k = left;

    while (i < L.length && j < R.length) {
      comps++;
      const valL = L[i];
      const valR = R[j];
      const pickLeft = valL <= valR; // Stable choice

      steps.push(createStep(arr, {
        compare: [k],
        sorted: [...sortedSet],
        pointers: [{ index: k, label: "Target (k)", type: "j" }],
        codeLine: 9,
        variables: { "L[i]": valL, "R[j]": valR, k, pick: pickLeft ? "Left" : "Right" },
        actionTag: "MERGE COMPARE",
        actionClass: "compare",
        phase: `Merging into A[${k}]`,
        expression: `Left (${valL}) ≤ Right (${valR}) → ${pickLeft ? `Take Left (${valL})` : `Take Right (${valR})`}`,
        why: pickLeft
          ? `Left element (${valL}) is smaller or equal. It is chosen next to preserve stability.`
          : `Right element (${valR}) is smaller. Writing it into target index A[${k}].`,
        invariant: "Two-pointer linear scan ensures O(n) merge time.",
        aux: { type: "merge", L: [...L], R: [...R], lIdx: i, rIdx: j, target: k },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      writes++;
      if (pickLeft) {
        arr[k] = L[i++];
      } else {
        arr[k] = R[j++];
      }

      steps.push(createStep(arr, {
        swap: [k],
        sorted: [...sortedSet],
        pointers: [{ index: k, label: "Written", type: "pivot" }],
        codeLine: 9,
        variables: { k, wrote: arr[k] },
        actionTag: "WRITTEN",
        actionClass: "swap",
        phase: `Wrote A[${k}] = ${arr[k]}`,
        expression: `Wrote ${arr[k]} into position A[${k}].`,
        why: `Target slot A[${k}] receives its sorted value.`,
        invariant: `Merged prefix A[${left} .. ${k}] is sorted.`,
        aux: { type: "merge", L: [...L], R: [...R], lIdx: i, rIdx: j, target: k },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      k++;
    }

    while (i < L.length) {
      writes++;
      arr[k] = L[i++];
      steps.push(createStep(arr, {
        swap: [k],
        sorted: [...sortedSet],
        pointers: [{ index: k, label: "Remaining Left", type: "left" }],
        codeLine: 10,
        variables: { k, wrote: arr[k] },
        actionTag: "COPY REMAINING",
        actionClass: "swap",
        phase: `Draining Left Buffer`,
        expression: `Copied remaining Left element ${arr[k]} to A[${k}].`,
        why: `Right buffer empty. Flushing remaining elements from Left buffer.`,
        invariant: "Left buffer remaining elements are already sorted.",
        aux: { type: "merge", L: [...L], R: [...R], lIdx: i, rIdx: j, target: k },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));
      k++;
    }

    while (j < R.length) {
      writes++;
      arr[k] = R[j++];
      steps.push(createStep(arr, {
        swap: [k],
        sorted: [...sortedSet],
        pointers: [{ index: k, label: "Remaining Right", type: "right" }],
        codeLine: 10,
        variables: { k, wrote: arr[k] },
        actionTag: "COPY REMAINING",
        actionClass: "swap",
        phase: `Draining Right Buffer`,
        expression: `Copied remaining Right element ${arr[k]} to A[${k}].`,
        why: `Left buffer empty. Flushing remaining elements from Right buffer.`,
        invariant: "Right buffer remaining elements are already sorted.",
        aux: { type: "merge", L: [...L], R: [...R], lIdx: i, rIdx: j, target: k },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));
      k++;
    }

    if (left === 0 && right === n - 1) {
      for (let idx = 0; idx < n; idx++) sortedSet.add(idx);
    }

    steps.push(createStep(arr, {
      sorted: [...sortedSet],
      pointers: [
        { index: left, label: "Subarray", type: "left" },
        { index: right, label: "Merged", type: "right" }
      ],
      codeLine: 10,
      variables: { left, right },
      actionTag: "SUBARRAY MERGED",
      actionClass: "sorted",
      phase: `Subproblem [${left} .. ${right}] Complete`,
      expression: `Subarray [${left} .. ${right}] fully merged and sorted.`,
      why: `The two halves are now unified into a single sorted subarray.`,
      invariant: `Subarray A[${left} .. ${right}] is internally sorted.`,
      isMilestone: true,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));
  }

  mergeSortHelper(0, n - 1);

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 1,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Merge Sort complete. Guaranteed O(n log n) across all inputs.",
    why: "Stable divide-and-conquer finished.",
    invariant: "Array is completely sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 5. Quick Sort Generator
function generateQuickSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Quick Sort initialized on array of size ${n}. Lomuto Partitioning.`,
    why: "Quick Sort chooses a pivot, partitions elements into values < pivot and values ≥ pivot, and recursively sorts both subproblems in-place.",
    invariant: "Expected runtime: O(n log n). In-place with O(log n) call stack.",
    codeLine: 1,
    variables: { n, low: 0, high: n - 1 },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  function quickSortHelper(low, high) {
    if (low >= high) {
      if (low === high) sortedSet.add(low);
      return;
    }
    const p = partition(low, high);
    sortedSet.add(p);
    quickSortHelper(low, p - 1);
    quickSortHelper(p + 1, high);
  }

  function partition(low, high) {
    accesses++;
    const pivot = arr[high];
    let i = low - 1;

    steps.push(createStep(arr, {
      pivot: [high],
      sorted: [...sortedSet],
      pointers: [
        { index: high, label: "Pivot", type: "pivot" },
        { index: low, label: "low", type: "left" },
        { index: high, label: "high", type: "right" }
      ],
      codeLine: 7,
      variables: { low, high, pivot, "i (Boundary)": i },
      actionTag: "PIVOT CHOSEN",
      actionClass: "pivot",
      phase: `Partitioning Range [${low} .. ${high}]`,
      expression: `Pivot selected: A[${high}] = ${pivot}. Boundary i initialized to ${i}.`,
      why: `Using Lomuto partition: Last element (${pivot}) chosen as pivot. Pointer i marks the boundary of elements strictly smaller than pivot.`,
      invariant: `Partition Invariant: A[low .. i] < pivot and A[i + 1 .. j - 1] ≥ pivot.`,
      aux: { type: "quick", pivotVal: pivot, low, high, boundary: i },
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    for (let j = low; j < high; j++) {
      comps++;
      accesses++;
      const current = arr[j];
      const isSmaller = current < pivot;

      steps.push(createStep(arr, {
        compare: [j],
        pivot: [high],
        sorted: [...sortedSet],
        pointers: [
          { index: high, label: "Pivot", type: "pivot" },
          { index: j, label: "j (Scan)", type: "j" },
          ...(i >= low ? [{ index: i, label: "i (Boundary)", type: "i" }] : [])
        ],
        codeLine: 9,
        variables: { low, high, pivot, i, j, "A[j]": current },
        actionTag: "COMPARING PIVOT",
        actionClass: "compare",
        phase: `Partition Scanning: j = ${j}`,
        expression: `A[${j}] (${current}) < pivot (${pivot}) → ${isSmaller ? "TRUE (Move to Left Partition)" : "FALSE (Belongs in Right Partition)"}`,
        why: isSmaller
          ? `${current} is smaller than pivot ${pivot}. We increment boundary i and swap A[i] with A[j] to move it to the left side.`
          : `${current} is ≥ pivot ${pivot}. It stays in the right partition without swapping.`,
        invariant: `Elements left of boundary i are guaranteed < pivot.`,
        aux: { type: "quick", pivotVal: pivot, low, high, boundary: i },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      if (isSmaller) {
        i++;
        swaps++;
        writes += 2;
        accesses += 2;
        const valI = arr[i];
        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push(createStep(arr, {
          swap: [i, j],
          pivot: [high],
          sorted: [...sortedSet],
          pointers: [
            { index: high, label: "Pivot", type: "pivot" },
            { index: i, label: "i", type: "i" },
            { index: j, label: "j", type: "j" }
          ],
          codeLine: 9,
          variables: { low, high, pivot, i, j, swapped: `${valI} ⇄ ${current}` },
          actionTag: "SWAPPED TO LEFT",
          actionClass: "swap",
          phase: `Partition Swap`,
          expression: `Swapped A[${i}] ⇄ A[${j}] (${valI} ⇄ ${current})`,
          why: `Moved smaller element (${current}) into position ${i}, expanding the < pivot partition.`,
          invariant: `Subarray A[${low} .. ${i}] is confirmed < pivot.`,
          aux: { type: "quick", pivotVal: pivot, low, high, boundary: i },
          metrics: { comparisons: comps, swaps, writes, accesses }
        }));
      }
    }

    swaps++;
    writes += 2;
    accesses += 2;
    const finalPivotPos = i + 1;
    const oldAtPos = arr[finalPivotPos];
    [arr[finalPivotPos], arr[high]] = [arr[high], arr[finalPivotPos]];

    steps.push(createStep(arr, {
      swap: [finalPivotPos, high],
      sorted: [...sortedSet, finalPivotPos],
      pointers: [{ index: finalPivotPos, label: "Pivot Final Position", type: "pivot" }],
      codeLine: 10,
      variables: { finalPivotPos, pivot, swappedWith: oldAtPos },
      actionTag: "PIVOT PLACED",
      actionClass: "sorted",
      phase: `Partition Complete`,
      expression: `Pivot ${pivot} placed into permanent slot A[${finalPivotPos}].`,
      why: `The pivot is now flanked: everything to its left is < ${pivot}, and everything to its right is ≥ ${pivot}. The pivot will NEVER move again!`,
      invariant: `Loop Invariant verified: A[low .. p-1] < A[p] ≤ A[p+1 .. high].`,
      isMilestone: true,
      aux: { type: "quick", pivotVal: pivot, low, high, boundary: finalPivotPos },
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    return finalPivotPos;
  }

  quickSortHelper(0, n - 1);

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 1,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Quick Sort finished. All recursive partitions successfully placed.",
    why: "In-place divide-and-conquer complete.",
    invariant: "Array is completely sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 6. Heap Sort Generator
function generateHeapSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Heap Sort on array of size ${n}. Phase 1: Build Max-Heap.`,
    why: "Heap sort first converts the array into a Max-Heap in O(n) time, where every parent A[i] is ≥ its children. Then it repeatedly swaps the root (max) to the end.",
    invariant: "Max-Heap property: A[parent] ≥ A[child] where left = 2i + 1, right = 2i + 2.",
    codeLine: 2,
    variables: { n, heapSize: n },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size) {
      comps++; accesses += 2;
      if (arr[left] > arr[largest]) largest = left;
    }
    if (right < size) {
      comps++; accesses += 2;
      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== root) {
      swaps++; writes += 2; accesses += 2;
      const rootVal = arr[root];
      const maxChildVal = arr[largest];
      [arr[root], arr[largest]] = [arr[largest], arr[root]];

      steps.push(createStep(arr, {
        swap: [root, largest],
        sorted: [...sortedSet],
        pointers: [
          { index: root, label: "Parent", type: "i" },
          { index: largest, label: "Child", type: "j" }
        ],
        codeLine: 8,
        variables: { root, largest, heapSize: size, swapped: `${rootVal} ⇄ ${maxChildVal}` },
        actionTag: "HEAPIFY SIFT",
        actionClass: "swap",
        phase: `Heapify Sift-Down`,
        expression: `Parent (${rootVal}) < Child (${maxChildVal}). Swapped!`,
        why: `Max-heap violation at index ${root}. Larger child promoted to parent position.`,
        invariant: `Heapify continues sifting down to maintain max-heap property.`,
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      heapify(size, largest);
    }
  }

  // Phase 1: Build Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    pointers: [{ index: 0, label: "Max Root", type: "pivot" }],
    codeLine: 2,
    variables: { maxRoot: arr[0], heapSize: n },
    actionTag: "HEAP BUILT",
    actionClass: "pivot",
    phase: "Phase 1 Complete: Max-Heap Established",
    expression: `Max-Heap constructed! Root A[0] = ${arr[0]} is the global maximum.`,
    why: "All parents are now ≥ their children. Ready for Phase 2 (repeated extraction of max).",
    invariant: "Max-Heap property holds across the entire array in O(n) total work.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  // Phase 2: Extract Maximums
  for (let end = n - 1; end > 0; end--) {
    swaps++; writes += 2; accesses += 2;
    const maxVal = arr[0];
    const endVal = arr[end];
    [arr[0], arr[end]] = [arr[end], arr[0]];
    sortedSet.add(end);

    steps.push(createStep(arr, {
      swap: [0, end],
      sorted: [...sortedSet],
      pointers: [
        { index: 0, label: "Demoted Root", type: "j" },
        { index: end, label: "Sorted Max", type: "pivot" }
      ],
      codeLine: 4,
      variables: { end, extractedMax: maxVal, swappedWith: endVal },
      actionTag: "EXTRACTED MAX",
      actionClass: "sorted",
      phase: `Extracted Max to Position ${end}`,
      expression: `Moved current maximum (${maxVal}) from root A[0] → A[${end}].`,
      why: `The maximum element of the active heap is now locked in its final sorted position at the end.`,
      invariant: `Suffix A[${end} .. ${n - 1}] is sorted. Heap size reduced to ${end}.`,
      isMilestone: true,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    heapify(end, 0);
  }

  sortedSet.add(0);
  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 1,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Heap Sort complete. Guaranteed O(n log n) and strictly in-place O(1).",
    why: "All elements extracted from heap into sorted order.",
    invariant: "Array is completely sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 7. Shell Sort Generator
function generateShellSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Shell Sort initialized on size ${n}. Initial gap = ⌊${n} / 2⌋ = ${Math.floor(n / 2)}.`,
    why: "Shell sort generalizes insertion sort by comparing elements separated by a decreasing gap sequence, resolving distant inversions quickly.",
    invariant: "Gapped insertion sort leaves array increasingly ordered before the final gap=1 pass.",
    codeLine: 2,
    variables: { n, gap: Math.floor(n / 2) },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    steps.push(createStep(arr, {
      codeLine: 3,
      variables: { gap },
      actionTag: "GAP CHANGED",
      actionClass: "pivot",
      phase: `Starting Gap = ${gap}`,
      expression: `Current Gap = ${gap}. Comparing elements at distance ${gap}.`,
      why: `Each sublist composed of elements spaced by ${gap} will now be sorted via insertion sort.`,
      invariant: `Array will become ${gap}-sorted.`,
      isMilestone: true,
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));

    for (let i = gap; i < n; i++) {
      accesses++;
      const temp = arr[i];
      let j = i;

      while (j >= gap) {
        comps++; accesses++;
        const leftVal = arr[j - gap];
        const shouldShift = leftVal > temp;

        steps.push(createStep(arr, {
          compare: [j - gap, j],
          pointers: [
            { index: j - gap, label: `j - gap (${gap})`, type: "i" },
            { index: j, label: "j", type: "j" }
          ],
          codeLine: 6,
          variables: { gap, i, j, "A[j-gap]": leftVal, temp },
          actionTag: "GAP COMPARE",
          actionClass: "compare",
          phase: `Gap ${gap} Comparison`,
          expression: `A[${j - gap}] (${leftVal}) > temp (${temp}) → ${shouldShift ? "TRUE (Shift across gap)" : "FALSE (Correct relative order)"}`,
          why: shouldShift
            ? `${leftVal} is larger than ${temp} across gap ${gap}. Shifting right by ${gap} slots.`
            : `Relative order across gap is valid.`,
          invariant: `Gapped elements are sorted independently.`,
          metrics: { comparisons: comps, swaps, writes, accesses }
        }));

        if (!shouldShift) break;

        writes++; accesses++;
        arr[j] = arr[j - gap];
        steps.push(createStep(arr, {
          swap: [j],
          pointers: [{ index: j, label: `Shifted +${gap}`, type: "swap" }],
          codeLine: 7,
          variables: { gap, j, wrote: arr[j] },
          actionTag: "GAP SHIFT",
          actionClass: "swap",
          phase: `Gap ${gap} Shift`,
          expression: `Shifted A[${j - gap}] (${leftVal}) → A[${j}]`,
          why: `Element moved ${gap} positions to the right to open space for temp.`,
          invariant: `Gap shift resolves multiple adjacent inversions in one step.`,
          metrics: { comparisons: comps, swaps, writes, accesses }
        }));

        j -= gap;
      }

      writes++;
      arr[j] = temp;
    }
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 1,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Shell Sort complete. Diminishing gaps finished at gap = 1.",
    why: "The final gap = 1 pass took minimal time because the array was already nearly sorted.",
    invariant: "Array is completely sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// 8. Counting Sort Generator
function generateCountingSteps(input) {
  const steps = [];
  const arr = [...input];
  const n = arr.length;
  let comps = 0, swaps = 0, writes = 0, accesses = 0;
  const sortedSet = new Set();

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;

  steps.push(createStep(arr, {
    actionTag: "START",
    actionClass: "compare",
    phase: "Algorithm Initialized",
    expression: `Counting Sort. Min = ${min}, Max = ${max}, Key Range k = ${range}.`,
    why: "Counting sort is a non-comparison algorithm that runs in O(n + k) linear time by counting value frequencies directly.",
    invariant: "Bypasses the Ω(n log n) comparison bound by using integer arithmetic indices.",
    codeLine: 2,
    variables: { n, min, max, k: range },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  const count = new Array(range).fill(0);

  // Phase 1: Frequency Counting
  for (let i = 0; i < n; i++) {
    accesses++;
    const val = arr[i];
    count[val - min]++;

    steps.push(createStep(arr, {
      pointers: [{ index: i, label: `val = ${val}`, type: "j" }],
      codeLine: 4,
      variables: { i, value: val, "count[val]": count[val - min] },
      actionTag: "COUNTING FREQ",
      actionClass: "pivot",
      phase: `Counting Element ${i + 1} of ${n}`,
      expression: `Found value ${val}. Incremented Count[${val} - ${min}] to ${count[val - min]}.`,
      why: `Instead of comparing, we record that value ${val} appeared one more time.`,
      invariant: `Count array maintains exact frequency of each distinct key.`,
      aux: { type: "counting", countArr: [...count], min, max },
      metrics: { comparisons: comps, swaps, writes, accesses }
    }));
  }

  steps.push(createStep(arr, {
    codeLine: 5,
    variables: { "Frequencies": count.map((c, idx) => `${idx + min}:${c}`).join(", ") },
    actionTag: "FREQUENCIES READY",
    actionClass: "sorted",
    phase: "Phase 1 Complete: Frequency Table Ready",
    expression: `All frequencies counted. Reconstructing sorted output array.`,
    why: "Now we iterate through the count table and write elements back in increasing order.",
    invariant: "Output can be generated directly in order of keys.",
    isMilestone: true,
    aux: { type: "counting", countArr: [...count], min, max },
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  // Phase 2: Reconstruction
  let writeIdx = 0;
  for (let valIdx = 0; valIdx < range; valIdx++) {
    const val = valIdx + min;
    while (count[valIdx] > 0) {
      writes++;
      arr[writeIdx] = val;
      sortedSet.add(writeIdx);

      steps.push(createStep(arr, {
        swap: [writeIdx],
        sorted: [...sortedSet],
        pointers: [{ index: writeIdx, label: `Placed ${val}`, type: "pivot" }],
        codeLine: 7,
        variables: { writeIdx, placedValue: val, remainingCount: count[valIdx] - 1 },
        actionTag: "PLACED ELEMENT",
        actionClass: "sorted",
        phase: `Writing Sorted Values`,
        expression: `Wrote value ${val} into position A[${writeIdx}].`,
        why: `Taking next occurrence of value ${val} from count array and placing it into output.`,
        invariant: `Prefix A[0 .. ${writeIdx}] contains sorted values.`,
        aux: { type: "counting", countArr: [...count], min, max, currentVal: val },
        metrics: { comparisons: comps, swaps, writes, accesses }
      }));

      writeIdx++;
      count[valIdx]--;
    }
  }

  for (let k = 0; k < n; k++) sortedSet.add(k);
  steps.push(createStep(arr, {
    sorted: [...sortedSet],
    codeLine: 8,
    variables: { status: "Complete" },
    actionTag: "SORTED",
    actionClass: "sorted",
    phase: "Algorithm Finished",
    expression: "Counting Sort complete in linear O(n + k) time.",
    why: "Non-comparison sorting completed without a single key comparison.",
    invariant: "Array is completely sorted.",
    isMilestone: true,
    metrics: { comparisons: comps, swaps, writes, accesses }
  }));

  return steps;
}

// Master step generation dispatcher
function generateSteps(algoKey, inputArr) {
  switch (algoKey) {
    case "bubble": return generateBubbleSteps(inputArr);
    case "selection": return generateSelectionSteps(inputArr);
    case "insertion": return generateInsertionSteps(inputArr);
    case "merge": return generateMergeSteps(inputArr);
    case "quick": return generateQuickSteps(inputArr);
    case "heap": return generateHeapSteps(inputArr);
    case "shell": return generateShellSteps(inputArr);
    case "counting": return generateCountingSteps(inputArr);
    default: return generateBubbleSteps(inputArr);
  }
}

// ==========================================================================
// RENDERING ENGINES (CARD VIEW & BAR VIEW)
// ==========================================================================

function renderStep(stepIndex) {
  if (!steps.length || stepIndex < 0 || stepIndex >= steps.length) return;
  const step = steps[stepIndex];
  const maxVal = Math.max(...step.array, 1);
  const n = step.array.length;

  // 1. Update Narration Card
  els.actionTag.textContent = step.actionTag;
  els.actionTag.className = `action-tag ${step.actionClass}`;
  els.phaseTag.textContent = step.phase;
  els.stepCounter.textContent = `Step ${stepIndex + 1} of ${steps.length}`;
  const pct = Math.round(((stepIndex + 1) / steps.length) * 100);
  els.stepPercent.textContent = `(${pct}%)`;
  els.narrationExpression.innerHTML = step.expression;
  els.narrationWhy.innerHTML = step.why;
  els.narrationInvariant.innerHTML = `💡 <b>Viva Concept:</b> ${step.invariant}`;

  // 2. Update Status Text & Scrubber
  els.statusText.textContent = `${step.phase} — ${step.actionTag}`;
  els.stepScrubber.max = steps.length - 1;
  els.stepScrubber.value = stepIndex;
  if (els.scrubberFill) {
    const pctFloat = steps.length > 1 ? (stepIndex / (steps.length - 1)) * 100 : 0;
    els.scrubberFill.style.width = `${pctFloat}%`;
  }

  // 3. Render Elements based on View Mode
  if (currentViewMode === "card") {
    renderCardView(step, maxVal);
  } else {
    renderBarView(step, maxVal);
  }

  // 4. Render Auxiliary Structure Area
  renderAuxArea(step);

  // 5. Update Metrics Grid
  els.comparisons.textContent = step.metrics.comparisons.toLocaleString();
  els.swaps.textContent = step.metrics.swaps.toLocaleString();
  els.writes.textContent = step.metrics.writes.toLocaleString();
  els.accesses.textContent = step.metrics.accesses.toLocaleString();
  els.stepMetric.textContent = `${stepIndex + 1} / ${steps.length}`;

  // 6. Update Array Footer
  const min = Math.min(...step.array);
  const max = Math.max(...step.array);
  els.minValue.textContent = min;
  els.maxValue.textContent = max;
  els.currentSize.textContent = n;
  els.inversionCount.textContent = countInversions(step.array);
  // 7. Update Step Navigation Buttons
  els.prevStepBtn.disabled = stepIndex <= 0;
  els.nextStepBtn.disabled = stepIndex >= steps.length - 1;
  els.resetStepBtn.disabled = stepIndex === 0;

  // 10. Sound Effect
  if (step.pointers.length > 0) {
    const activeIdx = step.pointers[0].index;
    if (activeIdx >= 0 && activeIdx < step.array.length) {
      playTone(step.array[activeIdx], maxVal);
    }
  }
}

// Card View Renderer (The Viva Favorite: Human-readable)
function renderCardView(step, maxVal) {
  const isScrollable = step.array.length > 8;
  els.visualizer.className = `visualizer card-mode ${isScrollable ? 'scrollable' : ''}`;
  els.visualizer.innerHTML = "";

  const pointersByIndex = {};
  step.pointers.forEach(p => {
    if (!pointersByIndex[p.index]) pointersByIndex[p.index] = [];
    pointersByIndex[p.index].push(p);
  });

  step.array.forEach((val, idx) => {
    const item = document.createElement("div");
    item.className = "card-item";

    // Pointers Stack above card
    if (pointersByIndex[idx]) {
      const pStack = document.createElement("div");
      pStack.className = "pointer-stack";
      pointersByIndex[idx].forEach(p => {
        const pill = document.createElement("span");
        pill.className = `pointer-pill p-${p.type}`;
        pill.textContent = `▲ ${p.label}`;
        pStack.appendChild(pill);
      });
      item.appendChild(pStack);
    }

    // Element Card
    const card = document.createElement("div");
    card.className = "elem-card";

    // Dynamic states
    if (step.highlight.compare.includes(idx)) card.classList.add("comparing");
    if (step.highlight.swap.includes(idx)) card.classList.add("swapping");
    if (step.highlight.pivot.includes(idx)) card.classList.add("pivot-target");
    if (step.highlight.sorted.includes(idx)) card.classList.add("sorted-done");

    // Relative height gauge at bottom of card
    const gauge = document.createElement("div");
    gauge.className = "card-bar-bg";
    const heightPct = Math.max(8, Math.round((val / maxVal) * 100));
    gauge.style.height = `${heightPct}%`;
    card.appendChild(gauge);

    // Number value
    const num = document.createElement("span");
    num.className = "card-num";
    num.textContent = val;
    card.appendChild(num);

    // State icon
    const icon = document.createElement("span");
    icon.className = "card-state-icon";
    if (step.highlight.sorted.includes(idx)) icon.textContent = "✓";
    else if (step.highlight.pivot.includes(idx)) icon.textContent = "★";
    else if (step.highlight.swap.includes(idx)) icon.textContent = "⇄";
    else if (step.highlight.compare.includes(idx)) icon.textContent = "🔍";
    card.appendChild(icon);

    item.appendChild(card);

    // Index label below card
    const idxLabel = document.createElement("span");
    idxLabel.className = "card-idx";
    idxLabel.textContent = `[${idx}]`;
    item.appendChild(idxLabel);

    els.visualizer.appendChild(item);
  });

  // Smoothly scroll active pointer / compare / swap item into view if out of bounds
  if (step.pointers && step.pointers.length > 0) {
    const activeIdx = step.pointers[0].index;
    if (activeIdx >= 0 && activeIdx < els.visualizer.children.length) {
      const activeEl = els.visualizer.children[activeIdx];
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }
  }
}

// Bar View Renderer (Proportional Spectrum)
function renderBarView(step, maxVal) {
  els.visualizer.className = "visualizer bar-mode";
  els.visualizer.innerHTML = "";

  const pointersByIndex = {};
  step.pointers.forEach(p => {
    if (!pointersByIndex[p.index]) pointersByIndex[p.index] = [];
    pointersByIndex[p.index].push(p);
  });

  step.array.forEach((val, idx) => {
    const wrap = document.createElement("div");
    wrap.className = "bar-wrap";

    // Value label on top (if not too crowded)
    if (step.array.length <= 32) {
      const topLabel = document.createElement("span");
      topLabel.className = "bar-value-top";
      topLabel.textContent = val;
      wrap.appendChild(topLabel);
    }

    // Bar element
    const bar = document.createElement("div");
    bar.className = "bar-elem";
    const heightPct = Math.max(4, Math.round((val / maxVal) * 92));
    bar.style.height = `${heightPct}%`;

    if (step.highlight.compare.includes(idx)) bar.classList.add("compare");
    if (step.highlight.swap.includes(idx)) bar.classList.add("swap");
    if (step.highlight.pivot.includes(idx)) bar.classList.add("pivot");
    if (step.highlight.sorted.includes(idx)) bar.classList.add("sorted");

    wrap.appendChild(bar);

    // Index on bottom
    if (step.array.length <= 32) {
      const idxLabel = document.createElement("span");
      idxLabel.className = "bar-idx-bottom";
      idxLabel.textContent = idx;
      wrap.appendChild(idxLabel);
    }

    els.visualizer.appendChild(wrap);
  });
}

// Auxiliary Structure Renderer
function renderAuxArea(step) {
  if (!step.aux) {
    els.auxContainer.className = "aux-container";
    els.auxContainer.innerHTML = "";
    return;
  }

  els.auxContainer.className = "aux-container active";

  if (step.aux.type === "merge") {
    const { L, R, lIdx, rIdx, target } = step.aux;
    els.auxContainer.innerHTML = `
      <div class="aux-title">
        <span>Merge Sort Auxiliary Working Buffers</span>
        <span>Target slot: A[${target}]</span>
      </div>
      <div class="aux-flex">
        <div class="aux-sub-group">
          <span class="aux-sub-label">Left Buffer L (sorted):</span>
          <div class="aux-card-row">
            ${L.map((x, i) => `
              <div class="aux-mini-card ${i === lIdx ? 'active' : ''} ${i < lIdx ? 'taken' : ''}">
                ${x}
              </div>
            `).join('')}
          </div>
        </div>
        <div style="font-size: 18px; color: var(--primary);">➔ merge into A[k] ➔</div>
        <div class="aux-sub-group">
          <span class="aux-sub-label">Right Buffer R (sorted):</span>
          <div class="aux-card-row">
            ${R.map((x, j) => `
              <div class="aux-mini-card ${j === rIdx ? 'active' : ''} ${j < rIdx ? 'taken' : ''}">
                ${x}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (step.aux.type === "key") {
    const { keyVal, keyIdx } = step.aux;
    els.auxContainer.innerHTML = `
      <div class="aux-title">
        <span>Insertion Sort Holding Slot</span>
        <span>Extracted from A[${keyIdx}]</span>
      </div>
      <div class="aux-flex">
        <div class="aux-sub-group">
          <span class="aux-sub-label">Current Key in Hand:</span>
          <div class="aux-mini-card active" style="font-size: 18px; width: 50px; height: 50px;">
            ${keyVal}
          </div>
        </div>
        <div style="font-size: 13px; color: var(--text-muted); max-width: 320px;">
          Elements greater than <b>${keyVal}</b> are shifting right to make room. Key will drop into the vacated slot.
        </div>
      </div>
    `;
  } else if (step.aux.type === "counting") {
    const { countArr, min, max } = step.aux;
    els.auxContainer.innerHTML = `
      <div class="aux-title">
        <span>Counting Sort Frequency Table C[0 .. ${max - min}]</span>
        <span>Key offset = -${min}</span>
      </div>
      <div class="aux-flex" style="justify-content: flex-start; overflow-x: auto;">
        ${countArr.map((c, idx) => `
          <div class="aux-sub-group">
            <span class="aux-sub-label" style="font-size: 9.5px;">Val ${idx + min}</span>
            <div class="aux-mini-card ${c > 0 ? 'active' : ''}" style="width: 36px; height: 38px;">
              ${c}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else if (step.aux.type === "quick") {
    const { pivotVal, low, high, boundary } = step.aux;
    els.auxContainer.innerHTML = `
      <div class="aux-title">
        <span>Quick Sort Lomuto Partition Status</span>
        <span>Active subproblem: [${low} .. ${high}]</span>
      </div>
      <div class="aux-flex">
        <div class="aux-sub-group">
          <span class="aux-sub-label">Active Pivot:</span>
          <div class="aux-mini-card active" style="border-color: var(--color-pivot); color: var(--color-pivot); font-weight: 800;">
            ${pivotVal}
          </div>
        </div>
        <div style="font-size: 12px; color: var(--text-muted);">
          Boundary pointer <b>i = ${boundary}</b>. All elements in <code>A[${low} .. ${boundary}]</code> are guaranteed <b>&lt; ${pivotVal}</b>.
        </div>
      </div>
    `;
  }
}

// Python Syntax Highlighter (Lightweight, pure regex)
function highlightPython(code) {
  let res = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Format single-line comments
  res = res.replace(/(#.*$)/gm, '<span class="py-cmt">$1</span>');

  // Format strings
  res = res.replace(/(['"].*?['"])(?!([^<]*>))/g, '<span class="py-str">$1</span>');

  // Format keywords
  res = res.replace(/\b(def|return|if|else|elif|for|in|while|break|continue|and|or|not)\b(?![^<]*>)/g, '<span class="py-kw">$1</span>');

  // Format booleans
  res = res.replace(/\b(True|False|None)\b(?![^<]*>)/g, '<span class="py-bool">$1</span>');

  // Format built-ins & functions
  res = res.replace(/\b(range|len|min|max|append|extend)\b(?![^<]*>)/g, '<span class="py-fn">$1</span>');
  res = res.replace(/(?<=def\s+)([a-zA-Z_]\w*)/g, '<span class="py-fn">$1</span>');

  // Format numbers
  res = res.replace(/\b(\d+)\b(?![^<]*>)/g, '<span class="py-num">$1</span>');

  return res;
}

// ==========================================================================
// PLAYBACK ENGINE (STEP FORWARD, STEP BACKWARD, PLAY, PAUSE)
// ==========================================================================

function getSpeedDelay() {
  const speed = Number(els.speed.value);
  // Speed slider 1 (slow, 1400ms) to 100 (fast, 25ms)
  return Math.round(1400 - (speed - 1) * 13.8);
}

function updateSpeedLabel() {
  const val = Number(els.speed.value);
  if (val < 25) els.speedValue.textContent = "Slow (Viva)";
  else if (val < 65) els.speedValue.textContent = "Normal";
  else if (val < 90) els.speedValue.textContent = "Fast";
  else els.speedValue.textContent = "Blitz";

  // Sync speed preset chips
  document.querySelectorAll(".speed-chip").forEach(chip => {
    const sVal = Number(chip.dataset.speed);
    chip.classList.toggle("active", Math.abs(sVal - val) < 18);
  });
}

function play() {
  if (isPlaying) return;
  if (currentStepIndex >= steps.length - 1) {
    currentStepIndex = 0; // Restart if at end
  }
  isPlaying = true;
  els.playPauseBtn.textContent = "⏸ Pause";
  els.playPauseBtn.className = "toolbar-btn primary";

  function tick() {
    if (!isPlaying) return;

    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      renderStep(currentStepIndex);

      // Auto-pause check on milestone
      if (els.autoPause.checked && steps[currentStepIndex].isMilestone && currentStepIndex < steps.length - 1) {
        pause();
        els.statusText.textContent = `Auto-paused on milestone: ${steps[currentStepIndex].actionTag}. Explain to faculty, then click Play or Step Forward.`;
        return;
      }

      playInterval = setTimeout(tick, getSpeedDelay());
    } else {
      pause();
    }
  }

  playInterval = setTimeout(tick, getSpeedDelay());
}

function pause() {
  isPlaying = false;
  if (playInterval) clearTimeout(playInterval);
  els.playPauseBtn.textContent = "▶ Play";
  els.playPauseBtn.className = "toolbar-btn primary-outline";
}

function togglePlay() {
  if (isPlaying) pause();
  else play();
}

function nextStep() {
  pause();
  if (currentStepIndex < steps.length - 1) {
    currentStepIndex++;
    renderStep(currentStepIndex);
  }
}

function prevStep() {
  pause();
  if (currentStepIndex > 0) {
    currentStepIndex--;
    renderStep(currentStepIndex);
  }
}

function resetSteps() {
  pause();
  currentStepIndex = 0;
  renderStep(currentStepIndex);
}

function seekStep(index) {
  pause();
  currentStepIndex = Math.max(0, Math.min(steps.length - 1, Number(index)));
  renderStep(currentStepIndex);
}

// ==========================================================================
// ARRAY GENERATION & PRESETS
// ==========================================================================

function generateRandomArray(n) {
  const set = new Set();
  const arr = [];
  while (arr.length < n) {
    const val = Math.floor(Math.random() * 88) + 11; // Whole numbers 11 to 99
    if (!set.has(val) || n > 50) {
      set.add(val);
      arr.push(val);
    }
  }
  return arr;
}

function generateInputArray(forceRandom = false) {
  pause();
  if (forceRandom) {
    els.preset.value = "random";
  }
  const preset = els.preset.value;
  const n = Number(els.size.value);

  // Sync quick preset chips in hero
  document.querySelectorAll(".quick-chip").forEach(chip => {
    chip.classList.toggle("active", chip.dataset.preset === preset);
  });

  if (preset === "vivaClassic") {
    originalArray = [64, 34, 25, 12, 22, 11, 90];
    els.size.value = 7;
    els.sizeValue.textContent = "7";
  } else if (preset === "reversed") {
    const fresh = generateRandomArray(n);
    fresh.sort((a, b) => b - a);
    originalArray = fresh;
  } else if (preset === "nearly") {
    const fresh = generateRandomArray(n);
    fresh.sort((a, b) => a - b);
    if (n >= 4) {
      const idx = Math.floor(Math.random() * (n - 2)) + 1;
      [fresh[idx], fresh[idx + 1]] = [fresh[idx + 1], fresh[idx]];
    }
    originalArray = fresh;
  } else if (preset === "duplicates") {
    const pool = Array.from({ length: Math.max(3, Math.floor(n / 3)) }, () => Math.floor(Math.random() * 80) + 10);
    originalArray = Array.from({ length: n }, () => pool[Math.floor(Math.random() * pool.length)]);
  } else {
    // Random
    originalArray = generateRandomArray(n);
  }

  loadAlgorithmSteps();
}

function applyCustomArray() {
  pause();
  const raw = els.custom.value.trim();
  if (!raw) {
    alert("Please enter comma-separated numbers (e.g. 42, 17, 8, 91, 33).");
    return;
  }
  const parsed = raw.split(/[\s,]+/).map(Number);
  if (!parsed.every(Number.isFinite) || parsed.length < 2 || parsed.length > 50) {
    alert("Please enter between 2 and 50 valid numbers.");
    return;
  }
  originalArray = parsed;
  els.size.value = originalArray.length;
  els.sizeValue.textContent = originalArray.length;
  loadAlgorithmSteps();
}

function loadAlgorithmSteps() {
  const algoKey = els.algorithm.value;
  steps = generateSteps(algoKey, originalArray);
  currentStepIndex = 0;
  updateAlgorithmMetaUI(algoKey);
  renderStep(0);
}

// Inversion count calculation
function countInversions(arr) {
  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) count++;
    }
  }
  return count;
}

function isArraySorted(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) return false;
  }
  return true;
}

// ==========================================================================
// ALGORITHM THEORETICAL INFO & PSEUDOCODE INITIALIZATION
// ==========================================================================

function updateAlgorithmMetaUI(algoKey) {
  const meta = algorithmMetadata[algoKey];
  if (!meta) return;

  els.heroAlgorithm.textContent = meta.name;
  els.heroSummary.textContent = meta.summary;
  els.algoCategoryBadge.textContent = meta.category;

  els.bestCase.textContent = meta.best;
  els.bestCondition.textContent = meta.bestCond;
  els.averageCase.textContent = meta.average;
  els.worstCase.textContent = meta.worst;
  els.worstCondition.textContent = meta.worstCond;
  els.spaceCase.textContent = meta.space;
  els.spaceCondition.textContent = meta.spaceCond;

  els.stableBadge.textContent = meta.stable ? "✓ Stable" : "✕ Not Stable";
  els.stableBadge.className = `badge ${meta.stable ? 'true' : 'false'}`;

  els.inPlaceBadge.textContent = meta.inPlace ? "✓ In-Place" : "✕ Extra Memory";
  els.inPlaceBadge.className = `badge ${meta.inPlace ? 'true' : 'false'}`;

  els.adaptiveBadge.textContent = meta.adaptive ? "✓ Adaptive" : "✕ Non-Adaptive";
  els.adaptiveBadge.className = `badge ${meta.adaptive ? 'true' : 'false'}`;

  els.comparisonBadge.textContent = meta.comparison ? "Comparison-based" : "Non-comparison";
  els.comparisonBadge.className = "badge";

  els.algorithmIdea.textContent = meta.idea;

  // Render Clean Python Pseudocode
  const pyCode = pythonCodeMap[algoKey] || "";
  els.pythonCodeDisplay.innerHTML = highlightPython(pyCode);

  // Render Viva Accordion
  els.vivaAccordion.innerHTML = meta.viva.map((item, idx) => `
    <details class="viva-item" ${idx === 0 ? 'open' : ''}>
      <summary class="viva-summary">
        <span>Q: ${item.q}</span>
      </summary>
      <div class="viva-answer">
        ${item.a}
      </div>
    </details>
  `).join("");
}

// ==========================================================================
// BENCHMARK RUNNER (Empirical Proof for Viva)
// ==========================================================================

function benchmarkAllAlgorithms() {
  if (!originalArray || !originalArray.length) return;
  els.benchmarkBody.innerHTML = `<tr><td colspan="7" class="muted-text">⚡ Running benchmark on all 8 algorithms with current array data...</td></tr>`;

  setTimeout(() => {
    const keys = ["bubble", "selection", "insertion", "merge", "quick", "heap", "shell", "counting"];
    const results = [];

    for (const key of keys) {
      const arrCopy = [...originalArray];
      let comps = 0, swaps = 0, writes = 0;
      const t0 = performance.now();

      const cmp = (a, b) => { comps++; return a - b; };
      const sw = (i, j) => { if (i === j) return; [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]; swaps++; writes += 2; };
      const wr = (i, v) => { arrCopy[i] = v; writes++; };

      // Fast synchronous benchmark versions
      if (key === "bubble") {
        for (let i = 0; i < arrCopy.length - 1; i++) {
          let swapped = false;
          for (let j = 0; j < arrCopy.length - i - 1; j++) {
            if (cmp(arrCopy[j], arrCopy[j + 1]) > 0) { sw(j, j + 1); swapped = true; }
          }
          if (!swapped) break;
        }
      } else if (key === "selection") {
        for (let i = 0; i < arrCopy.length - 1; i++) {
          let m = i;
          for (let j = i + 1; j < arrCopy.length; j++) if (cmp(arrCopy[j], arrCopy[m]) < 0) m = j;
          if (m !== i) sw(i, m);
        }
      } else if (key === "insertion") {
        for (let i = 1; i < arrCopy.length; i++) {
          const k = arrCopy[i]; let j = i - 1;
          while (j >= 0 && cmp(arrCopy[j], k) > 0) { wr(j + 1, arrCopy[j]); j--; }
          wr(j + 1, k);
        }
      } else if (key === "merge") {
        function mSort(l, r) {
          if (l >= r) return;
          const mid = Math.floor((l + r) / 2);
          mSort(l, mid); mSort(mid + 1, r);
          const L = arrCopy.slice(l, mid + 1), R = arrCopy.slice(mid + 1, r + 1);
          let i = 0, j = 0, k = l;
          while (i < L.length && j < R.length) {
            if (cmp(L[i], R[j]) <= 0) wr(k++, L[i++]); else wr(k++, R[j++]);
          }
          while (i < L.length) wr(k++, L[i++]);
          while (j < R.length) wr(k++, R[j++]);
        }
        mSort(0, arrCopy.length - 1);
      } else if (key === "quick") {
        function qSort(l, h) {
          if (l >= h) return;
          const p = arrCopy[h]; let i = l - 1;
          for (let j = l; j < h; j++) {
            if (cmp(arrCopy[j], p) < 0) { i++; sw(i, j); }
          }
          sw(i + 1, h);
          const pivotIdx = i + 1;
          qSort(l, pivotIdx - 1); qSort(pivotIdx + 1, h);
        }
        qSort(0, arrCopy.length - 1);
      } else if (key === "heap") {
        function hpfy(sz, r) {
          let lrg = r, l = 2 * r + 1, right = 2 * r + 2;
          if (l < sz && cmp(arrCopy[l], arrCopy[lrg]) > 0) lrg = l;
          if (right < sz && cmp(arrCopy[right], arrCopy[lrg]) > 0) lrg = right;
          if (lrg !== r) { sw(r, lrg); hpfy(sz, lrg); }
        }
        for (let i = Math.floor(arrCopy.length / 2) - 1; i >= 0; i--) hpfy(arrCopy.length, i);
        for (let end = arrCopy.length - 1; end > 0; end--) { sw(0, end); hpfy(end, 0); }
      } else if (key === "shell") {
        for (let gap = Math.floor(arrCopy.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
          for (let i = gap; i < arrCopy.length; i++) {
            const temp = arrCopy[i]; let j = i;
            while (j >= gap && cmp(arrCopy[j - gap], temp) > 0) { wr(j, arrCopy[j - gap]); j -= gap; }
            wr(j, temp);
          }
        }
      } else if (key === "counting") {
        const min = Math.min(...arrCopy), max = Math.max(...arrCopy);
        const count = new Array(max - min + 1).fill(0);
        for (const x of arrCopy) count[x - min]++;
        let idx = 0;
        for (let v = 0; v < count.length; v++) {
          while (count[v] > 0) { wr(idx++, v + min); count[v]--; }
        }
      }

      const elapsed = performance.now() - t0;
      results.push({
        key,
        name: algorithmMetadata[key].name,
        category: algorithmMetadata[key].category.split("·")[0].trim(),
        ms: elapsed,
        comps,
        swaps,
        writes,
        isSorted: isArraySorted(arrCopy)
      });
    }

    els.benchmarkBody.innerHTML = results.map(r => `
      <tr>
        <td><b>${r.name}</b></td>
        <td><small class="code-span">${r.category}</small></td>
        <td><b>${r.ms.toFixed(3)} ms</b></td>
        <td>${r.comps.toLocaleString()}</td>
        <td>${r.swaps.toLocaleString()}</td>
        <td>${r.writes.toLocaleString()}</td>
        <td class="result-ok">✓ ${r.isSorted ? "Verified Sorted" : "Failed"}</td>
      </tr>
    `).join("");
  }, 40);
}

// ==========================================================================
// VIEW MODE TOGGLE & THEME TOGGLE
// ==========================================================================

function setViewMode(mode) {
  currentViewMode = mode;
  els.viewModeCard.classList.toggle("active", mode === "card");
  els.viewModeBar.classList.toggle("active", mode === "bar");
  renderStep(currentStepIndex);
}

function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute("data-theme") === "dark";
  root.setAttribute("data-theme", isDark ? "light" : "dark");
  els.themeBtn.textContent = isDark ? "☾" : "☀";
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  els.soundIcon.textContent = soundEnabled ? "🔊" : "🔇";
  els.soundStatusText.textContent = soundEnabled ? "On" : "Off";
}

// ==========================================================================
// EVENT LISTENERS & INITIALIZATION
// ==========================================================================

// View Mode switch
els.viewModeCard.addEventListener("click", () => setViewMode("card"));
els.viewModeBar.addEventListener("click", () => setViewMode("bar"));

// Playback controls
els.playPauseBtn.addEventListener("click", togglePlay);
els.nextStepBtn.addEventListener("click", nextStep);
els.prevStepBtn.addEventListener("click", prevStep);
els.resetStepBtn.addEventListener("click", resetSteps);
els.stepScrubber.addEventListener("input", (e) => seekStep(e.target.value));

// Array controls
els.generate.addEventListener("click", () => {
  generateInputArray(true);
  els.statusText.textContent = "Generated new random array. Ready to sort.";
});
els.preset.addEventListener("change", () => generateInputArray(false));
els.size.addEventListener("input", () => {
  els.sizeValue.textContent = els.size.value;
  generateInputArray(false);
});
els.speed.addEventListener("input", updateSpeedLabel);
els.applyCustom.addEventListener("click", applyCustomArray);

// Copy Python Code Button
els.copyCodeBtn.addEventListener("click", () => {
  const algoKey = els.algorithm.value;
  const pyCode = pythonCodeMap[algoKey] || "";
  const feedback = () => {
    els.copyCodeBtn.textContent = "✓ Copied!";
    setTimeout(() => {
      els.copyCodeBtn.textContent = "📋 Copy Code";
    }, 1800);
  };

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(pyCode).then(feedback).catch(() => {
      fallbackCopy(pyCode);
      feedback();
    });
  } else {
    fallbackCopy(pyCode);
    feedback();
  }
});

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

// Algorithm select
els.algorithm.addEventListener("change", () => {
  pause();
  loadAlgorithmSteps();
});

// Sound & Theme
els.themeBtn.addEventListener("click", toggleTheme);
els.soundBtn.addEventListener("click", toggleSound);

// Benchmark
els.benchmarkBtn.addEventListener("click", benchmarkAllAlgorithms);

// Global Keyboard Shortcuts
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.code === "Space") {
    e.preventDefault();
    togglePlay();
  } else if (e.code === "ArrowRight") {
    e.preventDefault();
    nextStep();
  } else if (e.code === "ArrowLeft") {
    e.preventDefault();
    prevStep();
  } else if (e.code === "KeyR") {
    e.preventDefault();
    resetSteps();
  }
});

// Mobile Controls Drawer Toggle
if (els.mobileControlToggle && els.controlPanel) {
  els.mobileControlToggle.addEventListener("click", () => {
    const isOpen = els.controlPanel.classList.toggle("mobile-open");
    els.mobileControlToggle.classList.toggle("active", isOpen);
  });
}

// Quick Preset Chips Click Handling
document.querySelectorAll(".quick-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    els.preset.value = chip.dataset.preset;
    generateInputArray(false);
    if (window.innerWidth <= 992) {
      els.visualizer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Speed Chips Click Handling
document.querySelectorAll(".speed-chip").forEach(chip => {
  chip.addEventListener("click", () => {
    els.speed.value = chip.dataset.speed;
    updateSpeedLabel();
  });
});

// App Startup
updateSpeedLabel();
generateInputArray();
