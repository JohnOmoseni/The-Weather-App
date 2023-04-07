import { MagicSpinner } from "react-spinners-kit";

function Loading() {
  return (
    <div className="loading">
      <span>
        <MagicSpinner color="#f52d55" size={80} />
      </span>
      <span>Loading....</span>
    </div>
  );
}

export default Loading;
