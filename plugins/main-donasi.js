const qrku = "https://telegra.ph/file/0bdf498e66b36bbb5b428.jpg"

let handler = async (m, { conn, usedPrefix }) => conn.sendButtonImg(m.chat, qrku, `
╭─「 Donasi 」
│ • Dana  [089677184101]
│ • OVO   [089677184101]
│ • Gopay [089677184101]
╰────
╭─「 *NOTE* 」
│ Scan Qris All payment 
│ Kirim bukti pembayaran ke 
│ wa.me/6289677184101
╰────
`.trim(), wm, 'Menu', usedPrefix + 'menu', m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['about']
handler.command = /^dona(te|si)$/i

module.exports = handler
