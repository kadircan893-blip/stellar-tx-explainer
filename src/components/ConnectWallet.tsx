const ConnectWallet = () => {
  const handleClick = () => {
    alert("Wallet connect (mock)");
  };

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <h1>Stellar Tx Explainer</h1>
        <p>
          Connect your Stellar wallet to analyze and understand transactions.
        </p>

        <button className="connect-btn" onClick={handleClick}>
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;
