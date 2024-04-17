import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { XCircleIcon } from "lucide-react";
import { type useFilter } from "../_hooks/useFilter";

export function FilterResetButton({
  filterProvider,
}: {
  filterProvider: ReturnType<typeof useFilter>;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <Toggle
          aria-label="Clear filters"
          className="hover:bg-primary/10"
          onClick={filterProvider.onClearFilters}
        >
          <TooltipTrigger asChild>
            <XCircleIcon className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent>Clear filters</TooltipContent>
        </Toggle>
      </Tooltip>
    </TooltipProvider>
  );
}
