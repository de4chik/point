"use client";
import { FormatCard } from "@/entities/formatCard";
import { useGetFormats } from "@/shared/api/format";
import { Container } from "@/shared/ui/conatiner";

const ChoiceFormat = () => {
  const { data: formats, isLoading: formatsLoading } = useGetFormats();

  return (
    <main className="flex-1 pt-5">
      <Container>
        <span className="text-2xl font-bold">Choice format</span>
        <p className="opacity-50">Select the template writing format</p>
        <div className="grid grid-cols-3 gap-1.5 my-5">
          {formatsLoading ? (
            <></>
          ) : (
            formats?.map(({ id, name }) => (
              <FormatCard
                href={`/templates/create/${name}`}
                name={name}
                key={id}
              />
            ))
          )}
        </div>
      </Container>
    </main>
  );
};
export default ChoiceFormat;
