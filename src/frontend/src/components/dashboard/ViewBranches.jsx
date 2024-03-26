export default function ViewBranches({ branches, handler, style }) {
    return (
      branches && branches.map((branch, index) => (
        <div
          key={index}
          className={style}
        >
          <button
            onClick={() => handler(branch)} // Pass a function reference to onClick
            key={index}
          >
            <p className="text-lg font-semibold">{branch.name}</p>
            <p className="text-gray-600">{branch.address}</p>
          </button>
        </div>
      ))
    );
  }
  