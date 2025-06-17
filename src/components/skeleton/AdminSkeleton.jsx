import React from "react";

const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </td>
    <td className="py-3 px-4">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </td>
    <td className="py-3 px-4">
      <div className="flex space-x-2">
        <div className="h-8 w-8 bg-gray-200 rounded"></div>
        <div className="h-8 w-8 bg-gray-200 rounded"></div>
      </div>
    </td>
  </tr>
);

const CardSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
  </div>
);

const StatisticsSkeleton = () => (
  <div className="bg-white p-4 rounded-lg shadow-md animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
);

export const AdminSkeleton = {
  // Table skeleton with multiple rows
  Table: ({ rowCount = 5 }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <th key={idx} className="py-3 px-4">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Array(rowCount)
              .fill(0)
              .map((_, idx) => (
                <TableRowSkeleton key={idx} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ),

  // Grid of cards skeleton
  CardGrid: ({ cardCount = 4 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(cardCount)
        .fill(0)
        .map((_, idx) => (
          <CardSkeleton key={idx} />
        ))}
    </div>
  ),

  // Statistics skeleton
  Statistics: ({ count = 4 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(count)
        .fill(0)
        .map((_, idx) => (
          <StatisticsSkeleton key={idx} />
        ))}
    </div>
  ),

  // Form skeleton
  Form: () => (
    <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>

        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>

        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>

        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  ),
};

export default AdminSkeleton;
