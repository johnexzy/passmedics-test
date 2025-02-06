import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FlashcardProvider } from "@/context/FlashcardContext";
import { HistoryProvider } from "@/context/HistoryContext";
import { QuizProvider } from "@/context/QuizContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "PassMedics - Medical Quiz Platform",
  description: "Test and improve your medical knowledge with adaptive quizzes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HistoryProvider>
            <QuizProvider>
              <FlashcardProvider>{children}</FlashcardProvider>
            </QuizProvider>
          </HistoryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
