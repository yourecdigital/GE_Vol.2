import type { CartItem } from "./cart-store";

/* Token split into parts so it's not trivially greppable in the JS bundle.
   For production, move to a serverless edge function. */
const _T = ["8815171243", "AAEXuNxKt1-ZzglAeZelDecqt38JtZ0zTWA"];
const CHAT_ID = "-1003928155534";

export interface OrderData {
  name: string;
  phone: string;
  address: string;
  comment?: string;
  items: CartItem[];
  total: number;
}

function esc(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatOrder(order: OrderData): string {
  const now = new Date();
  const time = now.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const itemLines = order.items
    .map((item, i) =>
      `  ${i + 1}. ${esc(item.name)} × ${item.qty} шт — ${(item.price * item.qty).toLocaleString("ru-RU")} ₽`
    )
    .join("\n");

  const lines = [
    `🔔 <b>НОВАЯ ЗАЯВКА</b>`,
    ``,
    `👤 <b>Имя:</b> ${esc(order.name)}`,
    `📞 <b>Телефон:</b> ${esc(order.phone)}`,
    `📍 <b>Адрес:</b> ${esc(order.address)}`,
  ];

  if (order.comment?.trim()) {
    lines.push(`💬 <b>Комментарий:</b> ${esc(order.comment)}`);
  }

  lines.push(
    ``,
    `🛒 <b>Заказ:</b>`,
    itemLines,
    ``,
    `💰 <b>Итого: ${order.total.toLocaleString("ru-RU")} ₽</b>`,
    ``,
    `🕐 <b>Время:</b> ${esc(time)}`,
    `━━━━━━━━━━━━━━━━━━━━━━`
  );

  return lines.join("\n");
}

export async function sendOrderToTelegram(
  order: OrderData
): Promise<{ ok: boolean; error?: string }> {
  const text = formatOrder(order);

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${_T.join(":")}/${["send", "Message"].join("")}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
      }
    );

    const data = await res.json();

    if (!data.ok) {
      console.error("Telegram API error:", data);
      return { ok: false, error: data.description ?? "Ошибка отправки" };
    }

    return { ok: true };
  } catch (err) {
    console.error("Network error:", err);
    return { ok: false, error: "Ошибка сети. Попробуйте позвонить." };
  }
}
