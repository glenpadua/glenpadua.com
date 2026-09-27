export function BeachAtmosphere({ moving }: { moving: boolean }): JSX.Element {
  return (
    <div
      className="world-atmosphere atmosphere-beach"
      aria-hidden="true"
      data-moving={moving}
    >
      <>
        <svg className="world-boat" viewBox="0 0 100 100">
          <path d="M11 76h77l-12 14H27z" fill="#966d45" />
          <path d="M53 11v66" stroke="#855936" strokeWidth="3" />
          <path d="M48 19L20 71h28z" fill="#f7edd6" />
          <path d="M58 31l22 39H58z" fill="#e1c9aa" />
          <path
            d="M1 91q22-4 48 0t49 0"
            fill="none"
            stroke="#f6fae4"
            strokeWidth="2"
          />
        </svg>
      </>
    </div>
  );
}
