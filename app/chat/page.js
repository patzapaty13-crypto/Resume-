"use client";

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { MessageInput } from './components/MessageInput';
import { SocketProvider, useSocket } from './contexts/SocketProvider';
import { CURRENT_USER, mockRooms, mockMessages } from './mockData';

/**
 * Main Chat Application Layout Wrapper
 * Handles room switching, state synchronization with the Socket instance,
 * and managing reactive layouts for mobile.
 */
function ChatApp() {
  const [activeRoomId, setActiveRoomId] = useState('room-dm-khun'); // Default to DM with Khun to showcase the gaming match invite
  const [rooms, setRooms] = useState(mockRooms);
  const [messages, setMessages] = useState(mockMessages);
  
  const { socket, connectionStatus } = useSocket();

  // Find the currently active room object
  const activeRoom = rooms.find(r => r.id === activeRoomId) || null;
  // Filter messages belonging to the selected room
  const filteredMessages = messages.filter(m => m.roomId === activeRoomId);

  // Setup Socket.IO Event Listeners for real-time messages
  useEffect(() => {
    if (!socket) return;

    // Listen for incoming messages from the server
    const handleIncomingMessage = (message) => {
      console.log('[Socket] New message received:', message);
      // Append the message if not already present (avoid duplicates)
      setMessages(prev => {
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };

    // Listen for status changes of other users (e.g. going online/offline)
    const handleUserStatusChange = ({ userId, status }) => {
      console.log(`[Socket] User ${userId} status changed to ${status}`);
      setRooms(prevRooms => 
        prevRooms.map(room => ({
          ...room,
          participants: room.participants.map(p => 
            p.userId === userId ? { ...p, status } : p
          )
        }))
      );
    };

    socket.on('message', handleIncomingMessage);
    socket.on('user_status', handleUserStatusChange);

    return () => {
      socket.off('message', handleIncomingMessage);
      socket.off('user_status', handleUserStatusChange);
    };
  }, [socket]);

  /**
   * Handle sending a new message
   * @param {string} text - Message input string
   * @param {Object|null} attachment - Selected file attachment details
   */
  const handleSendMessage = (text, attachment) => {
    if (!activeRoomId) return;

    // Create the message object following the relational schema
    const newMessage = {
      id: `msg-local-${Date.now()}`,
      roomId: activeRoomId,
      senderId: CURRENT_USER.id,
      content: attachment ? attachment.name : text,
      messageType: attachment ? 'file' : 'text',
      fileUrl: attachment ? attachment.url : null,
      createdAt: new Date().toISOString(),
      readBy: []
    };

    // 1. Instantly update local state to maintain snappy UI (Optimistic Update)
    setMessages(prev => [...prev, newMessage]);

    // 2. Emit event over socket connection to notify the backend
    if (socket && connectionStatus === 'connected') {
      socket.emit('send_message', {
        roomId: activeRoomId,
        content: newMessage.content,
        messageType: newMessage.messageType,
        fileUrl: newMessage.fileUrl
      });
    } else {
      console.warn('[Socket] Server disconnected. Message sent in offline/mock mode.');
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden bg-white">
      {/* 
        Responsive layout design:
        - If activeRoomId is set, Sidebar is hidden on mobile screens ('hidden md:flex'), and ChatWindow is full screen ('flex').
        - If activeRoomId is null, Sidebar is full screen ('flex'), and ChatWindow is hidden on mobile screens ('hidden md:flex').
      */}
      <div className={`w-full md:w-auto h-full flex-shrink-0 ${activeRoomId ? 'hidden md:flex' : 'flex'}`}>
        <Sidebar 
          rooms={rooms}
          activeRoomId={activeRoomId}
          onSelectRoom={setActiveRoomId}
          currentUser={CURRENT_USER}
        />
      </div>

      <div className={`flex-1 h-full min-h-0 ${activeRoomId ? 'flex' : 'hidden md:flex'}`}>
        <ChatWindow 
          room={activeRoom}
          messages={filteredMessages}
          currentUser={CURRENT_USER}
          onBack={() => setActiveRoomId(null)} // Returns to room list on mobile
          inputComponent={
            <MessageInput 
              onSend={handleSendMessage} 
              disabled={connectionStatus === 'error'} 
            />
          }
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SocketProvider>
      <ChatApp />
    </SocketProvider>
  );
}
