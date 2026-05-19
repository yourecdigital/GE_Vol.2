import type { Metadata } from "next";
import { ContactsContent } from "@/components/contacts-content";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Свяжитесь с нами: телефон, ВКонтакте, часы работы. Доставляем быстро и горячо!",
};

export default function ContactsPage() {
  return (
    <main className="page-top">
      <ContactsContent />
    </main>
  );
}
