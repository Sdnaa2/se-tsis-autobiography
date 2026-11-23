import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Uncaught UI error:', error, info);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#FAF8F5] dark:bg-[#0F1115] text-stone-900 dark:text-stone-100">
          <div className="max-w-md rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-6 shadow-sm">
            <h1 className="font-serif text-2xl font-semibold mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              The autobiography page encountered an unexpected rendering issue.
              Reloading restores the static verified view.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-300"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
