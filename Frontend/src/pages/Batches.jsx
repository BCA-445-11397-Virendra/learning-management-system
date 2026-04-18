import BatchCard from "@/components/custom/BatchCard";
import { batches } from "@/data/batchData";

const Batches = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Available Batches
          </h1>
          <p className="text-gray-500 mt-2">
            Join live & recorded batches taught by top educators
          </p>
        </div>

        {/* Batch Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <BatchCard key={batch.id} batch={batch} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Batches;
