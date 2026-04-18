// src/pages/Domains.jsx

import DomainCard from "@/components/custom/DomainCard";
import { domains } from "@/data/domainsData";

const Domains = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Choose Your Learning Domain
          </h1>
          <p className="text-gray-500 mt-3">
            Explore top domains and start learning today
          </p>
        </div>

        {/* Domains Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {domains.map((domain) => (
            <DomainCard key={domain.id} domain={domain} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Domains;
