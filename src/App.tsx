import { BIOGRAPHY_DATA } from './data/biography';
import { useTheme } from './hooks/useTheme';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { HeroBio } from './components/HeroBio';
import { TimelineSection } from './components/TimelineSection';
import { AskBekzatWidget } from './components/AskBekzatWidget';
import { Footer } from './components/Footer';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Header
          fullName={BIOGRAPHY_DATA.profile.fullName}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main id="main-content" className="mx-auto w-full max-w-4xl flex-1 px-6">
          <HeroBio
            profile={BIOGRAPHY_DATA.profile}
            coreValues={BIOGRAPHY_DATA.coreValues}
          />
          <TimelineSection milestones={BIOGRAPHY_DATA.milestones} />
          <AskBekzatWidget />
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
