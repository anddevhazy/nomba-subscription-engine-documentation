"use client";

import { useMemo, useState } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";
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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  function handleDownload(key: string, run: () => void) {
    setDownloadingId(key);
    setTimeout(() => {
      run();
      setDownloadingId(null);
    }, 500);
  }

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
    <div>
      <h3 className="mb-3 text-xl font-semibold text-gray-900">Invoice history</h3>
      <Input
        placeholder="Search invoices"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4 h-10 rounded-md border-gray-300 focus-visible:border-[#6C5CE0] focus-visible:ring-[#6C5CE0]/20"
      />
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 hover:bg-transparent">
            <TableHead
              className="cursor-pointer text-xs font-medium text-gray-500"
              onClick={() => toggleSort("dueDate")}
            >
              Due date {sortKey === "dueDate" ? (sortDir === 1 ? "↑" : "↓") : "↕"}
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500">Status</TableHead>
            <TableHead className="text-xs font-medium text-gray-500">Invoice number</TableHead>
            <TableHead
              className="cursor-pointer text-xs font-medium text-gray-500"
              onClick={() => toggleSort("amount")}
            >
              Amount {sortKey === "amount" ? (sortDir === 1 ? "↑" : "↓") : "↕"}
            </TableHead>
            <TableHead className="text-xs font-medium text-gray-500">Items</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((inv) => (
            <TableRow key={inv.id} className="border-gray-100 hover:bg-gray-50">
              <TableCell className="text-gray-700">{inv.dueDate ? formatDate(inv.dueDate) : "-"}</TableCell>
              <TableCell>
                <Badge variant="outline" className="rounded-full border-transparent bg-green-50 text-green-700">
                  Paid
                </Badge>
              </TableCell>
              <TableCell className="text-gray-700">{inv.id.toUpperCase()}</TableCell>
              <TableCell className="text-gray-700">{formatNaira(inv.amountKobo)}</TableCell>
              <TableCell className="max-w-56 truncate text-gray-700">{inv.items}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="text-gray-400 hover:text-gray-700"
                        aria-label="Invoice actions"
                      />
                    }
                  >
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      disabled={downloadingId !== null}
                      onClick={() => handleDownload(`${inv.id}:invoice`, () => downloadInvoicePdf(inv))}
                    >
                      {downloadingId === `${inv.id}:invoice` && <Loader2 className="size-3.5 animate-spin" />}
                      Download invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      disabled={downloadingId !== null}
                      onClick={() => handleDownload(`${inv.id}:receipt`, () => downloadReceiptPdf(inv, paymentMethod))}
                    >
                      {downloadingId === `${inv.id}:receipt` && <Loader2 className="size-3.5 animate-spin" />}
                      Download receipt
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow className="border-gray-100">
              <TableCell colSpan={6} className="text-center text-gray-400">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="mt-3 text-xs text-gray-400">Viewing page 1</p>
    </div>
  );
}
