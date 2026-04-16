import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDashboardStatsQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Dashboard = () => {
  const { data, isError, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) {
    return <h1 className="text-red-500">Failed to load dashboard data</h1>;
  }

  const dashboard = data?.dashboard;
  const totalCourses = dashboard?.totalCourses || 0;
  const totalRevenue = dashboard?.totalRevenue || 0;
  const totalSales = dashboard?.totalSales || 0;
  const chartData = (dashboard?.coursePerformance || []).map((course) => ({
    name: course.courseTitle || "Untitled Course",
    revenue: course.revenue || 0,
    sales: course.salesCount || 0,
  }));

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalSales}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">{totalCourses}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">₹{totalRevenue}</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Revenue
          </CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <p className="text-sm text-gray-500">
              No completed purchases yet for your courses.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  height={70}
                />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `₹${value}` : value,
                    name === "revenue" ? "Revenue" : "Sales",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4a90e2"
                  strokeWidth={3}
                  dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
