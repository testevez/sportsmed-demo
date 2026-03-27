
import { useState, useRef, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  navy: "#1e3a5f", teal: "#0d9488", tealLight: "#ccfbf1", tealDark: "#0f766e",
  amber: "#d97706", amberLight: "#fef3c7", red: "#dc2626", redLight: "#fee2e2",
  green: "#16a34a", greenLight: "#dcfce7", slate50: "#f8fafc", slate100: "#f1f5f9",
  slate200: "#e2e8f0", slate400: "#94a3b8", slate500: "#64748b", slate700: "#334155",
  slate900: "#0f172a", white: "#ffffff",
  fontBody: "'DM Sans', system-ui, sans-serif",
  shadow: "0 1px 4px rgba(0,0,0,0.07)", shadowMd: "0 4px 16px rgba(0,0,0,0.10)",
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const LOCATIONS = {
  bernalillo: { name: "Bernalillo Sports Complex", city: "Bernalillo, NM", lat: 35.31, lng: -106.55, x: 48, y: 38 },
  mesaDel: { name: "Mesa del Sol Fields", city: "Albuquerque, NM", lat: 35.02, lng: -106.61, x: 46, y: 53 },
  ecopark: { name: "Eco Park Soccer Fields", city: "Albuquerque, NM", lat: 35.13, lng: -106.53, x: 49, y: 47 },
  taos: { name: "Taos High School", city: "Taos, NM", lat: 36.41, lng: -105.57, x: 65, y: 18 },
  clovis: { name: "Clovis High School", city: "Clovis, NM", lat: 34.40, lng: -103.20, x: 85, y: 60 },
  eldorado: { name: "Eldorado High School", city: "Albuquerque, NM", lat: 35.07, lng: -106.50, x: 50, y: 50 },
  centennial: { name: "Centennial High School", city: "Las Cruces, NM", lat: 32.32, lng: -106.77, x: 44, y: 82 },
};

const SERIES_DATA = [
  { id: 1, name: "Duke City Soccer League", sport: "Soccer", org: "Duke City Soccer", location: LOCATIONS.bernalillo, status: "published", totalInstances: 18, upcoming: 6, past: 12, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 1, instances: [
    { id: 101, date: "Mar 28", dateObj: new Date(2026,2,28), day: "Sat", status: "filled", atName: "Joe Ramos", atId: 1, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: false, draft: false },
    { id: 102, date: "Apr 4", dateObj: new Date(2026,3,4), day: "Sat", status: "open", atName: null, atId: null, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: null, clientBill: null, isPast: false, draft: false },
    { id: 103, date: "Apr 11", dateObj: new Date(2026,3,11), day: "Sat", status: "open", atName: null, atId: null, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: null, clientBill: null, isPast: false, draft: false },
    { id: 110, date: "Mar 21", dateObj: new Date(2026,2,21), day: "Sat", status: "complete", atName: "Celina Torres", atId: 4, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: true, rating: 5, review: "Excellent work!" },
    { id: 111, date: "Mar 14", dateObj: new Date(2026,2,14), day: "Sat", status: "complete", atName: "Joe Ramos", atId: 1, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: true, rating: 5, review: "Always prepared." },
    { id: 112, date: "Mar 7", dateObj: new Date(2026,2,7), day: "Sat", status: "complete", atName: "Stephanie Vance", atId: 2, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: true, rating: 4, review: "Great, on time." },
  ]},
  { id: 2, name: "NMSA / Classic Soccer", sport: "Soccer", org: "NMSA", location: LOCATIONS.mesaDel, status: "published", totalInstances: 12, upcoming: 4, past: 8, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 1, instances: [
    { id: 201, date: "Apr 18", dateObj: new Date(2026,3,18), day: "Sat", status: "open", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: false },
    { id: 202, date: "May 2", dateObj: new Date(2026,4,2), day: "Sat", status: "needs_staff", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: false },
    { id: 210, date: "Mar 21", dateObj: new Date(2026,2,21), day: "Sat", status: "complete", atName: "Stephanie Vance", atId: 2, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$420", isPast: true, rating: 5, review: "One of our go-to ATs." },
  ]},
  { id: 3, name: "ECNL Regional League", sport: "Soccer", org: "ECNL", location: LOCATIONS.mesaDel, status: "published", totalInstances: 8, upcoming: 3, past: 5, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 1, instances: [
    { id: 301, date: "Apr 18", dateObj: new Date(2026,3,18), day: "Sat", status: "filled", atName: "Stephanie Vance", atId: 2, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$420", isPast: false, draft: false },
    { id: 302, date: "Apr 19", dateObj: new Date(2026,3,19), day: "Sun", status: "needs_staff", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: false },
    { id: 303, date: "Apr 25", dateObj: new Date(2026,3,25), day: "Sat", status: "open", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: false },
  ]},
  { id: 4, name: "Sandia Cup Tournament", sport: "Soccer", org: "Duke City Soccer", location: LOCATIONS.mesaDel, status: "draft", totalInstances: 3, upcoming: 3, past: 0, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 2, instances: [
    { id: 401, date: "May 23", dateObj: new Date(2026,4,23), day: "Sat", status: "draft_pending", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: true },
    { id: 402, date: "May 24", dateObj: new Date(2026,4,24), day: "Sun", status: "draft_pending", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: true },
    { id: 403, date: "May 25", dateObj: new Date(2026,4,25), day: "Mon", status: "draft_pending", atName: null, atId: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: true },
  ]},
  { id: 5, name: "Taos HS Athletics", sport: "Multi-Sport", org: "Taos High School", location: LOCATIONS.taos, status: "published", totalInstances: 14, upcoming: 0, past: 14, atPay: "$400–$650", clientBill: "$600–$900", atsNeeded: 1, instances: [
    { id: 510, date: "Nov 6", dateObj: new Date(2025,10,6), day: "Thu", status: "complete", atName: "Chloe Davis", atId: 3, arrival: "3:00 PM", end: "End of Game", hrs: "N/A", atPay: "$400", clientBill: "$600", isPast: true, rating: 4, review: "Good coverage." },
    { id: 511, date: "Oct 24", dateObj: new Date(2025,9,24), day: "Fri", status: "complete", atName: "Joe Ramos", atId: 1, arrival: "4:00 PM", end: "End of Game", hrs: "N/A", atPay: "$650", clientBill: "$900", isPast: true, rating: 5, review: "Outstanding." },
  ]},
];

const MARKETPLACE_OPPS = [
  { id: 1, seriesName: "Duke City Soccer League", org: "Duke City Soccer", sport: "Soccer", date: "Apr 4, 2026", day: "Sat", location: LOCATIONS.bernalillo, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC"], status: "open", distance: 8 },
  { id: 2, seriesName: "Duke City Soccer League", org: "Duke City Soccer", sport: "Soccer", date: "Apr 11, 2026", day: "Sat", location: LOCATIONS.bernalillo, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC"], status: "open", distance: 8 },
  { id: 3, seriesName: "NMSA Classic Soccer", org: "NMSA", sport: "Soccer", date: "Apr 18, 2026", day: "Sat", location: LOCATIONS.mesaDel, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC", "CPR"], status: "open", distance: 3 },
  { id: 4, seriesName: "ECNL Regional League", org: "ECNL", sport: "Soccer", date: "Apr 19, 2026", day: "Sun", location: LOCATIONS.mesaDel, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC"], status: "needs_staff", distance: 3 },
  { id: 5, seriesName: "ECNL Regional League", org: "ECNL", sport: "Soccer", date: "Apr 25, 2026", day: "Sat", location: LOCATIONS.mesaDel, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC"], status: "open", distance: 3 },
  { id: 6, seriesName: "NMSA Classic Soccer", org: "NMSA", sport: "Soccer", date: "May 2, 2026", day: "Sat", location: LOCATIONS.mesaDel, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC", "CPR"], status: "needs_staff", distance: 3 },
  { id: 7, seriesName: "Sandia Cup Tournament", org: "Duke City Soccer", sport: "Soccer", date: "May 23, 2026", day: "Sat", location: LOCATIONS.mesaDel, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$60/hr", atsNeeded: 2, certsRequired: ["BOC"], status: "open", distance: 3 },
  { id: 8, seriesName: "Sandia Cup Tournament", org: "Duke City Soccer", sport: "Soccer", date: "May 24, 2026", day: "Sun", location: LOCATIONS.mesaDel, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$60/hr", atsNeeded: 2, certsRequired: ["BOC"], status: "open", distance: 3 },
  { id: 9, seriesName: "DPL Spring League", org: "NM Rapids", sport: "Soccer", date: "Apr 11, 2026", day: "Sat", location: LOCATIONS.ecopark, arrival: "8:00 AM", end: "1:00 PM", hrs: 5, atPay: "$300", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC"], status: "needs_staff", distance: 5 },
  { id: 10, seriesName: "DPL Spring League", org: "NM Rapids", sport: "Soccer", date: "Apr 12, 2026", day: "Sun", location: LOCATIONS.ecopark, arrival: "8:00 AM", end: "1:00 PM", hrs: 5, atPay: "$300", clientBill: "$60/hr", atsNeeded: 1, certsRequired: ["BOC"], status: "open", distance: 5 },
];

const ATS = [
  { id: 1, name: "Joe Ramos", rating: 4.9, events: 24, distance: "8 mi", certs: ["BOC", "CPR"], available: true, saved: false, invited: false },
  { id: 2, name: "Stephanie Vance", rating: 4.8, events: 31, distance: "3 mi", certs: ["BOC", "CPR", "First Aid"], available: true, saved: true, invited: false },
  { id: 3, name: "Chloe Davis", rating: 4.7, events: 28, distance: "15 mi", certs: ["BOC"], available: false, saved: true, invited: false },
  { id: 4, name: "Celina Torres", rating: 4.6, events: 16, distance: "11 mi", certs: ["BOC", "CPR"], available: true, saved: false, invited: false },
];

// ─── SHARED ATOMS ─────────────────────────────────────────────────────────────
const Badge = ({ color = "slate", children, size = "sm" }) => {
  const palettes = {
    teal: { bg: "#ccfbf1", text: "#0f766e" }, green: { bg: "#dcfce7", text: "#15803d" },
    amber: { bg: "#fef3c7", text: "#b45309" }, red: { bg: "#fee2e2", text: "#b91c1c" },
    blue: { bg: "#dbeafe", text: "#1d4ed8" }, slate: { bg: "#f1f5f9", text: "#475569" },
    violet: { bg: "#ede9fe", text: "#6d28d9" }, navy: { bg: "#e0e7ff", text: "#1e3a5f" },
    draft: { bg: "#f0f9ff", text: "#0369a1" },
  };
  const p = palettes[color] || palettes.slate;
  return (
    <span style={{ background: p.bg, color: p.text, padding: size === "sm" ? "2px 9px" : "1px 7px", borderRadius: 999, fontSize: size === "sm" ? 11 : 10, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 3 }}>
      {children}
    </span>
  );
};

const statusBadge = (status) => {
  const m = {
    filled: ["green", "Filled"], open: ["teal", "Open"], needs_staff: ["amber", "Needs Staff"],
    complete: ["blue", "Complete"], draft_pending: ["draft", "Draft — Pending"], published: ["teal", "Published"],
    draft: ["slate", "Draft"], confirmed: ["green", "Confirmed"], pending: ["amber", "Pending Approval"],
  };
  const [color, label] = m[status] || ["slate", status];
  return <Badge color={color}>{label}</Badge>;
};

const Avatar = ({ name, size = 36, bg = T.teal }) => {
  const ini = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 800, flexShrink: 0 }}>{ini}</div>;
};

const Stars = ({ n }) => <span style={{ color: "#f59e0b", fontSize: 12, letterSpacing: 1 }}>{"★".repeat(Math.floor(n))}{"☆".repeat(5 - Math.floor(n))}<span style={{ color: T.slate400, marginLeft: 3, fontSize: 11, fontWeight: 600 }}>{n}</span></span>;

const Btn = ({ children, variant = "primary", onClick, small, style: extra = {} }) => {
  const styles = {
    primary: { background: T.teal, color: "#fff", border: "none" },
    ghost: { background: T.slate100, color: T.slate500, border: "none" },
    outline: { background: "transparent", color: T.teal, border: `1.5px solid ${T.teal}` },
    danger: { background: T.redLight, color: T.red, border: "none" },
    navy: { background: T.navy, color: "#fff", border: "none" },
    amber: { background: T.amberLight, color: T.amber, border: "none" },
  };
  return (
    <button onClick={onClick} style={{ ...styles[variant], borderRadius: 8, padding: small ? "5px 11px" : "8px 16px", fontSize: small ? 11 : 13, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", ...extra }}>
      {children}
    </button>
  );
};

const Card = ({ children, style: extra = {} }) => (
  <div style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.slate200}`, boxShadow: T.shadow, ...extra }}>{children}</div>
);

const SectionTitle = ({ children }) => (
  <div style={{ fontWeight: 800, fontSize: 13, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>{children}</div>
);

const Divider = () => <div style={{ borderTop: `1px solid ${T.slate100}`, margin: "0" }} />;

// ─── STAT CARD ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, icon, color = T.navy }) => (
  <Card style={{ padding: "18px 20px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{label}</div>
        <div style={{ fontSize: 30, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: T.slate400, marginTop: 4 }}>{sub}</div>}
      </div>
      <div style={{ fontSize: 22 }}>{icon}</div>
    </div>
  </Card>
);

// ─── TOP BAR ─────────────────────────────────────────────────────────────────
const TopBar = ({ orgName, role, user, bg = T.navy }) => (
  <div style={{ background: bg, color: "#fff", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52, boxShadow: "0 2px 8px rgba(0,0,0,0.18)", flexShrink: 0 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 30, height: 30, background: "rgba(255,255,255,0.15)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>⚕</div>
      <span style={{ fontWeight: 800, fontSize: 14, letterSpacing: "-0.01em" }}>SportsMed</span>
      {orgName && <><span style={{ color: "rgba(255,255,255,0.3)" }}>|</span><span style={{ fontSize: 13, opacity: 0.85 }}>{orgName}</span></>}
      {role && <span style={{ background: "rgba(255,255,255,0.13)", borderRadius: 5, padding: "2px 7px", fontSize: 10, fontWeight: 700, letterSpacing: "0.04em" }}>{role}</span>}
    </div>
    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
      <span style={{ fontSize: 12, opacity: 0.6 }}>{user}</span>
      <Avatar name={user || "U"} size={28} bg="rgba(255,255,255,0.2)" />
    </div>
  </div>
);

// ─── SHARED NAV TABS ──────────────────────────────────────────────────────────
const NavTabs = ({ tabs, active, onChange, dark = false }) => (
  <div style={{ display: "flex", gap: 2, borderBottom: `2px solid ${dark ? "#1e293b" : T.slate200}`, paddingBottom: 0, overflowX: "auto" }}>
    {tabs.map(t => (
      <button key={t.key} onClick={() => onChange(t.key)} style={{
        padding: "10px 16px", border: "none", background: "none", cursor: "pointer", whiteSpace: "nowrap",
        fontSize: 13, fontWeight: active === t.key ? 700 : 500,
        color: active === t.key ? (dark ? "#22d3ee" : T.teal) : (dark ? "#475569" : T.slate500),
        borderBottom: active === t.key ? `2px solid ${dark ? "#22d3ee" : T.teal}` : "2px solid transparent",
        marginBottom: -2, transition: "all 0.12s",
      }}>{t.label}</button>
    ))}
  </div>
);

// ─── SMALL MAP WIDGET ─────────────────────────────────────────────────────────
const MiniMap = ({ pins = [], selected = null, onSelect = () => {} }) => {
  // NM map bounds approximation -> SVG coords
  // We draw a stylized state outline + pins
  const cities = [
    { name: "Albuquerque", x: 47, y: 50, label: true },
    { name: "Santa Fe", x: 58, y: 38, label: true },
    { name: "Taos", x: 65, y: 22, label: false },
    { name: "Las Cruces", x: 44, y: 82, label: false },
    { name: "Clovis", x: 86, y: 59, label: false },
    { name: "Roswell", x: 78, y: 68, label: false },
  ];

  return (
    <div style={{ position: "relative", width: "100%", background: "#e8f4f8", borderRadius: 12, overflow: "hidden", border: `1px solid ${T.slate200}` }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", display: "block" }}>
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="#dbeafe" opacity="0.3" />

        {/* NM rough outline */}
        <polygon points="28,5 88,5 88,60 88,95 28,95 10,95 10,60 10,5" fill="#f0f9ff" stroke="#bfdbfe" strokeWidth="0.5" />

        {/* Roads hint */}
        {[[48,5,48,95],[10,50,88,50]].map(([x1,y1,x2,y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="2,3" />
        ))}

        {/* City dots */}
        {cities.map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="1.2" fill="#94a3b8" opacity="0.7" />
            {c.label && <text x={c.x + 1.5} y={c.y + 0.5} fontSize="3.5" fill="#64748b" fontFamily="DM Sans, sans-serif" fontWeight="600">{c.name}</text>}
          </g>
        ))}

        {/* Event pins */}
        {pins.map((pin, i) => {
          const isSel = selected === pin.id;
          return (
            <g key={i} style={{ cursor: "pointer" }} onClick={() => onSelect(pin.id)}>
              {isSel && <circle cx={pin.x} cy={pin.y} r="5" fill={T.teal} opacity="0.2" />}
              <circle cx={pin.x} cy={pin.y} r={isSel ? 3.5 : 2.8} fill={pin.urgent ? T.amber : T.teal} stroke="#fff" strokeWidth="0.8" />
              <text x={pin.x} y={pin.y + 0.7} textAnchor="middle" fontSize="2.5" fill="white" fontWeight="bold" fontFamily="DM Sans, sans-serif">{pin.count > 1 ? pin.count : "+"}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", bottom: 6, right: 8, display: "flex", gap: 8, fontSize: 9, color: T.slate500 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: T.teal, display: "inline-block" }} />Open</span>
        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: T.amber, display: "inline-block" }} />Urgent</span>
      </div>
    </div>
  );
};

// ─── LARGE MAP PANEL ──────────────────────────────────────────────────────────
const FullMap = ({ pins = [], selected = null, onSelect = () => {} }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 400, background: "#e8f4f8", borderRadius: 14, overflow: "hidden", border: `1px solid ${T.slate200}` }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", display: "block" }}>
        {/* Sky bg */}
        <defs>
          <linearGradient id="mapBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bfdbfe" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#mapBg)" />

        {/* NM outline */}
        <polygon points="28,3 90,3 90,95 28,95 8,95 8,3" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="0.6" />

        {/* Terrain fills */}
        <ellipse cx="55" cy="45" rx="22" ry="15" fill="#fef9c3" opacity="0.3" />
        <ellipse cx="35" cy="70" rx="15" ry="10" fill="#d1fae5" opacity="0.25" />

        {/* Grid roads */}
        {[20,40,60,80].map(v => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="100" stroke="#e2e8f0" strokeWidth="0.3" opacity="0.6" />
            <line x1="0" y1={v} x2="100" y2={v} stroke="#e2e8f0" strokeWidth="0.3" opacity="0.6" />
          </g>
        ))}

        {/* I-25 highway */}
        <path d="M 48 95 L 48 5" stroke="#fde68a" strokeWidth="1" strokeDasharray="0" opacity="0.6" />
        <text x="49" y="90" fontSize="3" fill="#d97706" fontFamily="DM Sans, sans-serif" fontWeight="700">I-25</text>

        {/* Cities */}
        {[
          { name: "Albuquerque", x: 46, y: 52 }, { name: "Santa Fe", x: 58, y: 36 },
          { name: "Taos", x: 65, y: 20 }, { name: "Las Cruces", x: 43, y: 84 },
          { name: "Clovis", x: 86, y: 60 }, { name: "Roswell", x: 78, y: 70 },
          { name: "Farmington", x: 24, y: 12 },
        ].map((c, i) => (
          <g key={i}>
            <circle cx={c.x} cy={c.y} r="1.5" fill="#94a3b8" opacity="0.5" />
            <text x={c.x + 2} y={c.y + 0.6} fontSize="3.2" fill="#475569" fontFamily="DM Sans, sans-serif" fontWeight="500">{c.name}</text>
          </g>
        ))}

        {/* Event pins */}
        {pins.map((pin) => {
          const isSel = selected === pin.id;
          return (
            <g key={pin.id} style={{ cursor: "pointer" }} onClick={() => onSelect(pin.id === selected ? null : pin.id)}>
              {isSel && <circle cx={pin.x} cy={pin.y} r="7" fill={T.teal} opacity="0.15" />}
              {/* Pin body */}
              <ellipse cx={pin.x} cy={pin.y + 5} rx="2.5" ry="0.8" fill="rgba(0,0,0,0.15)" />
              <path d={`M${pin.x},${pin.y - 5} a4,4 0 1,1 0.01,0 Z`} fill={pin.urgent ? T.amber : T.teal} stroke="#fff" strokeWidth="0.8" />
              <circle cx={pin.x} cy={pin.y - 5} r="1.8" fill="white" opacity="0.5" />
              <text x={pin.x} y={pin.y - 4.3} textAnchor="middle" fontSize="2.2" fill="white" fontWeight="bold" fontFamily="DM Sans, sans-serif">{pin.count > 1 ? pin.count : "1"}</text>
              {isSel && (
                <g>
                  <rect x={pin.x - 15} y={pin.y - 20} width="30" height="11" rx="2" fill={T.navy} opacity="0.95" />
                  <text x={pin.x} y={pin.y - 15} textAnchor="middle" fontSize="2.8" fill="white" fontFamily="DM Sans, sans-serif" fontWeight="700">{pin.label}</text>
                  <text x={pin.x} y={pin.y - 11} textAnchor="middle" fontSize="2.2" fill="#94a3b8" fontFamily="DM Sans, sans-serif">{pin.sublabel}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", bottom: 10, left: 10, background: "rgba(255,255,255,0.9)", borderRadius: 8, padding: "6px 10px", fontSize: 10, color: T.slate500, backdropFilter: "blur(4px)" }}>
        <div style={{ display: "flex", gap: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: T.teal, display: "inline-block" }} />Open</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: T.amber, display: "inline-block" }} />Urgent — Needs Staff</span>
        </div>
        <div style={{ marginTop: 2, opacity: 0.7 }}>Click a pin to preview</div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  1. HO DASHBOARD (updated)
// ════════════════════════════════════════════════════════════════════════════
function HODashboard({ onNavigate }) {
  const [tab, setTab] = useState("upcoming");
  const [expanded, setExpanded] = useState(new Set([1, 3]));
  const [userRole] = useState("admin"); // 'admin' | 'member'

  const allUpcoming = SERIES_DATA.flatMap(s => s.instances.filter(i => !i.isPast));
  const allPast = SERIES_DATA.flatMap(s => s.instances.filter(i => i.isPast));
  const filled = allUpcoming.filter(i => i.status === "filled").length;
  const needsStaff = allUpcoming.filter(i => i.status === "needs_staff").length;
  const drafts = allUpcoming.filter(i => i.draft).length;

  const toggle = (id) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const mapPins = Object.values(LOCATIONS).map(loc => {
    const locInstances = MARKETPLACE_OPPS.filter(o => o.location === loc && o.status !== "filled");
    if (!locInstances.length) return null;
    return { id: loc.name, x: loc.x, y: loc.y, label: loc.city.split(",")[0], sublabel: `${locInstances.length} open`, count: locInstances.length, urgent: locInstances.some(o => o.status === "needs_staff") };
  }).filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.slate50, fontFamily: T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role={userRole === "admin" ? "HO Admin" : "Scheduler"} user="Sarah Owens" />

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard label="Upcoming Instances" value={allUpcoming.length} icon="📅" color={T.navy} sub="across all series" />
          <StatCard label="Fully Staffed" value={filled} icon="✅" color={T.teal} sub={`${Math.round(filled/allUpcoming.length*100)||0}% fill rate`} />
          <StatCard label="Needs Staff" value={needsStaff} icon="🔔" color={T.amber} sub="requires action" />
          <StatCard label="Pending Drafts" value={drafts} icon="✏️" color="#6366f1" sub={userRole === "admin" ? "awaiting your approval" : "awaiting admin review"} />
        </div>

        {/* Quick actions */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <Btn variant="navy" onClick={() => onNavigate("create-series")}>+ New Event Series</Btn>
          {userRole === "member" && <Btn variant="ghost" onClick={() => onNavigate("create-series")}>+ Draft New Series</Btn>}
          <Btn variant="ghost" onClick={() => onNavigate("past-instances")}>View Past Instances →</Btn>
          {needsStaff > 0 && <div style={{ marginLeft: "auto", background: T.amberLight, color: T.amber, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700 }}>⚠ {needsStaff} instance{needsStaff > 1 ? "s" : ""} need staffing urgently</div>}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: 16 }}>
          <div>
            <NavTabs
              tabs={[{ key: "upcoming", label: "Upcoming Instances" }, { key: "series", label: "All Series" }]}
              active={tab} onChange={setTab}
            />
            <div style={{ marginTop: 14 }}>
              {tab === "upcoming" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SERIES_DATA.filter(s => s.upcoming > 0).map(series => (
                    <Card key={series.id} style={{ overflow: "hidden" }}>
                      <div onClick={() => toggle(series.id)} style={{ padding: "13px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", background: expanded.has(series.id) ? "#f0fdf4" : T.white }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <div style={{ width: 36, height: 36, borderRadius: 9, background: series.status === "draft" ? T.slate200 : T.navy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚽</div>
                          <div>
                            <span style={{ fontWeight: 700, fontSize: 14 }}>{series.name}</span>
                            {series.status === "draft" && <span style={{ marginLeft: 8 }}>{statusBadge("draft")}</span>}
                            <div style={{ fontSize: 11, color: T.slate400, marginTop: 1 }}>📍 {series.location.city}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          {series.instances.filter(i => !i.isPast && i.status === "filled").length > 0 && <Badge color="green">{series.instances.filter(i => !i.isPast && i.status === "filled").length} Filled</Badge>}
                          {series.instances.filter(i => !i.isPast && i.status === "needs_staff").length > 0 && <Badge color="amber">{series.instances.filter(i => !i.isPast && i.status === "needs_staff").length} Urgent</Badge>}
                          {series.instances.filter(i => !i.isPast && i.status === "open").length > 0 && <Badge color="teal">{series.instances.filter(i => !i.isPast && i.status === "open").length} Open</Badge>}
                          {series.instances.filter(i => !i.isPast && i.draft).length > 0 && <Badge color="slate">{series.instances.filter(i => !i.isPast && i.draft).length} Draft</Badge>}
                          <span style={{ fontSize: 16, color: T.slate400, transform: expanded.has(series.id) ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", transition: "transform 0.2s" }}>▾</span>
                        </div>
                      </div>
                      {expanded.has(series.id) && (
                        <>
                          <Divider />
                          <div style={{ background: T.slate50, padding: "6px 18px 0", display: "grid", gridTemplateColumns: "90px 60px 80px 90px 1.5fr 80px 90px 100px", fontSize: 10, fontWeight: 700, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.05em", paddingBottom: 6 }}>
                            <span>Date</span><span>Day</span><span>Arrival</span><span>End</span><span>AT</span><span>Hours</span><span>AT Pay</span><span>Status</span>
                          </div>
                          {series.instances.filter(i => !i.isPast).map((inst, i) => (
                            <div key={inst.id} style={{
                              display: "grid", gridTemplateColumns: "90px 60px 80px 90px 1.5fr 80px 90px 100px",
                              padding: "10px 18px", fontSize: 12, borderTop: "1px solid #f8fafc",
                              background: inst.status === "needs_staff" ? "#fffbeb" : inst.draft ? "#f0f9ff" : T.white, alignItems: "center",
                            }}>
                              <span style={{ fontWeight: 700 }}>{inst.date}</span>
                              <span style={{ color: T.slate400 }}>{inst.day}</span>
                              <span style={{ color: T.slate500 }}>{inst.arrival}</span>
                              <span style={{ color: T.slate500 }}>{inst.end}</span>
                              <span style={{ color: inst.atName ? T.teal : T.slate200, fontWeight: inst.atName ? 600 : 400 }}>{inst.atName || "— Unassigned"}</span>
                              <span style={{ color: T.slate400 }}>{inst.hrs}</span>
                              <span style={{ color: inst.atPay ? T.navy : T.slate200, fontWeight: 600 }}>{inst.atPay || "—"}</span>
                              {statusBadge(inst.status)}
                            </div>
                          ))}
                          <div style={{ padding: "10px 18px", borderTop: "1px solid #f8fafc" }}>
                            <Btn variant="ghost" small onClick={() => onNavigate("create-instance", series.id)}>+ Add Instance</Btn>
                            {userRole === "admin" && series.status === "draft" && <Btn variant="outline" small style={{ marginLeft: 8 }}>Approve & Publish Series</Btn>}
                          </div>
                        </>
                      )}
                    </Card>
                  ))}
                </div>
              )}

              {tab === "series" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {SERIES_DATA.map(s => (
                    <Card key={s.id} style={{ padding: "14px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                      <Avatar name={s.name} size={40} bg={s.status === "draft" ? T.slate400 : T.navy} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{s.name} {statusBadge(s.status)}</div>
                        <div style={{ fontSize: 12, color: T.slate400, marginTop: 2 }}>📍 {s.location.city} · {s.sport} · {s.totalInstances} total instances ({s.past} past, {s.upcoming} upcoming)</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <Btn variant="ghost" small>Edit Series</Btn>
                        <Btn variant="ghost" small onClick={() => onNavigate("past-instances", s.id)}>Past →</Btn>
                        {userRole === "admin" && s.status === "draft" && <Btn variant="outline" small>Approve</Btn>}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right rail */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card style={{ padding: 14 }}>
              <SectionTitle>Location Map</SectionTitle>
              <MiniMap pins={mapPins} />
            </Card>

            <Card style={{ padding: 14 }}>
              <SectionTitle>Favorited ATs</SectionTitle>
              {ATS.filter(a => a.saved).map(at => (
                <div key={at.id} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.slate100}`, alignItems: "center" }}>
                  <Avatar name={at.name} size={30} bg={at.available ? T.teal : T.slate400} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 12 }}>{at.name}</div>
                    <Stars n={at.rating} />
                  </div>
                  <Badge color={at.available ? "teal" : "slate"}>{at.available ? "Avail." : "Busy"}</Badge>
                </div>
              ))}
              <Btn variant="ghost" small style={{ marginTop: 10, width: "100%" }}>View All ATs →</Btn>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. PAST INSTANCES DASHBOARD
// ════════════════════════════════════════════════════════════════════════════
function PastInstancesDashboard({ onBack }) {
  const [filterSeries, setFilterSeries] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const allPast = SERIES_DATA.flatMap(s =>
    s.instances.filter(i => i.isPast).map(inst => ({ ...inst, seriesName: s.name, seriesId: s.id, location: s.location }))
  ).sort((a, b) => b.dateObj - a.dateObj);

  const filtered = filterSeries === "all" ? allPast : allPast.filter(i => i.seriesId === parseInt(filterSeries));

  const totalSpent = allPast.filter(i => i.atPay).reduce((s, i) => s + parseInt(i.atPay.replace("$", "").replace(",", "")), 0);
  const avgRating = (allPast.filter(i => i.rating).reduce((s, i) => s + i.rating, 0) / allPast.filter(i => i.rating).length).toFixed(1);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.slate50, fontFamily: T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role="HO Admin" user="Sarah Owens" />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <button onClick={onBack} style={{ background: T.slate100, border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: T.slate500 }}>← Back to Dashboard</button>
          <h2 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>Past Event Instances</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
          <StatCard label="Total Past Instances" value={allPast.length} icon="📂" color={T.navy} />
          <StatCard label="Total AT Pay Spent" value={`$${totalSpent.toLocaleString()}`} icon="💰" color={T.teal} />
          <StatCard label="Avg AT Rating" value={avgRating} icon="⭐" color={T.amber} sub="across all events" />
          <StatCard label="Series Covered" value={SERIES_DATA.length} icon="📋" color="#6366f1" />
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "center" }}>
          <select value={filterSeries} onChange={e => setFilterSeries(e.target.value)} style={{ border: `1px solid ${T.slate200}`, borderRadius: 8, padding: "7px 12px", fontSize: 13, color: T.slate700, background: T.white }}>
            <option value="all">All Series</option>
            {SERIES_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <span style={{ fontSize: 13, color: T.slate400 }}>Showing {filtered.length} instances</span>
        </div>

        <Card style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "120px 1.5fr 1fr 70px 80px 80px 80px 1.5fr", padding: "10px 18px", background: T.slate50, fontSize: 10, fontWeight: 700, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>Date</span><span>Series</span><span>AT</span><span>Hrs</span><span>AT Pay</span><span>Bill</span><span>Rating</span><span>Review</span>
          </div>
          {filtered.map((inst, i) => (
            <div key={inst.id} style={{ display: "grid", gridTemplateColumns: "120px 1.5fr 1fr 70px 80px 80px 80px 1.5fr", padding: "12px 18px", fontSize: 12, borderTop: "1px solid #f8fafc", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: T.slate700 }}>{inst.date}</span>
              <span style={{ fontWeight: 600 }}>{inst.seriesName}</span>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                <Avatar name={inst.atName || "?"} size={22} bg={T.teal} />
                <span style={{ fontWeight: 600, color: T.teal }}>{inst.atName}</span>
              </div>
              <span style={{ color: T.slate400 }}>{inst.hrs}</span>
              <span style={{ fontWeight: 600 }}>{inst.atPay || "—"}</span>
              <span style={{ color: T.slate400 }}>{inst.clientBill || "—"}</span>
              <Stars n={inst.rating || 0} />
              <span style={{ color: T.slate500, fontStyle: "italic", fontSize: 11 }}>{inst.review || "—"}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. CREATE EVENT SERIES
// ════════════════════════════════════════════════════════════════════════════
function CreateSeriesDashboard({ onBack, userRole = "admin" }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", sport: "", location: "", address: "", city: "", state: "NM", arrivalTime: "", endTime: "", atPay: "", clientBill: "", atsNeeded: 1, notes: "", certsRequired: [] });
  const [instances, setInstances] = useState([{ id: 1, date: "", notes: "" }]);
  const [submitted, setSubmitted] = useState(false);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const addInstance = () => setInstances(p => [...p, { id: p.length + 1, date: "", notes: "" }]);
  const updInst = (id, k, v) => setInstances(p => p.map(i => i.id === id ? { ...i, [k]: v } : i));
  const removeInst = (id) => setInstances(p => p.filter(i => i.id !== id));

  const isMember = userRole === "member";
  const saveLabel = isMember ? "Submit for Admin Review" : "Publish Event Series";

  const inputStyle = { border: `1px solid ${T.slate200}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, color: T.slate700, width: "100%", boxSizing: "border-box", background: T.white };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: 11, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 };

  if (submitted) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.slate50, fontFamily: T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role={isMember ? "Scheduler" : "HO Admin"} user="Sarah Owens" />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 64 }}>{isMember ? "⏳" : "✅"}</div>
        <div style={{ fontWeight: 800, fontSize: 22, color: T.navy }}>{isMember ? "Draft Submitted for Review" : "Event Series Published!"}</div>
        <div style={{ color: T.slate500, fontSize: 14, textAlign: "center", maxWidth: 380 }}>
          {isMember ? "An HO Admin will review your draft and publish it. You'll be notified once it's live." : `"${form.name}" is now live with ${instances.length} instance${instances.length > 1 ? "s" : ""}. ATs can now see and apply for these events.`}
        </div>
        <Btn variant="navy" onClick={onBack}>← Back to Dashboard</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: T.slate50, fontFamily: T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role={isMember ? "Scheduler" : "HO Admin"} user="Sarah Owens" />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <button onClick={onBack} style={{ background: T.slate100, border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 13, fontWeight: 600, cursor: "pointer", color: T.slate500 }}>← Back</button>
          <h2 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>{isMember ? "Draft New Event Series" : "Create Event Series"}</h2>
          {isMember && <Badge color="draft">Draft Mode — Requires Admin Approval</Badge>}
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, background: T.white, borderRadius: 10, border: `1px solid ${T.slate200}`, overflow: "hidden", width: 500 }}>
          {["Series Info", "Location & Pay", "Event Instances"].map((s, i) => (
            <div key={i} onClick={() => setStep(i + 1)} style={{ flex: 1, padding: "10px", textAlign: "center", cursor: "pointer", background: step === i + 1 ? T.navy : "transparent", color: step === i + 1 ? "#fff" : T.slate400, fontSize: 12, fontWeight: step === i + 1 ? 700 : 500, borderRight: i < 2 ? `1px solid ${T.slate200}` : "none" }}>
              <span style={{ opacity: 0.6, marginRight: 5 }}>{i + 1}.</span>{s}
            </div>
          ))}
        </div>

        <div style={{ maxWidth: 700 }}>
          {step === 1 && (
            <Card style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <SectionTitle>Series Information</SectionTitle>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Series Name *</label>
                  <input style={inputStyle} placeholder="e.g. Spring Soccer League 2026" value={form.name} onChange={e => upd("name", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Sport *</label>
                  <select style={inputStyle} value={form.sport} onChange={e => upd("sport", e.target.value)}>
                    <option value="">Select sport…</option>
                    {["Soccer", "Football", "Basketball", "Volleyball", "Baseball", "Multi-Sport"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={labelStyle}># of ATs Needed per Instance</label>
                <input type="number" min={1} style={{ ...inputStyle, width: 120 }} value={form.atsNeeded} onChange={e => upd("atsNeeded", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Required Certifications</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["BOC", "CPR/AED", "First Aid", "Background Check", "Fingerprint"].map(cert => (
                    <label key={cert} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, cursor: "pointer" }}>
                      <input type="checkbox" checked={form.certsRequired.includes(cert)} onChange={e => upd("certsRequired", e.target.checked ? [...form.certsRequired, cert] : form.certsRequired.filter(c => c !== cert))} />
                      {cert}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label style={labelStyle}>Notes / Special Instructions</label>
                <textarea style={{ ...inputStyle, height: 80, resize: "vertical" }} placeholder="Any special requirements for ATs…" value={form.notes} onChange={e => upd("notes", e.target.value)} />
              </div>
              <Btn variant="navy" onClick={() => setStep(2)}>Next: Location & Pay →</Btn>
            </Card>
          )}

          {step === 2 && (
            <Card style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
              <SectionTitle>Location & Compensation</SectionTitle>
              <div>
                <label style={labelStyle}>Venue / Facility Name *</label>
                <input style={inputStyle} placeholder="e.g. Mesa del Sol Fields" value={form.location} onChange={e => upd("location", e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Street Address</label>
                <input style={inputStyle} placeholder="123 Main St" value={form.address} onChange={e => upd("address", e.target.value)} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12 }}>
                <div><label style={labelStyle}>City *</label><input style={inputStyle} placeholder="Albuquerque" value={form.city} onChange={e => upd("city", e.target.value)} /></div>
                <div><label style={labelStyle}>State</label><input style={inputStyle} value={form.state} onChange={e => upd("state", e.target.value)} /></div>
              </div>
              <div style={{ background: T.slate50, borderRadius: 10, padding: 12, border: `1px solid ${T.slate200}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.slate400, marginBottom: 8 }}>📍 Map Preview (coordinates auto-detected from address)</div>
                <MiniMap pins={[{ id: "new", x: 46, y: 52, label: form.city || "Location", sublabel: "New Series", count: 1, urgent: false }]} selected="new" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={labelStyle}>Default Arrival Time</label><input type="time" style={inputStyle} value={form.arrivalTime} onChange={e => upd("arrivalTime", e.target.value)} /></div>
                <div><label style={labelStyle}>Approx End Time</label><input type="time" style={inputStyle} value={form.endTime} onChange={e => upd("endTime", e.target.value)} /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={labelStyle}>AT Pay Rate *</label><input style={inputStyle} placeholder="e.g. $60/hr or $400 flat" value={form.atPay} onChange={e => upd("atPay", e.target.value)} /></div>
                <div><label style={labelStyle}>Client Bill Rate *</label><input style={inputStyle} placeholder="e.g. $60/hr or $600 flat" value={form.clientBill} onChange={e => upd("clientBill", e.target.value)} /></div>
              </div>
              {!isMember && <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#166534" }}>💡 Platform margin: Client Bill − AT Pay = your cut. Ensure rates are correct before publishing.</div>}
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="ghost" onClick={() => setStep(1)}>← Back</Btn>
                <Btn variant="navy" onClick={() => setStep(3)}>Next: Add Instances →</Btn>
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              <SectionTitle>Event Instances</SectionTitle>
              <div style={{ fontSize: 13, color: T.slate500 }}>Add individual event dates for this series. Each instance can be staffed independently.</div>
              {instances.map((inst, i) => (
                <div key={inst.id} style={{ background: T.slate50, borderRadius: 10, border: `1px solid ${T.slate200}`, padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ background: T.navy, color: "#fff", borderRadius: 8, padding: "6px 10px", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>Day {i + 1}</div>
                  <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: 3 }}>Date *</label>
                      <input type="date" style={inputStyle} value={inst.date} onChange={e => updInst(inst.id, "date", e.target.value)} />
                    </div>
                    <div>
                      <label style={{ ...labelStyle, marginBottom: 3 }}>Instance Notes</label>
                      <input style={inputStyle} placeholder="Optional override notes…" value={inst.notes} onChange={e => updInst(inst.id, "notes", e.target.value)} />
                    </div>
                  </div>
                  {instances.length > 1 && <button onClick={() => removeInst(inst.id)} style={{ background: T.redLight, color: T.red, border: "none", borderRadius: 6, padding: "5px 9px", fontSize: 12, cursor: "pointer" }}>✕</button>}
                </div>
              ))}
              <Btn variant="ghost" onClick={addInstance}>+ Add Another Date</Btn>
              <Divider />
              {isMember && (
                <div style={{ background: T.amberLight, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: T.amber }}>
                  ⚠ As a Scheduler, this series will be saved as a <strong>Draft</strong> and sent to your HO Admin for review before being published to ATs.
                </div>
              )}
              <div style={{ display: "flex", gap: 10 }}>
                <Btn variant="ghost" onClick={() => setStep(2)}>← Back</Btn>
                <Btn variant="navy" onClick={() => setSubmitted(true)}>{saveLabel}</Btn>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. AT MARKETPLACE (Authenticated)
// ════════════════════════════════════════════════════════════════════════════
function ATMarketplace() {
  const [view, setView] = useState("list"); // list | map
  const [filters, setFilters] = useState({ sport: [], distance: "any", minPay: "", dateFrom: "", certsMatch: true, status: [] });
  const [selectedPin, setSelectedPin] = useState(null);
  const [applied, setApplied] = useState(new Set());
  const [saved, setSaved] = useState(new Set([3, 5]));

  const updFilter = (k, v) => setFilters(p => ({ ...p, [k]: v }));
  const toggleArr = (k, v) => setFilters(p => {
    const cur = p[k];
    return { ...p, [k]: cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v] };
  });

  const filtered = MARKETPLACE_OPPS.filter(o => {
    if (filters.sport.length && !filters.sport.includes(o.sport)) return false;
    if (filters.distance !== "any") { const d = parseInt(filters.distance); if (o.distance > d) return false; }
    if (filters.status.length && !filters.status.includes(o.status)) return false;
    return true;
  });

  const mapPins = Object.values(LOCATIONS).map(loc => {
    const locOpps = filtered.filter(o => o.location === loc);
    if (!locOpps.length) return null;
    return { id: loc.name, x: loc.x, y: loc.y, label: loc.city.split(",")[0], sublabel: `${locOpps.length} opportunit${locOpps.length > 1 ? "ies" : "y"}`, count: locOpps.length, urgent: locOpps.some(o => o.status === "needs_staff") };
  }).filter(Boolean);

  const FacetSection = ({ title, children }) => (
    <div style={{ marginBottom: 18 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{title}</div>
      {children}
    </div>
  );

  const CheckFacet = ({ label, count, filterKey, value }) => (
    <label style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6, cursor: "pointer", fontSize: 13, color: T.slate700 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
        <input type="checkbox" checked={filters[filterKey].includes(value)} onChange={() => toggleArr(filterKey, value)} />
        {label}
      </span>
      {count != null && <span style={{ fontSize: 11, color: T.slate400 }}>{count}</span>}
    </label>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: T.fontBody, background: T.slate50 }}>
      <TopBar bg={T.tealDark} role="Athletic Trainer" user="Stephanie Vance" />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Facet sidebar */}
        <div style={{ width: 240, background: T.white, borderRight: `1px solid ${T.slate200}`, padding: "18px 16px", overflowY: "auto", flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: T.navy, marginBottom: 16 }}>Filter Opportunities</div>

          <FacetSection title="Sport">
            {["Soccer", "Football", "Basketball", "Volleyball", "Multi-Sport"].map(s => (
              <CheckFacet key={s} label={s} count={MARKETPLACE_OPPS.filter(o => o.sport === s).length} filterKey="sport" value={s} />
            ))}
          </FacetSection>

          <FacetSection title="Distance from You">
            {[["Any distance", "any"], ["< 10 mi", "10"], ["< 25 mi", "25"], ["< 50 mi", "50"]].map(([label, val]) => (
              <label key={val} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6, cursor: "pointer", fontSize: 13, color: T.slate700 }}>
                <input type="radio" name="distance" value={val} checked={filters.distance === val} onChange={() => updFilter("distance", val)} />
                {label}
              </label>
            ))}
          </FacetSection>

          <FacetSection title="Status">
            <CheckFacet label="Open" count={MARKETPLACE_OPPS.filter(o => o.status === "open").length} filterKey="status" value="open" />
            <CheckFacet label="Urgently Needed" count={MARKETPLACE_OPPS.filter(o => o.status === "needs_staff").length} filterKey="status" value="needs_staff" />
          </FacetSection>

          <FacetSection title="My Certs Match">
            <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, cursor: "pointer" }}>
              <input type="checkbox" checked={filters.certsMatch} onChange={e => updFilter("certsMatch", e.target.checked)} />
              Show only roles I qualify for
            </label>
          </FacetSection>

          <Divider />
          <button onClick={() => setFilters({ sport: [], distance: "any", minPay: "", dateFrom: "", certsMatch: true, status: [] })} style={{ marginTop: 14, width: "100%", background: "none", border: "none", color: T.slate400, fontSize: 12, cursor: "pointer" }}>✕ Clear All Filters</button>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Toolbar */}
          <div style={{ background: T.white, borderBottom: `1px solid ${T.slate200}`, padding: "10px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <input placeholder="🔍  Search by org, location, sport…" style={{ flex: 1, border: `1px solid ${T.slate200}`, borderRadius: 8, padding: "7px 12px", fontSize: 13 }} />
            <div style={{ display: "flex", gap: 4, background: T.slate100, borderRadius: 8, padding: 3 }}>
              {[["list", "☰ List"], ["map", "🗺 Map"]].map(([v, l]) => (
                <button key={v} onClick={() => setView(v)} style={{ background: view === v ? T.white : "transparent", border: "none", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", color: view === v ? T.navy : T.slate400, boxShadow: view === v ? T.shadow : "none" }}>{l}</button>
              ))}
            </div>
            <span style={{ fontSize: 12, color: T.slate400 }}>{filtered.length} of {MARKETPLACE_OPPS.length} opportunities</span>
          </div>

          <div style={{ flex: 1, overflow: "hidden", display: "flex" }}>
            {view === "list" && (
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
                {filtered.map(opp => (
                  <Card key={opp.id} style={{ padding: "16px 18px", display: "flex", gap: 16, alignItems: "flex-start", borderLeft: opp.status === "needs_staff" ? `3px solid ${T.amber}` : `3px solid ${T.teal}` }}>
                    <div style={{ textAlign: "center", minWidth: 48, background: T.slate50, borderRadius: 10, padding: "8px 6px" }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: T.slate400 }}>{opp.day}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: T.navy, lineHeight: 1.1 }}>{opp.date.split(" ")[1].replace(",", "")}</div>
                      <div style={{ fontSize: 10, color: T.slate400 }}>{opp.date.split(" ")[0]}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 800, fontSize: 14 }}>{opp.org}</span>
                        <Badge color="slate">{opp.sport}</Badge>
                        {statusBadge(opp.status)}
                        {applied.has(opp.id) && <Badge color="green">Applied ✓</Badge>}
                      </div>
                      <div style={{ fontSize: 12, color: T.slate500, marginTop: 4 }}>📍 {opp.location.name} — {opp.location.city} &nbsp;·&nbsp; 🕐 {opp.arrival}–{opp.end}</div>
                      <div style={{ fontSize: 12, color: T.slate500, marginTop: 2 }}>📏 ~{opp.distance} mi from you &nbsp;·&nbsp; 🏥 {opp.certsRequired.join(", ")} required</div>
                      <div style={{ fontSize: 11, color: T.slate400, marginTop: 4 }}>Series: {opp.seriesName}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontWeight: 800, fontSize: 20, color: T.teal }}>{opp.atPay}</div>
                      <div style={{ fontSize: 10, color: T.slate400, marginBottom: 8 }}>{opp.hrs}h shift</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {!applied.has(opp.id) ? (
                          <Btn variant="primary" small onClick={() => setApplied(p => new Set([...p, opp.id]))}>Apply</Btn>
                        ) : (
                          <Btn variant="ghost" small>Withdraw</Btn>
                        )}
                        <Btn variant="ghost" small onClick={() => setSaved(p => { const n = new Set(p); n.has(opp.id) ? n.delete(opp.id) : n.add(opp.id); return n; })}>{saved.has(opp.id) ? "♥ Saved" : "♡ Save"}</Btn>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {view === "map" && (
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 320px", gap: 0, overflow: "hidden" }}>
                <div style={{ padding: 16, overflow: "hidden" }}>
                  <FullMap pins={mapPins} selected={selectedPin} onSelect={setSelectedPin} />
                </div>
                <div style={{ borderLeft: `1px solid ${T.slate200}`, overflowY: "auto", padding: 14, background: T.white }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: T.slate400, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                    {selectedPin ? `Opportunities at ${selectedPin}` : "Click a pin to filter"}
                  </div>
                  {filtered.filter(o => !selectedPin || o.location.name === selectedPin).map(opp => (
                    <div key={opp.id} style={{ padding: "12px 0", borderBottom: `1px solid ${T.slate100}` }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{opp.org}</div>
                      <div style={{ fontSize: 11, color: T.slate500, marginTop: 2 }}>{opp.date} · {opp.arrival}–{opp.end}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                        <span style={{ fontWeight: 800, color: T.teal }}>{opp.atPay}</span>
                        <Btn variant={applied.has(opp.id) ? "ghost" : "primary"} small onClick={() => !applied.has(opp.id) && setApplied(p => new Set([...p, opp.id]))}>
                          {applied.has(opp.id) ? "Applied ✓" : "Apply"}
                        </Btn>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5. PUBLIC MARKETPLACE (Teaser)
// ════════════════════════════════════════════════════════════════════════════
function PublicMarketplace({ onSignup }) {
  const [activeRole, setActiveRole] = useState("at");

  const Blur = ({ children }) => (
    <div style={{ filter: "blur(5px)", userSelect: "none", pointerEvents: "none", opacity: 0.6 }}>{children}</div>
  );

  const GateOverlay = ({ message }) => (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(2px)", zIndex: 10, borderRadius: 14, gap: 10 }}>
      <div style={{ fontSize: 28 }}>🔒</div>
      <div style={{ fontWeight: 700, fontSize: 14, color: T.navy, textAlign: "center", maxWidth: 220 }}>{message}</div>
      <Btn variant="navy" onClick={onSignup}>Create Free Account</Btn>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", fontFamily: T.fontBody, background: "#f0f9ff" }}>
      {/* Public header */}
      <div style={{ background: T.navy, color: "#fff", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, background: T.teal, borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚕</div>
          <span style={{ fontWeight: 800, fontSize: 14 }}>TheSportsMedGuy Marketplace</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onSignup} style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Sign In</button>
          <button onClick={onSignup} style={{ background: T.teal, color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Join Free →</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Hero */}
        <div style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #0d4f8c 100%)`, padding: "40px 24px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.teal, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>New Mexico's Sports Medicine Network</div>
          <h1 style={{ color: "#fff", fontWeight: 900, fontSize: 32, margin: "0 0 12px", letterSpacing: "-0.02em" }}>Connect. Staff. Play.</h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, maxWidth: 480, margin: "0 auto 28px" }}>
            The platform connecting certified Athletic Trainers with sports organizations across New Mexico. Hundreds of events, streamlined scheduling, guaranteed pay.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button onClick={() => setActiveRole("at")} style={{ background: activeRole === "at" ? T.teal : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>I'm an Athletic Trainer</button>
            <button onClick={() => setActiveRole("ho")} style={{ background: activeRole === "ho" ? T.teal : "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>I'm an Organization</button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", background: T.white, borderBottom: `1px solid ${T.slate200}` }}>
          {[["120+", "Events This Season"], ["25+", "Certified ATs"], ["6", "Hiring Organizations"], ["$60/hr", "Avg AT Pay Rate"]].map(([v, l]) => (
            <div key={l} style={{ padding: "18px", textAlign: "center", borderRight: `1px solid ${T.slate200}` }}>
              <div style={{ fontWeight: 900, fontSize: 26, color: T.navy }}>{v}</div>
              <div style={{ fontSize: 12, color: T.slate400, marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "24px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 20 }}>
          {/* Sidebar preview */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Card style={{ padding: 14 }}>
              <SectionTitle>Browse by Location</SectionTitle>
              <FullMap pins={[
                { id: "bernalillo", x: 48, y: 38, label: "Bernalillo", sublabel: "4 open", count: 4, urgent: false },
                { id: "mesaDel", x: 46, y: 53, label: "Mesa del Sol", sublabel: "6 open", count: 6, urgent: true },
                { id: "ecopark", x: 49, y: 47, label: "Eco Park", sublabel: "2 open", count: 2, urgent: true },
              ]} />
              <div style={{ marginTop: 10, padding: "10px 12px", background: T.slate50, borderRadius: 8, fontSize: 12, color: T.slate500, textAlign: "center" }}>
                🔒 Sign in to see full event details & apply
              </div>
            </Card>

            <Card style={{ padding: 14 }}>
              <SectionTitle>{activeRole === "at" ? "Why ATs love us" : "Why Orgs trust us"}</SectionTitle>
              {activeRole === "at" ? [
                ["💰", "Guaranteed pay, direct deposit"],
                ["📅", "Pick events that fit your schedule"],
                ["⭐", "Build your reputation & ratings"],
                ["📋", "Manage all certs in one place"],
              ] : [
                ["🔍", "Find pre-vetted, BOC-certified ATs"],
                ["📅", "Recurring series scheduling"],
                ["🧾", "Invoicing & billing in one place"],
                ["✅", "Compliance & cert tracking built-in"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0", borderBottom: `1px solid ${T.slate100}`, fontSize: 13, color: T.slate700 }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>{text}
                </div>
              ))}
              <Btn variant="navy" style={{ width: "100%", marginTop: 12 }} onClick={onSignup}>
                {activeRole === "at" ? "Join as AT →" : "Post Opportunities →"}
              </Btn>
            </Card>
          </div>

          {/* Teaser opportunity list */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontWeight: 800, fontSize: 16 }}>Upcoming Opportunities <span style={{ color: T.teal }}>{MARKETPLACE_OPPS.length}+</span></div>
              <Badge color="amber">Sign in to apply</Badge>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* First 2 fully visible */}
              {MARKETPLACE_OPPS.slice(0, 2).map(opp => (
                <Card key={opp.id} style={{ padding: "16px 18px", display: "flex", gap: 16, alignItems: "center", borderLeft: `3px solid ${T.teal}` }}>
                  <div style={{ textAlign: "center", minWidth: 48, background: T.tealLight, borderRadius: 10, padding: "8px 6px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.tealDark }}>{opp.day}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: T.navy }}>{opp.date.split(" ")[1].replace(",", "")}</div>
                    <div style={{ fontSize: 10, color: T.slate400 }}>{opp.date.split(" ")[0]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{opp.org} <Badge color="slate">{opp.sport}</Badge></div>
                    <div style={{ fontSize: 12, color: T.slate500, marginTop: 3 }}>📍 {opp.location.city} · {opp.arrival}–{opp.end}</div>
                    <div style={{ fontSize: 11, color: T.slate400, marginTop: 2 }}>Certs: {opp.certsRequired.join(", ")}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, fontSize: 20, color: T.teal }}>{opp.atPay}</div>
                    <div style={{ fontSize: 10, color: T.slate400, marginBottom: 8 }}>{opp.hrs}h shift</div>
                    <Btn variant="outline" small onClick={onSignup}>Sign in to Apply →</Btn>
                  </div>
                </Card>
              ))}

              {/* Remaining cards — blurred with gate */}
              <div style={{ position: "relative", borderRadius: 14, overflow: "hidden" }}>
                <GateOverlay message={`${MARKETPLACE_OPPS.length - 2} more opportunities available for members`} />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 4 }}>
                  {MARKETPLACE_OPPS.slice(2, 6).map(opp => (
                    <Blur key={opp.id}>
                      <Card style={{ padding: "14px 18px", display: "flex", gap: 14, alignItems: "center" }}>
                        <div style={{ width: 48, height: 54, background: T.slate100, borderRadius: 10 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 14, background: T.slate200, height: 16, width: "60%", borderRadius: 4 }} />
                          <div style={{ background: T.slate100, height: 11, width: "80%", borderRadius: 4, marginTop: 6 }} />
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontWeight: 800, fontSize: 20, color: T.teal }}>$???</div>
                          <div style={{ background: T.slate100, height: 26, width: 80, borderRadius: 8, marginTop: 6 }} />
                        </div>
                      </Card>
                    </Blur>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA bottom */}
            <div style={{ marginTop: 20, background: T.navy, borderRadius: 14, padding: "24px", textAlign: "center" }}>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>Ready to {activeRole === "at" ? "find AT work near you?" : "solve your staffing problem?"}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 16 }}>
                {activeRole === "at" ? "Create a free profile and start applying to events this weekend." : "Post your event series and connect with certified ATs in minutes."}
              </div>
              <button onClick={onSignup} style={{ background: T.teal, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                {activeRole === "at" ? "Create AT Profile — Free" : "Post Your First Event — Free"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ════════════════════════════════════════════════════════════════════════════
const SCREENS = [
  { key: "ho", label: "🏢 HO Dashboard", sub: "Duke City Soccer" },
  { key: "past", label: "📂 Past Instances", sub: "HO View" },
  { key: "create", label: "➕ Create Series", sub: "HO Admin" },
  { key: "create-member", label: "✏️ Draft Series", sub: "HO Member" },
  { key: "at-market", label: "🔍 AT Marketplace", sub: "Authenticated" },
  { key: "public", label: "🌐 Public Marketplace", sub: "Unauthenticated" },
];

export default function App() {
  const [screen, setScreen] = useState("ho");

  const nav = (to) => setScreen(to);

  return (
    <div style={{ fontFamily: T.fontBody, height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Screen switcher */}
      <div style={{ background: "#0f172a", padding: "8px 14px", display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 6 }}>Dashboard:</span>
        {SCREENS.map(s => (
          <button key={s.key} onClick={() => setScreen(s.key)} style={{
            background: screen === s.key ? T.teal : "rgba(255,255,255,0.06)",
            color: screen === s.key ? "#fff" : "#64748b",
            border: "none", borderRadius: 7, padding: "5px 12px",
            fontSize: 12, fontWeight: screen === s.key ? 700 : 500, cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1.3,
          }}>
            <span>{s.label}</span>
            <span style={{ fontSize: 9, opacity: 0.7 }}>{s.sub}</span>
          </button>
        ))}
      </div>

      {/* Screen */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {screen === "ho" && <HODashboard onNavigate={(to) => setScreen(to === "create-series" ? "create" : to === "past-instances" ? "past" : to)} />}
        {screen === "past" && <PastInstancesDashboard onBack={() => setScreen("ho")} />}
        {screen === "create" && <CreateSeriesDashboard onBack={() => setScreen("ho")} userRole="admin" />}
        {screen === "create-member" && <CreateSeriesDashboard onBack={() => setScreen("ho")} userRole="member" />}
        {screen === "at-market" && <ATMarketplace />}
        {screen === "public" && <PublicMarketplace onSignup={() => setScreen("at-market")} />}
      </div>
    </div>
  );
}
