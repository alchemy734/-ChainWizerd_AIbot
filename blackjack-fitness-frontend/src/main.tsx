import React from 'react';
import { createRoot } from 'react-dom/client';
import { BottomNav, Header, Hero, ProgressChart, SectionHeading, Stats, Workouts } from './components';
import { weekDays, weekValues, workouts } from './data';
import './styles.css';

function App() {
  const [active, setActive] = React.useState('home');
  const startWorkout = React.useCallback(() => setActive('workout'), []);

  return <main className="app-shell">
    <Header />
    <Hero onStart={startWorkout} />
    <Stats />
    <SectionHeading label="RECOMMENDED" title="Choose your session" action="See all" />
    <Workouts items={workouts} onSelect={startWorkout} />
    <SectionHeading label="YOUR JOURNEY" title="Weekly progress" />
    <ProgressChart days={weekDays} values={weekValues} />
    <BottomNav active={active} onChange={setActive} />
  </main>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
