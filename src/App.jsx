// import React, { useState, useEffect, useRef } from 'react';

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [sessionId, setSessionId] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     const newSessionId = crypto.randomUUID();
//     console.log("Component Mounted. New Session ID created:", newSessionId);
//     setSessionId(newSessionId);
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputValue.trim() || isLoading) return;

//     const userMessage = { sender: 'user', text: inputValue };
//     setMessages(prevMessages => [...prevMessages, userMessage]);
//     setInputValue('');
//     setIsLoading(true);

//     console.log(`--- Sending message with Session ID: ${sessionId} ---`);

//     const payload = {
//       input_value: inputValue,
//       output_type: "chat",
//       input_type: "chat",
//       session_id: sessionId,
//     };

//     console.log("Request Payload:", JSON.stringify(payload, null, 2));

//     // --- CHANGE IS HERE ---
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'X-DataStax-Current-Org': import.meta.env.VITE_DATASTAX_ORG_ID, // This line is now added
//         'Authorization': `Bearer ${import.meta.env.VITE_LANGFLOW_TOKEN}`,
//       },
//       body: JSON.stringify(payload)
//     };
//     // --- END OF CHANGE ---

//     try {
//       console.log("Fetching from Langflow API...");
//       const response = await fetch('https://aws-us-east-2.langflow.datastax.com/lf/52ba3401-df32-4d2d-a5e3-7c0a54419c14/api/v1/run/9df30427-5fc0-473a-9928-1f2abb49d7cc', options);
      
//       console.log("Response Status:", response.status, response.statusText);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error("API Error Response Body:", errorText);
//         throw new Error(`Network response was not ok. Status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       console.log("Full API Response Data:", data);
      
//       const botResponseText = data?.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message;

//       if (botResponseText) {
//         console.log("Successfully extracted bot message:", botResponseText);
//         const botMessage = { sender: 'bot', text: botResponseText };
//         setMessages(prevMessages => [...prevMessages, botMessage]);
//       } else {
//         console.warn("Could not find bot message in the expected path of the response object.");
//         const errorMessage = { sender: 'bot', text: "Sorry, I received a response, but couldn't understand it." };
//         setMessages(prevMessages => [...prevMessages, errorMessage]);
//       }

//     } catch (err) {
//       console.error("An error occurred during the fetch operation:", err);
//       const errorMessage = { sender: 'bot', text: 'Sorry, I encountered an error. Please try again.' };
//       setMessages(prevMessages => [...prevMessages, errorMessage]);
//     } finally {
//       setIsLoading(false);
//       console.log("--- API Call Finished ---");
//     }
//   };

//   return (
//     // ... JSX remains the same ...
//     <div className="bg-gray-900 text-white flex flex-col h-screen font-sans">
//       <header className="bg-gray-800 shadow-md p-4">
//         <h1 className="text-2xl font-bold text-center">Macento Agent</h1>
//       </header>
      
//       <main className="flex-1 overflow-y-auto p-4 md:p-6">
//         <div className="max-w-3xl mx-auto space-y-6">
//           {messages.map((message, index) => (
//             <div key={index} className={`flex items-start gap-4 ${message.sender === 'user' ? 'justify-end' : ''}`}>
//               {message.sender === 'bot' && (
//                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">A</div>
//               )}
//               <div className={`p-4 rounded-2xl max-w-lg ${message.sender === 'user' ? 'bg-blue-600 rounded-br-none' : 'bg-gray-700 rounded-bl-none'}`}>
//                 <p className="text-base">{message.text}</p>
//               </div>
//                {message.sender === 'user' && (
//                 <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold flex-shrink-0">Y</div>
//               )}
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex items-start gap-4">
//               <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold flex-shrink-0">A</div>
//               <div className="p-4 rounded-2xl max-w-lg bg-gray-700 rounded-bl-none">
//                 <p className="text-base animate-pulse">...</p>
//               </div>
//             </div>
//           )}
//           <div ref={chatEndRef} />
//         </div>
//       </main>

//       <footer className="bg-gray-800 p-4 border-t border-gray-700">
//         <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex items-center gap-4">
//           <input
//             type="text"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 bg-gray-700 border border-gray-600 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full px-6 py-3 transition-colors disabled:opacity-50"
//             disabled={!inputValue.trim() || isLoading}
//           >
//             {isLoading ? '...' : 'Send'}
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";

