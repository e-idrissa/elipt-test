import { Siteheader } from "@/components/global/site-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col mx-64">
      <Siteheader />
      {children}
    </div>
  );
}
