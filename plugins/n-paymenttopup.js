const qrku = "https://telegra.ph/file/0bdf498e66b36bbb5b428.jpg"

let handler = async (m, { conn, usedPrefix }) => conn.sendButtonImg(m.chat, qrku, `
╭─「 *NOTE* 」
│ Scan QRnya (Bisa Lewat Bank Atau Dana, Dan Payment Lainnya, Pembayaran tetap masuk ke dana!) 
│ Kemudian ingfokan ke 
│ wa.me/6289677184101 lalu ketik kamu belinya nominal berapa contoh : "foto pembayaran" + caption pulsa 5k (tergantung pembayaran)
╰────
`.trim(), wm, 'Verifikasi Pembayaran', usedPrefix + 'verificationpayment', m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['about']
handler.command = ['paymenttopup']

module.exports = handler
