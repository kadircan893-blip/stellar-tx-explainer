import { useState } from "react";
import { fetchTransaction } from "../services/stellar";

export default function TransactionExplainer() {
  const [txHash, setTxHash] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState<null | { account: string; ledger: number; fee: string }>(null);
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
  if (!txHash) {
    setError("Please enter a transaction hash.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const data = await fetchTransaction(txHash);

    setResult(data);
    setExplanation({
      account: data.source_account,
      ledger: data.ledger,
      fee: data.fee_charged,
    });
  } catch (e) {
    setError("Transaction not found on Stellar Testnet.");
    setResult(null);
    setExplanation(null);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="card">
      <h2>Stellar Transaction Explainer</h2>

      <input
  type="text"
  placeholder="Enter a Stellar transaction hash"
  value={txHash}
  onChange={(e) => setTxHash(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleExplain()}
/>


      <button onClick={handleExplain} disabled={loading}>
  {loading ? "Loading..." : "Explain Transaction"}
</button>


      {error && <p>{error}</p>}

      {explanation && (
  <div className="info-card">
    <h3>📄 Transaction Summary</h3>
    {explanation && (
  <>
    <div className="summary-row">
      <strong>Initiated By Account</strong>
      <span>{explanation.account}</span>
    </div>

    <div className="summary-row">
      <strong>Recorded In Ledger</strong>
      <span>{explanation.ledger}</span>
    </div>

    <div className="summary-row">
      <strong>Network Fee (stroops)</strong>
      <span>{explanation.fee}</span>
    </div>
  </>
)}

  </div>
)}

{result && (
  <div className="info-card">
    <h3>🔍 Raw Transaction Data</h3>
<p>
  <strong>Ledger</strong>
  <span>{result.ledger}</span>
</p>

<p>
  <strong>Source Account</strong>
  <span>{result.source_account}</span>
</p>

<p>
  <strong>Fee Charged (stroops)</strong>
  <span>{result.fee_charged}</span>
</p>



  </div>
)}

    </div>
  );
}
