"use client";

/**
 * Chat Layout
 * Isolates the chat page from the resume's global CSS resets.
 * Forces the body to not scroll so h-screen works correctly.
 */
export default function ChatLayout({ children }) {
  return (
    <div
      className="chat-layout"
      style={{
        /* Override resume's global body styles */
        lineHeight: '1.5',
        background: '#ffffff',
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
