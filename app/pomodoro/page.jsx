import PomodoroTimer from '../../components/PomodoroTimer.jsx'

export const metadata = {
  title: 'Pomodoro — Faiz Ghifari',
  description: 'A simple pomodoro timer to help you focus.',
  alternates: { canonical: '/pomodoro' },
}

export default function PomodoroPage() {
  return (
    <main>
      <PomodoroTimer />
    </main>
  )
}
