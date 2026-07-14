"use client";

import React, { useState, useRef } from 'react';
import { Paperclip, Send, X, FileText, Image } from 'lucide-react';

/**
 * MessageInput Component
 * Renders the input control area, supports typing, simulating file attachments
 * and triggering send actions (calling parent callbacks).
 */
export const MessageInput = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    
    const trimmedText = text.trim();
    if (!trimmedText && !attachedFile) return;

    // Send data to the parent handler
    onSend(trimmedText, attachedFile);
    
    // Reset state
    setText('');
    setAttachedFile(null);
  };

  /**
   * Simulate selecting a file
   */
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = file.type.startsWith('image/');
    const mockFileUrl = isImage 
      ? URL.createObjectURL(file) // Local object URL for instant rendering preview
      : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

    setAttachedFile({
      name: file.name,
      url: mockFileUrl,
      type: 'file',
      isImage: isImage
    });

    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  const removeAttachment = () => {
    setAttachedFile(null);
  };

  const isSendDisabled = disabled || (!text.trim() && !attachedFile);

  return (
    <div className="bg-[#f8fafc] px-6 pb-6 pt-0">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex flex-col gap-2.5">
        
        {/* Attachment Preview Banner */}
        {attachedFile && (
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl animate-fadeIn text-sm shadow-sm">
            <div className="w-8.5 h-8.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
              {attachedFile.isImage ? (
                <Image className="w-4.5 h-4.5" />
              ) : (
                <FileText className="w-4.5 h-4.5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-slate-800 truncate text-xs">
                {attachedFile.name}
              </p>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                พร้อมแนบไฟล์ไปกับข้อความ (Ready to attach)
              </span>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
              aria-label="Remove attachment"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Enterprise Style Input Bar */}
        <div className="flex items-center gap-3 bg-white border border-slate-200/90 shadow-sm rounded-xl px-4 py-3 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-200">
          {/* File Input HTML Tag */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            id="file-attachment-input"
            disabled={disabled}
          />
          
          {/* Paperclip Button */}
          <button
            type="button"
            onClick={triggerFileSelect}
            className={`p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all flex-shrink-0 active:scale-95 ${
              disabled ? 'opacity-40 cursor-not-allowed' : ''
            }`}
            title="แนบไฟล์หรือรูปภาพเอกสาร"
            aria-label="Attach file button"
            disabled={disabled}
          >
            <Paperclip className="w-4.5 h-4.5" />
          </button>

          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              disabled 
                ? "การเชื่อมต่อขัดข้อง ไม่สามารถส่งข้อความได้ (Disconnected)" 
                : "พิมพ์ข้อความสื่อสารที่นี่... (Send message to workspace...)"
            }
            className="flex-1 bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400 text-[13.5px] leading-normal px-1"
            disabled={disabled}
            aria-label="Message text"
          />

          <button
            type="submit"
            disabled={isSendDisabled}
            className={`p-2 rounded-lg transition-all ${
              isSendDisabled 
                ? 'opacity-30 cursor-not-allowed text-slate-300' 
                : 'bg-indigo-650 hover:bg-indigo-700 active:scale-95 text-white shadow-sm'
            }`}
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
