"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Invoice, type PaymentMethod, formatDate, formatNaira } from "@/lib/demo/portal-data";
import { downloadInvoicePdf, downloadReceiptPdf } from "@/lib/demo/pdf";

type SortKey = "dueDate" | "amount";

export function InvoiceHistory({ invoices, paymentMethod }: { invoices: Invoice[]; paymentMethod: PaymentMethod }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  const rows = useMemo(() => {
    const filtered = invoices.filter((inv) => inv.items.toLowerCase().includes(query.toLowerCase()));
    return [...filtered].sort((a, b) => {
      if (sortKey === "amount") return (a.amountKobo - b.amountKobo) * sortDir;
      const at = a.dueDate ? a.dueDate.getTime() : 0;
      const bt = b.dueDate ? b.dueDate.getTime() : 0;
      return (at - bt) * sortDir;
    });
  }, [invoices, query, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 1 ? -1 : 1) as 1 | -1);
    } else {
      setSortKey(key);
      setSortDir(-1);
    }
  }

  return (
    <div className="rounded-xl border border-border p-4">
      <h3 className="mb-3 text-sm font-semibold">Invoice history</h3>
      <Input
        placeholder="Search invoices"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-3"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("dueDate")}>
              Due date {sortKey === "dueDate" ? (sortDir === 1 ? "↑" : "↓") : "↕"}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Invoice number</TableHead>
            <TableHead className="cursor-pointer" onClick={() => toggleSort("amount")}>
              Amount {sortKey === "amount" ? (sortDir === 1 ? "↑" : "↓") : "↕"}
            </TableHead>
            <TableHead>Items</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((inv) => (
            <TableRow key={inv.id}>
              <TableCell>{inv.dueDate ? formatDate(inv.dueDate) : "-"}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-light text-green-dark">
                  Paid
                </Badge>
              </TableCell>
              <TableCell>{inv.id.toUpperCase()}</TableCell>
              <TableCell>{formatNaira(inv.amountKobo)}</TableCell>
              <TableCell className="max-w-56 truncate">{inv.items}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="ghost" size="icon-sm" aria-label="Invoice actions" />}
                  >
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => downloadInvoicePdf(inv)}>
                      Download invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadReceiptPdf(inv, paymentMethod)}>
                      Download receipt
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-text-muted">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="mt-3 text-xs text-text-muted">Viewing page 1</p>
    </div>
  );
}