/**
 * Macento Agent — Fullscreen ChatGPT‑style matte UI
 * -------------------------------------------------------------
 * ✓ Fullscreen centered layout (no left margin issue)
 * ✓ Logo centered at the top
 * ✓ Matte dark gradient background across entire viewport
 * ✓ ChatGPT-like conversation container
 * ✓ Fully responsive for all screens
 */

function classNames(...arr) {
  return arr.filter(Boolean).join(" ");
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const textRef = useRef(null);

  const logoSrc = "/Men.png";

  useEffect(() => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = "0px";
      const next = Math.min(textRef.current.scrollHeight, 160);
      textRef.current.style.height = next + "px";
    }
  }, [inputValue]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = { sender: "user", text: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const payload = {
      input_value: userMessage.text,
      output_type: "chat",
      input_type: "chat",
      session_id: sessionId,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-DataStax-Current-Org": import.meta.env.VITE_DATASTAX_ORG_ID,
        Authorization: `Bearer ${import.meta.env.VITE_LANGFLOW_TOKEN}`,
      },
      body: JSON.stringify(payload),
    };

    try {
      const response = await fetch(
        "https://aws-us-east-2.langflow.datastax.com/lf/52ba3401-df32-4d2d-a5e3-7c0a54419c14/api/v1/run/9df30427-5fc0-473a-9928-1f2abb49d7cc",
        options
      );

      const data = await response.json();
      const botResponseText =
        data?.outputs?.[0]?.outputs?.[0]?.messages?.[0]?.message ||
        data?.outputs?.[0]?.outputs?.[0]?.results?.[0]?.text ||
        data?.message ||
        "Sorry, I received a response, but couldn't understand it.";

      const botMessage = { sender: "bot", text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-neutral-950/70 backdrop-blur py-5 flex flex-col items-center">
        <img src={logoSrc} alt="Macento Logo" className="h-12 w-auto mb-2" />
        <h1 className="text-2xl font-semibold tracking-wider uppercase">MACENTO AGENT</h1>
        <p className="text-xs text-neutral-400 mt-1">Conversational Intelligence</p>
      </header>

      {/* Chat section */}
      <main className="flex-1 overflow-y-auto flex justify-center px-4 md:px-10">
        <div className="w-full max-w-5xl py-8 space-y-6">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-neutral-400">
              <p className="text-lg">How can I help you today?</p>
              <p className="text-sm mt-2 opacity-70">Tip: Press Enter to send • Shift + Enter for a new line</p>
            </div>
          )}

          {messages.map((m, i) => (
            <MessageBubble key={i} sender={m.sender} text={m.text} />
          ))}

          {isLoading && <MessageBubble sender="bot" text="typing…" loading />}

          <div ref={chatEndRef} />
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-neutral-950/80 backdrop-blur border-t border-white/10 px-4 md:px-10 py-4">
        <form
          onSubmit={handleSendMessage}
          className="max-w-5xl mx-auto flex items-end gap-3 rounded-2xl bg-neutral-900/80 ring-1 ring-white/10 p-3"
        >
          <textarea
            ref={textRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Macento..."
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none placeholder:text-neutral-500 text-[15px] leading-6 px-2 py-2"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className={classNames(
              "px-5 py-2 rounded-xl text-sm font-medium transition-all",
              inputValue.trim() && !isLoading
                ? "bg-white/10 hover:bg-white/20"
                : "bg-white/5 text-neutral-500 cursor-not-allowed"
            )}
          >
            {isLoading ? "..." : "Send"}
          </button>
        </form>
        <p className="text-[11px] text-neutral-500 text-center mt-2">Macento • Experimental • Do not share sensitive info</p>
      </footer>
    </div>
  );
}

function MessageBubble({ sender, text, loading = false }) {
  const isUser = sender === "user";
  return (
    <div className={classNames("flex w-full gap-3", isUser ? "justify-end" : "justify-start")}>      
      <div
        className={classNames(
          "max-w-[80%] rounded-2xl px-4 py-3 text-[15px] leading-6 whitespace-pre-wrap",
          isUser ? "bg-white/10 text-neutral-100" : "bg-neutral-800 text-neutral-200"
        )}
      >
        {loading ? <TypingDots /> : text}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 align-middle">
      <span className="size-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.2s]" />
      <span className="size-1.5 rounded-full bg-white/60 animate-bounce [animation-delay:-0.1s]" />
      <span className="size-1.5 rounded-full bg-white/60 animate-bounce" />
    </span>
  );
}

