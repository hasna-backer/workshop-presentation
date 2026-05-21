import { useState, useEffect, useCallback, useMemo } from "react";

const TOTAL_SLIDES = 20;

// ── Animation Hooks & Helpers ─────────────────────────────

function Anim({ delay = 0, duration = 0.6, type = "fadeUp", children, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  const base = {
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
    ...style,
  };

  const animations = {
    fadeUp: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" },
    fadeDown: { opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(-30px)" },
    fadeLeft: { opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)" },
    fadeRight: { opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)" },
    scaleIn: { opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.85)" },
    blurIn: { opacity: visible ? 1 : 0, filter: visible ? "blur(0px)" : "blur(12px)", transform: visible ? "scale(1)" : "scale(0.95)" },
    popIn: { opacity: visible ? 1 : 0, transform: visible ? "scale(1)" : "scale(0.5)" },
    flipIn: { opacity: visible ? 1 : 0, transform: visible ? "perspective(600px) rotateY(0deg)" : "perspective(600px) rotateY(-15deg)" },
    slideReveal: { opacity: visible ? 1 : 0, transform: visible ? "translateX(0) skewX(0deg)" : "translateX(-60px) skewX(-3deg)" },
    fadeOnly: { opacity: visible ? 1 : 0 },
  };

  return <div style={{ ...base, ...(animations[type] || animations.fadeUp) }}>{children}</div>;
}

function CountUp({ target, prefix = "", suffix = "", duration = 1.5, delay = 0, style = {} }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setStarted(true), delay * 1000); return () => clearTimeout(t); }, [delay]);
  useEffect(() => {
    if (!started) return;
    const num = parseInt(target.toString().replace(/[^0-9]/g, "")) || 0;
    const steps = 40; const inc = num / steps; let cur = 0;
    const iv = setInterval(() => { cur += inc; if (cur >= num) { setVal(num); clearInterval(iv); } else setVal(Math.floor(cur)); }, (duration * 1000) / steps);
    return () => clearInterval(iv);
  }, [started, target, duration]);
  return <span style={style}>{started ? `${prefix}${val.toLocaleString()}${suffix}` : ""}</span>;
}

function AnimBar({ pct, color, delay = 0, children }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(pct), delay * 1000); return () => clearTimeout(t); }, [pct, delay]);
  return (
    <div style={{ flex: 1, background: "#f1f5f9", borderRadius: "8px", height: "36px", overflow: "hidden" }}>
      <div style={{ width: `${width}%`, height: "100%", background: `linear-gradient(90deg, ${color}cc, ${color})`, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "0.8rem", transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1)" }}>
        {width > 0 && children}
      </div>
    </div>
  );
}

function Particles({ count = 20, color = "rgba(56,189,248,0.15)" }) {
  const particles = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 4 + 2, dur: Math.random() * 20 + 15, delay: Math.random() * -20,
  })), [count]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: color, animation: `floatParticle ${p.dur}s ease-in-out ${p.delay}s infinite` }} />
      ))}
    </div>
  );
}

// ── Slide Components ──────────────────────────────────────────

