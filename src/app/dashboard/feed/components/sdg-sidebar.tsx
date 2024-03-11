import { usePathname, useRouter } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { sdgs } from "@/lib/utils";

export function SdgSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Command className="rounded-md shadow-sm w-1/3">
      <CommandInput placeholder="Search a keyword..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Filter by SDG">
            <CommandItem
              onSelect={() => router.push(pathname)}
            >
              <span>None</span>
            </CommandItem>

          {sdgs.map((sdg) => (
            <CommandItem
              key={sdg.id}
              onSelect={() => router.push(`${pathname}?q=${sdg.id}`)}
            >
              <span>{sdg.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
}
