import time
import urllib.request
from urllib.error import URLError, HTTPError
from datetime import datetime
import ssl

# เปลี่ยน URL ตรงนี้เป็นลิงก์ Render ของคุณ
RENDER_URL = "https://n8n-latest-exn1.onrender.com"

# Render จะปิดตัวเองหลังจากไม่มีคนใช้งาน 15 นาที
# เราจึงตั้งค่าให้ Ping ทุกๆ 10 นาที (600 วินาที)
PING_INTERVAL = 600 

def keep_alive():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] เริ่มการกระตุ้น Server (Keep-alive) สำหรับ: {RENDER_URL}")
    print("กด Ctrl+C เพื่อหยุดการทำงาน\n")
    
    while True:
        try:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] กำลังส่ง Request ไปที่ Server...")
            
            # ปิดการตรวจสอบ SSL Certificate (แก้ปัญหาใน Mac)
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE

            # ยิง Request ไปยัง Server
            req = urllib.request.Request(RENDER_URL, headers={'User-Agent': 'Mozilla/5.0'})
            response = urllib.request.urlopen(req, context=ctx)
            
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Server ตื่นอยู่ (Status {response.status})")
            
        except HTTPError as e:
            # 404, 502 ก็ถือว่า Server ได้รับ Request แล้วเช่นกัน
            if e.code == 404:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ✅ Server ตื่นอยู่ (Status 404 - หลงทางหรือไม่มีหน้าเว็บแรก แต่ Server ทำงานอยู่)")
            elif e.code == 502:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ⏳ Server กำลังตื่น (Status 502 - Bad Gateway)")
            else:
                print(f"[{datetime.now().strftime('%H:%M:%S')}] ⚠️ ได้รับ Status: {e.code}")
                
        except URLError as e:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] ❌ เกิดข้อผิดพลาดในการเชื่อมต่อ: {e.reason}")
            
        # รอ 10 นาทีก่อนยิงใหม่
        print(f"รออีก 10 นาที...\n{'-'*30}")
        time.sleep(PING_INTERVAL)

if __name__ == "__main__":
    keep_alive()
