import React from 'react';

import { Navbar } from '@/app/(home)/components';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default layout;
