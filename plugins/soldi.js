const handler = async (m, { conn }) => {
    const user = global.db?.data?.users?.[m.sender] || {};

    if (!user.money) user.money = 0;

    const text = `
💰 *SOLDI*
Saldo: ${user.money}
`.trim();

    await conn.sendMessage(m.chat, { text }, { quoted: m });
};

handler.command = /^soldi$/i;
export default handler;
