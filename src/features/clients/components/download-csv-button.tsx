"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { exportCsvReportAction } from "../actions";

export function DownloadCsvButton() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const result = await exportCsvReportAction();
      if (!result.success || !result.data) {
        throw new Error(result.error ?? "Export failed");
      }

      const blob = new Blob([result.data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "zylora-executive-reports.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Silent failure for download
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-[#ffffff] px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
    >
      {loading && <Loader2 className="size-4 animate-spin" />}
      {loading ? "Generating..." : "Download CSV Snapshot Report"}
    </button>
  );
}
