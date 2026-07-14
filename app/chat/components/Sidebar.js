"use client";

import React from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  Hash, 
  Users, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  AlertTriangle,
  ArrowLeft,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { useSocket } from '../contexts/SocketProvider';

/**
 * @typedef {import('../mockData').Room} Room
 * @typedef {import('../mockData').Participant} Participant
 */

export const Sidebar = ({ rooms, activeRoomId, onSelectRoom, currentUser }) => {
  const { connectionStatus, error, reconnect } = useSocket();

  // Filter rooms by type
  const groupRooms = rooms.filter(r => r.type === 'group');
  const directMessages = rooms.filter(r => r.type === 'direct');

  const getDMPartner = (room) => {
    return room.participants.find(p => p.userId !== currentUser.id) || null;
  };

  // Helper to remove any leading emojis or special symbols from room names
  const cleanRoomName = (name) => {
    return name.replace(/^[^a-zA-Z0-9\u0e00-\u0e7f\s]+/, '').trim();
  };

  return (
    <aside className="w-full md:w-64 h-full bg-slate-900 text-slate-300 flex flex-col justify-between select-none border-r border-slate-850">
      {/* Top Section */}
      <div className="flex flex-col">
        {/* Back Button Area */}
        <div className="p-3 border-b border-slate-800/80 flex items-center justify-center">
          <Link 
            href="/" 
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/40 hover:bg-slate-800 border border-slate-800 rounded-lg transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 flex-shrink-0" />
            <span>กลับหน้าหลัก Resume</span>
          </Link>
        </div>

        {/* Workspace Title Header */}
        <div className="p-4 border-b border-slate-800/60 flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-650 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-sm">
              DC
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-slate-100 text-sm leading-tight truncate">DevChat Enterprise</h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500 flex-shrink-0" />
                <span>Workspace</span>
              </span>
            </div>
          </div>
        </div>

        {/* Connection Status Panel (Alert Box style) */}
        {connectionStatus === 'connected' && (
          <div className="mx-3 mt-3 px-3 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs flex items-center gap-2 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span className="truncate">เชื่อมต่อสำเร็จ (Connected)</span>
          </div>
        )}
        {connectionStatus === 'connecting' && (
          <div className="mx-3 mt-3 px-3 py-2 bg-indigo-500/10 text-[#60a5fa] border border-indigo-500/20 rounded-lg text-xs flex items-center gap-2 font-medium animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin flex-shrink-0" />
            <span className="truncate">กำลังเชื่อมต่อ...</span>
          </div>
        )}
        {connectionStatus === 'disconnected' && (
          <div className="mx-3 mt-3 px-3 py-2 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-lg text-xs flex items-center justify-between font-medium">
            <div className="flex items-center gap-2 min-w-0">
              <WifiOff className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">ขาดการติดต่อ</span>
            </div>
            <button 
              onClick={reconnect} 
              className="text-indigo-400 hover:text-white font-bold hover:underline transition-all text-xs flex-shrink-0 ml-2"
            >
              ต่อใหม่
            </button>
          </div>
        )}
        {connectionStatus === 'error' && (
          <div className="mx-3 mt-3 p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-lg text-xs flex flex-col gap-1.5 font-medium">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">การเชื่อมต่อขัดข้อง</span>
              </div>
              <button 
                onClick={reconnect} 
                className="text-indigo-400 hover:text-white font-bold hover:underline transition-all text-xs flex-shrink-0 ml-2"
              >
                เชื่อมต่อใหม่
              </button>
            </div>
            {error && (
              <p className="text-[10px] text-rose-300/80 font-mono break-all bg-black/20 p-1.5 rounded leading-normal mt-0.5">
                {error}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main List Area (Slack/Teams style) */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-5 scrollbar-thin">
        {/* Channels Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
            <span>ช่องทางการสนทนา (Channels)</span>
            <Users className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <ul className="space-y-0.5">
            {groupRooms.map(room => {
              const isActive = activeRoomId === room.id;
              return (
                <li key={room.id}>
                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] transition-all duration-150 text-left font-medium ${
                      isActive 
                        ? 'bg-slate-800 text-white font-semibold shadow-sm' 
                        : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
                    }`}
                    aria-selected={isActive}
                  >
                    <Hash className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-550'}`} />
                    <span className="truncate">{cleanRoomName(room.name)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Direct Messages Section */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
            <span>ผู้ร่วมงาน (Direct Messages)</span>
            <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <ul className="space-y-0.5">
            {directMessages.map(room => {
              const partner = getDMPartner(room);
              if (!partner) return null;
              const isActive = activeRoomId === room.id;
              const isOnline = partner.status === 'online';

              return (
                <li key={room.id}>
                  <button
                    onClick={() => onSelectRoom(room.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] transition-all duration-150 text-left font-medium ${
                      isActive 
                        ? 'bg-slate-800 text-white font-semibold shadow-sm' 
                        : 'text-slate-400 hover:bg-slate-800/30 hover:text-slate-200'
                    }`}
                    aria-selected={isActive}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="relative w-6 h-6 flex-shrink-0">
                        <img 
                          src={partner.avatarUrl} 
                          alt={`${partner.username}'s avatar`} 
                          className="w-6 h-6 rounded-full bg-slate-800 object-cover"
                        />
                        <span 
                          className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-slate-900 ${
                            isOnline ? 'bg-emerald-500' : 'bg-slate-550'
                          }`}
                        />
                      </div>
                      <span className="truncate">{partner.username}</span>
                    </div>
                    {isOnline && (
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 ml-1" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* User Info Block */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/20 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative w-8 h-8 flex-shrink-0">
            <img 
              src={currentUser.avatarUrl} 
              alt="My Profile Avatar" 
              className="w-8 h-8 rounded-full bg-slate-800 border border-slate-750 object-cover"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-bold text-slate-200 truncate leading-none mb-1">
              {currentUser.username}
            </div>
            <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider leading-none">
              Active Member
            </div>
          </div>
        </div>
        <button 
          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-450 hover:text-white transition-all flex-shrink-0"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
