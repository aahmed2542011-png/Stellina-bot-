const handler = async (m, { conn }) => {

    const chat = m.chat;

    if (!global.db.data.chats) global.db.data.chats = {};
    if (!global.db.data.chats[chat]) global.db.data.chats[chat] = {};

    const chatData = global.db.data.chats[chat];

    if (!chatData.muted) chatData.muted = [];

    const text = m.text?.toLowerCase() || '';

    // MUTE
    if (text.startsWith('!mute')) {

        const mentioned = m.mentionedJid?.[0];
        if (!mentioned) {
            return conn.sendMessage(chat, { text: '⚠️ Usa: !mute @utente' }, { quoted: m });
        }

        if (!chatData.muted.includes(mentioned)) {
            chatData.muted.push(mentioned);
        }

        return conn.sendMessage(chat, { text: '🔇 Utente mutato' }, { quoted: m });
    }

    // UNMUTE
    if (text.startsWith('!unmute')) {

        const mentioned = m.mentionedJid?.[0];
        if (!mentioned) {
            return conn.sendMessage(chat, { text: '⚠️ Usa: !unmute @utente' }, { quoted: m });
        }

        chatData.muted = chatData.muted.filter(u => u !== mentioned);

        return conn.sendMessage(chat, { text: '🔊 Utente smutato' }, { quoted: m });
    }

    // BLOCCO MESSAGGI MUTED
    if (chatData.muted.includes(m.sender)) {
        try {
            await conn.sendMessage(chat, { delete: m.key });
        } catch (e) {}
    }

};

handler.all = true;
export default handler;
