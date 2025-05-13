
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface MockActionButtonProps {
  action: string;
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
}

const MockActionButton = ({ action, className, variant = "default", size = "default", children }: MockActionButtonProps) => {
  const handleAction = () => {
    toast({
      title: "Ação simulada",
      description: `A ação "${action}" foi executada com sucesso.`,
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleAction}
      className={className}
    >
      {children || <Check className="mr-2 h-4 w-4" />}
      {action}
    </Button>
  );
};

export default MockActionButton;
