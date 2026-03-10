import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import DashboardNavbar from "../components/DashboardNavbar";

function Chatbot() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [chats, setChats] = useState([]);
  const [chatId, setChatId] = useState(null);

  const token = localStorage.getItem("token");

  const chatEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load chat history
  useEffect(() => {

    const fetchChats = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/ai/history",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setChats(res.data);

      } catch (err) {
        console.log(err);
      }

    };

    fetchChats();

  }, []);

  // Load selected chat
  const loadChat = (chat) => {

    const formatted = chat.messages.map(msg => ({
      sender: msg.role === "user" ? "user" : "ai",
      text: msg.text
    }));

    setMessages(formatted);
    setChatId(chat._id);

  };

  // Send message
  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {

      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        {
          message: input,
          chatId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const aiMessage = {
        sender: "ai",
        text: res.data.reply
      };

      setMessages(prev => [...prev, aiMessage]);

      if (!chatId) {
        setChatId(res.data.chatId);
      }

    }catch (err) {

  console.log(err);

  if (err.response?.status === 429) {

    setError("AI limit reached. Please wait a minute before asking again.");

  } else {

    setError("AI service unavailable. Please try again later.");

  }

}

    setLoading(false);

  };

  return (

    <div className="h-screen bg-slate-950 text-white flex flex-col">

      <DashboardNavbar />

      <div className="flex flex-1 overflow-hidden flex-col md:flex-row">

        {/* Sidebar */}

        <div className="md:w-64 w-full md:block bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto">

            <h2 className="text-lg font-semibold mb-4">
                Chat History
            </h2>

            {chats.length === 0 && (
                <p className="text-gray-400 text-sm">
                No chats yet
                </p>
            )}

            {chats.map(chat => (

                <div
                key={chat._id}
                onClick={() => loadChat(chat)}
                className="p-3 mb-2 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700"
                >

                <p className="text-sm">
                    {new Date(chat.createdAt).toLocaleDateString()}
                </p>

                <p className="text-xs text-gray-400">
                    {new Date(chat.createdAt).toLocaleTimeString()}
                </p>

                </div>

            ))}

            </div>
        {/* Chat Window */}

        <div className="flex-1 flex flex-col">

          {/* Messages */}

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">

            {messages.length === 0 && (
              <p className="text-gray-400">
                Ask any DSA question.
              </p>
            )}

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-xl ${
                    msg.sender === "user"
                      ? "bg-blue-500"
                      : "bg-slate-800"
                  }`}
                >

                  {msg.sender === "ai"
                    ? <ReactMarkdown>{msg.text}</ReactMarkdown>
                    : msg.text}

                </div>

              </div>

            ))}

            {/* Loading */}

            {loading && (
              <div className="text-gray-400 animate-pulse">
                AI is thinking...
              </div>
            )}

            <div ref={chatEndRef} />

          </div>

          {/* Error */}

          {error && (

            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 mx-6 mb-3 rounded-lg">
              {error}
            </div>

          )}

          {/* Input */}

          <div className="p-4 border-t border-slate-800 flex gap-3 flex-col sm:flex-row">

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask your DSA question..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2"
            />

            <button
            onClick={sendMessage}
            className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
            >
            Send
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Chatbot;