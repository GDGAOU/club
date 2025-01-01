"use client";

import { useState, useEffect } from "react";
import { format, addDays } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

interface AnalyticsData {
  views: number;
  clicks: number;
  shares: number;
  likes: number;
  comments: number;
  timeline: {
    date: string;
    views: number;
    clicks: number;
    shares: number;
  }[];
  categories: {
    name: string;
    count: number;
  }[];
  popularDiscounts: {
    id: string;
    title: string;
    views: number;
    clicks: number;
    engagement: number;
  }[];
}

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          `/api/analytics?startDate=${timeRange.from.toISOString()}&endDate=${timeRange.to.toISOString()}`
        );
        const data = await response.json();
        if (data.success) {
          setAnalyticsData(data.data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!analyticsData) return null;

  const timelineData = {
    labels: analyticsData.timeline.map(item => 
      format(new Date(item.date), "MMM d")
    ),
    datasets: [
      {
        label: "Views",
        data: analyticsData.timeline.map(item => item.views),
        borderColor: "#0088FE",
        tension: 0.4,
      },
      {
        label: "Clicks",
        data: analyticsData.timeline.map(item => item.clicks),
        borderColor: "#00C49F",
        tension: 0.4,
      },
      {
        label: "Shares",
        data: analyticsData.timeline.map(item => item.shares),
        borderColor: "#FFBB28",
        tension: 0.4,
      },
    ],
  };

  const categoryData = {
    labels: analyticsData.categories.map(item => item.name),
    datasets: [
      {
        data: analyticsData.categories.map(item => item.count),
        backgroundColor: COLORS,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Date Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <DatePickerWithRange
          value={timeRange}
          onChange={(range) => setTimeRange(range)}
        />
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.views}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.clicks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.shares}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.likes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.comments}</div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Timeline</CardTitle>
          <CardDescription>
            View trends in discount engagement over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <Line
              data={timelineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>
              Distribution of discounts across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Pie
                data={categoryData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Popular Discounts */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Discounts</CardTitle>
            <CardDescription>
              Top performing discounts by engagement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.popularDiscounts.map((discount) => (
                <div
                  key={discount.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{discount.title}</p>
                    <div className="text-sm text-muted-foreground">
                      Views: {discount.views} • Clicks: {discount.clicks}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {(discount.engagement * 100).toFixed(1)}% Engagement
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
