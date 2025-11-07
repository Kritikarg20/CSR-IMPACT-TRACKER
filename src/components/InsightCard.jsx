import React from 'react';
import { Lightbulb } from 'lucide-react';

export default function InsightCard({ insight }) {
  return (
    <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex gap-3">
        <Lightbulb className="text-orange-500 flex-shrink-0" size={20} />
        <p className="text-gray-800">{insight}</p>
      </div>
    </div>
  );
}