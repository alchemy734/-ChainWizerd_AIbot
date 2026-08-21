import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { metrics, profile, weekDays, weekValues, workouts } from './data';
import type { Workout } from './types';

type Screen = 'home' | 'workouts' | 'progress' | 'profile';

const iconFor = (category: string) => category === 'Strength' ? '⚡' : category === 'Core' ? '◎' : category === 'Cardio' ? '↗' : '◌';

function App() {
  const [screen, setScreen] = React.useState<Screen>('home');
  const [selectedWorkout, setSelectedWorkout] = React.useState<Workout | null>(null);
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  if (showOnboarding) return <Onboarding onDone={() => setShowOnboarding(false)} />;
  if (selectedWorkout) return <WorkoutDetail workout={selectedWorkout} onBack={() => setSelectedWorkout(null)} />;
  return <main className="app-shell">
    <header className="topbar"><div><span className="eyebrow">BLACKJACK FITNESS</span><h1>Good morning, {profile.name}.</h1></div><button className="avatar" onClick={() => setScreen('profile')}>A</button></header>
    {screen === 'home' && <Home onWorkout={() => setScreen('workouts')} onSelect={setSelectedWorkout} />}
    {screen === 'workouts' && <WorkoutsScreen onSelect={setSelectedWorkout} />}
    {screen === 'progress' && <Progress />}
    {screen === 'profile' && <Profile onOnboarding={() => setShowOnboarding(true)} />}
    <nav className="bottom-nav" aria-label="Primary navigation">{([['home','⌂','Home'],['workouts','◉','Workout'],['progress','◒','Progress'],['profile','○','Profile']] as const).map(([id, icon, label]) => <button className={screen === id ? 'nav-item active' : 'nav-item'} key={id} onClick={() => setScreen(id)}><span>{icon}</span>{label}</button>)}</nav>
  </main>;
}

function Home({ onWorkout, onSelect }: { onWorkout: () => void; onSelect: (w: Workout) => void }) { return <>
  <section className="hero-card"><div><span className="pill">TODAY'S PLAN</span><h2>Build strength.<br />Move better.</h2><p>Your adaptive plan is ready. Keep your streak alive.</p><button className="primary" onClick={onWorkout}>Start workout <span>→</span></button></div><div className="hero-orbit"><span>BK</span></div></section>
  <Metrics /><section className="section-head"><div><span className="eyebrow">RECOMMENDED</span><h2>Choose your session</h2></div><button className="text-button" onClick={onWorkout}>See all</button></section>
  <section className="workouts">{workouts.slice(0, 3).map(w => <WorkoutCard key={w.id} workout={w} onClick={() => onSelect(w)} />)}</section>
</>; }

function Metrics() { return <section className="stats-grid"><article><span>STEPS</span><strong>{metrics.steps.toLocaleString()}</strong><small>{Math.round(metrics.steps / metrics.stepGoal * 100)}% of goal</small><div className="progress"><i style={{ width: `${metrics.steps / metrics.stepGoal * 100}%` }} /></div></article><article><span>CALORIES</span><strong>{metrics.calories}</strong><small>kcal active</small><div className="progress"><i style={{ width: '54%' }} /></div></article><article><span>HEART RATE</span><strong>{metrics.heartRate} <em>BPM</em></strong><small>Resting · synced</small><div className="pulse">⌁⌁⌁</div></article></section>; }

function WorkoutCard({ workout, onClick }: { workout: Workout; onClick: () => void }) { return <button className="workout-card" onClick={onClick}><span className="workout-icon">{iconFor(workout.category)}</span><span><b>{workout.title}</b><small>{workout.durationMinutes} min · {workout.level}</small></span><span className="arrow">›</span></button>; }
function WorkoutsScreen({ onSelect }: { onSelect: (w: Workout) => void }) { return <><section className="page-heading"><span className="eyebrow">TRAINING LIBRARY</span><h2>Find your next session</h2><p>Choose a workout that matches your energy, time and goal.</p></section><div className="filter-row">{['All','Strength','Cardio','Core','Recovery'].map(x => <button key={x}>{x}</button>)}</div><section className="workouts">{workouts.map(w => <WorkoutCard key={w.id} workout={w} onClick={() => onSelect(w)} />)}</section></>; }
function WorkoutDetail({ workout, onBack }: { workout: Workout; onBack: () => void }) { const [started, setStarted] = React.useState(false); return <main className="app-shell detail-page"><button className="back-button" onClick={onBack}>← Back</button><section className="detail-hero"><span className="pill">{workout.category.toUpperCase()}</span><h2>{workout.title}</h2><p>{workout.description}</p><div className="detail-stats"><span>{workout.durationMinutes} min</span><span>{workout.calories} kcal</span><span>{workout.level}</span></div></section><section className="section-head"><div><span className="eyebrow">SESSION</span><h2>{workout.exercises.length} exercises</h2></div></section><div className="exercise-list">{workout.exercises.map((e, i) => <div key={e}><b>{String(i + 1).padStart(2, '0')}</b><span>{e}</span><small>45 sec</small></div>)}</div><button className="primary full" onClick={() => setStarted(true)}>{started ? 'Workout started ✓' : 'Start this workout →'}</button></main>; }
function Progress() { return <><section className="page-heading"><span className="eyebrow">YOUR JOURNEY</span><h2>Progress that compounds</h2><p>Small consistent sessions are building your fitness base.</p></section><section className="progress-highlight"><strong>7</strong><span>day streak</span><b>+18%<small> vs last week</small></b></section><section className="chart-card"><div className="chart-values"><b>4</b><span>workouts this week</span></div><div className="bars">{weekValues.map((height, i) => <div className="bar-wrap" key={i}><i style={{ height: `${height}%` }} /><small>{weekDays[i]}</small></div>)}</div></section><section className="stats-grid"><article><span>WEIGHT</span><strong>72.0 <em>KG</em></strong><small>Stable this week</small></article><article><span>WORKOUT TIME</span><strong>86 <em>MIN</em></strong><small>+22 min</small></article><article><span>GOAL</span><strong>68%</strong><small>Strength foundation</small></article></section></>; }
function Profile({ onOnboarding }: { onOnboarding: () => void }) { return <><section className="profile-card"><div className="big-avatar">A</div><span className="eyebrow">YOUR PROFILE</span><h2>{profile.name}</h2><p>{profile.level} · {profile.goal.replace('-', ' ')}</p></section><section className="settings-list">{['Personal information','Fitness goals','Connected devices','Notifications'].map(x => <button key={x}>{x}<span>›</span></button>)}<button onClick={onOnboarding}>Redo onboarding <span>›</span></button></section></>; }
function Onboarding({ onDone }: { onDone: () => void }) { const [step, setStep] = React.useState(0); const steps = [['Welcome to Blackjack','Your personal fitness system for becoming stronger, healthier and more consistent.'],['Know your baseline','We’ll use your height, weight and experience to personalize your plan.'],['Train with intention','Choose goals, follow guided workouts and track your progress over time.']]; return <main className="onboarding"><span className="eyebrow">BLACKJACK FITNESS</span><div className="onboarding-mark">BK</div><span className="pill">STEP {step + 1} OF {steps.length}</span><h1>{steps[step][0]}</h1><p>{steps[step][1]}</p><div className="onboarding-dots">{steps.map((_, i) => <i className={i === step ? 'selected' : ''} key={i} />)}</div><button className="primary full" onClick={() => step === steps.length - 1 ? onDone() : setStep(step + 1)}>{step === steps.length - 1 ? 'Enter Blackjack →' : 'Continue →'}</button></main>; }

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