function Slide1() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg, #0a0f1c 0%, #151d33 50%, #1a1230 100%)", position: "relative", overflow: "hidden" }}>
      <Particles count={30} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 20% 80%, rgba(56,189,248,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(251,146,60,0.08) 0%, transparent 50%)" }} />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "2rem" }}>
        <Anim delay={0.1} type="scaleIn">
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, #f97316, #fb923c)", padding: "0.4rem 1.6rem", borderRadius: "6px", marginBottom: "2rem", animation: "pulse 2s ease-in-out infinite" }}>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.9rem", color: "#fff", letterSpacing: "3px" }}>ZOOPLE</span>
          </div>
        </Anim>
        <Anim delay={0.3} type="blurIn" duration={0.8}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#fff", lineHeight: 1.1, margin: "0 0 0.5rem" }}>
            MERN Stack +<br />
            <span style={{ background: "linear-gradient(90deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Next.js Workshop</span>
          </h1>
        </Anim>
        <Anim delay={0.7} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.3rem)", color: "#94a3b8", margin: "1.5rem 0 2.5rem", letterSpacing: "0.5px" }}>From Zero to Full Stack Developer</p></Anim>
        <Anim delay={1.0} type="fadeUp">
          <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap", fontSize: "0.85rem", color: "#64748b", fontFamily: "'DM Sans', sans-serif" }}>
            <span>Free Workshop</span><span>•</span><span>Zoople Technologies</span><span>•</span><span>Calicut</span>
          </div>
        </Anim>
        <Anim delay={1.3} type="scaleIn">
          <div style={{ marginTop: "2.5rem", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: "999px", padding: "0.5rem 1.5rem", display: "inline-block" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#38bdf8" }}>Kerala's No.1 Software Training Institute</span>
          </div>
        </Anim>
      </div>
    </div>
  );
}

function Slide2() {
  const apps = [
    { name: "YouTube", desc: "Videos & Streaming", color: "#FF0000", icon: "▶" },
    { name: "Instagram", desc: "Photos & Reels", color: "#E1306C", icon: "📷" },
    { name: "Swiggy", desc: "Food Delivery", color: "#FC8019", icon: "🍔" },
    { name: "WhatsApp", desc: "Messaging", color: "#25D366", icon: "💬" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.5rem" }}>What Did You Use Today?</h2></Anim>
      <Anim delay={0.3} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", color: "#64748b", marginBottom: "2.5rem", maxWidth: "600px" }}>Everything you love online was built by developers — just like what you'll learn here.</p></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {apps.map((app, i) => (
          <Anim key={app.name} delay={0.5 + i * 0.15} type="popIn">
            <div style={{ background: "#fff", borderRadius: "16px", padding: "1.8rem 1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", borderLeft: `4px solid ${app.color}` }} className="hover-lift">
              <div style={{ fontSize: "2rem", marginBottom: "0.8rem" }}>{app.icon}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#0f172a" }}>{app.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#94a3b8", marginTop: "0.3rem" }}>{app.desc}</div>
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={1.2} type="fadeUp">
        <div style={{ background: "linear-gradient(135deg, #eff6ff, #f0f4ff)", borderRadius: "12px", padding: "1.2rem 1.5rem", display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span style={{ fontSize: "1.4rem", animation: "bounce 1s ease-in-out 1.5s 3" }}>💡</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#334155" }}>Every one of these apps has a <strong>Frontend</strong>, a <strong>Backend</strong>, and a <strong>Database</strong> — that's exactly what you'll master.</span>
        </div>
      </Anim>
    </div>
  );
}

function Slide3() {
  const steps = [
    { label: "YOU", desc: "Tap 'Order' on Swiggy", color: "#f97316", icon: "👆" },
    { label: "FRONTEND", desc: "React shows the button", color: "#38bdf8", icon: "🖥️" },
    { label: "BACKEND", desc: "Node+Express process order", color: "#a78bfa", icon: "⚙️" },
    { label: "DATABASE", desc: "MongoDB saves your order", color: "#34d399", icon: "💾" },
    { label: "RESPONSE", desc: "\"Order placed!\" on screen", color: "#fb923c", icon: "✅" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#0f172a", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={15} color="rgba(167,139,250,0.1)" />
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>What Happens When You Click "Order"?</h2></Anim>
      <Anim delay={0.3} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "2.5rem" }}>Let's trace a single click through the entire web — step by step.</p></Anim>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center", justifyContent: "center" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <Anim delay={0.5 + i * 0.25} type="flipIn">
              <div style={{ background: `${s.color}15`, border: `1px solid ${s.color}40`, borderRadius: "16px", padding: "1.2rem 1.5rem", textAlign: "center", minWidth: "130px" }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem", animation: `bounce 0.6s ease ${0.8 + i * 0.25}s both` }}>{s.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.75rem", color: s.color, letterSpacing: "1.5px", marginBottom: "0.4rem" }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#94a3b8" }}>{s.desc}</div>
              </div>
            </Anim>
            {i < steps.length - 1 && <Anim delay={0.7 + i * 0.25} type="scaleIn"><span style={{ color: "#475569", fontSize: "1.4rem" }}>→</span></Anim>}
          </div>
        ))}
      </div>
      <Anim delay={2.0} type="fadeUp">
        <div style={{ marginTop: "2.5rem", background: "linear-gradient(90deg, rgba(56,189,248,0.1), rgba(167,139,250,0.1))", borderRadius: "12px", padding: "1rem 1.5rem", textAlign: "center" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#94a3b8" }}>This full journey — from click to database and back — is what a <strong style={{ color: "#38bdf8" }}>Full Stack Developer</strong> builds.</span>
        </div>
      </Anim>
    </div>
  );
}

function Slide4() {
  const layers = [
    { title: "FRONTEND", desc: "What users SEE & INTERACT with", items: ["Buttons, forms, menus", "Pages and animations", "Built with React + Next.js"], color: "#38bdf8", icon: "🖥️" },
    { title: "BACKEND", desc: "The LOGIC behind the scenes", items: ["Process user requests", "Business rules & security", "Built with Node.js + Express"], color: "#a78bfa", icon: "⚙️" },
    { title: "DATABASE", desc: "Where all DATA is STORED", items: ["User accounts & orders", "Posts, messages, records", "Built with MongoDB"], color: "#34d399", icon: "🗄️" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="blurIn"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#0f172a", marginBottom: "2.5rem", textAlign: "center" }}>What is a Full Stack Developer?</h2></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {layers.map((l, i) => (
          <Anim key={l.title} delay={0.3 + i * 0.2} type="fadeUp">
            <div style={{ background: "#fff", borderRadius: "20px", padding: "2rem 1.5rem", boxShadow: "0 4px 20px rgba(0,0,0,0.04)", borderTop: `4px solid ${l.color}`, height: "100%" }} className="hover-lift">
              <Anim delay={0.6 + i * 0.2} type="popIn"><div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{l.icon}</div></Anim>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "2px", color: l.color, marginBottom: "0.5rem" }}>{l.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#334155", fontWeight: 600, marginBottom: "1rem" }}>{l.desc}</div>
              {l.items.map((item, j) => (
                <Anim key={j} delay={0.8 + i * 0.2 + j * 0.1} type="fadeLeft">
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#64748b", padding: "0.35rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}><span style={{ color: l.color }}>✓</span> {item}</div>
                </Anim>
              ))}
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={1.6} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#475569", textAlign: "center" }}>A Full Stack Developer can build <strong>ALL THREE layers</strong> — frontend, backend, and database — on their own.</p></Anim>
    </div>
  );
}

function Slide5() {
  const reasons = [
    { num: "01", title: "JavaScript Everywhere", desc: "One language for frontend AND backend. No switching between Python and JS — just JavaScript all the way through.", color: "#f97316" },
    { num: "02", title: "Industry Standard", desc: "MERN is used by startups and big companies alike. It's the most popular full-stack combination in job listings today.", color: "#38bdf8" },
    { num: "03", title: "Next.js is Trending", desc: "Next.js is the future of React. Companies are specifically hiring for React + Next.js developers.", color: "#34d399" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={12} />
      <Anim delay={0.1} type="scaleIn"><div style={{ display: "inline-block", background: "linear-gradient(135deg, #f97316, #fb923c)", padding: "0.3rem 1.2rem", borderRadius: "6px", marginBottom: "1.5rem" }}><span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#fff", letterSpacing: "2px" }}>ZOOPLE</span></div></Anim>
      <Anim delay={0.2} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>Why MERN + Next.js?</h2></Anim>
      <Anim delay={0.4} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "2.5rem" }}>3 reasons this is the smartest stack to learn right now.</p></Anim>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {reasons.map((r, i) => (
          <Anim key={r.num} delay={0.6 + i * 0.25} type="slideReveal">
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "2.5rem", color: r.color, lineHeight: 1, opacity: 0.8 }}>{r.num}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: "#fff", marginBottom: "0.4rem" }}>{r.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide6() {
  const techs = [
    { name: "HTML & CSS", sub: "Structure & Style", color: "#e34c26" },
    { name: "Bootstrap", sub: "Ready-made UI", color: "#7952b3" },
    { name: "JavaScript", sub: "The Brain", color: "#f7df1e" },
    { name: "TypeScript", sub: "JS with Safety Helmet", color: "#3178c6" },
    { name: "Node.js", sub: "The Kitchen", color: "#339933" },
    { name: "Express.js", sub: "The Waiter", color: "#64748b" },
    { name: "MongoDB", sub: "The Filing Cabinet", color: "#47a248" },
    { name: "React", sub: "Smart UI Builder", color: "#61dafb" },
    { name: "Next.js", sub: "React on Steroids ⚡", color: "#fff" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>The MERN + Next.js Stack</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "2.5rem" }}>9 technologies. One language. One complete skill set.</p></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {techs.map((t, i) => (
          <Anim key={t.name} delay={0.4 + i * 0.1} type="popIn">
            <div style={{ background: "#0f172a", borderRadius: "14px", padding: "1.3rem", position: "relative", overflow: "hidden" }} className="hover-lift">
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: t.color }} />
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.3rem" }}>{t.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#64748b" }}>{t.sub}</div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide7() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={10} color="rgba(227,76,38,0.1)" />
      <Anim delay={0.1} type="scaleIn"><div style={{ display: "inline-block", background: "linear-gradient(135deg, #f97316, #fb923c)", padding: "0.3rem 1.2rem", borderRadius: "6px", marginBottom: "1.5rem" }}><span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#fff", letterSpacing: "2px" }}>ZOOPLE</span></div></Anim>
      <Anim delay={0.2} type="blurIn"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>HTML & CSS</h2></Anim>
      <Anim delay={0.35} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "2rem" }}>The Skeleton & Skin of Every Webpage</p></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        {[
          { title: "HTML — The Structure", color: "#e34c26", items: ["Defines what goes on the page", "Headings, paragraphs, buttons, images", "Like the skeleton of your body", "Without HTML — there's nothing to show"] },
          { title: "CSS — The Style", color: "#264de4", items: ["Makes the page beautiful", "Colors, fonts, sizes, layouts", "Like the clothes on your skeleton", "Without CSS — everything looks plain"] },
        ].map((col, ci) => (
          <Anim key={col.title} delay={0.5 + ci * 0.2} type={ci === 0 ? "fadeRight" : "fadeLeft"}>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: col.color, marginBottom: "1rem" }}>{col.title}</div>
              {col.items.map((item, j) => (
                <Anim key={j} delay={0.8 + ci * 0.2 + j * 0.12} type="fadeLeft">
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#94a3b8", padding: "0.4rem 0", display: "flex", gap: "0.5rem" }}><span style={{ color: col.color }}>▸</span> {item}</div>
                </Anim>
              ))}
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={1.8} type="scaleIn"><div style={{ marginTop: "2rem", background: "rgba(251,146,60,0.1)", borderRadius: "10px", padding: "0.8rem 1.2rem", textAlign: "center" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#fb923c" }}>🏗️ Month 1 of your journey starts here.</span></div></Anim>
    </div>
  );
}

function Slide8() {
  const features = [
    { title: "No design from scratch", desc: "Beautiful UI components ready to use — just add a class name." },
    { title: "Responsive by default", desc: "Your website adjusts to mobile, tablet, and desktop automatically." },
    { title: "Saves hours of work", desc: "Build a complete styled page in minutes instead of hours of CSS." },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>Bootstrap</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "1.5rem" }}>Ready-Made Clothes for Your Website</p></Anim>
      <Anim delay={0.4} type="slideReveal">
        <div style={{ background: "linear-gradient(135deg, #7952b310, #7952b305)", borderRadius: "14px", padding: "1.2rem 1.5rem", marginBottom: "2rem", borderLeft: "4px solid #7952b3" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#475569" }}>🧥 Imagine having a wardrobe full of ready-made, stylish outfits. Bootstrap is exactly that — a library of pre-built buttons, menus, layouts and more.</span>
        </div>
      </Anim>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.2rem", marginBottom: "2rem" }}>
        {features.map((f, i) => (
          <Anim key={f.title} delay={0.7 + i * 0.2} type="fadeUp">
            <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }} className="hover-lift">
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#7952b3", marginBottom: "0.5rem" }}>{f.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#64748b", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={1.4} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#7952b3", textAlign: "center", fontWeight: 600 }}>Bootstrap is like having a design team built into your code.</p></Anim>
    </div>
  );
}

function Slide9() {
  const points = [
    { icon: "🖱️", text: "Handles button clicks, form inputs, and user actions" },
    { icon: "🔄", text: "Updates the page without reloading — live experience" },
    { icon: "🌐", text: "The ONLY language that runs in every browser" },
    { icon: "⚡", text: "With MERN — you use JavaScript for frontend AND backend" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={15} color="rgba(247,223,30,0.08)" />
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
        <Anim delay={0.15} type="popIn"><div style={{ width: "80px", height: "80px", background: "#f7df1e", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "2rem", color: "#0f172a" }}>JS</span></div></Anim>
        <Anim delay={0.25} type="fadeRight"><div><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", margin: 0 }}>JavaScript</h2><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", margin: 0 }}>The Brain — Makes Everything Interactive</p></div></Anim>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
        {points.map((p, i) => (
          <Anim key={i} delay={0.5 + i * 0.18} type="slideReveal">
            <div style={{ display: "flex", gap: "1rem", alignItems: "center", background: "rgba(247,223,30,0.04)", borderRadius: "12px", padding: "1.1rem 1.5rem", border: "1px solid rgba(247,223,30,0.1)" }}>
              <span style={{ fontSize: "1.5rem" }}>{p.icon}</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#e2e8f0" }}>{p.text}</span>
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={1.4} type="blurIn"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#f7df1e", textAlign: "center", fontWeight: 600 }}>JavaScript is the HEART of the entire MERN stack.</p></Anim>
    </div>
  );
}

function Slide10() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>TypeScript</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "2rem" }}>JavaScript with a Safety Helmet</p></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <Anim delay={0.4} type="fadeRight">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderTop: "4px solid #3178c6" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#3178c6", marginBottom: "1rem" }}>What is TypeScript?</div>
            {["Built on top of JavaScript", "Adds 'types' to your variables", "Catches errors BEFORE running code", "Used in all modern companies", "Makes large projects manageable"].map((t, i) => (
              <Anim key={i} delay={0.6 + i * 0.1} type="fadeLeft"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#475569", padding: "0.35rem 0", display: "flex", gap: "0.5rem" }}><span style={{ color: "#3178c6" }}>✅</span> {t}</div></Anim>
            ))}
          </div>
        </Anim>
        <Anim delay={0.5} type="fadeLeft">
          <div style={{ background: "#0f172a", borderRadius: "16px", padding: "1.5rem", color: "#e2e8f0" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#f97316", marginBottom: "1rem" }}>Simple Analogy</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, color: "#94a3b8" }}>Riding a bike <strong style={{ color: "#f97316" }}>without</strong> a helmet = JavaScript<br /><br />Riding <strong style={{ color: "#3178c6" }}>with</strong> a helmet = TypeScript<br /><br /><span style={{ color: "#64748b" }}>Same bike. Same speed.<br />But much safer.</span></div>
          </div>
        </Anim>
      </div>
      <Anim delay={1.3} type="fadeUp"><div style={{ background: "linear-gradient(90deg, #3178c610, #3178c605)", borderRadius: "10px", padding: "0.8rem 1.2rem", borderLeft: "4px solid #3178c6" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#475569" }}>💼 Big companies use TypeScript because it prevents costly bugs in large codebases.</span></div></Anim>
    </div>
  );
}

function Slide11() {
  const points = [
    { title: "Runs JavaScript on the server", desc: "Before Node.js, JS only ran in browsers. Node.js changed everything." },
    { title: "Handles requests from users", desc: "When you submit a form, Node processes it on the server side." },
    { title: "Extremely fast & lightweight", desc: "Used by Netflix, LinkedIn, and Uber for their backend systems." },
    { title: "Same language as frontend", desc: "This is why MERN is beginner-friendly — just one language." },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={12} color="rgba(51,153,51,0.1)" />
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
        <Anim delay={0.15} type="popIn"><div style={{ width: "70px", height: "70px", background: "#339933", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#fff" }}>N</span></div></Anim>
        <Anim delay={0.25} type="fadeRight"><div><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", margin: 0 }}>Node.js</h2><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", margin: 0 }}>The Kitchen — Where the Real Work Happens</p></div></Anim>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {points.map((p, i) => (
          <Anim key={i} delay={0.4 + i * 0.18} type="flipIn">
            <div style={{ background: "rgba(51,153,51,0.06)", borderRadius: "14px", padding: "1.3rem", border: "1px solid rgba(51,153,51,0.15)" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#34d399", marginBottom: "0.4rem" }}>{p.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide12() {
  const routes = [
    { method: "GET", path: "/products", desc: "Fetch all products from database", color: "#34d399" },
    { method: "POST", path: "/login", desc: "Handle login form submission", color: "#38bdf8" },
    { method: "DELETE", path: "/user/123", desc: "Delete a user account", color: "#f87171" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>Express.js</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "1.5rem" }}>The Waiter — Takes Your Order to the Kitchen</p></Anim>
      <Anim delay={0.4} type="slideReveal"><div style={{ background: "#f1f5f9", borderRadius: "14px", padding: "1.2rem 1.5rem", marginBottom: "2rem", borderLeft: "4px solid #64748b" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#475569" }}>🍽️ You tell the waiter what you want → Waiter goes to kitchen → Kitchen prepares it → Waiter brings it back.</span></div></Anim>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {routes.map((r, i) => (
          <Anim key={r.method} delay={0.7 + i * 0.2} type="fadeLeft">
            <div style={{ background: "#fff", borderRadius: "14px", padding: "1.2rem 1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: "1.2rem" }} className="hover-lift">
              <Anim delay={0.9 + i * 0.2} type="popIn"><span style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: "0.8rem", background: r.color, color: "#fff", padding: "0.3rem 0.8rem", borderRadius: "6px", minWidth: "65px", textAlign: "center", display: "inline-block" }}>{r.method}</span></Anim>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.9rem", color: "#0f172a", fontWeight: 600 }}>{r.path}</span>
              <span style={{ color: "#94a3b8" }}>→</span>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#64748b" }}>{r.desc}</span>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide13() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={12} color="rgba(71,162,72,0.1)" />
      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
        <Anim delay={0.15} type="popIn"><div style={{ width: "70px", height: "70px", background: "#47a248", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ fontSize: "2rem" }}>🍃</span></div></Anim>
        <Anim delay={0.25} type="fadeRight"><div><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", margin: 0 }}>MongoDB</h2><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", margin: 0 }}>The Filing Cabinet — Stores All Your App's Data</p></div></Anim>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <Anim delay={0.4} type="fadeRight">
          <div style={{ background: "rgba(71,162,72,0.06)", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(71,162,72,0.15)" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#34d399", marginBottom: "1rem" }}>What MongoDB Stores</div>
            {["User accounts & passwords", "Posts, comments, messages", "Product lists & orders", "Any data your app needs"].map((t, i) => (
              <Anim key={i} delay={0.6 + i * 0.12} type="fadeLeft"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#94a3b8", padding: "0.4rem 0", display: "flex", gap: "0.5rem" }}><span>📁</span> {t}</div></Anim>
            ))}
          </div>
        </Anim>
        <Anim delay={0.5} type="fadeLeft">
          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "1.5rem", fontFamily: "'Space Mono', monospace", fontSize: "0.8rem" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#38bdf8", marginBottom: "1rem" }}>How Data Looks</div>
            <div style={{ color: "#94a3b8", lineHeight: 1.8 }}>
              <span style={{ color: "#64748b" }}>{"{"}</span><br />
              &nbsp;&nbsp;<span style={{ color: "#f97316" }}>name</span>: <span style={{ color: "#34d399" }}>"Basil"</span>,<br />
              &nbsp;&nbsp;<span style={{ color: "#f97316" }}>email</span>: <span style={{ color: "#34d399" }}>"basil@zoople.in"</span>,<br />
              &nbsp;&nbsp;<span style={{ color: "#f97316" }}>course</span>: <span style={{ color: "#34d399" }}>"MERN Stack"</span>,<br />
              &nbsp;&nbsp;<span style={{ color: "#f97316" }}>enrolled</span>: <span style={{ color: "#38bdf8" }}>true</span><br />
              <span style={{ color: "#64748b" }}>{"}"}</span>
            </div>
          </div>
        </Anim>
      </div>
      <Anim delay={1.3} type="fadeUp"><div style={{ marginTop: "1.5rem", textAlign: "center" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#64748b" }}>MongoDB stores data as simple JSON-like documents — no complex tables needed.</span></div></Anim>
    </div>
  );
}

function Slide14() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.3rem" }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#0f172a", margin: 0 }}>React</h2>
          <Anim delay={0.3} type="popIn"><span style={{ background: "#1877f2", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: "6px" }}>Built by META 🏢</span></Anim>
        </div>
      </Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "2rem" }}>The Smart UI Builder — Not Going Anywhere</p></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <Anim delay={0.4} type="fadeRight">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderTop: "4px solid #61dafb", height: "100%" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#61dafb", marginBottom: "1rem" }}>What Makes React Special?</div>
            {["Build UIs using reusable 'components'", "Change data → page updates automatically", "No page reload needed", "Used by Facebook, Instagram, Airbnb", "Most in-demand frontend skill globally"].map((t, i) => (
              <Anim key={i} delay={0.6 + i * 0.1} type="fadeLeft"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#475569", padding: "0.35rem 0", display: "flex", gap: "0.5rem" }}><span style={{ color: "#61dafb" }}>⚛️</span> {t}</div></Anim>
            ))}
          </div>
        </Anim>
        <Anim delay={0.5} type="fadeLeft">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderTop: "4px solid #1877f2", height: "100%" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#1877f2", marginBottom: "1rem" }}>Why React Won't Fade Away</div>
            {["Backed by Meta — billion dollar support", "10+ years in industry, still #1", "Massive community & ecosystem", "React Native → mobile apps too", "Every update makes it stronger"].map((t, i) => (
              <Anim key={i} delay={0.7 + i * 0.1} type="fadeLeft"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#475569", padding: "0.35rem 0", display: "flex", gap: "0.5rem" }}><span style={{ color: "#1877f2" }}>🔵</span> {t}</div></Anim>
            ))}
          </div>
        </Anim>
      </div>
      <Anim delay={1.5} type="blurIn"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#475569", textAlign: "center" }}>React is the most loved frontend framework. An investment that pays for years.</p></Anim>
    </div>
  );
}

function Slide15() {
  const features = [
    { icon: "⚡", title: "Server Side Rendering", desc: "Pages load faster — better for users & Google" },
    { icon: "📁", title: "Built-in Routing", desc: "Just create a file and the page exists" },
    { icon: "🌐", title: "Full Stack in One", desc: "Frontend AND backend in a single project" },
    { icon: "🚀", title: "Used by top companies", desc: "TikTok, Twitch, Hulu, Nike" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={15} />
      <Anim delay={0.1} type="blurIn"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>Next.js</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1rem", color: "#64748b", marginBottom: "0.8rem" }}>React on Steroids ⚡ — #1 Most In-Demand Framework</p></Anim>
      <Anim delay={0.4} type="scaleIn"><div style={{ background: "rgba(249,115,22,0.1)", borderRadius: "10px", padding: "0.8rem 1.2rem", marginBottom: "2rem" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#f97316" }}>🔥 Companies are NOW hiring for <strong>React + Next.js</strong></span></div></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        {features.map((f, i) => (
          <Anim key={f.title} delay={0.6 + i * 0.18} type="flipIn">
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "14px", padding: "1.3rem", border: "1px solid rgba(255,255,255,0.06)" }} className="hover-glow">
              <Anim delay={0.8 + i * 0.18} type="popIn"><div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{f.icon}</div></Anim>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.3rem" }}>{f.title}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#94a3b8", lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide16() {
  const steps = [
    { label: "User", desc: "Fills form", sub: "Browser", color: "#f97316", icon: "👤" },
    { label: "Next.js + React", desc: "Shows form & sends data", sub: "Frontend", color: "#38bdf8", icon: "🖥️" },
    { label: "Express + Node", desc: "Validates & processes", sub: "Backend", color: "#a78bfa", icon: "⚙️" },
    { label: "MongoDB", desc: "Saves user to DB", sub: "Data Layer", color: "#34d399", icon: "💾" },
    { label: "Response", desc: "\"Welcome!\"", sub: "Result", color: "#fb923c", icon: "✅" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>How It All Works Together</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#64748b", marginBottom: "2.5rem" }}>Scenario: User registers on a MERN + Next.js website</p></Anim>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", alignItems: "center", justifyContent: "center", marginBottom: "2rem" }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <Anim delay={0.4 + i * 0.25} type="popIn">
              <div style={{ background: "#fff", borderRadius: "16px", padding: "1.2rem 1.3rem", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", textAlign: "center", minWidth: "115px", borderTop: `3px solid ${s.color}` }} className="hover-lift">
                <div style={{ fontSize: "1.6rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.78rem", color: "#0f172a" }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "#64748b" }}>{s.desc}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.63rem", color: s.color, marginTop: "0.3rem", fontWeight: 600 }}>{s.sub}</div>
              </div>
            </Anim>
            {i < steps.length - 1 && <Anim delay={0.6 + i * 0.25} type="scaleIn"><span style={{ color: "#cbd5e1", fontSize: "1.2rem" }}>→</span></Anim>}
          </div>
        ))}
      </div>
      <Anim delay={2.0} type="fadeUp"><div style={{ background: "linear-gradient(90deg, #38bdf810, #a78bfa10)", borderRadius: "12px", padding: "1rem 1.5rem", textAlign: "center" }}><span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#475569" }}>The <strong>FULL MERN + Next.js stack</strong> in action!</span></div></Anim>
    </div>
  );
}

function Slide17() {
  const reasons = [
    { num: "01", icon: "🔤", title: "One Language to Rule Them All", desc: "HTML, CSS, JavaScript, TypeScript — that's all you need. No switching to Python or PHP.", color: "#f97316" },
    { num: "02", icon: "🔀", title: "Learn Both Frontend & Backend Together", desc: "Complete developer from day one. Specialize later based on what you enjoy.", color: "#38bdf8" },
    { num: "03", icon: "🎯", title: "One Course, Infinite Career Paths", desc: "Frontend, Backend, Full Stack, React, Next.js — all from one 6-month course.", color: "#34d399" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={12} />
      <Anim delay={0.1} type="scaleIn"><div style={{ display: "inline-block", background: "linear-gradient(135deg, #f97316, #fb923c)", padding: "0.3rem 1.2rem", borderRadius: "6px", marginBottom: "1.5rem" }}><span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#fff", letterSpacing: "2px" }}>ZOOPLE</span></div></Anim>
      <Anim delay={0.2} type="blurIn"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "2rem" }}>Why MERN is Perfect<br /><span style={{ color: "#64748b" }}>for Complete Beginners</span></h2></Anim>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
        {reasons.map((r, i) => (
          <Anim key={r.num} delay={0.5 + i * 0.25} type="slideReveal">
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "2rem", color: r.color, lineHeight: 1 }}>{r.num}</span>
              <div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff", marginBottom: "0.4rem" }}>{r.icon} {r.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.6 }}>{r.desc}</div>
              </div>
            </div>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide18() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="blurIn"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#0f172a", marginBottom: "2rem" }}>Why React + Next.js is<br />the Smart Career Choice</h2></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <Anim delay={0.3} type="fadeRight">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderTop: "4px solid #61dafb", height: "100%" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#61dafb", marginBottom: "1rem" }}>⚛️ React — Built to Last</div>
            {["Backed by Meta — not going away", "10+ years of industry dominance", "Instagram, WhatsApp, Airbnb", "React Native = Mobile apps too", "Huge ecosystem — tons of jobs"].map((t, i) => (
              <Anim key={i} delay={0.5 + i * 0.1} type="fadeLeft"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#475569", padding: "0.3rem 0", display: "flex", gap: "0.5rem" }}><span style={{ color: "#61dafb" }}>✅</span> {t}</div></Anim>
            ))}
          </div>
        </Anim>
        <Anim delay={0.4} type="fadeLeft">
          <div style={{ background: "#fff", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", borderTop: "4px solid #f97316", height: "100%" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f97316", marginBottom: "1rem" }}>🔥 Next.js — The New Standard</div>
            {["Listings say 'React + Next.js'", "Companies migrating RIGHT NOW", "SSR makes sites SEO-friendly", "Full stack in one framework", "Vercel worth $3.25 billion"].map((t, i) => (
              <Anim key={i} delay={0.6 + i * 0.1} type="fadeLeft"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#475569", padding: "0.3rem 0", display: "flex", gap: "0.5rem" }}><span style={{ color: "#f97316" }}>🔥</span> {t}</div></Anim>
            ))}
          </div>
        </Anim>
      </div>
      <Anim delay={1.4} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", color: "#475569", textAlign: "center" }}>React + Next.js is the direction the entire web is moving.</p></Anim>
    </div>
  );
}

function Slide19() {
  const companies = ["TCS", "Infosys", "Wipro", "Zoho", "Razorpay", "Freshworks", "Byju's", "Startups"];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "linear-gradient(135deg, #0a0f1c, #151d33)", padding: "3rem clamp(2rem, 5vw, 5rem)", position: "relative", overflow: "hidden" }}>
      <Particles count={15} />
      <Anim delay={0.1} type="scaleIn"><div style={{ display: "inline-block", background: "linear-gradient(135deg, #f97316, #fb923c)", padding: "0.3rem 1.2rem", borderRadius: "6px", marginBottom: "1.5rem" }}><span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: "0.7rem", color: "#fff", letterSpacing: "2px" }}>ZOOPLE</span></div></Anim>
      <Anim delay={0.2} type="fadeRight"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "0.3rem" }}>The Job Market Right Now</h2></Anim>
      <Anim delay={0.35} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#64748b", marginBottom: "2rem" }}>MERN + Next.js developers are in HIGH demand.</p></Anim>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {[
          { value: "50,000+", num: 50000, label: "MERN jobs on LinkedIn India", color: "#f97316" },
          { value: "3x", num: 3, label: "Growth in Next.js listings since 2022", color: "#38bdf8" },
          { value: "₹4–8 LPA", num: 0, label: "Average fresher salary", color: "#34d399" },
        ].map((s, i) => (
          <Anim key={s.value} delay={0.5 + i * 0.2} type="popIn">
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "1.5rem", border: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: s.color, marginBottom: "0.5rem" }}>
                {s.num > 10 ? <CountUp target={s.num} suffix="+" delay={0.7 + i * 0.2} style={{ color: s.color }} /> : s.value}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#94a3b8" }}>{s.label}</div>
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={1.3} type="fadeUp"><div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", color: "#64748b", marginBottom: "0.8rem" }}>Companies Actively Hiring:</div></Anim>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
        {companies.map((c, i) => (
          <Anim key={c} delay={1.5 + i * 0.08} type="popIn">
            <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", padding: "0.4rem 1rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "#e2e8f0", display: "inline-block" }}>{c}</span>
          </Anim>
        ))}
      </div>
    </div>
  );
}

