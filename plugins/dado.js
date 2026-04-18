const handler = async (m, { conn }) => {

    const result = Math.floor(Math.random() * 6) + 1;

    const text = `
🎲 *DADO*

Hai tirato: *${result}*
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^dado$/i;
export default handler;
