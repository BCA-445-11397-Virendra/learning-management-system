// src/components/DomainCard.jsx

const DomainCard = ({ domain }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer p-5">
      <img
        src={domain.image}
        alt={domain.title}
        className="w-16 h-16 mb-4"
      />

      <h3 className="text-lg font-semibold text-gray-800">
        {domain.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {domain.description}
      </p>

      <p className="text-sm text-indigo-600 font-medium mt-3">
        {domain.courses}+ Courses
      </p>
    </div>
  );
};

export default DomainCard;
