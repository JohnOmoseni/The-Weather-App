import { MagicSpinner } from "react-spinners-kit";

function Loading() {
  return (
    <div className="loading">
      <span>
        <MagicSpinner color="#14f39e" size={60} />
      </span>
      <span>Loading....</span>
    </div>
  );
}

export default Loading;
