const handler = async (m, { conn }) => {

    const chat = m.chat;

    const groupMetadata = await conn.groupMetadata(chat);
    const participants = groupMetadata.participants;

    const sender = participants.find(p => p.id === m.sender);
    const isAdmin = sender?.admin === 'admin' || sender?.admin === 'superadmin';

    if (!isAdmin) {
        return conn.sendMessage(chat, { text: '🚫 Solo admin possono usare unban' }, { quoted: m });
    }

    const user = m.mentionedJid?.[0];
    if (!user) {
        return conn.sendMessage(chat, { text: '⚠️ Usa: !unban @utente' }, { quoted: m });
    }

    if (global.db.data.users[user]) {
        global.db.data.users[user].banned = false;
    }

    await conn.sendMessage(chat, { text: '✅ Utente sbannato' }, { quoted: m });
};

handler.command = /^unban$/i;
export default handler;
