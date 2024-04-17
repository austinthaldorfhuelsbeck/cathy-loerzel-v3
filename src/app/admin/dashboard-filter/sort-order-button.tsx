import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowDownWideNarrowIcon, ArrowUpNarrowWideIcon } from "lucide-react";
import { type useFilter } from "../_hooks/useFilter";

export function SortOrderButton({
  filterProvider,
}: {
  filterProvider: ReturnType<typeof useFilter>;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" onClick={filterProvider.onToggleSortOrder}>
            {
              {
                desc: <ArrowDownWideNarrowIcon className="h-4 w-4" />,
                asc: <ArrowUpNarrowWideIcon className="h-4 w-4" />,
              }[filterProvider.sortOrder]
            }
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {filterProvider.sortOrder === "asc"
            ? "Sort by newest"
            : "Sort by oldest"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
