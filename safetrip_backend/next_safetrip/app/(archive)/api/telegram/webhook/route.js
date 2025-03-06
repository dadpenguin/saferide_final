import { headers } from 'next/headers';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

// setting up webhook
// tg methods url: https://api.telegram.org/bot7758825929:AAGCujWIK-K7r8p7ofvD2X27rt35mTH56iA/setWebhook?url=https://7x6m7j-ip-150-107-175-157.tunnelmole.net/api/telegram/webhook


// v2
// https://7x6m7j-ip-150-107-175-157.tunnelmole.net


export async function POST(request) {
    try {
        const data = await request.json();
        console.log("Incoming webhook data:", data);  // Log the data received from Telegram


        const messageText = data.message.text
        const chatId = data.message.chat.id;

        const responseText = 'Sure, your chat code is: ```' + chatId + '``` Keep your chat code private and only send it to trusted senders to avoid spams and unwanted notifications.😉';
        
        if (messageText == "/generate_chat_code") {
            // make sure to have proper headers

            try {

            
            const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
                method: 'POST',
                body: JSON.stringify({
                    chat_id: chatId,  // Make sure chatId is valid
                    text: responseText,
                    parse_mode: 'Markdown'
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.log("error:" + error)
        }

        } else if (messageText == 'I love you') {
            const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
                method: 'POST',
                body: JSON.stringify({
                    chat_id: chatId,  // Make sure chatId is valid
                    text: 'I love you too🥺'
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        




        // make sure to have proper headers
        return new Response(JSON.stringify({ status: 'success' }), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });

    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ message: 'Error processing the request' }), { status: 400 });
    }
}