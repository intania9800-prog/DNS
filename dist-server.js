// server.ts
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
var DB_FILE = path.join(__dirname, "transactions.json");
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
function loadTransactions() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading transactions.json", err);
  }
  return [];
}
function saveTransactionsToDisk(transactions) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(transactions, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving transactions.json", err);
  }
}
if (!fs.existsSync(DB_FILE)) {
  const initialData = [
    {
      id: "ADG-782910",
      customerName: "Budi Santoso",
      whatsappNumber: "081288991234",
      packageId: "plan-1-bulan",
      packageName: "1 Bulan",
      durationLabel: "1 Bulan",
      basePrice: 2e5,
      uniqueCode: 147,
      totalPrice: 200147,
      paymentMethod: "QRIS",
      status: "TERVERIFIKASI_AKTIF",
      createdAt: new Date(Date.now() - 45 * 60 * 1e3).toISOString(),
      paidAt: new Date(Date.now() - 40 * 60 * 1e3).toISOString(),
      verifiedAt: new Date(Date.now() - 35 * 60 * 1e3).toISOString(),
      dnsCredentials: {
        primaryIpv4: "94.140.14.14",
        secondaryIpv4: "94.140.15.15",
        primaryIpv6: "2a10:50c0::ad1:ff",
        secondaryIpv6: "2a10:50c0::ad2:ff",
        dohUrl: "https://dns.adguard-dns.com/dns-query/adg-budi-147",
        dotServer: "adg-budi-147.adguard-dns.com",
        userTag: "adg-budi-147"
      }
    }
  ];
  saveTransactionsToDisk(initialData);
}
app.get("/api/transactions", (_req, res) => {
  const list = loadTransactions();
  res.json(list);
});
app.get("/api/transactions/:id", (req, res) => {
  const list = loadTransactions();
  const tx = list.find((t) => t.id.toLowerCase() === req.params.id.toLowerCase());
  if (!tx) {
    return res.status(404).json({ error: "Transaksi tidak ditemukan" });
  }
  res.json(tx);
});
app.post("/api/transactions", (req, res) => {
  const tx = req.body;
  if (!tx || !tx.id) {
    return res.status(400).json({ error: "Data transaksi tidak valid" });
  }
  const list = loadTransactions();
  const existingIdx = list.findIndex((t) => t.id.toLowerCase() === tx.id.toLowerCase());
  if (existingIdx !== -1) {
    list[existingIdx] = { ...list[existingIdx], ...tx };
  } else {
    list.unshift(tx);
  }
  saveTransactionsToDisk(list);
  console.log(`[Order Saved] ID: ${tx.id}, Buyer: ${tx.customerName}, Status: ${tx.status}, Proof attached: ${!!tx.proofImageUrl}`);
  res.json({ success: true, transaction: tx });
});
app.patch("/api/transactions/:id", (req, res) => {
  const list = loadTransactions();
  const idx = list.findIndex((t) => t.id.toLowerCase() === req.params.id.toLowerCase());
  if (idx === -1) {
    return res.status(404).json({ error: "Transaksi tidak ditemukan" });
  }
  list[idx] = { ...list[idx], ...req.body };
  saveTransactionsToDisk(list);
  res.json({ success: true, transaction: list[idx] });
});
async function startServer() {
  const isProd = process.env.NODE_ENV === "production";
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server AdGuard DNS running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
