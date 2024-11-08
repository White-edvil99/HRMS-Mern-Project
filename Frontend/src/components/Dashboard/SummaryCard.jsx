import React from 'react';

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <div className="text-blue-500 text-3xl mr-4">
        {icon}
      </div>
      <div>
        <p className="text-gray-600 font-medium">{text}</p>
        <p className="text-2xl font-semibold text-gray-800">{number}</p>
      </div>
    </div>
  );
}

export default SummaryCard;
