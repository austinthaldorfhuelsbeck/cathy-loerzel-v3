import { type Category, type Tag } from "@prisma/client";
import { type useFilter } from "../../_hooks/useFilter";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FilterDropdown } from "./filter-dropdown";
import { FilterResetButton } from "./filter-reset-button";
import { OnlyPublishedButton } from "./only-published-button";
import { OnlyUpcomingButton } from "./only-upcoming-button";
import { SortOrderButton } from "./sort-order-button";

export function DashboardFilter(props: {
  type: "post" | "event";
  categories: Category[];
  tags: Tag[];
  filterProvider: ReturnType<typeof useFilter>;
}) {
  const { filterProvider, type } = props;

  return (
    <Card className="mb-5 flex w-full items-center justify-between gap-3 px-2 py-1">
      <aside className="flex items-center gap-1">
        <FilterDropdown {...props} />

        <Input
          placeholder={`Search ${type} titles and descriptions`}
          className="w-48 text-sm sm:w-64 md:w-80 lg:w-96 xl:w-96 2xl:w-96"
          aria-label={`Search ${type}s`}
          value={filterProvider.searchQuery}
          onChange={(e) => filterProvider.setSearchQuery(e.target.value)}
        />

        {(filterProvider.selectedCategory ??
          filterProvider.selectedTag ??
          filterProvider.searchQuery) && (
          <FilterResetButton filterProvider={filterProvider} />
        )}
      </aside>

      <aside className="flex gap-1">
        {props.type === "event" && (
          <OnlyUpcomingButton filterProvider={filterProvider} />
        )}
        <OnlyPublishedButton filterProvider={filterProvider} />
        <SortOrderButton filterProvider={filterProvider} />
      </aside>
    </Card>
  );
}
