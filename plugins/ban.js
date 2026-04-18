const handler = async (m, { conn }) => {

    const chat = m.chat;

    if (!global.db.data.users) global.db.data.users = {};
    
    const groupMetadata = await conn.groupMetadata(chat);
    const participants = groupMetadata.participants;

    const sender = participants.find(p => p.id === m.sender);
    const isAdmin = sender?.admin === 'admin' || sender?.admin === 'superadmin';

    if (!isAdmin) {
        return conn.sendMessage(chat, { text: '🚫 Solo admin possono bannare' }, { quoted: m });
    }

    const user = m.mentionedJid?.[0];
    if (!user) {
        return conn.sendMessage(chat, { text: '⚠️ Usa: !ban @utente' }, { quoted: m });
    }

    global.db.data.users[user] = global.db.data.users[user] || {};
    global.db.data.users[user].banned = true;

    await conn.sendMessage(chat, { text: '🚫 Utente bannato dal stellina' }, { quoted: m });
};

handler.command = /^ban$/i;
export default handler;
