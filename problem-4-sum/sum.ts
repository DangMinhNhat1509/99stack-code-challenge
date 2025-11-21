// sum.ts

// A: Formula, O(1) time
function sum_to_n_a(n: number): number {
  return (n * (n + 1)) / 2;
}

// B: Loop, O(n) time
function sum_to_n_b(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) sum += i;
  return sum;
}

// C: Reduce, O(n) time, O(n) space
function sum_to_n_c(n: number): number {
  return Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a + b, 0);
}

// Example
console.log(sum_to_n_a(5), sum_to_n_b(5), sum_to_n_c(5)); // 15 15 15
