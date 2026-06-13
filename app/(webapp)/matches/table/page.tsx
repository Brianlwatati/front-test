"use client";

import { useEffect, useState } from "react";

interface TeamResults {
  team: string;
  results: Record<string, string[]>;
  totalMatches: number;
}

interface MatchesData {
  totalTeams: number;
  teams: TeamResults[];
}

interface MatchesTableProps {
  data?: MatchesData;
}

export default function MatchesTable({ data }: MatchesTableProps) {
  const [matchesData, setMatchesData] = useState<MatchesData | null>(
    data || null
  );
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) return;

    const fetchMatches = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "http://localhost:5000/api/matches/results/table"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const result = await response.json();

        setMatchesData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [data]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Loading matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!matchesData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>No data available.</p>
      </div>
    );
  }

  const matchdays =
    matchesData.teams.length > 0
      ? Object.keys(matchesData.teams[0].results)
      : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Matches</h1>

      <p className="text-gray-600 mb-6">
        Total Teams:{" "}
        <span className="font-semibold text-gray-900">
          {matchesData.totalTeams}
        </span>
      </p>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-4 py-3 text-left font-semibold">Team</th>
              <th className="px-4 py-3 text-left font-semibold">
                Total Matches
              </th>

              {matchdays.map((matchday) => (
                <th
                  key={matchday}
                  className="px-4 py-3 text-left font-semibold"
                >
                  {matchday}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {matchesData.teams.map((team, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {team.team}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {team.totalMatches}
                </td>

                {matchdays.map((matchday) => (
                  <td
                    key={`${index}-${matchday}`}
                    className="px-4 py-3"
                  >
                    {team.results[matchday]?.map((result, resultIndex) => {
                      let colorClass = "text-gray-700 bg-gray-100";

                      if (result.toLowerCase().includes("win")) {
                        colorClass = "text-green-700 bg-green-100";
                      } else if (
                        result.toLowerCase().includes("lost") ||
                        result.toLowerCase().includes("loss")
                      ) {
                        colorClass = "text-red-700 bg-red-100";
                      } else if (result.toLowerCase().includes("draw")) {
                        colorClass = "text-yellow-700 bg-yellow-100";
                      }

                      return (
                        <span
                          key={resultIndex}
                          className={`inline-block px-2 py-1 rounded-md text-sm font-medium mr-1 ${colorClass}`}
                        >
                          {result}
                        </span>
                      );
                    }) || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}