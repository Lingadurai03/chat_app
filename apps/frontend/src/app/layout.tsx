import type { Metadata } from 'next';

import { StoreProvider } from '@/components';

import './globals.css';

export const metadata: Metadata = {
    title: 'Chat App',
    description: 'Chat App',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body>
                <StoreProvider>{children}</StoreProvider>
            </body>
        </html>
    );
}
