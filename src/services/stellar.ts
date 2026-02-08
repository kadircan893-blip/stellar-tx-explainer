export async function fetchTransaction(hash: string) {
  const response = await fetch(
    `https://horizon-testnet.stellar.org/transactions/${hash}`
  );

  if (!response.ok) {
    throw new Error("Transaction not found");
  }

  return response.json();
}