function Slide20() {
  const levels = [
    { title: "Fresher (0 exp)", salary: "₹3 – ₹6 LPA", desc: "After completing the 6-month course", pct: 25, color: "#38bdf8" },
    { title: "Junior (1 yr)", salary: "₹6 – ₹10 LPA", desc: "After 1 year experience", pct: 45, color: "#a78bfa" },
    { title: "Mid-level (2 yrs)", salary: "₹10 – ₹18 LPA", desc: "With Next.js + projects", pct: 70, color: "#f97316" },
    { title: "Senior / Lead (3+ yrs)", salary: "₹18 – ₹35 LPA", desc: "Full stack lead role", pct: 100, color: "#ef4444" },
  ];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafbfe", padding: "3rem clamp(2rem, 5vw, 5rem)" }}>
      <Anim delay={0.1} type="blurIn"><h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)", fontWeight: 700, color: "#0f172a", marginBottom: "0.3rem" }}>Salary Scope — MERN + Next.js</h2></Anim>
      <Anim delay={0.25} type="fadeUp"><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#64748b", marginBottom: "2.5rem" }}>Real numbers. Real careers. Starting from your very first job.</p></Anim>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", marginBottom: "2.5rem" }}>
        {levels.map((l, i) => (
          <Anim key={l.title} delay={0.4 + i * 0.2} type="fadeRight">
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <div style={{ minWidth: "180px" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.9rem", color: "#0f172a" }}>{l.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "#94a3b8" }}>{l.desc}</div>
              </div>
              <AnimBar pct={l.pct} color={l.color} delay={0.7 + i * 0.25}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "0.8rem", color: "#fff" }}>{l.salary}</span>
              </AnimBar>
            </div>
          </Anim>
        ))}
      </div>
      <Anim delay={2.0} type="scaleIn">
        <div style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", borderRadius: "14px", padding: "1.2rem 1.5rem", textAlign: "center", animation: "pulse 2.5s ease-in-out 2.5s infinite" }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>Zoople has 8000+ successful placements — we don't just teach, we get you placed.</span>
        </div>
      </Anim>
    </div>
  );
}

