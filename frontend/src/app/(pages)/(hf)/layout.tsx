import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";

const HeaderFooterLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default HeaderFooterLayout;
