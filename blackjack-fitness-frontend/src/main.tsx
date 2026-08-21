import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const workouts = [
  { title: 'Full Body Power', meta: '28 min · Intermediate', icon: '⚡' },
  { title: 'Core & Stability', meta: '18 min · Beginner', icon: '◎' },
  { title: 'Mobility Reset', meta: '12 min · Recovery', icon: '◌' },
];

function App() {
  const [active, setActive] = React.useState('home');

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <span className="eyebrow">BLACKJACK FITNESS</span>
          <h1>Good morning, Athlete.</h1>
        </div>
        <button className="avatar" aria-label="Open profile">A</button>
      </header>

      <section className="hero-card">
        <div>
          <span className="pill">TODAY'S PLAN</span>
          <h2>Build strength.<br />Move better.</h2>
          <p>Your adaptive plan is ready. Keep your streak alive.</p>
          <button className="primary" onClick={() => setActive('workout')}>Start workout <span>→</span></button>
        </div>
        <div className="hero-orbit" aria-hidden="true"><span>BK</span></div>
      </section>

      <section className="stats-grid" aria-label="Today's activity">
        <article><span>STEPS</span><strong>6,842</strong><small>68% of goal</small><div className="progress"><i style={{ width: '68%' }} /></div></article>
        <article><span>CALORIES</span><strong>412</strong><small>kcal active</small><div className="progress"><i style={{ width: '54%' }} /></div></article>
        <article><span>HEART RATE</span><strong>72 <em>BPM</em></strong><small>Resting · synced</small><div className="pulse">⌁⌁⌁</div></article>
      </section>

      <section className="section-head"><div><span className="eyebrow">RECOMMENDED</span><h2>Choose your session</h2></div><button className="text-button">See all</button></section>
      <section className="workouts">
        {workouts.map((workout) => (
          <button className="workout-card" key={workout.title} onClick={() => setActive('workout')}>
            <span className="workout-icon">{workout.icon}</span><span><b>{workout.title}</b><small>{workout.meta}</small></span><span className="arrow">›</span>
          </button>
        ))}
      </section>

      <section className="section-head"><div><span className="eyebrow">YOUR JOURNEY</span><h2>Weekly progress</h2></div></section>
      <section className="chart-card">
        <div className="chart-values"><b>4</b><span>workouts this week</span><strong>+18%</strong></div>
        <div className="bars">{[42, 70, 55, 86, 64, 95, 38].map((height, i) => <div className="bar-wrap" key={i}><i style={{ height: `${height}%` }} /><small>{['M','T','W','T','F','S','S'][i]}</small></div>)}</div>
      </section>

      <nav className="bottom-nav" aria-label="Primary navigation">
        {[['home','⌂','Home'],['workout','◉','Workout'],['progress','◒','Progress'],['profile','○','Profile']].map(([id, icon, label]) => (
          <button className={active === id ? 'nav-item active' : 'nav-item'} key={id} onClick={() => setActive(id)}><span>{icon}</span>{label}</button>
        ))}
      </nav>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
