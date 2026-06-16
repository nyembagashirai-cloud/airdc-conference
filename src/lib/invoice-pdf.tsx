import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const PRIMARY = "#0D3B66";
const PRIMARY_MID = "#1D4E89";
const GOLD = "#C8941C";
const GOLD_LIGHT = "#E8B832";
const WHITE = "#FFFFFF";
const GRAY = "#6B7280";
const LIGHT_GRAY = "#F8F9FA";
const DARK = "#111827";
const BORDER = "#E5E7EB";
const AMBER_BG = "#FEF9ED";
const AMBER_BORDER = "#D97706";
const AMBER_TEXT = "#78350F";
const AMBER_LABEL = "#92400E";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    backgroundColor: WHITE,
    fontSize: 10,
    color: DARK,
  },
  // ── Header ──────────────────────────────────────
  header: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 40,
    paddingVertical: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logo: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  headerTextBlock: {
    flex: 1,
  },
  headerTitle: {
    color: GOLD_LIGHT,
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
  },
  headerSub: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 10,
    marginTop: 3,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  headerRightLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 8,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerRightValue: {
    color: WHITE,
    fontSize: 9,
    marginTop: 2,
  },
  // ── Gold bar ────────────────────────────────────
  goldBar: {
    height: 4,
    backgroundColor: GOLD,
  },
  // ── Invoice label strip ─────────────────────────
  invoiceStrip: {
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  invoiceTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    letterSpacing: 1,
  },
  invoiceMeta: {
    alignItems: "flex-end",
  },
  invoiceMetaRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 2,
  },
  invoiceMetaLabel: {
    color: GRAY,
    fontSize: 9,
    width: 80,
    textAlign: "right",
  },
  invoiceMetaValue: {
    color: DARK,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    width: 110,
  },
  // ── Body ────────────────────────────────────────
  body: {
    paddingHorizontal: 40,
    paddingTop: 24,
  },
  // ── Bill To ─────────────────────────────────────
  billToSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: PRIMARY,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: GOLD,
    paddingBottom: 4,
    marginBottom: 8,
  },
  billToName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: DARK,
    marginBottom: 2,
  },
  billToLine: {
    fontSize: 10,
    color: GRAY,
    marginBottom: 2,
  },
  // ── Line items table ─────────────────────────────
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tableHeaderCell: {
    color: WHITE,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: WHITE,
  },
  tableRowAlt: {
    backgroundColor: LIGHT_GRAY,
  },
  colDesc: { flex: 1 },
  colQty: { width: 40, textAlign: "center" },
  colUnit: { width: 80, textAlign: "right" },
  colTotal: { width: 80, textAlign: "right" },
  cellText: { fontSize: 10, color: DARK },
  // ── Total row ────────────────────────────────────
  totalRow: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: PRIMARY,
    marginBottom: 20,
  },
  totalLabel: {
    flex: 1,
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: WHITE,
  },
  totalValue: {
    width: 80,
    textAlign: "right",
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: GOLD_LIGHT,
  },
  // ── Complimentary badge ──────────────────────────
  complimentaryBox: {
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#86EFAC",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  complimentaryText: {
    fontSize: 10,
    color: "#166534",
    fontFamily: "Helvetica-Bold",
  },
  // ── Payment instructions ─────────────────────────
  paymentBox: {
    backgroundColor: AMBER_BG,
    borderWidth: 1,
    borderColor: AMBER_BORDER,
    borderRadius: 4,
    padding: 14,
    marginBottom: 20,
  },
  paymentLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: AMBER_LABEL,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  paymentText: {
    fontSize: 9,
    color: AMBER_TEXT,
    lineHeight: 1.6,
  },
  paymentCode: {
    fontFamily: "Helvetica-Bold",
  },
  // ── Event details ────────────────────────────────
  eventBox: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
    padding: 14,
    marginBottom: 24,
    flexDirection: "row",
    gap: 32,
  },
  eventItem: {
    flex: 1,
  },
  eventItemLabel: {
    fontSize: 8,
    color: GRAY,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 3,
  },
  eventItemValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: DARK,
  },
  // ── Footer ───────────────────────────────────────
  footer: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 40,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  footerText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 8,
  },
  footerBold: {
    color: GOLD,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  // ── Note ─────────────────────────────────────────
  note: {
    fontSize: 8,
    color: GRAY,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 1.5,
  },
});

export interface InvoicePdfData {
  fullName: string;
  email: string;
  organisation: string;
  country: string;
  delegateLabel: string;
  confirmationCode: string;
  fee: string;
  isComplimentary: boolean;
  logoBase64?: string;
}

