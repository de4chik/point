import FilterItem from "@/shared/components/filterItem";

const FilterBar: React.FC = () => {
    return (
        <aside className="min-w-[230px] px-2.5 py-5 border-r border-r-foreground/10 min-h-full">
            <span className="text-xs opacity-50 pl-2.5">type</span>
            <FilterItem name="All" count={42} isActive/>
            <FilterItem name="Paid" count={24} />
            <FilterItem name="Free" count={18} />
            <span className="text-xs opacity-50 pl-2.5 inline-block mt-10">type</span>
            <FilterItem name="Header" count={16} />
            <FilterItem name="Profuct card" count={3} />
            <FilterItem name="Avatar" count={4} />
            <FilterItem name="Button" count={34} />
        </aside>
    );
}
export default FilterBar;