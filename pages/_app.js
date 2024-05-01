import "@/styles/globals.css";
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700']  // Define the weights you need
});

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <style jsx global>{`
      body {
        font-family: ${inter.style.fontFamily};
      }
    `}</style>
    <Component {...pageProps} />
    </>
  );
}