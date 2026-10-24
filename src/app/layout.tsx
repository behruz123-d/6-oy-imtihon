import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'iPhone Store', description:'Apple style iPhone Store' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="uz"><body>{children}</body></html>}
