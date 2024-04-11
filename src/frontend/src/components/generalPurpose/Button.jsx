export default function Button({ type="", handler, value = null, text, color, inline = false }) {
  return (
    <div className={`m-1 ${inline ? "inline" : "block"}`}>
      <button
        type={type}
        onClick={() => handler(value) && handler} 

        className={`bg-${color}-500 hover:bg-${color}-600 text-white font-semibold px-4 py-2 rounded`}
      >
        {text}
      </button>
    </div>
  );
}
