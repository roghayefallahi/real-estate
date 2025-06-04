import { yekan } from "@/utils/fonts";
import Layout from "@/layout/Layout";

import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";

export const metadata = {
  title: "سامانه هوشمند خرید و فروش ، رهن و اجاره املاک",
  description:
    " رهن و اجاره خانه ، آپارتمان و املاک به همراه تحلیل قیمتی و پیشنهادات ویژه خرید و فروش",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={yekan.className}>
      <body cz-shortcut-listen="true">
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
