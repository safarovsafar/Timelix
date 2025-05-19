import Footer from "@/widgets/footer/footer";
import Header from "@/widgets/header/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timelix",
  description: "This is a web application that helps users stay organized and motivated by setting clear goals and tracking their daily routines. Users can set deadlines for their goals, create and follow a daily plan, and stay focused on long-term personal growth. The platform is simple, clean, and built with a user-first mindset.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <div>
      <Header />
      <main className="mt-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
