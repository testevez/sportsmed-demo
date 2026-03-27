import { useState, useEffect } from "react";

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

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
  bernalillo: { name: "Bernalillo Sports Complex", city: "Bernalillo, NM", x: 48, y: 38 },
  mesaDel:    { name: "Mesa del Sol Fields",       city: "Albuquerque, NM", x: 46, y: 53 },
  ecopark:    { name: "Eco Park Soccer Fields",    city: "Albuquerque, NM", x: 49, y: 47 },
  taos:       { name: "Taos High School",          city: "Taos, NM",        x: 65, y: 18 },
  clovis:     { name: "Clovis High School",        city: "Clovis, NM",      x: 85, y: 60 },
  centennial: { name: "Centennial High School",    city: "Las Cruces, NM",  x: 44, y: 82 },
};

const SERIES_DATA = [
  { id: 1, name: "Duke City Soccer League", sport: "Soccer", org: "Duke City Soccer", location: LOCATIONS.bernalillo, status: "published", totalInstances: 18, upcoming: 6, past: 12, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 1, instances: [
    { id: 101, date: "Mar 28", dateObj: new Date(2026,2,28), day: "Sat", status: "filled",      atName: "Joe Ramos",       arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: false, draft: false },
    { id: 102, date: "Apr 4",  dateObj: new Date(2026,3,4),  day: "Sat", status: "open",        atName: null,              arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: null,   clientBill: null,   isPast: false, draft: false },
    { id: 103, date: "Apr 11", dateObj: new Date(2026,3,11), day: "Sat", status: "open",        atName: null,              arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: null,   clientBill: null,   isPast: false, draft: false },
    { id: 110, date: "Mar 21", dateObj: new Date(2026,2,21), day: "Sat", status: "complete",    atName: "Celina Torres",   arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: true,  rating: 5, review: "Excellent work!" },
    { id: 111, date: "Mar 14", dateObj: new Date(2026,2,14), day: "Sat", status: "complete",    atName: "Joe Ramos",       arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: true,  rating: 5, review: "Always prepared." },
    { id: 112, date: "Mar 7",  dateObj: new Date(2026,2,7),  day: "Sat", status: "complete",    atName: "Stephanie Vance", arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", clientBill: "$510", isPast: true,  rating: 4, review: "Great, on time." },
  ]},
  { id: 2, name: "NMSA / Classic Soccer", sport: "Soccer", org: "NMSA", location: LOCATIONS.mesaDel, status: "published", totalInstances: 12, upcoming: 4, past: 8, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 1, instances: [
    { id: 201, date: "Apr 18", dateObj: new Date(2026,3,18), day: "Sat", status: "open",        atName: null,              arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null,   clientBill: null,   isPast: false, draft: false },
    { id: 202, date: "May 2",  dateObj: new Date(2026,4,2),  day: "Sat", status: "needs_staff", atName: null,              arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null,   clientBill: null,   isPast: false, draft: false },
    { id: 210, date: "Mar 21", dateObj: new Date(2026,2,21), day: "Sat", status: "complete",    atName: "Stephanie Vance", arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$420", isPast: true,  rating: 5, review: "One of our go-to ATs." },
  ]},
  { id: 3, name: "ECNL Regional League", sport: "Soccer", org: "ECNL", location: LOCATIONS.mesaDel, status: "published", totalInstances: 8, upcoming: 3, past: 5, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 1, instances: [
    { id: 301, date: "Apr 18", dateObj: new Date(2026,3,18), day: "Sat", status: "filled",      atName: "Stephanie Vance", arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: "$420", clientBill: "$420", isPast: false, draft: false },
    { id: 302, date: "Apr 19", dateObj: new Date(2026,3,19), day: "Sun", status: "needs_staff", atName: null,              arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null,   clientBill: null,   isPast: false, draft: false },
    { id: 303, date: "Apr 25", dateObj: new Date(2026,3,25), day: "Sat", status: "open",        atName: null,              arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null,   clientBill: null,   isPast: false, draft: false },
  ]},
  { id: 4, name: "Sandia Cup Tournament", sport: "Soccer", org: "Duke City Soccer", location: LOCATIONS.mesaDel, status: "draft", totalInstances: 3, upcoming: 3, past: 0, atPay: "$60/hr", clientBill: "$60/hr", atsNeeded: 2, instances: [
    { id: 401, date: "May 23", dateObj: new Date(2026,4,23), day: "Sat", status: "draft_pending", atName: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: true },
    { id: 402, date: "May 24", dateObj: new Date(2026,4,24), day: "Sun", status: "draft_pending", atName: null, arrival: "8:00 AM", end: "3:00 PM", hrs: 7, atPay: null, clientBill: null, isPast: false, draft: true },
  ]},
  { id: 5, name: "Taos HS Athletics", sport: "Multi-Sport", org: "Taos High School", location: LOCATIONS.taos, status: "published", totalInstances: 14, upcoming: 0, past: 14, atPay: "$400–$650", clientBill: "$600–$900", atsNeeded: 1, instances: [
    { id: 510, date: "Nov 6",  dateObj: new Date(2025,10,6), day: "Thu", status: "complete", atName: "Chloe Davis", arrival: "3:00 PM", end: "End of Game", hrs: "N/A", atPay: "$400", clientBill: "$600", isPast: true, rating: 4, review: "Good coverage." },
    { id: 511, date: "Oct 24", dateObj: new Date(2025,9,24), day: "Fri", status: "complete", atName: "Joe Ramos",   arrival: "4:00 PM", end: "End of Game", hrs: "N/A", atPay: "$650", clientBill: "$900", isPast: true, rating: 5, review: "Outstanding." },
  ]},
];

const MARKETPLACE_OPPS = [
  { id: 1,  seriesName: "Duke City Soccer League", org: "Duke City Soccer", sport: "Soccer", date: "Apr 4, 2026",  day: "Sat", location: LOCATIONS.bernalillo, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", certsRequired: ["BOC"],       status: "open",        distance: 8 },
  { id: 2,  seriesName: "Duke City Soccer League", org: "Duke City Soccer", sport: "Soccer", date: "Apr 11, 2026", day: "Sat", location: LOCATIONS.bernalillo, arrival: "9:00 AM", end: "5:30 PM", hrs: 8.5, atPay: "$510", certsRequired: ["BOC"],       status: "open",        distance: 8 },
  { id: 3,  seriesName: "NMSA Classic Soccer",     org: "NMSA",            sport: "Soccer", date: "Apr 18, 2026", day: "Sat", location: LOCATIONS.mesaDel,    arrival: "8:00 AM", end: "3:00 PM", hrs: 7,   atPay: "$420", certsRequired: ["BOC","CPR"], status: "open",        distance: 3 },
  { id: 4,  seriesName: "ECNL Regional League",    org: "ECNL",            sport: "Soccer", date: "Apr 19, 2026", day: "Sun", location: LOCATIONS.mesaDel,    arrival: "8:00 AM", end: "3:00 PM", hrs: 7,   atPay: "$420", certsRequired: ["BOC"],       status: "needs_staff", distance: 3 },
  { id: 5,  seriesName: "ECNL Regional League",    org: "ECNL",            sport: "Soccer", date: "Apr 25, 2026", day: "Sat", location: LOCATIONS.mesaDel,    arrival: "8:00 AM", end: "3:00 PM", hrs: 7,   atPay: "$420", certsRequired: ["BOC"],       status: "open",        distance: 3 },
  { id: 6,  seriesName: "NMSA Classic Soccer",     org: "NMSA",            sport: "Soccer", date: "May 2, 2026",  day: "Sat", location: LOCATIONS.mesaDel,    arrival: "8:00 AM", end: "3:00 PM", hrs: 7,   atPay: "$420", certsRequired: ["BOC","CPR"], status: "needs_staff", distance: 3 },
  { id: 7,  seriesName: "Sandia Cup Tournament",   org: "Duke City Soccer", sport: "Soccer", date: "May 23, 2026", day: "Sat", location: LOCATIONS.mesaDel,   arrival: "8:00 AM", end: "3:00 PM", hrs: 7,   atPay: "$420", certsRequired: ["BOC"],       status: "open",        distance: 3 },
  { id: 8,  seriesName: "Sandia Cup Tournament",   org: "Duke City Soccer", sport: "Soccer", date: "May 24, 2026", day: "Sun", location: LOCATIONS.mesaDel,   arrival: "8:00 AM", end: "3:00 PM", hrs: 7,   atPay: "$420", certsRequired: ["BOC"],       status: "open",        distance: 3 },
  { id: 9,  seriesName: "DPL Spring League",       org: "NM Rapids",       sport: "Soccer", date: "Apr 11, 2026", day: "Sat", location: LOCATIONS.ecopark,    arrival: "8:00 AM", end: "1:00 PM", hrs: 5,   atPay: "$300", certsRequired: ["BOC"],       status: "needs_staff", distance: 5 },
  { id: 10, seriesName: "DPL Spring League",       org: "NM Rapids",       sport: "Soccer", date: "Apr 12, 2026", day: "Sun", location: LOCATIONS.ecopark,    arrival: "8:00 AM", end: "1:00 PM", hrs: 5,   atPay: "$300", certsRequired: ["BOC"],       status: "open",        distance: 5 },
];

const ATS = [
  { id: 1, name: "Joe Ramos",       rating: 4.9, events: 24, distance: "8 mi",  certs: ["BOC","CPR"],             available: true,  saved: false },
  { id: 2, name: "Stephanie Vance", rating: 4.8, events: 31, distance: "3 mi",  certs: ["BOC","CPR","First Aid"], available: true,  saved: true  },
  { id: 3, name: "Chloe Davis",     rating: 4.7, events: 28, distance: "15 mi", certs: ["BOC"],                   available: false, saved: true  },
  { id: 4, name: "Celina Torres",   rating: 4.6, events: 16, distance: "11 mi", certs: ["BOC","CPR"],             available: true,  saved: false },
];

// ─── ATOMS ────────────────────────────────────────────────────────────────────
const Badge = ({ color = "slate", children }) => {
  const p = { teal:{bg:"#ccfbf1",text:"#0f766e"}, green:{bg:"#dcfce7",text:"#15803d"}, amber:{bg:"#fef3c7",text:"#b45309"}, red:{bg:"#fee2e2",text:"#b91c1c"}, blue:{bg:"#dbeafe",text:"#1d4ed8"}, slate:{bg:"#f1f5f9",text:"#475569"}, draft:{bg:"#f0f9ff",text:"#0369a1"} }[color] || {bg:"#f1f5f9",text:"#475569"};
  return <span style={{ background:p.bg, color:p.text, padding:"2px 9px", borderRadius:999, fontSize:11, fontWeight:700, letterSpacing:"0.04em", textTransform:"uppercase", whiteSpace:"nowrap", display:"inline-flex", alignItems:"center" }}>{children}</span>;
};

const statusBadge = (status) => {
  const m = { filled:["green","Filled"], open:["teal","Open"], needs_staff:["amber","Needs Staff"], complete:["blue","Complete"], draft_pending:["draft","Draft"], published:["teal","Published"], draft:["slate","Draft"] };
  const [color, label] = m[status] || ["slate", status];
  return <Badge color={color}>{label}</Badge>;
};

const Avatar = ({ name, size = 36, bg = T.teal }) => {
  const ini = name.split(" ").map(w => w[0]).slice(0,2).join("").toUpperCase();
  return <div style={{ width:size, height:size, borderRadius:"50%", background:bg, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:size*0.36, fontWeight:800, flexShrink:0 }}>{ini}</div>;
};

const Stars = ({ n }) => <span style={{ color:"#f59e0b", fontSize:12 }}>{"★".repeat(Math.floor(n))}{"☆".repeat(5-Math.floor(n))}<span style={{ color:T.slate400, marginLeft:3, fontSize:11, fontWeight:600 }}>{n}</span></span>;

const Btn = ({ children, variant="primary", onClick, small, style:extra={} }) => {
  const s = { primary:{background:T.teal,color:"#fff",border:"none"}, ghost:{background:T.slate100,color:T.slate500,border:"none"}, outline:{background:"transparent",color:T.teal,border:`1.5px solid ${T.teal}`}, navy:{background:T.navy,color:"#fff",border:"none"} }[variant] || {};
  return <button onClick={onClick} style={{ ...s, borderRadius:8, padding:small?"5px 11px":"8px 16px", fontSize:small?11:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap", ...extra }}>{children}</button>;
};

const Card = ({ children, style:extra={} }) => <div style={{ background:T.white, borderRadius:14, border:`1px solid ${T.slate200}`, boxShadow:T.shadow, ...extra }}>{children}</div>;

const SectionTitle = ({ children }) => <div style={{ fontWeight:800, fontSize:12, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>{children}</div>;

const Divider = () => <div style={{ borderTop:`1px solid ${T.slate100}` }} />;

const StatCard = ({ label, value, sub, icon, color=T.navy }) => (
  <Card style={{ padding:"14px 16px" }}>
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
      <div>
        <div style={{ fontSize:10, fontWeight:700, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{label}</div>
        <div style={{ fontSize:26, fontWeight:800, color, lineHeight:1 }}>{value}</div>
        {sub && <div style={{ fontSize:11, color:T.slate400, marginTop:3 }}>{sub}</div>}
      </div>
      <div style={{ fontSize:18 }}>{icon}</div>
    </div>
  </Card>
);

const TopBar = ({ orgName, role, user, bg=T.navy, isMobile }) => (
  <div style={{ background:bg, color:"#fff", padding:`0 ${isMobile?14:20}px`, display:"flex", alignItems:"center", justifyContent:"space-between", height:52, boxShadow:"0 2px 8px rgba(0,0,0,0.18)", flexShrink:0 }}>
    <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:0 }}>
      <div style={{ width:28, height:28, background:"rgba(255,255,255,0.15)", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>⚕</div>
      <span style={{ fontWeight:800, fontSize:14, whiteSpace:"nowrap" }}>SportsMed</span>
      {orgName && !isMobile && <><span style={{ color:"rgba(255,255,255,0.3)" }}>|</span><span style={{ fontSize:12, opacity:0.85, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{orgName}</span></>}
      {role && !isMobile && <span style={{ background:"rgba(255,255,255,0.13)", borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:700, flexShrink:0 }}>{role}</span>}
    </div>
    <div style={{ display:"flex", gap:10, alignItems:"center", flexShrink:0 }}>
      {!isMobile && <span style={{ fontSize:12, opacity:0.6 }}>{user}</span>}
      <Avatar name={user||"U"} size={28} bg="rgba(255,255,255,0.2)" />
    </div>
  </div>
);

const NavTabs = ({ tabs, active, onChange }) => (
  <div style={{ display:"flex", gap:2, borderBottom:`2px solid ${T.slate200}`, overflowX:"auto", scrollbarWidth:"none" }}>
    {tabs.map(t => (
      <button key={t.key} onClick={() => onChange(t.key)} style={{ padding:"10px 14px", border:"none", background:"none", cursor:"pointer", whiteSpace:"nowrap", fontSize:13, fontWeight:active===t.key?700:500, color:active===t.key?T.teal:T.slate500, borderBottom:active===t.key?`2px solid ${T.teal}`:"2px solid transparent", marginBottom:-2, flexShrink:0 }}>{t.label}</button>
    ))}
  </div>
);

// ─── MAPS ─────────────────────────────────────────────────────────────────────
const MiniMap = ({ pins=[], selected=null, onSelect=()=>{} }) => (
  <div style={{ position:"relative", width:"100%", background:"#e8f4f8", borderRadius:12, overflow:"hidden", border:`1px solid ${T.slate200}` }}>
    <svg viewBox="0 0 100 100" style={{ width:"100%", display:"block" }}>
      <rect x="0" y="0" width="100" height="100" fill="#dbeafe" opacity="0.3" />
      <polygon points="28,5 88,5 88,95 28,95 10,95 10,5" fill="#f0f9ff" stroke="#bfdbfe" strokeWidth="0.5" />
      <line x1="48" y1="5" x2="48" y2="95" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="2,3" />
      <line x1="10" y1="50" x2="88" y2="50" stroke="#e2e8f0" strokeWidth="0.4" strokeDasharray="2,3" />
      {[{name:"Albuquerque",x:47,y:50},{name:"Santa Fe",x:58,y:38}].map((c,i)=>(
        <g key={i}><circle cx={c.x} cy={c.y} r="1.2" fill="#94a3b8" opacity="0.7" /><text x={c.x+1.5} y={c.y+0.5} fontSize="3.5" fill="#64748b" fontFamily="DM Sans,sans-serif" fontWeight="600">{c.name}</text></g>
      ))}
      {pins.map((pin,i)=>{const isSel=selected===pin.id;return(<g key={i} style={{cursor:"pointer"}} onClick={()=>onSelect(pin.id)}>{isSel&&<circle cx={pin.x} cy={pin.y} r="5" fill={T.teal} opacity="0.2"/>}<circle cx={pin.x} cy={pin.y} r={isSel?3.5:2.8} fill={pin.urgent?T.amber:T.teal} stroke="#fff" strokeWidth="0.8"/><text x={pin.x} y={pin.y+0.7} textAnchor="middle" fontSize="2.5" fill="white" fontWeight="bold" fontFamily="DM Sans,sans-serif">{pin.count}</text></g>);})}
    </svg>
    <div style={{ position:"absolute", bottom:5, right:7, display:"flex", gap:6, fontSize:9, color:T.slate500 }}>
      <span style={{ display:"flex",alignItems:"center",gap:3 }}><span style={{ width:7,height:7,borderRadius:"50%",background:T.teal,display:"inline-block" }}/>Open</span>
      <span style={{ display:"flex",alignItems:"center",gap:3 }}><span style={{ width:7,height:7,borderRadius:"50%",background:T.amber,display:"inline-block" }}/>Urgent</span>
    </div>
  </div>
);

const FullMap = ({ pins=[], selected=null, onSelect=()=>{} }) => (
  <div style={{ position:"relative", width:"100%", height:"100%", minHeight:280, background:"#e8f4f8", borderRadius:14, overflow:"hidden", border:`1px solid ${T.slate200}` }}>
    <svg viewBox="0 0 100 100" style={{ width:"100%", height:"100%", display:"block" }}>
      <defs><linearGradient id="mapBg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e0f2fe"/><stop offset="100%" stopColor="#bfdbfe"/></linearGradient></defs>
      <rect x="0" y="0" width="100" height="100" fill="url(#mapBg2)"/>
      <polygon points="28,3 90,3 90,95 28,95 8,95 8,3" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="0.6"/>
      <path d="M 48 95 L 48 5" stroke="#fde68a" strokeWidth="1" opacity="0.6"/>
      <text x="49" y="90" fontSize="3" fill="#d97706" fontFamily="DM Sans,sans-serif" fontWeight="700">I-25</text>
      {[{name:"Albuquerque",x:46,y:52},{name:"Santa Fe",x:58,y:36},{name:"Taos",x:65,y:20},{name:"Las Cruces",x:43,y:84},{name:"Clovis",x:86,y:60}].map((c,i)=>(
        <g key={i}><circle cx={c.x} cy={c.y} r="1.5" fill="#94a3b8" opacity="0.5"/><text x={c.x+2} y={c.y+0.6} fontSize="3.2" fill="#475569" fontFamily="DM Sans,sans-serif" fontWeight="500">{c.name}</text></g>
      ))}
      {pins.map(pin=>{const isSel=selected===pin.id;return(<g key={pin.id} style={{cursor:"pointer"}} onClick={()=>onSelect(pin.id===selected?null:pin.id)}>{isSel&&<circle cx={pin.x} cy={pin.y} r="7" fill={T.teal} opacity="0.15"/>}<ellipse cx={pin.x} cy={pin.y+5} rx="2.5" ry="0.8" fill="rgba(0,0,0,0.15)"/><path d={`M${pin.x},${pin.y-5} a4,4 0 1,1 0.01,0 Z`} fill={pin.urgent?T.amber:T.teal} stroke="#fff" strokeWidth="0.8"/><text x={pin.x} y={pin.y-4.3} textAnchor="middle" fontSize="2.2" fill="white" fontWeight="bold" fontFamily="DM Sans,sans-serif">{pin.count}</text>{isSel&&(<g><rect x={pin.x-15} y={pin.y-20} width="30" height="11" rx="2" fill={T.navy} opacity="0.95"/><text x={pin.x} y={pin.y-15} textAnchor="middle" fontSize="2.8" fill="white" fontFamily="DM Sans,sans-serif" fontWeight="700">{pin.label}</text><text x={pin.x} y={pin.y-11} textAnchor="middle" fontSize="2.2" fill="#94a3b8" fontFamily="DM Sans,sans-serif">{pin.sublabel}</text></g>)}</g>);})}
    </svg>
    <div style={{ position:"absolute", bottom:8, left:8, background:"rgba(255,255,255,0.92)", borderRadius:8, padding:"5px 9px", fontSize:10, color:T.slate500 }}>
      <div style={{ display:"flex", gap:8 }}><span style={{ display:"flex",alignItems:"center",gap:4 }}><span style={{ width:8,height:8,borderRadius:"50%",background:T.teal,display:"inline-block" }}/>Open</span><span style={{ display:"flex",alignItems:"center",gap:4 }}><span style={{ width:8,height:8,borderRadius:"50%",background:T.amber,display:"inline-block" }}/>Urgent</span></div>
      <div style={{ marginTop:2, opacity:0.7 }}>Click pin to preview</div>
    </div>
  </div>
);

// ─── INSTANCE ROW — card on mobile, grid row on desktop ───────────────────────
const InstanceRow = ({ inst, isMobile, isFirst }) => {
  if (isMobile) return (
    <div style={{ padding:"12px 14px", borderTop:isFirst?"none":`1px solid ${T.slate100}`, background:inst.status==="needs_staff"?"#fffbeb":inst.draft?"#f0f9ff":T.white }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
        <div><span style={{ fontWeight:700, fontSize:14 }}>{inst.date}</span><span style={{ marginLeft:6, fontSize:12, color:T.slate400 }}>{inst.day}</span></div>
        {statusBadge(inst.status)}
      </div>
      <div style={{ fontSize:12, color:T.slate500, marginBottom:4 }}>🕐 {inst.arrival} – {inst.end}</div>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <span style={{ fontSize:13, color:inst.atName?T.teal:T.slate300, fontWeight:inst.atName?600:400 }}>{inst.atName||"— Unassigned"}</span>
        <span style={{ fontSize:13, fontWeight:700, color:inst.atPay?T.navy:T.slate300 }}>{inst.atPay||"—"}</span>
      </div>
    </div>
  );
  return (
    <div style={{ display:"grid", gridTemplateColumns:"88px 52px 78px 88px 1.4fr 65px 88px 100px", padding:"10px 18px", fontSize:12, borderTop:`1px solid #f8fafc`, background:inst.status==="needs_staff"?"#fffbeb":inst.draft?"#f0f9ff":T.white, alignItems:"center" }}>
      <span style={{ fontWeight:700 }}>{inst.date}</span>
      <span style={{ color:T.slate400 }}>{inst.day}</span>
      <span style={{ color:T.slate500 }}>{inst.arrival}</span>
      <span style={{ color:T.slate500 }}>{inst.end}</span>
      <span style={{ color:inst.atName?T.teal:T.slate200, fontWeight:inst.atName?600:400 }}>{inst.atName||"— Unassigned"}</span>
      <span style={{ color:T.slate400 }}>{inst.hrs}</span>
      <span style={{ color:inst.atPay?T.navy:T.slate200, fontWeight:600 }}>{inst.atPay||"—"}</span>
      {statusBadge(inst.status)}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════════════════
//  1. HO DASHBOARD
// ════════════════════════════════════════════════════════════════════════════
function HODashboard({ onNavigate }) {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 1024;
  const [tab, setTab] = useState("upcoming");
  const [expanded, setExpanded] = useState(new Set([1,3]));
  const userRole = "admin";

  const allUpcoming = SERIES_DATA.flatMap(s => s.instances.filter(i => !i.isPast));
  const filled    = allUpcoming.filter(i => i.status==="filled").length;
  const needsStaff = allUpcoming.filter(i => i.status==="needs_staff").length;
  const drafts    = allUpcoming.filter(i => i.draft).length;
  const toggle = id => setExpanded(p => { const n=new Set(p); n.has(id)?n.delete(id):n.add(id); return n; });

  const mapPins = Object.values(LOCATIONS).map(loc => {
    const opps = MARKETPLACE_OPPS.filter(o => o.location===loc);
    if (!opps.length) return null;
    return { id:loc.name, x:loc.x, y:loc.y, label:loc.city.split(",")[0], sublabel:`${opps.length} open`, count:opps.length, urgent:opps.some(o=>o.status==="needs_staff") };
  }).filter(Boolean);

  const pad = isMobile ? "14px 12px" : "20px 24px";

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:T.slate50, fontFamily:T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role={userRole==="admin"?"HO Admin":"Scheduler"} user="Sarah Owens" isMobile={isMobile} />
      <div style={{ flex:1, overflowY:"auto", padding:pad }}>

        {/* KPIs */}
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:10, marginBottom:16 }}>
          <StatCard label="Upcoming"  value={allUpcoming.length} icon="📅" color={T.navy}    sub="all series" />
          <StatCard label="Staffed"   value={filled}             icon="✅" color={T.teal}    sub={`${Math.round(filled/allUpcoming.length*100)||0}% filled`} />
          <StatCard label="Urgent"    value={needsStaff}         icon="🔔" color={T.amber}   sub="needs action" />
          <StatCard label="Drafts"    value={drafts}             icon="✏️" color="#6366f1"  sub="pending review" />
        </div>

        {/* Quick actions */}
        <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap", alignItems:"center" }}>
          <Btn variant="navy" small={isMobile} onClick={()=>onNavigate("create-series")}>+ New Series</Btn>
          <Btn variant="ghost" small={isMobile} onClick={()=>onNavigate("past-instances")}>Past Instances →</Btn>
          {needsStaff>0 && <div style={{ background:T.amberLight, color:T.amber, borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:700 }}>⚠ {needsStaff} urgent</div>}
        </div>

        {/* Main + right rail */}
        <div style={{ display:"grid", gridTemplateColumns:isTablet?"1fr":"1fr 250px", gap:16 }}>
          <div>
            <NavTabs tabs={[{key:"upcoming",label:"Upcoming"},{key:"series",label:"All Series"}]} active={tab} onChange={setTab} />
            <div style={{ marginTop:12 }}>
              {tab==="upcoming" && (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {SERIES_DATA.filter(s=>s.upcoming>0).map(series => (
                    <Card key={series.id} style={{ overflow:"hidden" }}>
                      <div onClick={()=>toggle(series.id)} style={{ padding:isMobile?"12px 14px":"13px 18px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", background:expanded.has(series.id)?"#f0fdf4":T.white }}>
                        <div style={{ display:"flex", gap:10, alignItems:"center", minWidth:0 }}>
                          <div style={{ width:34,height:34,borderRadius:9,background:series.status==="draft"?T.slate200:T.navy,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,flexShrink:0 }}>⚽</div>
                          <div style={{ minWidth:0 }}>
                            <div style={{ fontWeight:700, fontSize:isMobile?13:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{series.name}</div>
                            <div style={{ fontSize:11, color:T.slate400, marginTop:1 }}>📍 {series.location.city}</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:5, alignItems:"center", flexShrink:0, marginLeft:8 }}>
                          {series.instances.filter(i=>!i.isPast&&i.status==="needs_staff").length>0 && <Badge color="amber">{series.instances.filter(i=>!i.isPast&&i.status==="needs_staff").length} {isMobile?"!":"Urgent"}</Badge>}
                          {!isMobile && series.instances.filter(i=>!i.isPast&&i.status==="open").length>0 && <Badge color="teal">{series.instances.filter(i=>!i.isPast&&i.status==="open").length} Open</Badge>}
                          {!isMobile && series.instances.filter(i=>!i.isPast&&i.status==="filled").length>0 && <Badge color="green">{series.instances.filter(i=>!i.isPast&&i.status==="filled").length} Filled</Badge>}
                          <span style={{ fontSize:16, color:T.slate400, transform:expanded.has(series.id)?"rotate(180deg)":"none", display:"inline-block", transition:"transform 0.2s" }}>▾</span>
                        </div>
                      </div>
                      {expanded.has(series.id) && (<>
                        <Divider/>
                        {!isMobile && (
                          <div style={{ background:T.slate50, padding:"6px 18px", display:"grid", gridTemplateColumns:"88px 52px 78px 88px 1.4fr 65px 88px 100px", fontSize:10, fontWeight:700, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                            <span>Date</span><span>Day</span><span>Arrival</span><span>End</span><span>AT</span><span>Hrs</span><span>AT Pay</span><span>Status</span>
                          </div>
                        )}
                        {series.instances.filter(i=>!i.isPast).map((inst,idx)=>(
                          <InstanceRow key={inst.id} inst={inst} isMobile={isMobile} isFirst={idx===0}/>
                        ))}
                        <div style={{ padding:isMobile?"10px 14px":"10px 18px", borderTop:`1px solid ${T.slate100}`, display:"flex", gap:8, flexWrap:"wrap" }}>
                          <Btn variant="ghost" small onClick={()=>onNavigate("create-instance")}>+ Add Instance</Btn>
                          {userRole==="admin"&&series.status==="draft"&&<Btn variant="outline" small>Approve & Publish</Btn>}
                        </div>
                      </>)}
                    </Card>
                  ))}
                </div>
              )}
              {tab==="series" && (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {SERIES_DATA.map(s=>(
                    <Card key={s.id} style={{ padding:isMobile?"12px 14px":"14px 18px" }}>
                      <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                        <Avatar name={s.name} size={36} bg={s.status==="draft"?T.slate400:T.navy}/>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontWeight:700, fontSize:13, display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>{s.name} {statusBadge(s.status)}</div>
                          <div style={{ fontSize:11, color:T.slate400, marginTop:2 }}>📍 {s.location.city} · {s.sport} · {s.totalInstances} instances</div>
                        </div>
                        {!isMobile && <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                          <Btn variant="ghost" small>Edit</Btn>
                          <Btn variant="ghost" small onClick={()=>onNavigate("past-instances")}>Past →</Btn>
                          {userRole==="admin"&&s.status==="draft"&&<Btn variant="outline" small>Approve</Btn>}
                        </div>}
                      </div>
                      {isMobile && <div style={{ display:"flex", gap:6, marginTop:10, paddingTop:10, borderTop:`1px solid ${T.slate100}` }}>
                        <Btn variant="ghost" small>Edit</Btn>
                        <Btn variant="ghost" small onClick={()=>onNavigate("past-instances")}>Past →</Btn>
                      </div>}
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right rail — row on tablet, column on desktop, hidden inline on mobile (shown below) */}
          <div style={{ display:"flex", flexDirection:isTablet?"row":"column", gap:14, flexWrap:"wrap" }}>
            <Card style={{ padding:14, flex:isTablet?"1 1 240px":"unset" }}>
              <SectionTitle>Location Map</SectionTitle>
              <MiniMap pins={mapPins}/>
            </Card>
            <Card style={{ padding:14, flex:isTablet?"1 1 200px":"unset" }}>
              <SectionTitle>Favorited ATs</SectionTitle>
              {ATS.filter(a=>a.saved).map(at=>(
                <div key={at.id} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:`1px solid ${T.slate100}`, alignItems:"center" }}>
                  <Avatar name={at.name} size={30} bg={at.available?T.teal:T.slate400}/>
                  <div style={{ flex:1 }}><div style={{ fontWeight:600, fontSize:12 }}>{at.name}</div><Stars n={at.rating}/></div>
                  <Badge color={at.available?"teal":"slate"}>{at.available?"Avail.":"Busy"}</Badge>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. PAST INSTANCES
// ════════════════════════════════════════════════════════════════════════════
function PastInstancesDashboard({ onBack }) {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const [filterSeries, setFilterSeries] = useState("all");

  const allPast = SERIES_DATA.flatMap(s=>s.instances.filter(i=>i.isPast).map(inst=>({...inst,seriesName:s.name,seriesId:s.id}))).sort((a,b)=>b.dateObj-a.dateObj);
  const filtered = filterSeries==="all"?allPast:allPast.filter(i=>i.seriesId===parseInt(filterSeries));
  const totalSpent = allPast.filter(i=>i.atPay).reduce((s,i)=>s+parseInt(i.atPay.replace("$","")),0);
  const avgRating = (allPast.filter(i=>i.rating).reduce((s,i)=>s+i.rating,0)/allPast.filter(i=>i.rating).length).toFixed(1);

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:T.slate50, fontFamily:T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role="HO Admin" user="Sarah Owens" isMobile={isMobile}/>
      <div style={{ flex:1, overflowY:"auto", padding:isMobile?"14px 12px":"20px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16, flexWrap:"wrap" }}>
          <button onClick={onBack} style={{ background:T.slate100, border:"none", borderRadius:8, padding:"7px 12px", fontSize:13, fontWeight:600, cursor:"pointer", color:T.slate500 }}>← Back</button>
          <h2 style={{ fontWeight:800, fontSize:isMobile?15:18, margin:0 }}>Past Event Instances</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:10, marginBottom:16 }}>
          <StatCard label="Total Past"   value={allPast.length}              icon="📂" color={T.navy}/>
          <StatCard label="AT Pay Spent" value={`$${totalSpent.toLocaleString()}`} icon="💰" color={T.teal}/>
          <StatCard label="Avg Rating"   value={avgRating}                   icon="⭐" color={T.amber}/>
          <StatCard label="Series"       value={SERIES_DATA.length}          icon="📋" color="#6366f1"/>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:14, flexWrap:"wrap", alignItems:"center" }}>
          <select value={filterSeries} onChange={e=>setFilterSeries(e.target.value)} style={{ border:`1px solid ${T.slate200}`, borderRadius:8, padding:"7px 12px", fontSize:13, color:T.slate700, background:T.white }}>
            <option value="all">All Series</option>
            {SERIES_DATA.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <span style={{ fontSize:13, color:T.slate400 }}>{filtered.length} instances</span>
        </div>

        {isMobile ? (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map(inst=>(
              <Card key={inst.id} style={{ padding:"14px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <div><div style={{ fontWeight:700, fontSize:14 }}>{inst.date}</div><div style={{ fontSize:12, color:T.slate500 }}>{inst.seriesName}</div></div>
                  <div style={{ textAlign:"right" }}><div style={{ fontWeight:700, color:T.teal }}>{inst.atPay||"—"}</div><Stars n={inst.rating||0}/></div>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:inst.review?6:0 }}>
                  <Avatar name={inst.atName||"?"} size={24} bg={T.teal}/>
                  <span style={{ fontSize:13, fontWeight:600, color:T.teal }}>{inst.atName}</span>
                </div>
                {inst.review&&<div style={{ fontSize:12, color:T.slate500, fontStyle:"italic" }}>"{inst.review}"</div>}
              </Card>
            ))}
          </div>
        ) : (
          <Card style={{ overflow:"hidden" }}>
            <div style={{ display:"grid", gridTemplateColumns:"110px 1.5fr 1fr 60px 80px 80px 70px 1.5fr", padding:"10px 18px", background:T.slate50, fontSize:10, fontWeight:700, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.05em" }}>
              <span>Date</span><span>Series</span><span>AT</span><span>Hrs</span><span>AT Pay</span><span>Bill</span><span>Rating</span><span>Review</span>
            </div>
            {filtered.map(inst=>(
              <div key={inst.id} style={{ display:"grid", gridTemplateColumns:"110px 1.5fr 1fr 60px 80px 80px 70px 1.5fr", padding:"12px 18px", fontSize:12, borderTop:`1px solid #f8fafc`, alignItems:"center" }}>
                <span style={{ fontWeight:700, color:T.slate700 }}>{inst.date}</span>
                <span style={{ fontWeight:600 }}>{inst.seriesName}</span>
                <div style={{ display:"flex", gap:6, alignItems:"center" }}><Avatar name={inst.atName||"?"} size={22} bg={T.teal}/><span style={{ fontWeight:600, color:T.teal }}>{inst.atName}</span></div>
                <span style={{ color:T.slate400 }}>{inst.hrs}</span>
                <span style={{ fontWeight:600 }}>{inst.atPay||"—"}</span>
                <span style={{ color:T.slate400 }}>{inst.clientBill||"—"}</span>
                <Stars n={inst.rating||0}/>
                <span style={{ color:T.slate500, fontStyle:"italic", fontSize:11 }}>{inst.review||"—"}</span>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. CREATE EVENT SERIES
// ════════════════════════════════════════════════════════════════════════════
function CreateSeriesDashboard({ onBack, userRole="admin" }) {
  const w = useWindowWidth();
  const isMobile = w < 640;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", sport:"", location:"", address:"", city:"", state:"NM", arrivalTime:"", endTime:"", atPay:"", clientBill:"", atsNeeded:1, notes:"", certsRequired:[] });
  const [instances, setInstances] = useState([{id:1,date:"",notes:""}]);
  const [submitted, setSubmitted] = useState(false);
  const upd = (k,v) => setForm(p=>({...p,[k]:v}));
  const addInstance = () => setInstances(p=>[...p,{id:p.length+1,date:"",notes:""}]);
  const updInst = (id,k,v) => setInstances(p=>p.map(i=>i.id===id?{...i,[k]:v}:i));
  const removeInst = id => setInstances(p=>p.filter(i=>i.id!==id));
  const isMember = userRole==="member";
  const inp = { border:`1px solid ${T.slate200}`, borderRadius:8, padding:"9px 12px", fontSize:13, color:T.slate700, width:"100%", boxSizing:"border-box", background:T.white };
  const lbl = { display:"block", fontWeight:700, fontSize:11, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:5 };

  if (submitted) return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:T.slate50, fontFamily:T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role={isMember?"Scheduler":"HO Admin"} user="Sarah Owens" isMobile={isMobile}/>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, padding:24, textAlign:"center" }}>
        <div style={{ fontSize:52 }}>{isMember?"⏳":"✅"}</div>
        <div style={{ fontWeight:800, fontSize:isMobile?18:22, color:T.navy }}>{isMember?"Draft Submitted for Review":"Event Series Published!"}</div>
        <div style={{ color:T.slate500, fontSize:14, maxWidth:340 }}>{isMember?"An HO Admin will review and publish your draft.":`"${form.name}" is now live with ${instances.length} instance(s).`}</div>
        <Btn variant="navy" onClick={onBack}>← Back to Dashboard</Btn>
      </div>
    </div>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", background:T.slate50, fontFamily:T.fontBody }}>
      <TopBar orgName="Duke City Soccer" role={isMember?"Scheduler":"HO Admin"} user="Sarah Owens" isMobile={isMobile}/>
      <div style={{ flex:1, overflowY:"auto", padding:isMobile?"14px 12px":"20px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, flexWrap:"wrap" }}>
          <button onClick={onBack} style={{ background:T.slate100, border:"none", borderRadius:8, padding:"7px 12px", fontSize:13, fontWeight:600, cursor:"pointer", color:T.slate500 }}>← Back</button>
          <h2 style={{ fontWeight:800, fontSize:isMobile?15:18, margin:0 }}>{isMember?"Draft New Series":"Create Event Series"}</h2>
          {isMember && <Badge color="draft">Draft — Admin Review Required</Badge>}
        </div>

        {/* Steps */}
        <div style={{ display:"flex", marginBottom:20, background:T.white, borderRadius:10, border:`1px solid ${T.slate200}`, overflow:"hidden", maxWidth:isMobile?"100%":500 }}>
          {["Series Info","Location & Pay","Instances"].map((s,i)=>(
            <div key={i} onClick={()=>setStep(i+1)} style={{ flex:1, padding:isMobile?"9px 2px":"10px", textAlign:"center", cursor:"pointer", background:step===i+1?T.navy:"transparent", color:step===i+1?"#fff":T.slate400, fontSize:isMobile?10:12, fontWeight:step===i+1?700:500, borderRight:i<2?`1px solid ${T.slate200}`:"none" }}>
              <span style={{ opacity:0.6, marginRight:3 }}>{i+1}.</span>{s}
            </div>
          ))}
        </div>

        <div style={{ maxWidth:isMobile?"100%":700 }}>
          {step===1 && (
            <Card style={{ padding:isMobile?16:24, display:"flex", flexDirection:"column", gap:16 }}>
              <SectionTitle>Series Information</SectionTitle>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:14 }}>
                <div><label style={lbl}>Series Name *</label><input style={inp} placeholder="e.g. Spring Soccer League 2026" value={form.name} onChange={e=>upd("name",e.target.value)}/></div>
                <div><label style={lbl}>Sport *</label><select style={inp} value={form.sport} onChange={e=>upd("sport",e.target.value)}><option value="">Select…</option>{["Soccer","Football","Basketball","Volleyball","Baseball","Multi-Sport"].map(s=><option key={s}>{s}</option>)}</select></div>
              </div>
              <div><label style={lbl}># of ATs Needed</label><input type="number" min={1} style={{...inp,width:100}} value={form.atsNeeded} onChange={e=>upd("atsNeeded",e.target.value)}/></div>
              <div>
                <label style={lbl}>Required Certifications</label>
                <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                  {["BOC","CPR/AED","First Aid","Background Check"].map(cert=>(
                    <label key={cert} style={{ display:"flex", alignItems:"center", gap:5, fontSize:13, cursor:"pointer" }}>
                      <input type="checkbox" checked={form.certsRequired.includes(cert)} onChange={e=>upd("certsRequired",e.target.checked?[...form.certsRequired,cert]:form.certsRequired.filter(c=>c!==cert))}/>{cert}
                    </label>
                  ))}
                </div>
              </div>
              <div><label style={lbl}>Notes</label><textarea style={{...inp,height:70,resize:"vertical"}} placeholder="Special requirements…" value={form.notes} onChange={e=>upd("notes",e.target.value)}/></div>
              <Btn variant="navy" onClick={()=>setStep(2)}>Next: Location & Pay →</Btn>
            </Card>
          )}
          {step===2 && (
            <Card style={{ padding:isMobile?16:24, display:"flex", flexDirection:"column", gap:16 }}>
              <SectionTitle>Location & Compensation</SectionTitle>
              <div><label style={lbl}>Venue / Facility *</label><input style={inp} placeholder="e.g. Mesa del Sol Fields" value={form.location} onChange={e=>upd("location",e.target.value)}/></div>
              <div><label style={lbl}>Street Address</label><input style={inp} placeholder="123 Main St" value={form.address} onChange={e=>upd("address",e.target.value)}/></div>
              <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:12 }}>
                <div><label style={lbl}>City *</label><input style={inp} placeholder="Albuquerque" value={form.city} onChange={e=>upd("city",e.target.value)}/></div>
                <div><label style={lbl}>State</label><input style={inp} value={form.state} onChange={e=>upd("state",e.target.value)}/></div>
              </div>
              <div style={{ background:T.slate50, borderRadius:10, padding:10, border:`1px solid ${T.slate200}` }}>
                <div style={{ fontSize:12, fontWeight:600, color:T.slate400, marginBottom:8 }}>📍 Map Preview</div>
                <MiniMap pins={[{id:"new",x:46,y:52,label:form.city||"Location",sublabel:"New Series",count:1,urgent:false}]} selected="new"/>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
                <div><label style={lbl}>Arrival Time</label><input type="time" style={inp} value={form.arrivalTime} onChange={e=>upd("arrivalTime",e.target.value)}/></div>
                <div><label style={lbl}>End Time</label><input type="time" style={inp} value={form.endTime} onChange={e=>upd("endTime",e.target.value)}/></div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:12 }}>
                <div><label style={lbl}>AT Pay Rate *</label><input style={inp} placeholder="$60/hr or $400 flat" value={form.atPay} onChange={e=>upd("atPay",e.target.value)}/></div>
                <div><label style={lbl}>Client Bill Rate *</label><input style={inp} placeholder="$60/hr or $600 flat" value={form.clientBill} onChange={e=>upd("clientBill",e.target.value)}/></div>
              </div>
              <div style={{ display:"flex", gap:10 }}><Btn variant="ghost" onClick={()=>setStep(1)}>← Back</Btn><Btn variant="navy" onClick={()=>setStep(3)}>Next: Instances →</Btn></div>
            </Card>
          )}
          {step===3 && (
            <Card style={{ padding:isMobile?16:24, display:"flex", flexDirection:"column", gap:14 }}>
              <SectionTitle>Event Instances</SectionTitle>
              {instances.map((inst,i)=>(
                <div key={inst.id} style={{ background:T.slate50, borderRadius:10, border:`1px solid ${T.slate200}`, padding:"14px", display:"flex", gap:10, alignItems:"flex-start" }}>
                  <div style={{ background:T.navy, color:"#fff", borderRadius:8, padding:"5px 9px", fontWeight:800, fontSize:12, flexShrink:0 }}>Day {i+1}</div>
                  <div style={{ flex:1, display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:10 }}>
                    <div><label style={{...lbl,marginBottom:3}}>Date *</label><input type="date" style={inp} value={inst.date} onChange={e=>updInst(inst.id,"date",e.target.value)}/></div>
                    <div><label style={{...lbl,marginBottom:3}}>Notes</label><input style={inp} placeholder="Optional…" value={inst.notes} onChange={e=>updInst(inst.id,"notes",e.target.value)}/></div>
                  </div>
                  {instances.length>1&&<button onClick={()=>removeInst(inst.id)} style={{ background:T.redLight, color:T.red, border:"none", borderRadius:6, padding:"5px 9px", fontSize:12, cursor:"pointer", flexShrink:0 }}>✕</button>}
                </div>
              ))}
              <Btn variant="ghost" onClick={addInstance}>+ Add Another Date</Btn>
              <Divider/>
              {isMember&&<div style={{ background:T.amberLight, borderRadius:8, padding:"10px 14px", fontSize:12, color:T.amber }}>⚠ This series will be saved as a Draft for admin review.</div>}
              <div style={{ display:"flex", gap:10 }}><Btn variant="ghost" onClick={()=>setStep(2)}>← Back</Btn><Btn variant="navy" onClick={()=>setSubmitted(true)}>{isMember?"Submit for Review":"Publish Series"}</Btn></div>
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
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 1024;
  const [view, setView] = useState("list");
  const [filters, setFilters] = useState({ sport:[], distance:"any", status:[], certsMatch:true });
  const [selectedPin, setSelectedPin] = useState(null);
  const [applied, setApplied] = useState(new Set());
  const [saved, setSaved] = useState(new Set([3,5]));
  const [showFilters, setShowFilters] = useState(false);

  const updFilter = (k,v) => setFilters(p=>({...p,[k]:v}));
  const toggleArr = (k,v) => setFilters(p=>({...p,[k]:p[k].includes(v)?p[k].filter(x=>x!==v):[...p[k],v]}));

  const filtered = MARKETPLACE_OPPS.filter(o=>{
    if (filters.sport.length&&!filters.sport.includes(o.sport)) return false;
    if (filters.distance!=="any"&&o.distance>parseInt(filters.distance)) return false;
    if (filters.status.length&&!filters.status.includes(o.status)) return false;
    return true;
  });

  const mapPins = Object.values(LOCATIONS).map(loc=>{
    const opps=filtered.filter(o=>o.location===loc);
    if (!opps.length) return null;
    return {id:loc.name,x:loc.x,y:loc.y,label:loc.city.split(",")[0],sublabel:`${opps.length} opp${opps.length>1?"s":""}`,count:opps.length,urgent:opps.some(o=>o.status==="needs_staff")};
  }).filter(Boolean);

  const activeFilterCount = filters.sport.length+filters.status.length+(filters.distance!=="any"?1:0);

  const FacetContent = () => (
    <>
      <div style={{ fontWeight:800, fontSize:14, color:T.navy, marginBottom:16 }}>Filters</div>
      {[["Sport",["Soccer","Football","Basketball","Multi-Sport"],"sport"],["Status",["open","needs_staff"],"status"]].map(([title,opts,key])=>(
        <div key={key} style={{ marginBottom:18 }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>{title}</div>
          {opts.map(val=>(
            <label key={val} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7, cursor:"pointer", fontSize:13, color:T.slate700 }}>
              <input type="checkbox" checked={filters[key].includes(val)} onChange={()=>toggleArr(key,val)}/>{val==="needs_staff"?"Urgently Needed":val}
            </label>
          ))}
        </div>
      ))}
      <div style={{ marginBottom:18 }}>
        <div style={{ fontSize:10, fontWeight:700, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Distance</div>
        {[["Any","any"],["< 10 mi","10"],["< 25 mi","25"],["< 50 mi","50"]].map(([label,val])=>(
          <label key={val} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7, cursor:"pointer", fontSize:13, color:T.slate700 }}>
            <input type="radio" name="dist" value={val} checked={filters.distance===val} onChange={()=>updFilter("distance",val)}/>{label}
          </label>
        ))}
      </div>
      <button onClick={()=>setFilters({sport:[],distance:"any",status:[],certsMatch:true})} style={{ width:"100%", background:"none", border:"none", color:T.slate400, fontSize:12, cursor:"pointer", padding:"4px 0" }}>✕ Clear All</button>
    </>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", fontFamily:T.fontBody, background:T.slate50 }}>
      <TopBar bg={T.tealDark} role="Athletic Trainer" user="Stephanie Vance" isMobile={isMobile}/>

      {/* Mobile filter drawer */}
      {isMobile&&showFilters&&(
        <div style={{ position:"fixed", inset:0, zIndex:100, display:"flex" }}>
          <div style={{ flex:1, background:"rgba(0,0,0,0.45)" }} onClick={()=>setShowFilters(false)}/>
          <div style={{ width:280, background:T.white, overflowY:"auto", padding:20, boxShadow:T.shadowMd }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontWeight:700, fontSize:15 }}>Filters</div>
              <button onClick={()=>setShowFilters(false)} style={{ background:"none", border:"none", fontSize:20, cursor:"pointer", color:T.slate400 }}>✕</button>
            </div>
            <FacetContent/>
            <Btn variant="navy" onClick={()=>setShowFilters(false)} style={{ width:"100%", marginTop:12 }}>Apply Filters</Btn>
          </div>
        </div>
      )}

      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
        {/* Sidebar facets — tablet & desktop */}
        {!isMobile&&(
          <div style={{ width:isTablet?200:240, background:T.white, borderRight:`1px solid ${T.slate200}`, padding:"18px 16px", overflowY:"auto", flexShrink:0 }}>
            <FacetContent/>
          </div>
        )}

        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Toolbar */}
          <div style={{ background:T.white, borderBottom:`1px solid ${T.slate200}`, padding:isMobile?"10px 12px":"10px 18px", display:"flex", alignItems:"center", gap:10 }}>
            {isMobile&&(
              <button onClick={()=>setShowFilters(true)} style={{ background:activeFilterCount>0?T.teal:T.slate100, color:activeFilterCount>0?"#fff":T.slate500, border:"none", borderRadius:8, padding:"7px 12px", fontSize:12, fontWeight:700, cursor:"pointer", flexShrink:0 }}>
                ⚙ Filters {activeFilterCount>0&&`(${activeFilterCount})`}
              </button>
            )}
            <input placeholder="🔍 Search…" style={{ flex:1, border:`1px solid ${T.slate200}`, borderRadius:8, padding:"7px 10px", fontSize:13, minWidth:0 }}/>
            <div style={{ display:"flex", gap:3, background:T.slate100, borderRadius:8, padding:3, flexShrink:0 }}>
              {[["list","☰"],["map","🗺"]].map(([v,l])=>(
                <button key={v} onClick={()=>setView(v)} style={{ background:view===v?T.white:"transparent", border:"none", borderRadius:6, padding:"5px 10px", fontSize:13, fontWeight:700, cursor:"pointer", color:view===v?T.navy:T.slate400, boxShadow:view===v?T.shadow:"none" }}>{l}</button>
              ))}
            </div>
            {!isMobile&&<span style={{ fontSize:12, color:T.slate400, flexShrink:0 }}>{filtered.length} of {MARKETPLACE_OPPS.length}</span>}
          </div>

          <div style={{ flex:1, overflow:"hidden", display:"flex" }}>
            {view==="list"&&(
              <div style={{ flex:1, overflowY:"auto", padding:isMobile?"12px":"16px 18px", display:"flex", flexDirection:"column", gap:10 }}>
                {filtered.map(opp=>(
                  <Card key={opp.id} style={{ padding:isMobile?"13px 14px":"16px 18px", display:"flex", gap:isMobile?10:14, alignItems:"flex-start", borderLeft:opp.status==="needs_staff"?`3px solid ${T.amber}`:`3px solid ${T.teal}` }}>
                    <div style={{ textAlign:"center", minWidth:isMobile?40:48, background:T.slate50, borderRadius:10, padding:"7px 5px", flexShrink:0 }}>
                      <div style={{ fontSize:9, fontWeight:700, color:T.slate400 }}>{opp.day}</div>
                      <div style={{ fontSize:isMobile?16:20, fontWeight:800, color:T.navy, lineHeight:1.1 }}>{opp.date.split(" ")[1].replace(",","")}</div>
                      <div style={{ fontSize:9, color:T.slate400 }}>{opp.date.split(" ")[0]}</div>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap", marginBottom:3 }}>
                        <span style={{ fontWeight:800, fontSize:isMobile?13:14 }}>{opp.org}</span>
                        <Badge color="slate">{opp.sport}</Badge>
                        {statusBadge(opp.status)}
                        {applied.has(opp.id)&&<Badge color="green">Applied ✓</Badge>}
                      </div>
                      <div style={{ fontSize:11, color:T.slate500 }}>📍 {opp.location.city}</div>
                      {!isMobile&&<div style={{ fontSize:11, color:T.slate500, marginTop:1 }}>🕐 {opp.arrival}–{opp.end} · 📏 ~{opp.distance} mi</div>}
                      <div style={{ fontSize:11, color:T.slate400, marginTop:2 }}>Certs: {opp.certsRequired.join(", ")}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontWeight:800, fontSize:isMobile?16:20, color:T.teal }}>{opp.atPay}</div>
                      <div style={{ fontSize:10, color:T.slate400, marginBottom:6 }}>{opp.hrs}h</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                        {!applied.has(opp.id)?<Btn variant="primary" small onClick={()=>setApplied(p=>new Set([...p,opp.id]))}>Apply</Btn>:<Btn variant="ghost" small>Withdraw</Btn>}
                        {!isMobile&&<Btn variant="ghost" small onClick={()=>setSaved(p=>{const n=new Set(p);n.has(opp.id)?n.delete(opp.id):n.add(opp.id);return n;})}>{saved.has(opp.id)?"♥":"♡"}</Btn>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {view==="map"&&(
              <div style={{ flex:1, display:"flex", flexDirection:isMobile?"column":"row", overflow:"hidden" }}>
                <div style={{ flex:isMobile?"0 0 200px":1, padding:isMobile?"10px 12px 0":16, overflow:"hidden" }}>
                  <FullMap pins={mapPins} selected={selectedPin} onSelect={setSelectedPin}/>
                </div>
                <div style={{ flex:isMobile?1:"0 0 300px", borderTop:isMobile?`1px solid ${T.slate200}`:"none", borderLeft:isMobile?"none":`1px solid ${T.slate200}`, overflowY:"auto", padding:14, background:T.white }}>
                  <div style={{ fontWeight:700, fontSize:12, color:T.slate400, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:10 }}>{selectedPin?`At ${selectedPin}`:"Click a pin"}</div>
                  {filtered.filter(o=>!selectedPin||o.location.name===selectedPin).map(opp=>(
                    <div key={opp.id} style={{ padding:"12px 0", borderBottom:`1px solid ${T.slate100}` }}>
                      <div style={{ fontWeight:700, fontSize:13 }}>{opp.org}</div>
                      <div style={{ fontSize:11, color:T.slate500, marginTop:2 }}>{opp.date} · {opp.arrival}–{opp.end}</div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:6 }}>
                        <span style={{ fontWeight:800, color:T.teal }}>{opp.atPay}</span>
                        <Btn variant={applied.has(opp.id)?"ghost":"primary"} small onClick={()=>!applied.has(opp.id)&&setApplied(p=>new Set([...p,opp.id]))}>{applied.has(opp.id)?"Applied ✓":"Apply"}</Btn>
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
  const w = useWindowWidth();
  const isMobile = w < 640;
  const isTablet = w < 1024;
  const [activeRole, setActiveRole] = useState("at");

  const Blur = ({ children }) => <div style={{ filter:"blur(5px)", userSelect:"none", pointerEvents:"none", opacity:0.6 }}>{children}</div>;
  const GateOverlay = ({ message }) => (
    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.88)", backdropFilter:"blur(2px)", zIndex:10, borderRadius:14, gap:10, padding:16, textAlign:"center" }}>
      <div style={{ fontSize:26 }}>🔒</div>
      <div style={{ fontWeight:700, fontSize:14, color:T.navy, maxWidth:220 }}>{message}</div>
      <Btn variant="navy" onClick={onSignup}>Create Free Account</Btn>
    </div>
  );

  const whyItems = activeRole==="at"
    ? [["💰","Guaranteed pay"],["📅","Pick your schedule"],["⭐","Build your reputation"],["📋","Cert management"]]
    : [["🔍","Pre-vetted BOC ATs"],["📅","Series scheduling"],["🧾","Billing in one place"],["✅","Compliance tracking"]];

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", fontFamily:T.fontBody, background:"#f0f9ff" }}>
      <div style={{ background:T.navy, color:"#fff", padding:`0 ${isMobile?14:24}px`, display:"flex", alignItems:"center", justifyContent:"space-between", height:52, flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:26,height:26,background:T.teal,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0 }}>⚕</div>
          <span style={{ fontWeight:800, fontSize:isMobile?13:14 }}>TheSportsMedGuy</span>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <button onClick={onSignup} style={{ background:"rgba(255,255,255,0.12)", color:"#fff", border:"1px solid rgba(255,255,255,0.25)", borderRadius:8, padding:isMobile?"5px 10px":"6px 14px", fontSize:isMobile?12:13, fontWeight:700, cursor:"pointer" }}>Sign In</button>
          <button onClick={onSignup} style={{ background:T.teal, color:"#fff", border:"none", borderRadius:8, padding:isMobile?"5px 10px":"6px 14px", fontSize:isMobile?12:13, fontWeight:700, cursor:"pointer" }}>Join Free →</button>
        </div>
      </div>

      <div style={{ flex:1, overflowY:"auto" }}>
        {/* Hero */}
        <div style={{ background:`linear-gradient(135deg, ${T.navy} 0%, #0d4f8c 100%)`, padding:isMobile?"28px 16px 36px":"40px 24px 50px", textAlign:"center" }}>
          <div style={{ fontSize:12, fontWeight:700, color:T.teal, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:8 }}>New Mexico's Sports Medicine Network</div>
          <h1 style={{ color:"#fff", fontWeight:900, fontSize:isMobile?24:32, margin:"0 0 10px", letterSpacing:"-0.02em" }}>Connect. Staff. Play.</h1>
          <p style={{ color:"rgba(255,255,255,0.65)", fontSize:isMobile?13:15, maxWidth:480, margin:"0 auto 22px" }}>Connecting certified Athletic Trainers with sports organizations across New Mexico.</p>
          <div style={{ display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setActiveRole("at")} style={{ background:activeRole==="at"?T.teal:"rgba(255,255,255,0.1)", color:"#fff", border:"none", borderRadius:10, padding:isMobile?"9px 14px":"10px 22px", fontSize:isMobile?13:14, fontWeight:700, cursor:"pointer" }}>I'm an Athletic Trainer</button>
            <button onClick={()=>setActiveRole("ho")} style={{ background:activeRole==="ho"?T.teal:"rgba(255,255,255,0.1)", color:"#fff", border:"none", borderRadius:10, padding:isMobile?"9px 14px":"10px 22px", fontSize:isMobile?13:14, fontWeight:700, cursor:"pointer" }}>I'm an Organization</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:T.white, borderBottom:`1px solid ${T.slate200}` }}>
          {[["120+","Events"],["25+","ATs"],["6","Orgs"],["$60/hr","Avg Pay"]].map(([v,l])=>(
            <div key={l} style={{ padding:isMobile?"10px 4px":"18px", textAlign:"center", borderRight:`1px solid ${T.slate200}` }}>
              <div style={{ fontWeight:900, fontSize:isMobile?18:26, color:T.navy }}>{v}</div>
              <div style={{ fontSize:isMobile?9:12, color:T.slate400, marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ padding:isMobile?"14px 12px":"24px", display:"grid", gridTemplateColumns:isTablet?"1fr":"280px 1fr", gap:18 }}>
          {/* Sidebar — desktop only */}
          {!isTablet&&(
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <Card style={{ padding:14 }}>
                <SectionTitle>Browse by Location</SectionTitle>
                <FullMap pins={[{id:"bernalillo",x:48,y:38,label:"Bernalillo",sublabel:"4 open",count:4,urgent:false},{id:"mesaDel",x:46,y:53,label:"Mesa del Sol",sublabel:"6 open",count:6,urgent:true},{id:"ecopark",x:49,y:47,label:"Eco Park",sublabel:"2 open",count:2,urgent:true}]}/>
                <div style={{ marginTop:10, padding:"9px 12px", background:T.slate50, borderRadius:8, fontSize:12, color:T.slate500, textAlign:"center" }}>🔒 Sign in to see full details</div>
              </Card>
              <Card style={{ padding:14 }}>
                <SectionTitle>{activeRole==="at"?"Why ATs love us":"Why Orgs trust us"}</SectionTitle>
                {whyItems.map(([icon,text])=>(
                  <div key={text} style={{ display:"flex", gap:10, alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${T.slate100}`, fontSize:13, color:T.slate700 }}>
                    <span style={{ fontSize:15, flexShrink:0 }}>{icon}</span>{text}
                  </div>
                ))}
                <Btn variant="navy" style={{ width:"100%", marginTop:12 }} onClick={onSignup}>{activeRole==="at"?"Join as AT →":"Post Events →"}</Btn>
              </Card>
            </div>
          )}

          {/* Main content */}
          <div>
            {/* Compact map on mobile/tablet */}
            {isTablet&&(
              <Card style={{ padding:12, marginBottom:14 }}>
                <SectionTitle>Browse by Location</SectionTitle>
                <div style={{ height:isMobile?150:200 }}>
                  <FullMap pins={[{id:"bernalillo",x:48,y:38,label:"Bernalillo",sublabel:"4 open",count:4,urgent:false},{id:"mesaDel",x:46,y:53,label:"Mesa del Sol",sublabel:"6 open",count:6,urgent:true}]}/>
                </div>
                <div style={{ marginTop:8, padding:"8px 12px", background:T.slate50, borderRadius:8, fontSize:12, color:T.slate500, textAlign:"center" }}>🔒 Sign in to see full event details & apply</div>
              </Card>
            )}

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontWeight:800, fontSize:isMobile?14:16 }}>Upcoming Opportunities <span style={{ color:T.teal }}>{MARKETPLACE_OPPS.length}+</span></div>
              <Badge color="amber">Sign in to apply</Badge>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {MARKETPLACE_OPPS.slice(0,2).map(opp=>(
                <Card key={opp.id} style={{ padding:isMobile?"13px 14px":"16px 18px", display:"flex", gap:isMobile?10:16, alignItems:"center", borderLeft:`3px solid ${T.teal}` }}>
                  <div style={{ textAlign:"center", minWidth:isMobile?40:48, background:T.tealLight, borderRadius:10, padding:"7px 5px", flexShrink:0 }}>
                    <div style={{ fontSize:9, fontWeight:700, color:T.tealDark }}>{opp.day}</div>
                    <div style={{ fontSize:isMobile?16:20, fontWeight:800, color:T.navy }}>{opp.date.split(" ")[1].replace(",","")}</div>
                    <div style={{ fontSize:9, color:T.slate400 }}>{opp.date.split(" ")[0]}</div>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:isMobile?13:14 }}>{opp.org} <Badge color="slate">{opp.sport}</Badge></div>
                    <div style={{ fontSize:11, color:T.slate500, marginTop:2 }}>📍 {opp.location.city}</div>
                    {!isMobile&&<div style={{ fontSize:11, color:T.slate400, marginTop:1 }}>🕐 {opp.arrival}–{opp.end} · Certs: {opp.certsRequired.join(", ")}</div>}
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontWeight:800, fontSize:isMobile?16:20, color:T.teal }}>{opp.atPay}</div>
                    <div style={{ fontSize:10, color:T.slate400, marginBottom:6 }}>{opp.hrs}h</div>
                    <Btn variant="outline" small onClick={onSignup}>Sign in →</Btn>
                  </div>
                </Card>
              ))}

              <div style={{ position:"relative", borderRadius:14, overflow:"hidden" }}>
                <GateOverlay message={`${MARKETPLACE_OPPS.length-2} more opportunities for members`}/>
                <div style={{ display:"flex", flexDirection:"column", gap:10, padding:4 }}>
                  {MARKETPLACE_OPPS.slice(2,isMobile?4:6).map(opp=>(
                    <Blur key={opp.id}>
                      <Card style={{ padding:"13px 16px", display:"flex", gap:12, alignItems:"center" }}>
                        <div style={{ width:44, height:50, background:T.slate100, borderRadius:10, flexShrink:0 }}/>
                        <div style={{ flex:1 }}><div style={{ background:T.slate200, height:14, width:"60%", borderRadius:4 }}/><div style={{ background:T.slate100, height:10, width:"80%", borderRadius:4, marginTop:7 }}/></div>
                        <div style={{ textAlign:"right" }}><div style={{ fontWeight:800, fontSize:18, color:T.teal }}>$???</div><div style={{ background:T.slate100, height:26, width:70, borderRadius:8, marginTop:6 }}/></div>
                      </Card>
                    </Blur>
                  ))}
                </div>
              </div>
            </div>

            {/* Why section — card grid on mobile/tablet */}
            {isTablet&&(
              <Card style={{ padding:14, marginTop:16 }}>
                <SectionTitle>{activeRole==="at"?"Why ATs love us":"Why Orgs trust us"}</SectionTitle>
                <div style={{ display:"grid", gridTemplateColumns:isMobile?"1fr 1fr":"repeat(4,1fr)", gap:10, marginBottom:12 }}>
                  {whyItems.map(([icon,text])=>(
                    <div key={text} style={{ background:T.slate50, borderRadius:10, padding:"12px 10px", textAlign:"center", fontSize:12, color:T.slate700 }}>
                      <div style={{ fontSize:20, marginBottom:4 }}>{icon}</div>{text}
                    </div>
                  ))}
                </div>
                <Btn variant="navy" style={{ width:"100%" }} onClick={onSignup}>{activeRole==="at"?"Join as AT →":"Post Events →"}</Btn>
              </Card>
            )}

            <div style={{ marginTop:16, background:T.navy, borderRadius:14, padding:isMobile?"20px 16px":"24px", textAlign:"center" }}>
              <div style={{ color:"#fff", fontWeight:800, fontSize:isMobile?16:18, marginBottom:8 }}>Ready to {activeRole==="at"?"find AT work?":"solve staffing?"}</div>
              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:isMobile?12:13, marginBottom:16 }}>{activeRole==="at"?"Create a free profile and apply to events this weekend.":"Post your series and connect with certified ATs in minutes."}</div>
              <button onClick={onSignup} style={{ background:T.teal, color:"#fff", border:"none", borderRadius:10, padding:isMobile?"11px 20px":"12px 28px", fontSize:isMobile?14:15, fontWeight:800, cursor:"pointer" }}>
                {activeRole==="at"?"Create AT Profile — Free":"Post Your First Event — Free"}
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
  { key:"ho",            label:"🏢 HO Dashboard",      sub:"Duke City Soccer" },
  { key:"past",          label:"📂 Past Instances",     sub:"HO View" },
  { key:"create",        label:"➕ Create Series",      sub:"HO Admin" },
  { key:"create-member", label:"✏️ Draft Series",       sub:"HO Member" },
  { key:"at-market",     label:"🔍 AT Marketplace",     sub:"Authenticated" },
  { key:"public",        label:"🌐 Public Marketplace", sub:"Unauthenticated" },
];

export default function App() {
  const [screen, setScreen] = useState("ho");
  const w = useWindowWidth();
  const isMobile = w < 640;

  return (
    <div style={{ fontFamily:T.fontBody, height:"100vh", display:"flex", flexDirection:"column" }}>
      {/* Screen switcher — horizontally scrollable, no wrap */}
      <div style={{ background:"#0f172a", padding:isMobile?"6px 10px":"8px 14px", display:"flex", gap:5, alignItems:"center", overflowX:"auto", scrollbarWidth:"none", WebkitOverflowScrolling:"touch", flexShrink:0 }}>
        <span style={{ fontSize:10, fontWeight:700, color:"#475569", textTransform:"uppercase", letterSpacing:"0.08em", marginRight:4, flexShrink:0 }}>View:</span>
        {SCREENS.map(s=>(
          <button key={s.key} onClick={()=>setScreen(s.key)} style={{ background:screen===s.key?T.teal:"rgba(255,255,255,0.06)", color:screen===s.key?"#fff":"#64748b", border:"none", borderRadius:7, padding:isMobile?"5px 10px":"5px 12px", fontSize:isMobile?11:12, fontWeight:screen===s.key?700:500, cursor:"pointer", flexShrink:0, whiteSpace:"nowrap", display:"flex", flexDirection:"column", alignItems:"center", lineHeight:1.3 }}>
            <span>{s.label}</span>
            {!isMobile&&<span style={{ fontSize:9, opacity:0.7 }}>{s.sub}</span>}
          </button>
        ))}
      </div>

      <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
        {screen==="ho"            && <HODashboard onNavigate={to=>setScreen(to==="create-series"?"create":to==="past-instances"?"past":to)}/>}
        {screen==="past"          && <PastInstancesDashboard onBack={()=>setScreen("ho")}/>}
        {screen==="create"        && <CreateSeriesDashboard onBack={()=>setScreen("ho")} userRole="admin"/>}
        {screen==="create-member" && <CreateSeriesDashboard onBack={()=>setScreen("ho")} userRole="member"/>}
        {screen==="at-market"     && <ATMarketplace/>}
        {screen==="public"        && <PublicMarketplace onSignup={()=>setScreen("at-market")}/>}
      </div>
    </div>
  );
}
