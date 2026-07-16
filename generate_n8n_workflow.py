import json

workflow = {
  "name": "Enterprise AI Agent (Resume Website)",
  "nodes": [
    {
      "parameters": {
        "content": "## 1. Webhook & Pre-processing\nรับข้อมูลจากเว็บ (message, sessionId) แล้วส่งไปหา AI",
        "height": 200,
        "width": 300,
        "color": 6
      },
      "id": "sticky-1",
      "name": "Sticky Note",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [100, 100]
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "ai-chat-enterprise",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "webhook-node",
      "name": "Webhook (Receive Chat)",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1.1,
      "position": [150, 150]
    },
    {
      "parameters": {
        "content": "## 2. Global Error Handling\nดักจับ Error จากทุกๆ Node ใน Workflow นี้ และส่งแจ้งเตือนเข้า Discord/LINE",
        "height": 250,
        "width": 450,
        "color": 7
      },
      "id": "sticky-error",
      "name": "Sticky Note Error",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [100, 600]
    },
    {
      "parameters": {},
      "id": "error-trigger",
      "name": "Error Trigger",
      "type": "n8n-nodes-base.errorTrigger",
      "typeVersion": 1,
      "position": [150, 650]
    },
    {
      "parameters": {
        "url": "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL",
        "method": "POST",
        "sendBody": True,
        "specifyBody": "json",
        "jsonBody": "={\n  \"content\": \"🚨 <b>Error in AI Chat Workflow</b>\\nNode: {{ $json.execution.error.node.name }}\\nMessage: {{ $json.execution.error.message }}\"\n}"
      },
      "id": "error-notify",
      "name": "Notify Error",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [350, 650]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\n  \"reply\": \"ขออภัยค่ะ ระบบ AI ขัดข้อง กรุณาลองใหม่อีกครั้ง\"\n}",
        "options": {
          "responseCode": 500
        }
      },
      "id": "error-respond",
      "name": "Respond with Error",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [550, 650]
    },
    {
      "parameters": {
        "content": "## 3. Core AI Agentic System\nAI สมองกล (ReAct) ที่ใช้ Google Gemini มี Memory จดจำบทสนทนา และสามารถเรียกใช้ Tools ได้",
        "height": 450,
        "width": 700,
        "color": 5
      },
      "id": "sticky-agent",
      "name": "Sticky Note Agent",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [450, 50]
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.body.message }}",
        "options": {
          "systemMessage": "You are Thanathorn's AI Assistant. You answer questions about his resume, packages, and technical skills. Be polite and helpful."
        }
      },
      "id": "ai-agent",
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.6,
      "position": [500, 150]
    },
    {
      "parameters": {
        "modelName": "models/gemini-1.5-flash",
        "options": {
          "temperature": 0.7
        }
      },
      "id": "gemini-model",
      "name": "Google Gemini Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
      "typeVersion": 1,
      "position": [500, 350]
    },
    {
      "parameters": {
        "sessionId": "={{ $json.body.sessionId || 'default_session' }}",
        "contextWindowLength": 10
      },
      "id": "memory-node",
      "name": "Window Buffer Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.2,
      "position": [650, 350]
    },
    {
      "parameters": {
        "name": "get_resume_info",
        "description": "Call this tool to get information about Thanathorn's education, skills, and experience.",
        "jsCode": "return \"Thanathorn Siriphan is a Full-Stack Developer specializing in React, Next.js, Node.js, Spring Boot, and AI Automation.\";"
      },
      "id": "tool-resume",
      "name": "Tool: Get Resume Info",
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1,
      "position": [850, 350]
    },
    {
      "parameters": {
        "name": "get_packages",
        "description": "Call this tool to get pricing and packages for web development services.",
        "jsCode": "return \"Packages: 1. Landing Page (3,900-5,900 THB). 2. E-Commerce (12k-25k THB). 3. AI Automation (4.5k-15k THB). 4. Full-Stack Web App (30k+ THB)\";"
      },
      "id": "tool-packages",
      "name": "Tool: Get Packages",
      "type": "@n8n/n8n-nodes-langchain.toolCode",
      "typeVersion": 1,
      "position": [1000, 350]
    },
    {
      "parameters": {
        "content": "## 4. Response & Logging\nส่งคำตอบกลับให้เว็บเบราว์เซอร์ และเก็บประวัติแชท/แจ้งเตือน",
        "height": 250,
        "width": 600,
        "color": 3
      },
      "id": "sticky-response",
      "name": "Sticky Note Response",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [1200, 100]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\n  \"reply\": \"{{ $json.output }}\"\n}",
        "options": {}
      },
      "id": "webhook-respond",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [1250, 150]
    },
    {
      "parameters": {
        "url": "https://discord.com/api/webhooks/YOUR_WEBHOOK_URL",
        "method": "POST",
        "sendBody": True,
        "specifyBody": "json",
        "jsonBody": "={\n  \"content\": \"💬 **New Chat Log:**\\nUser: {{ $('Webhook (Receive Chat)').item.json.body.message }}\\nAI: {{ $json.output }}\"\n}"
      },
      "id": "chat-log",
      "name": "Log Chat (Discord)",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.1,
      "position": [1450, 150]
    }
  ],
  "connections": {
    "Webhook (Receive Chat)": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Respond to Webhook": {
      "main": [
        [
          {
            "node": "Log Chat (Discord)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Gemini Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Window Buffer Memory": {
      "ai_memory": [
        [
          {
            "node": "AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Get Resume Info": {
      "ai_tool": [
        [
          {
            "node": "AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Tool: Get Packages": {
      "ai_tool": [
        [
          {
            "node": "AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Error Trigger": {
      "main": [
        [
          {
            "node": "Notify Error",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Notify Error": {
      "main": [
        [
          {
            "node": "Respond with Error",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "settings": {
    "saveManualExecutions": True
  }
}

with open('/tmp/enterprise-workflow.json', 'w') as f:
    json.dump(workflow, f)
