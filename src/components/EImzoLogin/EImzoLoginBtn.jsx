"use client";

import React, { useEffect, useState } from "react";
import { EIMZOClient } from "@/components/e-imzo/e-imzo-client";

export default function EImzoLoginBtn() {
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("E-IMZO tekshirilmoqda…");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(false);

  const initEimzo = () =>
    new Promise((resolve) => {
      setError("");
      if (typeof window === "undefined") {
        setStatus("SSR rejim — faqat brauzerda ishlaydi");
        console.error("[EIMZO] SSR");
        return resolve();
      }
      if (!window.CAPIWS) {
        setStatus("CAPIWS topilmadi. E-IMZO dasturini ishga tushiring.");
        console.error("[EIMZO] CAPIWS yo‘q");
        setReady(false);
        return resolve();
      }
      setStatus("Versiya tekshirilmoqda…");
      EIMZOClient.checkVersion(
        (maj, min) => {
          setStatus(`v${maj}.${min} aniqlandi. API key o‘rnatilmoqda…`);
          EIMZOClient.installApiKeys(
            () => {
              console.log("[EIMZO] ready");
              setStatus("Tayyor");
              setReady(true);
              resolve();
            },
            (_e, r) => {
              console.error("[EIMZO] apikey fail:", r);
              setError(String(r || "API key xatosi"));
              setStatus("API key xatosi");
              setReady(false);
              resolve();
            }
          );
        },
        (_e, r) => {
          console.error("[EIMZO] version fail:", r);
          setError(String(r || "Versiya xatosi"));
          setStatus("Versiya xatosi");
          setReady(false);
          resolve();
        }
      );
    });

  useEffect(() => {
    initEimzo();
  }, []);

  const openModal = async () => {
    if (!ready) await initEimzo();

    setShow(true);
    setItems([]);
    setSel(null);

    if (!window.CAPIWS) return;

    EIMZOClient.listAllUserKeys(
      (vo, i) => `itm-${vo.type}-${i}`,
      (id, vo) => ({ id, vo }),
      (arr) => {
        console.log("[EIMZO] keys:", arr);
        setItems(arr);
        setSel(arr && arr[0] ? arr[0].vo : null);
      },
      (_e, r) => {
        console.error("[EIMZO] listAllUserKeys fail:", r);
        setError(String(r || "Kalitlarni olishda xato"));
      }
    );
  };

  const loginWithSelected = async () => {
    if (!sel) return;
    setLoading(true);
    try {
      const r = await fetch("/api/auth/eimzo/login", { cache: "no-store" });
      const js = await r.json();
      if (!r.ok || js.status !== 1 || !js.challenge) {
        throw new Error("Challenge olishda xato");
      }

      const keyId = await new Promise((resolve, reject) => {
        EIMZOClient.loadKey(
          sel,
          (id) => resolve(id),
          (_e, rr) => reject(new Error(rr || "Kalitni yuklashda xato"))
        );
      });

      const pkcs7 = await new Promise((resolve, reject) => {
        EIMZOClient.createPkcs7(
          keyId,
          js.challenge,
          null,
          (pk) => resolve(pk),
          (_e, rr) => reject(new Error(rr || "PKCS7 yaratishda xato"))
        );
      });

      const cb = await fetch("/api/auth/eimzo/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkcs7 }),
      });
      if (!cb.ok) throw new Error("Imzo tekshiruvdan o‘tmadi");

      window.location.href = "/dashboard";
    } catch (e) {
      alert(e.message || e);
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  return (
    <>
      <div className="mb-2 text-sm">
        Holat: <b>{status}</b>
        {error ? <span className="text-red-600"> — {error}</span> : null}
      </div>

      <button onClick={openModal} className="btn btn-primary">
        Войти через E-IMZO
      </button>

      {show && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-[520px] shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Kalitni tanlang</h3>

            {items.length === 0 ? (
              <div className="text-sm">
                {error ? (
                  <span className="text-red-600">Xato: {error}</span>
                ) : (
                  "Kalitlar yuklanmoqda yoki topilmadi. Tokenni ulang yoki PFX ni dskeys ichiga qo‘ying."
                )}
              </div>
            ) : (
              <ul className="max-h-60 overflow-auto border rounded">
                {items.map((it) => (
                  <li key={it.id} className="p-2 border-b last:border-b-0">
                    <label className="flex gap-2 items-center">
                      <input
                        type="radio"
                        name="key"
                        checked={
                          sel && sel.serialNumber === it.vo.serialNumber
                        }
                        onChange={() => setSel(it.vo)}
                      />
                      <span className="flex-1">
                        {it.vo.CN} — {it.vo.TIN || it.vo.PINFL}
                        <div className="text-xs text-gray-500">
                          {new Date(it.vo.validFrom).toLocaleDateString()} —{" "}
                          {new Date(it.vo.validTo).toLocaleDateString()}
                        </div>
                      </span>
                      <span className="px-2 text-xs bg-gray-100 rounded">
                        {it.vo.type}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-4 flex justify-between items-center">
              <button onClick={initEimzo} className="text-xs underline">
                Qayta tekshirish
              </button>
              <div className="flex gap-2">
                <button onClick={() => setShow(false)} className="btn">
                  Bekor qilish
                </button>
                <button
                  onClick={loginWithSelected}
                  disabled={!sel || loading}
                  className="btn btn-primary"
                >
                  {loading ? "Imzolanmoqda..." : "Kirish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
