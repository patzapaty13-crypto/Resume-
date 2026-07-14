"use client";

import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, Info, FileText, Download, Hash, Users, HelpCircle, Bell, Pin, Search } from 'lucide-react';
import { useSocket } from '../contexts/SocketProvider';

/**
 * @typedef {import('../mockData').Room} Room
 * @typedef {import('../mockData').Message} Message
 */

export const ChatWindow = ({ room, messages, currentUser, onBack, inputComponent }) => {
  const { connectionStatus } = useSocket();
  const messagesEndRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, room]);

  // Format message timestamp in formal business way
  const formatTime = (isoString) => {
    if (!isMounted) return "--/--/---- --:--";
    const date = new Date(isoString);
    const now = new Date();
    
    const isToday = date.toDateString() === now.toDateString();
    const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    if (isToday) {
      return `วันนี้, ${timeStr}`;
    }
    return `${date.toLocaleDateString()} ${timeStr}`;
  };

  // If no room is selected, display Enterprise empty status
  if (!room) {
    return (
      <div className="flex-1 h-full flex flex-col items-center justify-center bg-[#f8fafc] text-center p-8 select-none relative overflow-hidden">
        {/* Soft background highlights */}
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center max-w-sm text-slate-500">
          <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-indigo-650 mb-5 shadow-sm border border-slate-200/65">
            <Hash className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-slate-800 tracking-tight">
            ยินดีต้อนรับสู่ระบบแชทองค์กร
          </h2>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            เลือกช่องทางพูดคุยหรือผู้ร่วมงานจากเมนูด้านซ้ายเพื่อเริ่มต้นสื่อสารและแลกเปลี่ยนความคืบหน้าของโครงการอย่างเป็นทางการ
          </p>
        </div>
      </div>
    );
  }

  const getDMPartner = (room) => {
    return room.participants.find(p => p.userId !== currentUser.id) || null;
  };

  const partner = room.type === 'direct' ? getDMPartner(room) : null;

  // Helper to remove leading emojis or special symbols from room names
  const cleanRoomName = (name) => {
    return name.replace(/^[^a-zA-Z0-9\u0e00-\u0e7f\s]+/, '').trim();
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#f8fafc] relative overflow-hidden min-h-0 select-text">
      {/* Enterprise Header Bar */}
      <header className="h-14 border-b border-slate-200 bg-white shadow-sm px-6 flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button 
            onClick={onBack}
            className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-850 transition-all flex-shrink-0"
            aria-label="Back to rooms list"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 min-w-0 font-bold text-slate-800 text-[14.5px]">
            {room.type === 'group' ? (
              <Hash className="w-4 h-4 text-slate-500 flex-shrink-0" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mr-1" />
            )}
            <span className="truncate">{cleanRoomName(room.name)}</span>
          </div>

          <div className="hidden sm:block w-[1px] h-3.5 bg-slate-200 mx-2.5" />

          <p className="hidden sm:block text-xs text-slate-500 font-medium truncate">
            {room.type === 'group' 
              ? `ห้องทำงานหลัก (${room.participants.length} สมาชิก)` 
              : `การสนทนาส่วนตัว (ติดต่อประสานงาน)`
            }
          </p>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-3 text-slate-500">
          <button className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-all flex-shrink-0" title="การแจ้งเตือน"><Bell className="w-4.5 h-4.5" /></button>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-all flex-shrink-0" title="ปักหมุดข้อความ"><Pin className="w-4.5 h-4.5" /></button>
          <button className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-all flex-shrink-0" title="ผู้ใช้ในห้อง"><Users className="w-4.5 h-4.5" /></button>
          
          {/* Beautiful Search Box (Proper padding, icon never overlaps text) */}
          <div className="relative hidden sm:flex items-center flex-shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
            <input 
              type="text" 
              placeholder="ค้นหาข้อความ..." 
              className="bg-slate-50 text-xs text-slate-800 pl-9 pr-3 py-1.5 rounded-lg w-40 focus:w-52 transition-all focus:outline-none border border-slate-200 placeholder-slate-400 focus:bg-white focus:border-indigo-500"
            />
          </div>
          
          <button className="p-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-all flex-shrink-0" title="ข้อมูลเพิ่มเติม"><Info className="w-4.5 h-4.5" /></button>
        </div>
      </header>

      {/* Messages Stream (Clean Business Message Cards) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin relative z-10">
        
        {/* Welcome Channel Banner */}
        <div className="mb-8 p-5 bg-white border border-slate-200/60 rounded-2xl shadow-sm text-slate-650">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3.5">
            {room.type === 'group' ? (
              <Hash className="w-6 h-6" />
            ) : (
              <img 
                src={partner?.avatarUrl} 
                alt={partner?.username}
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
          </div>
          <h1 className="text-lg font-bold text-slate-800 mb-1">
            {room.type === 'group' ? `เริ่มต้นการสนทนาในช่อง #${cleanRoomName(room.name)}` : `ช่องแชทส่วนตัวกับ ${partner?.username}`}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            {room.type === 'group' 
              ? `ห้องนี้สร้างขึ้นเพื่อพูดคุย แลกเปลี่ยนข้อมูล และติดตามความคืบหน้าอย่างเป็นทางการภายในโครงการ`
              : `นี่คือจุดเริ่มต้นของการส่งข้อความและแชร์เอกสารประกอบการทำงานร่วมกับ ${partner?.username}`
            }
          </p>
        </div>

        {messages.map((message) => {
          const isSender = message.senderId === currentUser.id;
          const senderInfo = room.participants.find(p => p.userId === message.senderId);
          const senderName = senderInfo ? senderInfo.username : 'Unknown User';

          if (isSender) {
            // Sender Message Card (Right Aligned Bubble, text left-aligned inside)
            return (
              <div key={message.id} className="flex flex-col items-end w-full gap-1">
                <div className="max-w-[70%] bg-indigo-600 text-white rounded-2xl rounded-tr-none px-4 py-2.5 shadow-sm text-[13.5px] leading-relaxed text-left break-words shadow-indigo-600/5">
                  {message.messageType === 'file' ? (
                    <div className="flex flex-col gap-2 min-w-[240px]">
                      {/* Image Preview */}
                      {message.fileUrl && (message.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)/i) || message.fileUrl.includes('images.unsplash.com')) ? (
                        <div className="rounded-lg overflow-hidden border border-white/10 max-w-sm bg-white/5">
                          <img 
                            src={message.fileUrl} 
                            alt="Attachment preview" 
                            className="w-full h-auto object-cover max-h-52"
                          />
                        </div>
                      ) : null}

                      {/* File Details Box */}
                      <div className="flex items-center gap-2.5 p-2 bg-white/10 border border-white/10 rounded-xl text-white">
                        <FileText className="w-4 h-4 flex-shrink-0" />
                        <div className="min-w-0 text-xs flex-1">
                          <p className="font-bold truncate max-w-[150px]">
                            {message.content}
                          </p>
                          <span className="text-white/70">เอกสารแนบ</span>
                        </div>
                        <a 
                          href={message.fileUrl || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg hover:bg-white/15 text-white transition-all flex-shrink-0"
                          aria-label="Download attachment"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 font-medium px-1 mt-0.5">
                  {formatTime(message.createdAt)}
                </span>
              </div>
            );
          } else {
            // Receiver Message Card (Left Aligned Bubble, text left-aligned inside)
            return (
              <div key={message.id} className="flex items-start gap-3 w-full">
                <img 
                  src={senderInfo?.avatarUrl || 'https://api.dicebear.com/7.x/adventurer/svg?seed=placeholder'} 
                  alt={`${senderName}'s avatar`} 
                  className="w-9 h-9 rounded-full flex-shrink-0 bg-slate-200 border border-slate-100 shadow-sm mt-0.5 object-cover"
                />
                <div className="flex flex-col items-start max-w-[70%] gap-1">
                  <span className="text-xs font-semibold text-slate-600 ml-1">
                    {senderName}
                  </span>
                  <div className="bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm text-[13.5px] leading-relaxed text-left break-words w-full">
                    {message.messageType === 'file' ? (
                      <div className="flex flex-col gap-2 min-w-[240px]">
                        {/* Image Preview */}
                        {message.fileUrl && (message.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)/i) || message.fileUrl.includes('images.unsplash.com')) ? (
                          <div className="rounded-lg overflow-hidden border border-slate-100 max-w-sm bg-slate-50 shadow-inner">
                            <img 
                              src={message.fileUrl} 
                              alt="Attachment preview" 
                              className="w-full h-auto object-cover max-h-52"
                            />
                          </div>
                        ) : null}

                        {/* File Details Box */}
                        <div className="flex items-center gap-2.5 p-2 bg-slate-50 border border-slate-150 rounded-xl text-slate-700">
                          <FileText className="w-4 h-4 flex-shrink-0 text-slate-400" />
                          <div className="min-w-0 text-xs flex-1">
                            <p className="font-bold truncate text-slate-800 max-w-[150px]">
                              {message.content}
                            </p>
                            <span className="text-slate-400">เอกสารแนบ</span>
                          </div>
                          <a 
                            href={message.fileUrl || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-550 hover:text-slate-800 transition-all flex-shrink-0"
                            aria-label="Download attachment"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium px-1 mt-0.5">
                    {formatTime(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Footer Input Area */}
      <div className="flex-shrink-0 relative z-10">
        {inputComponent}
      </div>
    </div>
  );
};

export default ChatWindow;
