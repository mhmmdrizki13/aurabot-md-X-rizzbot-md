const axios = require("axios");
const config = require("./config.json");

for (let i = 0; i < config.no_of_messages; i++) {
  sendMessage();
}
async function sendMessage() {
  await axios.post(`https://ngl.link/${config.ngl_username}`, {
    question: config.question,
    deviceId: "0cdf-23df-sdbr-02y4",
  });
}

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
	if (!args[0]) throw `Linknya mana?\n\ncontoh:\n${usedPrefix}${command} https://ngl.link/asep`
    tiktokdlv2(args[0]).then(r => {
    })

handler.help = ['ngl'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.group = false

handler.command = /^(ngl|ngl|ngl|ngl)$/i

module.exports = handler
