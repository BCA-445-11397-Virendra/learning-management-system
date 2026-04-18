const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-3">
        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin" />

        {/* Text */}
        <p className="text-sm text-gray-500">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
