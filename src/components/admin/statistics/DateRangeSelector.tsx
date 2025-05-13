
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import MockActionButton from "@/components/admin/MockActionButton";

interface DateRangeSelectorProps {
  dateRange: string;
  setDateRange: (value: string) => void;
}

const DateRangeSelector = ({ dateRange, setDateRange }: DateRangeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Select value={dateRange} onValueChange={setDateRange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Hoje</SelectItem>
          <SelectItem value="yesterday">Ontem</SelectItem>
          <SelectItem value="last7days">Últimos 7 dias</SelectItem>
          <SelectItem value="last30days">Últimos 30 dias</SelectItem>
          <SelectItem value="thismonth">Este mês</SelectItem>
          <SelectItem value="lastmonth">Mês passado</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="icon">
        <Calendar className="h-4 w-4" />
      </Button>
      
      <MockActionButton action="Exportar Dados" variant="outline">
        <Download className="mr-2 h-4 w-4" />
      </MockActionButton>
    </div>
  );
};

export default DateRangeSelector;
