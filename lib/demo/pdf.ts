import { jsPDF } from "jspdf";
import type { Invoice, PaymentMethod } from "./portal-data";
import { formatDate, formatNaira, addDays } from "./portal-data";

const MERCHANT_NAME = "Lumen";
const MERCHANT_PHONE = "+234 803 555 0123";
const MERCHANT_EMAIL = "support@lumen.example";
const CUSTOMER_NAME = "Tolu Adebayo";

function receiptNumber(invoiceId: string): string {
  let hash = 0;
  for (let i = 0; i < invoiceId.length; i += 1) {
    hash = (hash * 31 + invoiceId.charCodeAt(i)) >>> 0;
  }
  const digits = String(hash).padStart(8, "0").slice(-8);
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

function drawHeader(doc: jsPDF, title: string) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(title, 20, 24);
}

function drawParty(doc: jsPDF, y: number) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(MERCHANT_NAME, 20, y);
  doc.text("Bill to", 130, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(MERCHANT_PHONE, 20, y + 6);
  doc.text(MERCHANT_EMAIL, 20, y + 12);
  doc.text(CUSTOMER_NAME, 130, y + 6);
}

function drawLineItemTable(doc: jsPDF, y: number, invoice: Invoice) {
  const periodStart = invoice.dueDate ?? new Date();
  const periodEnd = addDays(periodStart, 30);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Description", 20, y);
  doc.text("Qty", 120, y);
  doc.text("Unit price", 145, y);
  doc.text("Amount", 175, y);
  doc.setDrawColor(210);
  doc.line(20, y + 2, 190, y + 2);

  doc.setFont("helvetica", "normal");
  doc.text(invoice.items, 20, y + 9);
  doc.setFontSize(8.5);
  doc.setTextColor(120);
  doc.text(`${formatDate(periodStart)} to ${formatDate(periodEnd)}`, 20, y + 14);
  doc.setTextColor(0);
  doc.setFontSize(10);
  doc.text("1", 120, y + 9);
  doc.text(formatNaira(invoice.amountKobo), 145, y + 9);
  doc.text(formatNaira(invoice.amountKobo), 175, y + 9);

  return y + 28;
}

function drawTotals(doc: jsPDF, y: number, invoice: Invoice, finalLabel: string) {
  doc.setDrawColor(230);
  doc.line(140, y, 190, y);
  doc.setFontSize(10);
  doc.text("Subtotal", 140, y + 7);
  doc.text(formatNaira(invoice.amountKobo), 175, y + 7);
  doc.text("Total", 140, y + 14);
  doc.text(formatNaira(invoice.amountKobo), 175, y + 14);
  doc.setFont("helvetica", "bold");
  doc.text(finalLabel, 140, y + 21);
  doc.text(formatNaira(invoice.amountKobo), 175, y + 21);
  return y + 21;
}

export function downloadInvoicePdf(invoice: Invoice) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const issueDate = invoice.dueDate ?? new Date();

  drawHeader(doc, "Invoice");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Invoice number   ${invoice.id.toUpperCase()}`, 20, 34);
  doc.text(`Date of issue    ${formatDate(issueDate)}`, 20, 40);
  doc.text(`Date due         ${formatDate(issueDate)}`, 20, 46);

  drawParty(doc, 58);
  const afterItems = drawLineItemTable(doc, 76, invoice);
  drawTotals(doc, afterItems, invoice, "Amount due");

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(`${formatNaira(invoice.amountKobo)} due ${formatDate(issueDate)}`, 20, 52);
  doc.setTextColor(0);

  doc.save(`Invoice-${invoice.id.toUpperCase()}.pdf`);
}

export function downloadReceiptPdf(invoice: Invoice, paymentMethod: PaymentMethod) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const paidDate = invoice.dueDate ?? new Date();
  const receiptNo = receiptNumber(invoice.id);

  drawHeader(doc, "Receipt");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Invoice number   ${invoice.id.toUpperCase()}`, 20, 34);
  doc.text(`Receipt number   ${receiptNo}`, 20, 40);
  doc.text(`Date paid        ${formatDate(paidDate)}`, 20, 46);

  drawParty(doc, 58);
  const afterItems = drawLineItemTable(doc, 76, invoice);
  const afterTotals = drawTotals(doc, afterItems, invoice, "Amount paid");

  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(`${formatNaira(invoice.amountKobo)} paid on ${formatDate(paidDate)}`, 20, 52);
  doc.setTextColor(0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Payment history", 20, afterTotals + 14);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("Payment method", 20, afterTotals + 22);
  doc.text("Date", 90, afterTotals + 22);
  doc.text("Amount paid", 130, afterTotals + 22);
  doc.text("Receipt number", 165, afterTotals + 22);
  doc.setDrawColor(230);
  doc.line(20, afterTotals + 24, 190, afterTotals + 24);
  doc.text(`${paymentMethod.brand} - ${paymentMethod.last4}`, 20, afterTotals + 30);
  doc.text(formatDate(paidDate), 90, afterTotals + 30);
  doc.text(formatNaira(invoice.amountKobo), 130, afterTotals + 30);
  doc.text(receiptNo, 165, afterTotals + 30);

  doc.save(`Receipt-${receiptNo}.pdf`);
}
