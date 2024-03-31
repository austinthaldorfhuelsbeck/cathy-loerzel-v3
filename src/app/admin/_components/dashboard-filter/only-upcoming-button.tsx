import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlarmClockIcon, HistoryIcon } from "lucide-react";
import { type useFilter } from "../../_hooks/useFilter";

export function OnlyUpcomingButton({
  filterProvider,
}: {
  filterProvider: ReturnType<typeof useFilter>;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <Toggle
          aria-label="Toggle show only upcoming"
          onClick={filterProvider.onToggleShowOnlyUpcoming}
          className="hover:bg-primary/10"
        >
          <TooltipTrigger asChild>
            {filterProvider.showOnlyUpcoming ? (
              <AlarmClockIcon className="h-4 w-4" />
            ) : (
              <HistoryIcon className="h-4 w-4" />
            )}
          </TooltipTrigger>
        </Toggle>
        <TooltipContent>
          {!filterProvider.showOnlyUpcoming
            ? "Show only upcoming"
            : "Show past events"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
