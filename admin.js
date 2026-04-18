const handler = async (m, { conn }) => {
    const text = `
🛡️ *ADMIN MENU*
- kick
- ban
- mute
- unmute
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^admin$/i;
export default handler;
