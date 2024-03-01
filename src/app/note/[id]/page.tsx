import EditForm from '@/components/EditForm';

export async function generateMetadata({ params }: { params: { id: string } }) {
    return {
        title: `Note ${params.id} | Notes Management Platform`,
    };
}

export default function EditPage({
    params: { id },
}: {
    params: { id: string };
}) {
    return (
        <div className='flex items-center justify-center pt-10'>
            {
                //@ts-ignore
                <EditForm id={id} />
            }
        </div>
    );
}
