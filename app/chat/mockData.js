/**
 * @typedef {Object} Participant
 * @property {string} userId
 * @property {string} username
 * @property {string} avatarUrl
 * @property {'online' | 'offline'} status
 */

/**
 * @typedef {Object} Room
 * @property {string} id
 * @property {string} name
 * @property {'group' | 'direct'} type
 * @property {string} createdAt - ISO DateTime string
 * @property {Participant[]} participants
 */

/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} roomId
 * @property {string} senderId
 * @property {string} content
 * @property {'text' | 'file'} messageType
 * @property {string | null} fileUrl
 * @property {string} createdAt - ISO DateTime string
 * @property {string[]} readBy - Array of userIds who read the message
 */

// Current logged-in user session simulation
export const CURRENT_USER = {
  id: "user-123",
  userId: "user-123",
  username: "DevPro",
  avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=DevPro",
  status: "online"
};

/** @type {Room[]} */
export const mockRooms = [
  {
    id: "room-general",
    name: "💬 General Chat",
    type: "group",
    createdAt: "2026-07-14T08:00:00Z",
    participants: [
      CURRENT_USER,
      {
        userId: "user-456",
        username: "Khun",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Khun",
        status: "online"
      },
      {
        userId: "user-789",
        username: "Sara",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sara",
        status: "offline"
      },
      {
        userId: "user-999",
        username: "P'Som",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Som",
        status: "online"
      }
    ]
  },
  {
    id: "room-gaming",
    name: "🎮 Gaming Squad",
    type: "group",
    createdAt: "2026-07-14T08:05:00Z",
    participants: [
      CURRENT_USER,
      {
        userId: "user-456",
        username: "Khun",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Khun",
        status: "online"
      },
      {
        userId: "user-789",
        username: "Sara",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sara",
        status: "offline"
      }
    ]
  },
  {
    id: "room-dm-khun",
    name: "Khun",
    type: "direct",
    createdAt: "2026-07-14T08:10:00Z",
    participants: [
      CURRENT_USER,
      {
        userId: "user-456",
        username: "Khun",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Khun",
        status: "online"
      }
    ]
  },
  {
    id: "room-dm-som",
    name: "P'Som",
    type: "direct",
    createdAt: "2026-07-14T08:15:00Z",
    participants: [
      CURRENT_USER,
      {
        userId: "user-999",
        username: "P'Som",
        avatarUrl: "https://api.dicebear.com/7.x/adventurer/svg?seed=Som",
        status: "online"
      }
    ]
  }
];

/** @type {Message[]} */
export const mockMessages = [
  // General Chat Messages
  {
    id: "msg-gen-1",
    roomId: "room-general",
    senderId: "user-999",
    content: "สวัสดีทุกคน! บ่ายนี้มีประชุมสรุปสเปกงานชิ้นใหม่นะ พร้อมกันไหม?",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T13:30:00Z",
    readBy: ["user-123", "user-456"]
  },
  {
    id: "msg-gen-2",
    roomId: "room-general",
    senderId: "user-123",
    content: "พร้อมครับพี่ส้ม เดี๋ยวผมเตรียมแชร์สไลด์ให้ดูครับ",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T13:32:00Z",
    readBy: ["user-999", "user-456"]
  },
  
  // Gaming Squad Messages
  {
    id: "msg-game-1",
    roomId: "room-gaming",
    senderId: "user-456",
    content: "คืนนี้มีใครว่างบ้าง ลุยด่านใหม่ใน Valorant กันหน่อย!",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:00:00Z",
    readBy: ["user-123"]
  },
  {
    id: "msg-game-2",
    roomId: "room-gaming",
    senderId: "user-123",
    content: "จัดไปครับคุณ ผมสแตนด์บายรอตอนหนึ่งทุ่มนะ",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:05:00Z",
    readBy: ["user-456"]
  },

  // DM Khun Messages
  {
    id: "msg-dm-khun-1",
    roomId: "room-dm-khun",
    senderId: "user-456",
    content: "Hey DevPro, ready for the Valorant match tonight? 🎮",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:20:00Z",
    readBy: ["user-123"]
  },
  {
    id: "msg-dm-khun-2",
    roomId: "room-dm-khun",
    senderId: "user-123",
    content: "สวัสดีครับคุณ! พร้อมเลยครับ วันนี้กี่โมงดีนะ?",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:22:00Z",
    readBy: ["user-456"]
  },
  {
    id: "msg-dm-khun-3",
    roomId: "room-dm-khun",
    senderId: "user-456",
    content: "สักทุ่มนึงเป็นไง? เดี๋ยวลากคนอื่นในทีมมาตี้ด้วยกัน",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:25:00Z",
    readBy: ["user-123"]
  },
  {
    id: "msg-dm-khun-4",
    roomId: "room-dm-khun",
    senderId: "user-123",
    content: "ได้เลยครับ เดี๋ยวเจอกันใน Discord นะ",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:28:00Z",
    readBy: ["user-456"]
  },
  {
    id: "msg-dm-khun-5",
    roomId: "room-dm-khun",
    senderId: "user-456",
    content: "โอเคครับ! เดี๋ยวผมส่งไฟล์ตารางแข่งคืนนี้ให้ดูด้วย แผนที่ด่านใหม่น่าสนใจมาก",
    messageType: "text",
    fileUrl: null,
    createdAt: "2026-07-14T14:30:00Z",
    readBy: ["user-123"]
  },
  {
    id: "msg-dm-khun-6",
    roomId: "room-dm-khun",
    senderId: "user-456",
    content: "Valorant Map Strategies.pdf",
    messageType: "file",
    fileUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
    createdAt: "2026-07-14T14:31:00Z",
    readBy: ["user-123"]
  }
];
