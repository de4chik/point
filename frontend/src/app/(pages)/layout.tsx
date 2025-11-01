import Footer from "@/widgets/footer";
import Header from "@/widgets/header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`flex flex-col min-h-screen`}>
            <Header />
            <main className="flex-1 min-h-0 flex flex-col">
                {children}
            </main>
            <Footer />
        </div>
    )
}
