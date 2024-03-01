import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function loading() {
    return (
        <div className='flex items-center justify-center pt-10'>
            <div className='space-y-8 w-[50vw] shadow-xl p-8 rounded-md border-2'>
                <Skeleton className='h-8 w-[20%] ' />

                <Skeleton className="h-[160px] w-full'  rounded-xl" />
                <div className='space-y-2'>
                    <Skeleton className='h-8 w-[20%] ' />
                    <Skeleton className='h-4 mt-8 bg-transparent' />
                    <Button
                        type='submit'
                        disabled={true}
                    >
                        update
                    </Button>
                </div>
            </div>
        </div>
    );
}
