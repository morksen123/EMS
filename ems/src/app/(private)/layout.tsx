import Header from "@/components/shared/Header";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <div className="flex h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </UserProvider>
  );
}
