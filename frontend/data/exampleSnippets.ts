export type ExampleSnippet = {
  id: string;
  title: string;
  code: string;
};

// Deliberately varied topics/structures (loop, string, recursion, class) so
// whichever one someone picks gives the AI generator something interesting
// to introduce a bug into or carve blanks out of — plain JavaScript, since
// language isn't selected until later in the Workspace (paste content here
// just needs to be structurally rich, not language-specific).
export const exampleSnippets: ExampleSnippet[] = [
  {
    id: "array-sum",
    title: "Array Sum",
    code: `function sumArray(numbers) {
  let total = 0;
  for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
  }
  return total;
}`,
  },
  {
    id: "reverse-string",
    title: "Reverse a String",
    code: `function reverseString(str) {
  let result = "";
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}`,
  },
  {
    id: "fibonacci",
    title: "Fibonacci (Recursive)",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
  {
    id: "bank-account",
    title: "Bank Account Class",
    code: `class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      throw new Error("Insufficient funds");
    }
    this.balance -= amount;
    return this.balance;
  }
}`,
  },
  {
    id: "find-max",
    title: "Find Maximum",
    code: `function findMax(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  return max;
}`,
  },
];