function InvoiceDocument(props: InvoicePdfData) {
  const {
    fullName,
    email,
    organisation,
    country,
    delegateLabel,
    confirmationCode,
    fee,
    isComplimentary,
    logoBase64,
  } = props;

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const feeDisplay = isComplimentary ? "USD $0.00" : ("USD $" + fee);
  const totalDisplay = isComplimentary ? "USD $0.00" : ("USD $" + fee);

  return (
    <Document
      title={"AIRDC 2026 Invoice " + confirmationCode}
      author="AIRDC 2026 Local Organising Committee"
      subject="Conference Registration Invoice"
    >
      <Page size="A4" style={styles.page}>

        {/* ── Header ── */}
        <View style={styles.header}>
          {logoBase64 && <Image src={logoBase64} style={styles.logo} />}
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>AIRDC 2026</Text>
            <Text style={styles.headerSub}>24th Annual Conference • Harare, Zimbabwe</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.headerRightLabel}>Conference Dates</Text>
            <Text style={styles.headerRightValue}>27–30 September 2026</Text>
          </View>
        </View>

        {/* ── Gold bar ── */}
        <View style={styles.goldBar} />

        {/* ── Invoice label strip ── */}
        <View style={styles.invoiceStrip}>
          <Text style={styles.invoiceTitle}>PROFORMA INVOICE</Text>
          <View style={styles.invoiceMeta}>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Invoice No:</Text>
              <Text style={styles.invoiceMetaValue}>{confirmationCode}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Date:</Text>
              <Text style={styles.invoiceMetaValue}>{today}</Text>
            </View>
            <View style={styles.invoiceMetaRow}>
              <Text style={styles.invoiceMetaLabel}>Status:</Text>
              <Text style={[styles.invoiceMetaValue, { color: isComplimentary ? "#16A34A" : AMBER_BORDER }]}>
                {isComplimentary ? "No Payment Required" : "Awaiting Payment"}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>

          {/* ── Bill To ── */}
          <View style={styles.billToSection}>
            <Text style={styles.sectionLabel}>Bill To</Text>
            <Text style={styles.billToName}>{fullName}</Text>
            <Text style={styles.billToLine}>{organisation}</Text>
            <Text style={styles.billToLine}>{country}</Text>
            <Text style={styles.billToLine}>{email}</Text>
          </View>

          {/* ── Line Items Table ── */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.colDesc]}>Description</Text>
              <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderCell, styles.colUnit]}>Unit Price</Text>
              <Text style={[styles.tableHeaderCell, styles.colTotal]}>Total</Text>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.colDesc}>
                <Text style={styles.cellText}>24th AIRDC Annual Conference — Registration Fee</Text>
                <Text style={[styles.cellText, { color: GRAY, fontSize: 8, marginTop: 2 }]}>
                  {delegateLabel} • 27–30 September 2026 • Rainbow Towers Hotel, Harare
                </Text>
              </View>
              <Text style={[styles.cellText, styles.colQty]}>1</Text>
              <Text style={[styles.cellText, styles.colUnit]}>{feeDisplay}</Text>
              <Text style={[styles.cellText, styles.colTotal]}>{feeDisplay}</Text>
            </View>
          </View>

          {/* ── Total ── */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL DUE</Text>
            <Text style={styles.totalValue}>{totalDisplay}</Text>
          </View>

          {/* ── Complimentary / Payment ── */}
          {isComplimentary ? (
            <View style={styles.complimentaryBox}>
              <Text style={styles.complimentaryText}>
                ✓  This delegate is fee-exempt. No payment is required.
              </Text>
            </View>
          ) : (
            <View style={styles.paymentBox}>
              <Text style={styles.paymentLabel}>Payment Instructions</Text>
              <Text style={styles.paymentText}>
                A member of the AIRDC 2026 Local Organising Committee will contact you within 48 hours
                with full bank transfer details. Please reference your confirmation code{" "}
                <Text style={styles.paymentCode}>{confirmationCode}</Text> in all payment correspondence.
                {" "}All payments must be made in USD. Bank charges are the responsibility of the delegate.
              </Text>
            </View>
          )}

          {/* ── Event Details ── */}
          <Text style={[styles.sectionLabel, { marginBottom: 10 }]}>Event Details</Text>
          <View style={styles.eventBox}>
            <View style={styles.eventItem}>
              <Text style={styles.eventItemLabel}>Event</Text>
              <Text style={styles.eventItemValue}>24th AIRDC Annual Conference</Text>
            </View>
            <View style={styles.eventItem}>
              <Text style={styles.eventItemLabel}>Dates</Text>
              <Text style={styles.eventItemValue}>27–30 September 2026</Text>
            </View>
            <View style={styles.eventItem}>
              <Text style={styles.eventItemLabel}>Venue</Text>
              <Text style={styles.eventItemValue}>Rainbow Towers Hotel{" "}Harare, Zimbabwe</Text>
            </View>
          </View>

          {/* ── Note ── */}
          <Text style={styles.note}>
            This is a proforma invoice confirming your registration for AIRDC 2026.
            It is not a VAT invoice. For enquiries: info@airdczim.co.zw
          </Text>

        </View>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Association of Insurers and Reinsurers of Developing Countries</Text>
          <Text style={styles.footerBold}>www.airdczim.co.zw</Text>
        </View>

      </Page>
    </Document>
  );
}

export async function generateInvoicePdf(data: InvoicePdfData): Promise<Buffer> {
  const buffer = await renderToBuffer(<InvoiceDocument {...data} />);
  return buffer as Buffer;
}
