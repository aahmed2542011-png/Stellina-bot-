const handler = async (m, { conn }) => {

    const money = Math.floor(Math.random() * 1000);

    const text = `
💰 *PORTAFOGLIO FINTA*

Hai: *${money}$*
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^soldi$/i;
export default handler;
