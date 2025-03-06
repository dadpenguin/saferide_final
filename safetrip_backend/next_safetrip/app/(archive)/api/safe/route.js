import { headers } from 'next/headers';


const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export async function POST(request) {

    const body = await request.json()
    const userName = body.userName
    const emergencyNumber = body.emergencyNumber

    try {
        console.log(userName)
        // create the message

        const message = `${userName} arrived safely ✅`
        
        const chatId = emergencyNumber

        // send to contacts

        const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
            method: 'POST',
            body: JSON.stringify({
                chat_id: chatId,  // Make sure chatId is valid
                text: message
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return new Response(JSON.stringify({ message: "success"}), { status: 200});


    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ message: error }), { status: 400 });
    }
}
