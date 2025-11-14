"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const ProviderLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};
export default ProviderLayout;
