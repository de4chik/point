import Template from "@/entities/Template";
import FilterBar from "@/features/filterBar";
import Container from "@/shared/ui/container";

const Templates = () => {

    return (
        <Container className="border-x border-x-foreground/10 flex">
            <FilterBar />
            <div className="w-full p-5">
                <span className="my-5 block text-4xl font-bold">All</span>
                <div className="flex flex-col gap-[60px]">
                    <Template id="123" description="headers for applications with titles, descriptions..." price={0} title="Header" username="Evir" />
                </div>
            </div>
        </Container>
    );
}
export default Templates;

