const handler = async (m, { conn }) => {
    const text = `
🎮 *GIOCHI*
- .tictactoe
- .slot
- .dice
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^giochi$/i;
export default handler;
