import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './Redux/provider';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={cn(inter.className, 'h-screen')}>
                <Providers>
                    <ResizablePanelGroup
                        direction='horizontal'
                        className=' '
                    >
                        <ResizablePanel
                            defaultSize={7}
                            minSize={7}
                            maxSize={7}
                            className='p-4'
                        >
                            <SideBar />
                        </ResizablePanel>
                        <ResizableHandle />

                        <ResizablePanel
                            defaultSize={93}
                            minSize={93}
                        >
                            <Navbar />
                            <div className='h-screen overflow-auto pb-32'>
                              <Providers>
                                {children}
                              </Providers>
                            </div>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </Providers>
            </body>
        </html>
    );
}
