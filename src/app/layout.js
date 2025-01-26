import { Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lato = Lato({  weight: ['400', '700'], subsets: ["latin"] });

export const metadata = {
  title: 'Cabeleleila Leila Salão de Beileza',
  description: 'Salão de Beleiza da Leila!',
  keywords: 'Cabeleleila, Leila, Salão, Beleiza',
  icons: {
    icon: ['/favicon/favicon.ico']
  }
}

export default function RootLayout({ children }) {
 
  return (
    <html lang="pt-BR">
      <body className={lato.className}>
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
