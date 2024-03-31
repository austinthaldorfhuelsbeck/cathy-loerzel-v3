import { Badge } from "@/components/ui/badge";
import { type useFilter } from "../_hooks/useFilter";

export function DashboardBadges({
  filterProvider,
}: {
  filterProvider: ReturnType<typeof useFilter>;
}) {
  return (
    <div className="flex gap-2">
      {filterProvider.selectedCategory && (
        <Badge>{`Showing posts in category: ${filterProvider.selectedCategory.name}`}</Badge>
      )}
      {filterProvider.selectedTag && (
        <Badge
          style={{
            backgroundColor: filterProvider.selectedTag.color,
          }}
        >{`Showing posts with tag: ${filterProvider.selectedTag.name}`}</Badge>
      )}
    </div>
  );
}
