"use client";

export default function EImzoLoginBtn() {
  const start = async () => {
    // 1) challenge
    const r = await fetch("/api/auth/eimzo/login", { cache: "no-store" });
    const { challenge, status } = await r.json();
    if (status !== 1) return alert("Challenge olishda xato.");

    try {
      // 2) PKCS7 (detached) yaratish — CAPIWS orqali
      //  - agar ID‑karta bo‘lsa ko‘pincha id = "idcard"
      //  - PFX bo‘lsa oldin kalitni tanlab/yuklab id olasiz (keyinchalik qo‘shamiz)
      const id = "idcard";

      const pkcs7 = await new Promise((resolve, reject) => {
        const data_64 = btoa(challenge); // challenge ni Base64
        CAPIWS.callFunction({
          plugin: "pkcs7",
          name: "create_pkcs7",
          arguments: [data_64, id, "yes"], // "yes" => detached PKCS7
        }, (_ev, data) => {
          if (data.success) resolve(data.pkcs7_64);
          else reject(data.reason);
        }, (err) => reject(err));
      });

      // 3) serverga yuboramiz (u /backend/auth ga relay qiladi)
      const cb = await fetch("/api/auth/eimzo/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkcs7 }),
      });

      if (cb.ok) window.location.href = "/dashboard";
      else alert("Imzo tekshiruvdan o‘tmadi.");
    } catch (e) {
      alert("E‑IMZO xatosi: " + e);
    }
  };

  return (
    <button onClick={start} className="btn btn-primary">
      Войти через E‑IMZO
    </button>
  );
}
