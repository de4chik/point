import { cn } from "@/root/utils/cn";

interface FilterItemProps {
    name: string;
    count?: number;
    isActive?: boolean;
}

const FilterItem: React.FC<FilterItemProps> = ({ name, count, isActive }) => {
    return (
        <div className={cn("p-2 rounded-mini text-sm flex justify-between items-center hover:bg-accent/5 cursor-pointer duration-100 hover:text-accent", isActive && "text-accent") }>
            <span>{name}</span>
            <span>{count}</span>
        </div>
    );
}
export default FilterItem;