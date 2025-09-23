import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google"
import { Provider } from "@/components/ui/provider";
import Navbar from "@/components/Navbar";
import { Container } from "@chakra-ui/react";

const bricolage = Bricolage_Grotesque({
    variable: "--font-bricolage",
    subsets: ["latin"],
  })

export const metadata: Metadata = {
    title: "Crypto Scope",
    description: "A next js project to explore crypto data - by Min Hein Ko",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html className={`${bricolage.variable}`} lang="en" suppressHydrationWarning={true}>
            <body
                className={`antialiased`}
            >
                <Provider>
                    <Container>
                        <Navbar />
                        {children}
                    </Container>
                </Provider>
            </body>
        </html>
    );
}
