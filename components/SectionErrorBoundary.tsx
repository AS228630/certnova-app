"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; message: string };

// Prevents a runtime error in any one section from silently blanking
// the rest of the page with no visible feedback — instead shows exactly
// what broke, so issues can be diagnosed immediately instead of
// appearing as "nothing renders" with no clue why.
export default class SectionErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, message: error instanceof Error ? error.message : String(error) };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error("Section render error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-danger">
          Rendering error in this section: {this.state.message}
        </div>
      );
    }
    return this.props.children;
  }
}
