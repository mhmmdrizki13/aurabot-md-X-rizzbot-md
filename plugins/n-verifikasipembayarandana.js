const qrku = "https://telegra.ph/file/9c2236679990f4195d52c.jpg"

let handler = async (m, { conn, usedPrefix }) => conn.sendButtonImg(m.chat, qrku, `
tidak ada pembayaran yang masuk! foto diatas adalah contoh kalo pembayaran masuk.
`.trim(), wm, 'Menu', usedPrefix + 'menu', m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['about']
handler.command = ['verificationpayment']

module.exports = handler
