"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

/**
 * Custom hook to consume the Socket context
 * @returns {{ socket: any, connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error', error: string | null, reconnect: () => void }}
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

/**
 * SocketProvider Component
 * Manages the lifecycle of the Socket.IO client connection, tracking status,
 * errors, and exposing manual reconnection triggers for high-availability production apps.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Falls back to localhost:4000 if NEXT_PUBLIC_SOCKET_URL is not set
    const SOCKET_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_SOCKET_URL) || 'http://localhost:4000';
    
    console.log(`[SocketProvider] Connecting to ${SOCKET_URL}`);
    
    const socketInstance = io(SOCKET_URL, {
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      timeout: 10000,
      transports: ['websocket', 'polling']
    });

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('[SocketProvider] Socket connected successfully');
      setConnectionStatus('connected');
      setError(null);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log(`[SocketProvider] Socket disconnected. Reason: ${reason}`);
      setConnectionStatus('disconnected');
    });

    socketInstance.on('connect_error', (err) => {
      console.warn('[SocketProvider] Connection failed (operating in mock mode):', err.message);
      setConnectionStatus('error');
      setError(err.message || 'Cannot establish connection to server.');
    });

    // Cleanup connection on unmount
    return () => {
      console.log('[SocketProvider] Disconnecting socket instance');
      socketInstance.disconnect();
    };
  }, []);

  const reconnect = () => {
    if (socket) {
      console.log('[SocketProvider] Reconnecting manually...');
      setConnectionStatus('connecting');
      setError(null);
      socket.connect();
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connectionStatus, error, reconnect }}>
      {children}
    </SocketContext.Provider>
  );
};
export default SocketProvider;