// ── Slides Array & Main App ───────────────────────────────
const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15, Slide16, Slide17, Slide18, Slide19, Slide20];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [slideKey, setSlideKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [transDir, setTransDir] = useState(1);
  const [exiting, setExiting] = useState(false);

  const goTo = useCallback((idx, dir) => {
    if (transitioning || idx < 0 || idx >= TOTAL_SLIDES || idx === current) return;
    setTransitioning(true); setTransDir(dir); setExiting(true);
    setTimeout(() => { setCurrent(idx); setSlideKey(k => k + 1); setExiting(false); setTimeout(() => setTransitioning(false), 50); }, 350);
  }, [transitioning, current]);

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.clientX - rect.left < rect.width / 2) prev(); else next();
  };

  const SlideComponent = SLIDES[current];

  return (
    <div style={{ width: "100%", height: "100vh", background: "#0a0a0a", position: "relative", fontFamily: "'DM Sans', sans-serif", overflow: "hidden", userSelect: "none" }}>
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden; }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          25% { transform: translate(15px, -25px) scale(1.2); opacity: 0.7; }
          50% { transform: translate(-10px, -50px) scale(0.8); opacity: 0.5; }
          75% { transform: translate(20px, -25px) scale(1.1); opacity: 0.6; }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(249,115,22,0.3); }
          50% { box-shadow: 0 0 20px 5px rgba(249,115,22,0.15); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .hover-lift { transition: transform 0.3s, box-shadow 0.3s !important; }
        .hover-lift:hover { transform: translateY(-4px) !important; box-shadow: 0 8px 30px rgba(0,0,0,0.12) !important; }
        .hover-glow { transition: box-shadow 0.3s, border-color 0.3s !important; }
        .hover-glow:hover { box-shadow: 0 0 20px rgba(56,189,248,0.15) !important; border-color: rgba(56,189,248,0.3) !important; }
      `}</style>

      <div onClick={handleClick} style={{ position: "absolute", inset: 0, overflow: "hidden", cursor: "pointer" }}>
        <div key={slideKey} style={{
          position: "absolute", inset: 0,
          opacity: exiting ? 0 : 1,
          transform: exiting ? `translateX(${transDir * -60}px) scale(0.97)` : "translateX(0) scale(1)",
          transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}>
          <SlideComponent />
        </div>
        {current > 0 && <div style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.25, pointerEvents: "none" }}><div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem" }}>‹</div></div>}
        {current < TOTAL_SLIDES - 1 && <div style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", opacity: 0.25, pointerEvents: "none" }}><div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "1.2rem" }}>›</div></div>}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 1.2rem", background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)", position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 10 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", color: "#64748b" }}>
          <span style={{ color: "#fff", fontWeight: 700 }}>{String(current + 1).padStart(2, "0")}</span> / {String(TOTAL_SLIDES).padStart(2, "0")}
        </div>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {Array.from({ length: TOTAL_SLIDES }, (_, i) => (
            <div key={i} onClick={(e) => { e.stopPropagation(); goTo(i, i > current ? 1 : -1); }} style={{
              width: i === current ? "24px" : "6px", height: "6px", borderRadius: "3px",
              background: i === current ? "linear-gradient(90deg, #f97316, #38bdf8)" : i < current ? "#334155" : "#1e293b",
              transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", cursor: "pointer",
            }} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} disabled={current === 0} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #1e293b", background: "transparent", color: current === 0 ? "#334155" : "#94a3b8", cursor: current === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", transition: "all 0.2s" }}>‹</button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} disabled={current === TOTAL_SLIDES - 1} style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #1e293b", background: "transparent", color: current === TOTAL_SLIDES - 1 ? "#334155" : "#94a3b8", cursor: current === TOTAL_SLIDES - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", transition: "all 0.2s" }}>›</button>
        </div>
      </div>
    </div>
  );
}