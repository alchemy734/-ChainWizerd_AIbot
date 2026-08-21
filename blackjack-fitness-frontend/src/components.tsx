import type { Workout } from './data';

export function Header() {
  return <header className="topbar"><div><span className="eyebrow">BLACKJACK FITNESS</span><h1>Good morning, Athlete.</h1></div><button className="avatar" aria-label="Open profile">A</button></header>;
}

export function Hero({ onStart }: { onStart: () => void }) {
  return <section className="hero-card"><div><span className="pill">TODAY'S PLAN</span><h2>Build strength.<br />Move better.</h2><p>Your adaptive plan is ready. Keep your streak alive.</p><button className="primary" onClick={onStart}>Start workout <span aria-hidden="true">→</span></button></div><div className="hero-orbit" aria-hidden="true"><span>BK</span></div></section>;
}

export function Stats() {
  return <section className="stats-grid" aria-label="Today's activity"><article><span>STEPS</span><strong>6,842</strong><small>68% of goal</small><div className="progress"><i style={{ width: '68%' }} /></div></article><article><span>CALORIES</span><strong>412</strong><small>kcal active</small><div className="progress"><i style={{ width: '54%' }} /></div></article><article><span>HEART RATE</span><strong>72 <em>BPM</em></strong><small>Resting · synced</small><div className="pulse" aria-label="Heart rate trend">⌁⌁⌁</div></article></section>;
}

export function Workouts({ items, onSelect }: { items: Workout[]; onSelect: () => void }) {
  return <section className="workouts" aria-label="Recommended workouts">{items.map((workout) => <button className="workout-card" key={workout.title} onClick={onSelect}><span className="workout-icon" aria-hidden="true">{workout.icon}</span><span><b>{workout.title}</b><small>{workout.meta}</small></span><span className="arrow" aria-hidden="true">›</span></button>)}</section>;
}

export function SectionHeading({ label, title, action }: { label: string; title: string; action?: string }) {
  return <div className="section-head"><div><span className="eyebrow">{label}</span><h2>{title}</h2></div>{action && <button className="text-button">{action}</button>}</div>;
}

export function ProgressChart({ days, values }: { days: string[]; values: number[] }) {
  return <section className="chart-card" aria-label="Weekly workout progress"><div className="chart-values"><b>4</b><span>workouts this week</span><strong>+18%</strong></div><div className="bars">{values.map((height, i) => <div className="bar-wrap" key={`${days[i]}-${i}`}><i style={{ height: `${height}%` }} /><small>{days[i]}</small></div>)}</div></section>;
}

export function BottomNav({ active, onChange }: { active: string; onChange: (id: string) => void }) {
  const items = [['home','⌂','Home'],['workout','◉','Workout'],['progress','◒','Progress'],['profile','○','Profile']];
  return <nav className="bottom-nav" aria-label="Primary navigation">{items.map(([id, icon, label]) => <button className={active === id ? 'nav-item active' : 'nav-item'} key={id} onClick={() => onChange(id)} aria-current={active === id ? 'page' : undefined}><span aria-hidden="true">{icon}</span>{label}</button>)}</nav>;
}
