"use client";

import { Flame } from "lucide-react";

interface StreakBadgeProps {
  current: number;
  record: number;
}

export function StreakBadge({ current, record }: StreakBadgeProps) {
  const isApproachingRecord = record > 0 && current >= record - 1 && current < record;

  return (
    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">Current Streak</p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-orange-600">{current}</span>
            <span className="text-lg text-gray-600">days</span>
          </div>
        </div>
        <Flame className="w-10 h-10 text-orange-500 flex-shrink-0" />
      </div>

      {/* Record streak */}
      <div className="mt-4 pt-4 border-t border-orange-200">
        <p className="text-sm text-gray-600 mb-1">Record Streak</p>
        <p className="text-xl font-semibold text-gray-700">{record} days</p>
      </div>

      {/* Approaching record message */}
      {isApproachingRecord && (
        <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded text-sm text-yellow-800">
          ✨ Almost there! Just {record - current} day{record - current !== 1 ? 's' : ''} to beat your record!
        </div>
      )}

      {/* New record achieved */}
      {current > record && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded text-sm text-green-800">
          🎉 New personal record! Keep it up!
        </div>
      )}
    </div>
  );
}
