const handler = async (m, { conn }) => {

    const chat = m.chat;
    const text = (m.text || '').toLowerCase();

    if (text === '!ping') {
        return conn.sendMessage(chat, { text: 'pong 🏓' }, { quoted: m });
    }

};

handler.all = true;
export default handler;
