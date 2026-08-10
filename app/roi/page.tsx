'use client';
import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, BadgeCheck, ArrowRight, Sparkles } from 'lucide-react';

const TRACKS = [
  { id: 'ba', name: 'Business Analytics with Gen AI', range: '45–65%', hike: 0.55 },
  { id: 'da', name: 'Data Analytics with Gen AI', range: '60–90%', hike: 0.75 },
  { id: 'pm', name: 'AI Product Management', range: '70–120%', hike: 0.95 },
];

const COLORS = {
  ink: '#12203A',
  paper: '#F2F4F1',
  paperLine: '#D9DED4',
  emerald: '#146C43',
  emeraldBright: '#1C9457',
  gold: '#B8862B',
  outerBg: '#0E1A2B',
  muted: '#75806F',
};

function fmtLPA(n: number) {
  if (!isFinite(n)) return '0';
  return n % 1 === 0 ? n.toFixed(0) : n.toFixed(1);
}

export default function ROICalculator() {
  const [currentCTC, setCurrentCTC] = useState(6);
  const [trackId, setTrackId] = useState('da');
  const [stage, setStage] = useState('idle'); // idle | printing | done
  const [displayVal, setDisplayVal] = useState(0);
  const rafRef = useRef<number | null>(null);
  const stampId = useRef(`NXG-${Math.floor(1000 + Math.random() * 9000)}`).current;

  const track = TRACKS.find((t) => t.id === trackId) || TRACKS[1];

  function computeHike(ctc: number, baseHike: number) {
    let h = baseHike;
    if (ctc < 6) h += 0.15;
    else if (ctc > 15) h -= 0.2;
    return Math.max(0.25, h);
  }

  const hike = computeHike(currentCTC, track.hike);
  let projectedRaw = currentCTC * (1 + hike);
  const capped = projectedRaw > 48;
  const projected = capped ? 48 : projectedRaw;
  const gain = projected - currentCTC;
  const todayStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  function handleGenerate() {
    if (stage === 'printing') return;
    setStage('printing');
    const start = performance.now();
    const duration = 750;
    const from = currentCTC;
    const to = projected;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayVal(from + (to - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayVal(to);
        setStage('done');
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function reset() {
    setStage('idle');
    setDisplayVal(0);
  }

  return (
    <div
      style={{ background: COLORS.outerBg, minHeight: '100vh', fontFamily: "'IBM Plex Sans', sans-serif" }}
      className="flex items-center justify-center p-4 sm:p-8"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div className="w-full max-w-lg">
        <div className="flex items-center gap-3 mb-5 px-1">
          <div
            style={{ color: COLORS.paper, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.15em' }}
            className="text-xs uppercase"
          >
            NxtGen Academy
          </div>
          <div className="h-px flex-1" style={{ background: 'rgba(242,244,241,0.15)' }} />
          <div
            style={{ color: 'rgba(242,244,241,0.5)', fontFamily: "'IBM Plex Mono', monospace" }}
            className="text-xs hidden sm:block"
          >
            Career Finance Desk
          </div>
        </div>

        <div className="relative rounded-sm" style={{ background: COLORS.paper, boxShadow: '0 30px 60px -20px rgba(0,0,0,0.55)' }}>
          {/* Header */}
          <div className="px-6 sm:px-8 pt-8 pb-6" style={{ borderBottom: `1px solid ${COLORS.paperLine}` }}>
            <div
              style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.15em' }}
              className="text-[11px] uppercase mb-2"
            >
              CTC Projection Statement
            </div>
            <h1
              style={{ color: COLORS.ink, fontFamily: "'IBM Plex Serif', serif" }}
              className="text-2xl leading-snug mb-4"
            >
              What could a NxtGen program do to your CTC?
            </h1>
            <div
              style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }}
              className="flex justify-between text-[11px]"
            >
              <span>STMT NO. {stampId}</span>
              <span>ISSUED {todayStr.toUpperCase()}</span>
            </div>
          </div>

          {/* Current CTC input */}
          <div className="px-6 sm:px-8 py-6" style={{ borderBottom: `1px dashed ${COLORS.paperLine}` }}>
            <label style={{ color: COLORS.ink }} className="text-sm font-medium block mb-3">
              Current annual CTC
            </label>
            <div className="flex items-center gap-2">
              <span style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }} className="text-lg">
                ₹
              </span>
              <input
                type="number"
                min={1}
                max={60}
                value={currentCTC}
                onChange={(e) => {
                  const v = Math.max(1, Math.min(60, Number(e.target.value) || 0));
                  setCurrentCTC(v);
                  reset();
                }}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: COLORS.ink,
                  background: 'transparent',
                  borderBottom: `1px solid ${COLORS.paperLine}`,
                }}
                className="w-20 text-lg font-medium pb-1"
              />
              <span style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }} className="text-sm">
                LPA
              </span>
            </div>
          </div>

          {/* Track selection */}
          <div className="px-6 sm:px-8 py-6" style={{ borderBottom: `1px dashed ${COLORS.paperLine}` }}>
            <label style={{ color: COLORS.ink }} className="text-sm font-medium block mb-3">
              Program track
            </label>
            <div className="space-y-2">
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTrackId(t.id);
                    reset();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-sm text-left transition-colors"
                  style={{
                    background: trackId === t.id ? COLORS.ink : 'transparent',
                    border: `1px solid ${trackId === t.id ? COLORS.ink : COLORS.paperLine}`,
                  }}
                >
                  <span
                    style={{
                      color: trackId === t.id ? COLORS.paper : COLORS.ink,
                      fontFamily: "'IBM Plex Sans', sans-serif",
                    }}
                    className="text-sm"
                  >
                    {t.name}
                  </span>
                  <span
                    style={{
                      color: trackId === t.id ? 'rgba(242,244,241,0.7)' : COLORS.muted,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                    className="text-xs shrink-0 ml-3"
                  >
                    {t.range}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div className="px-6 sm:px-8 py-6">
            <button
              onClick={handleGenerate}
              disabled={stage === 'printing'}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-sm"
              style={{
                background: COLORS.ink,
                color: COLORS.paper,
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: '0.1em',
                opacity: stage === 'printing' ? 0.7 : 1,
              }}
            >
              {stage === 'printing' ? (
                'GENERATING…'
              ) : (
                <>
                  GENERATE PROJECTION <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>

          {/* Result */}
          {stage !== 'idle' && (
            <div className="px-6 sm:px-8 pb-8">
              <div style={{ borderTop: `1px dashed ${COLORS.paperLine}` }} className="pt-6">
                <div
                  style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace", letterSpacing: '0.1em' }}
                  className="text-[11px] uppercase mb-4"
                >
                  Statement of projected outcome
                </div>

                <div className="flex justify-between items-baseline mb-3">
                  <span style={{ color: COLORS.ink }} className="text-sm">
                    Current annual CTC
                  </span>
                  <span style={{ color: COLORS.ink, fontFamily: "'IBM Plex Mono', monospace" }} className="text-sm">
                    ₹{fmtLPA(currentCTC)} LPA
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-4">
                  <span style={{ color: COLORS.ink }} className="text-sm">
                    Projected annual CTC
                  </span>
                  <span
                    style={{ color: COLORS.emerald, fontFamily: "'IBM Plex Mono', monospace" }}
                    className="text-xl font-semibold"
                  >
                    ₹{fmtLPA(displayVal)}
                    {capped && stage === 'done' ? '+' : ''} LPA
                  </span>
                </div>

                <div className="space-y-1.5 mb-5">
                  <div className="h-2 rounded-full" style={{ background: COLORS.paperLine }}>
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${Math.min(100, (currentCTC / 48) * 100)}%`, background: COLORS.ink }}
                    />
                  </div>
                  <div className="h-2 rounded-full" style={{ background: COLORS.paperLine }}>
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (displayVal / 48) * 100)}%`,
                        background: COLORS.emeraldBright,
                      }}
                    />
                  </div>
                </div>

                {stage === 'done' && (
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <div
                      className="px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{ background: 'rgba(20,108,67,0.12)' }}
                    >
                      <TrendingUp size={12} style={{ color: COLORS.emerald }} />
                      <span
                        style={{ color: COLORS.emerald, fontFamily: "'IBM Plex Mono', monospace" }}
                        className="text-xs font-medium"
                      >
                        +{Math.round(hike * 100)}% hike
                      </span>
                    </div>
                    <span style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }} className="text-xs">
                      ≈ ₹{fmtLPA(gain)} LPA gain / year
                    </span>
                  </div>
                )}

                {stage === 'done' && (
                  <div className="flex justify-end -mt-16 mb-2 relative z-10">
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: 84,
                        height: 84,
                        border: `2px solid ${COLORS.gold}`,
                        transform: 'rotate(-10deg)',
                        background: COLORS.paper,
                      }}
                    >
                      <div className="text-center">
                        <BadgeCheck size={16} style={{ color: COLORS.gold, margin: '0 auto 2px' }} />
                        <div
                          style={{
                            color: COLORS.gold,
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '7px',
                            letterSpacing: '0.06em',
                            lineHeight: 1.3,
                          }}
                        >
                          NXTGEN
                          <br />
                          VERIFIED
                          <br />
                          PROJECTION
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <p
                  style={{ color: COLORS.muted, fontFamily: "'IBM Plex Mono', monospace" }}
                  className="text-[10px] leading-relaxed italic mb-6"
                >
                  *Estimate based on average outcomes reported by placed alumni for this track. Actual results depend
                  on effort, prior experience, and market conditions.
                </p>

                <div
                  style={{ borderTop: `1px dashed ${COLORS.paperLine}` }}
                  className="pt-5 flex items-center justify-between flex-wrap gap-3"
                >
                  <button
                    className="flex items-center gap-2 px-4 py-2.5 rounded-sm"
                    style={{ background: COLORS.ink, color: COLORS.paper, fontFamily: "'IBM Plex Sans', sans-serif" }}
                  >
                    <Sparkles size={14} /> Talk to a mentor <ArrowRight size={14} />
                  </button>
                  <a
                    href="#"
                    style={{ color: COLORS.ink, fontFamily: "'IBM Plex Sans', sans-serif" }}
                    className="text-sm underline"
                  >
                    View curriculum
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          style={{ color: 'rgba(242,244,241,0.35)', fontFamily: "'IBM Plex Mono', monospace" }}
          className="text-center text-[10px] mt-5"
        >
          nxtgenacademy.co.in
        </div>
      </div>
    </div>
  );
}
