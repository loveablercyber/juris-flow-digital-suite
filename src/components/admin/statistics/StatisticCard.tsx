
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  subtitle?: string;
}

const StatisticCard = ({ title, value, change, subtitle }: StatisticCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span className={change.trend === "up" ? "text-green-500" : change.trend === "down" ? "text-red-500" : "text-amber-500"}>
              {change.value}
            </span>
            {subtitle && ` ${subtitle}`}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticCard;
