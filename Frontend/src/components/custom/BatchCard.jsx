// src/components/BatchCard.jsx

const statusColor = {
  Live: "bg-green-100 text-green-700",
  Upcoming: "bg-yellow-100 text-yellow-700",
  Recorded: "bg-blue-100 text-blue-700",
};

const BatchCard = ({ batch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 flex flex-col justify-between">
      
      {/* Status */}
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${statusColor[batch.status]}`}
      >
        {batch.status}
      </span>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {batch.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Mentor: {batch.mentor}
        </p>

        <div className="text-sm text-gray-600 mt-3 space-y-1">
          <p>📅 Start: {batch.startDate}</p>
          <p>⏳ Duration: {batch.duration}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-indigo-600 font-bold">
          {batch.price}
        </span>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition">
          View Batch
        </button>
      </div>
    </div>
  );
};

export default BatchCard;
