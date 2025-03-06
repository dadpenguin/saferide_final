import { headers } from 'next/headers';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://safe-trip.pockethost.io');

export async function GET(request, { params }) {
    try {
        const RECORD_ID = (await params).id;
        console.log(RECORD_ID);

        const record = await pb.collection('licenses').getOne(RECORD_ID);
        
        const name = record.name;
        
        return new Response(JSON.stringify({ name }), { status: 200});
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ message: 'Not found' }), { status: 400 });
    }
}
