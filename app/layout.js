import "./globals.css";

export const metadata = {
  title: "Baby Birth Games",
  description: "Send games for your baby shower",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body >{children}</body>
    </html>
  );
}
