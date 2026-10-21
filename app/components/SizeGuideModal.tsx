"use client";

export default function SizeGuideModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-2xl bg-white text-dark shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted mb-1">
              ✦ Bespoke Luxurrele Fit Guide ✦
            </p>
            <h3 className="font-display text-2xl text-dark">
              Atelier Sizing &amp; Measurement Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 -mr-2 text-dark/70 hover:text-dark transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6 text-sm font-light">
          <p className="text-muted text-[13px] leading-relaxed">
            All our Kashmiri pherans, lehengas, and anarkalis are handcrafted. Traditional pherans carry an authentic, graceful relaxed silhouette designed to drape naturally. If you prefer a more tailored contour, we recommend sizing down or opting for bespoke customization.
          </p>

          {/* Sizing Table */}
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-border text-[10px] tracking-[0.2em] uppercase text-dark">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Bust (Inches)</th>
                  <th className="py-3 px-4">Waist (Inches)</th>
                  <th className="py-3 px-4">Hip (Inches)</th>
                  <th className="py-3 px-4">Length (Pheran)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { size: "XS", bust: "32 – 34", waist: "26 – 28", hip: "36 – 38", len: "44" },
                  { size: "S", bust: "34 – 36", waist: "28 – 30", hip: "38 – 40", len: "45" },
                  { size: "M", bust: "36 – 38", waist: "30 – 32", hip: "40 – 42", len: "45" },
                  { size: "L", bust: "38 – 40", waist: "32 – 34", hip: "42 – 44", len: "46" },
                  { size: "XL", bust: "40 – 42", waist: "34 – 36", hip: "44 – 46", len: "46" },
                  { size: "XXL", bust: "42 – 45", waist: "36 – 39", hip: "46 – 49", len: "47" },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-cream/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-dark">{row.size}</td>
                    <td className="py-3 px-4 text-muted">{row.bust}</td>
                    <td className="py-3 px-4 text-muted">{row.waist}</td>
                    <td className="py-3 px-4 text-muted">{row.hip}</td>
                    <td className="py-3 px-4 text-muted">{row.len}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bespoke Fit Callout */}
          <div className="bg-[#FAF8F5] p-5 border-l-2 border-gold space-y-2">
            <h4 className="font-display text-base text-dark">
              Need Bespoke Custom Sizing?
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              For bridal commissions and private clients, our master karigars cut to your exact personal measurements at zero additional fee. Simply select <strong>Custom</strong> at checkout or message our Srinagar atelier directly.
            </p>
            <a
              href="https://wa.me/917889766195?text=Hello%20Bespoke%20Luxurrele%2C%20I%20would%20like%20guidance%20with%20custom%20sizing%20for%20my%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-dark font-medium text-xs tracking-wider uppercase pt-2 hover:text-emerald-700 transition-colors"
            >
              <span>✦ Chat with our Master Tailor on WhatsApp →</span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border text-right">
          <button
            onClick={onClose}
            className="bg-dark text-ivory text-[10.5px] tracking-[0.25em] uppercase px-6 py-2.5 hover:bg-dark-soft transition-colors"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
