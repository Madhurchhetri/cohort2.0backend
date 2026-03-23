// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useSelector } from "react-redux";
// import { useChat } from "../hooks/useChat";

// const Dashboard = () => {
//   const chat = useChat();
//   const [chatInput, setChatInput] = useState("");
//   const chats = useSelector((state) => state.chat.chats);
//   const currentChatId = useSelector((state) => state.chat.currentChatId);

//   useEffect(() => {
//     chat.initializeSocketConnection();
//     chat.handleGetChats();
//   }, []);

//   const handleSubmitMessage = (event) => {
//     event.preventDefault();

//     const trimmedMessage = chatInput.trim();
//     if (!trimmedMessage) {
//       return;
//     }

//     chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
//     setChatInput("");
//   };

//   const openChat = (chatId) => {
//     chat.handleOpenChat(chatId);
//   };

//   return (
//     <main className="min-h-screen w-full bg-[#07090f] p-3 text-white md:p-5">
//       <section className="mx-auto flex h-[calc(100vh-1.5rem)] w-full gap-4 rounded-3xl border   p-1 md:h-[calc(100vh-2.5rem)] md:gap-6 md:p-1 border-none">
//         <aside className="hidden h-full w-72 shrink-0 rounded-3xl border  bg-[#080b12] p-4 md:flex md:flex-col">
//           <h1 className="mb-5 text-3xl font-semibold tracking-tight">
//             Perplexity
//           </h1>

//           <div className="space-y-2">
//             <button
//               onClick={chat.handleNewChat}
//               className="mb-3 rounded-xl border px-3 py-2 cursor-pointer"
//             >
//               + New Chat
//             </button>
//             {Object.values(chats).map((chat, index) => (
//               <button
//                 onClick={() => {
//                   openChat(chat.id);
//                 }}
//                 key={index}
//                 type="button"
//                 className="w-full cursor-pointer rounded-xl border border-white/60 bg-transparent px-3 py-2 text-left text-base font-medium text-white/90 transition hover:border-white hover:text-white"
//               >
//                 {chat.title}
//               </button>
//             ))}
//           </div>
//         </aside>

//         <section className="relative max-w-3/5 mx-auto flex h-full min-w-0 flex-1 flex-col gap-4">
//           <div className="messages flex-1 space-y-3 overflow-y-auto pr-1 pb-30">
//             {chats[currentChatId]?.messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`max-w-[82%] w-fit rounded-2xl px-4 py-3 text-sm md:text-base ${
//                   message.role === "user"
//                     ? "ml-auto rounded-br-none bg-white/12 text-white"
//                     : "mr-auto border border-white/25 bg-[#0f1626] text-white/90"
//                 }`}
//               >
//                 {message.role === "user" ? (
//                   <p>{message.content}</p>
//                 ) : (
//                   <ReactMarkdown
//                     components={{
//                       p: ({ children }) => (
//                         <p className="mb-2 last:mb-0">{children}</p>
//                       ),
//                       ul: ({ children }) => (
//                         <ul className="mb-2 list-disc pl-5">{children}</ul>
//                       ),
//                       ol: ({ children }) => (
//                         <ol className="mb-2 list-decimal pl-5">{children}</ol>
//                       ),
//                       code: ({ children }) => (
//                         <code className="rounded bg-white/10 px-1 py-0.5">
//                           {children}
//                         </code>
//                       ),
//                       pre: ({ children }) => (
//                         <pre className="mb-2 overflow-x-auto rounded-xl bg-black/30 p-3">
//                           {children}
//                         </pre>
//                       ),
//                     }}
//                   >
//                     {message.content}
//                   </ReactMarkdown>
//                 )}
//               </div>
//             ))}
//           </div>

//           <footer className="rounded-3xl w-full absolute bottom-2 border border-white/60 bg-[#080b12] p-4 md:p-5">
//             <form
//               onSubmit={handleSubmitMessage}
//               className="flex flex-col gap-3 md:flex-row"
//             >
//               <input
//                 type="text"
//                 value={chatInput}
//                 onChange={(event) => setChatInput(event.target.value)}
//                 placeholder="Type your message..."
//                 className="w-full rounded-2xl border border-white/50 bg-transparent px-4 py-3 text-lg text-white outline-none transition placeholder:text-white/45 focus:border-white/90"
//               />
//               <button
//                 type="submit"
//                 disabled={!chatInput.trim()}
//                 className="rounded-2xl border border-white/60 px-6 py-3 text-lg font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 Send
//               </button>
//             </form>
//           </footer>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useSelector } from "react-redux";
// import { useChat } from "../hooks/useChat";
// import { Send, Plus, Menu, X ,  Trash2 } from "lucide-react";
// import remarkGfm from 'remark-gfm'

// const Dashboard = () => {
//   const chat = useChat();
//   const [chatInput, setChatInput] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const chats = useSelector((state) => state.chat.chats);
//   const currentChatId = useSelector((state) => state.chat.currentChatId);

//   useEffect(() => {
//     chat.initializeSocketConnection();
//     chat.handleGetChats();
//   }, []);

//   const handleSubmitMessage = (event) => {
//     event.preventDefault();

//     const trimmedMessage = chatInput.trim();
//     if (!trimmedMessage) return;

//     chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
//     setChatInput("");
//   };

//   const openChat = (chatId) => {
//     chat.handleOpenChat(chatId);
//     setSidebarOpen(false);
//   };

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#0a0f1f] via-[#0d1328] to-[#05070d] p-4 text-white">
//       <section className="mx-auto flex h-[calc(100vh-2rem)] w-full max-w-7xl gap-5 rounded-3xl">

//        {/* Mobile Hamburger */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="absolute top-4 left-4 z-50 rounded-lg bg-white/10 p-2 backdrop-blur md:hidden"
//         >
//           <Menu size={20} />
//         </button>

//         {/* Sidebar */}
        
//         <aside
//           className={`fixed top-0 left-0 z-40 h-full w-72 transform bg-[#0b1020] p-5 transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col rounded-r-3xl border-r border-white/10 ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >

//          {/* Close Button (Mobile) */}
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="absolute top-4 right-4 md:hidden"
//           >
//             <X size={20} />
//           </button>

//           <h1 className="mb-6 text-2xl font-bold tracking-wide text-white/90">
//             ⚡ AI Chat
//           </h1>

//           <button
//             onClick={chat.handleNewChat}
//             className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 font-medium hover:opacity-90 transition"
//           >
//             <Plus size={18} /> New Chat
//           </button>

//           <div className="mt-6 space-y-2 overflow-y-auto">
//             {Object.values(chats).map((chat, index) => (
//               <button
//                 key={index}
//                 onClick={() => openChat(chat.id)}
//                 className={`w-full rounded-xl px-4 py-2 text-left transition ${
//                   currentChatId === chat.id
//                     ? "bg-white/20"
//                     : "hover:bg-white/10"
//                 }`}
//               >
//                 {chat.title}
//               </button>
//             ))}
//           </div>
//         </aside>

//         {/* Chat Section */}
//         <section className="relative flex flex-1 flex-col rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">
//           {/* Messages */}
//           <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-32 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//             {chats[currentChatId]?.messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm md:text-base shadow-lg ${
//                   message.role === "user"
//                     ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
//                     : "mr-auto bg-white/10 text-white/90"
//                 }`}
//               >
//                 {message.role === "user" ? (
//                   <p>{message.content}</p>
//                 ) : (
//                   <ReactMarkdown
//                     components={{
//                       p: ({ children }) => (
//                         <p className="mb-2 last:mb-0">{children}</p>
//                       ),
//                       ul: ({ children }) => (
//                         <ul className="mb-2 list-disc pl-5">{children}</ul>
//                       ),
//                       ol: ({ children }) => (
//                         <ol className="mb-2 list-decimal pl-5">{children}</ol>
//                       ),
//                       code: ({ children }) => (
//                         <code className="rounded bg-black/40 px-1 py-0.5 text-green-300">
//                           {children}
//                         </code>
//                       ),
//                       pre: ({ children }) => (
//                         <pre className="mb-2 overflow-x-auto rounded-xl bg-black/50 p-3 text-green-200">
//                           {children}
//                         </pre>
//                       ),
//                     }}
//                     remarkPlugins={[remarkGfm]}
//                   >
//                     {message.content}
//                   </ReactMarkdown>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <footer className="absolute bottom-4 left-0 w-full px-4">
//             <form
//               onSubmit={handleSubmitMessage}
//               className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3"
//             >
//               <input
//                 type="text"
//                 value={chatInput}
//                 onChange={(event) => setChatInput(event.target.value)}
//                 placeholder="Ask anything..."
//                 className="flex-1 bg-transparent px-3 py-2 text-white outline-none placeholder:text-white/40"
//               />
//               <button
//                 type="submit"
//                 disabled={!chatInput.trim()}
//                 className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 font-medium disabled:opacity-40"
//               >
//                 <Send size={16} /> Send
//               </button>
//             </form>
//           </footer>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;


// import React, { useEffect, useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { useSelector } from "react-redux";
// import { useChat } from "../hooks/useChat";
// import { Send, Plus, Menu, X, Trash2 } from "lucide-react";
// import remarkGfm from 'remark-gfm'

// const Dashboard = () => {
//   const chat = useChat();
//   const [chatInput, setChatInput] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//   const [toast, setToast] = useState(null);
//   const [search, setSearch] = useState("");
//   const [pinned, setPinned] = useState({});

//   const chats = useSelector((state) => state.chat.chats);
//   const currentChatId = useSelector((state) => state.chat.currentChatId);

//   useEffect(() => {
//     chat.initializeSocketConnection();
//     chat.handleGetChats();
//   }, []);

//   const handleSubmitMessage = (event) => {
//     event.preventDefault();

//     const trimmedMessage = chatInput.trim();
//     if (!trimmedMessage) return;

//     chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId });
//     setChatInput("");
//   };

//   const openChat = (chatId) => {
//     chat.handleOpenChat(chatId);
//     setSidebarOpen(false);
//   };

//    // 🔥 Soft Delete
//   const confirmDelete = async () => {
//     const deletedChat = chats[confirmDeleteId];
//     await chat.handleDeleteChat(confirmDeleteId);
//     setToast(deletedChat);
//     setConfirmDeleteId(null);
//     setTimeout(() => setToast(null), 5000);
//   };

//   // 🔥 Undo (UI level)
//   const undoDelete = () => {
//     if (!toast) return;
//     chat.handleNewChat();
//     setToast(null);
//   };

//   // ⭐ Pin
//   const togglePin = (id) => {
//     setPinned((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//    // 🔍 Search filter
//   const filteredChats = Object.values(chats)
//     .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
//     .sort((a, b) => (pinned[b.id] ? 1 : 0) - (pinned[a.id] ? 1 : 0));

//   return (
//     <main className="min-h-screen w-full bg-gradient-to-br from-[#0a0f1f] via-[#0d1328] to-[#05070d] p-4 text-white">
//       <section className="mx-auto flex h-[calc(100vh-2rem)] w-full max-w-7xl gap-5 rounded-3xl relative">

//         {/* Mobile Hamburger */}
//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="absolute top-4 left-4 z-50 rounded-lg bg-white/10 p-2 backdrop-blur md:hidden"
//         >
//           <Menu size={20} />
//         </button>

//         {/* Sidebar */}
//         <aside
//           className={`fixed top-0 left-0 z-40 h-full w-72 transform bg-[#0b1020] p-5 transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col rounded-r-3xl border-r border-white/10 ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >

//           {/* Close Button */}
//           <button
//             onClick={() => setSidebarOpen(false)}
//             className="absolute top-4 right-4 md:hidden"
//           >
//             <X size={20} />
//           </button>

//           <h1 className="mb-6 text-2xl font-bold tracking-wide text-white/90">
//             ⚡ AI Chat
//           </h1>

//           <button
//             onClick={chat.handleNewChat}
//             className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 font-medium hover:opacity-90 transition"
//           >
//             <Plus size={18} /> New Chat
//           </button>

//           {/* 🔍 Search */}
//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search..."
//             className="w-full my-3 p-2 rounded bg-black/30"
//           />

//           <div className="mt-6 space-y-2 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//             {Object.values(chats).map((chatItem, index) => (
//               <div
//                 key={index}
//                 className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
//                   currentChatId === chatItem.id
//                     ? "bg-white/20"
//                     : "hover:bg-white/10"
//                 }`}
//               >
//                 <button
//                   onClick={() => openChat(chatItem.id)}
//                   className="flex-1 text-left"
//                 >
//                   {chatItem.title}
//                 </button>

//                 <Trash2
//                   size={16}
//                   className="cursor-pointer text-red-400 hover:text-red-600"
//                   onClick={() => chat.handleDeleteChat(chatItem.id)}
//                 />
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* Confirm Modal */}
//         {confirmDeleteId && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black/60">
//             <div className="bg-[#0b1020] p-5 rounded-xl">
//               <p>Delete chat?</p>
//               <div className="flex gap-3 mt-3">
//                 <button onClick={() => setConfirmDeleteId(null)}>Cancel</button>
//                 <button onClick={confirmDelete} className="text-red-500">Delete</button>
//               </div>
//             </div>
//           </div>
//         )}

//                 {/* Toast */}
//         {toast && (
//           <div className="fixed bottom-4 right-4 bg-black p-3 rounded">
//             Deleted
//             <button onClick={undoDelete} className="ml-2 text-indigo-400">Undo</button>
//           </div>
//         )}

//         {/* Overlay */}
//         {sidebarOpen && (
//           <div
//             onClick={() => setSidebarOpen(false)}
//             className="fixed inset-0 bg-black/50 z-30 md:hidden"
//           />
//         )}

//         {/* Chat Section */}
//         <section className="relative flex flex-1 flex-col rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-4">

//           {/* Messages */}
//           <div className="flex-1 space-y-4 overflow-y-auto pr-2 pb-32 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//             {chats[currentChatId]?.messages.map((message, i) => (
//               <div
//                 key={i}
//                 className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm md:text-base shadow-lg ${
//                   message.role === "user"
//                     ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
//                     : "mr-auto bg-white/10 text-white/90"
//                 }`}
//               >
//                 {message.role === "user" ? (
//                   <p>{message.content}</p>
//                 ) : (
//                   <ReactMarkdown
//                     remarkPlugins={[remarkGfm]}
//                     components={{
//                       p: ({ children }) => (
//                         <p className="mb-2 last:mb-0">{children}</p>
//                       ),
//                       ul: ({ children }) => (
//                         <ul className="mb-2 list-disc pl-5">{children}</ul>
//                       ),
//                       ol: ({ children }) => (
//                         <ol className="mb-2 list-decimal pl-5">{children}</ol>
//                       ),
//                       code: ({ children }) => (
//                         <code className="rounded bg-black/40 px-1 py-0.5 text-green-300">
//                           {children}
//                         </code>
//                       ),
//                       pre: ({ children }) => (
//                         <pre className="mb-2 overflow-x-auto rounded-xl bg-black/50 p-3 text-green-200">
//                           {children}
//                         </pre>
//                       ),
//                     }}
//                   >
//                     {message.content}
//                   </ReactMarkdown>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Input */}
//           <footer className="absolute bottom-4 left-0 w-full px-4">
//             <form
//               onSubmit={handleSubmitMessage}
//               className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3"
//             >
//               <input
//                 type="text"
//                 value={chatInput}
//                 onChange={(event) => setChatInput(event.target.value)}
//                 placeholder="Ask anything..."
//                 className="flex-1 bg-transparent px-3 py-2 text-white outline-none placeholder:text-white/40"
//               />
//               <button
//                 type="submit"
//                 disabled={!chatInput.trim()}
//                 className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 font-medium disabled:opacity-40"
//               >
//                 <Send size={16} /> Send
//               </button>
//             </form>
//           </footer>
//         </section>
//       </section>
//     </main>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat";
import { Send, Plus, Menu, X, Trash2, Star } from "lucide-react";
import remarkGfm from "remark-gfm";

const Dashboard = () => {
  const chat = useChat();

  console.log("CHAT OBJECT:", chat);

  const [chatInput, setChatInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [pinned, setPinned] = useState({});

  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  useEffect(() => {
    chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const msg = chatInput.trim();
    if (!msg) return;

    chat.handleSendMessage({ message: msg, chatId: currentChatId });
    setChatInput("");
  };

  const openChat = (id) => {
    chat.handleOpenChat(id);
    setSidebarOpen(false);
  };

  // 🗑️ Confirm delete
  const confirmDelete = async () => {
    const deletedChat = chats[confirmDeleteId];

    await chat.handleDeleteChat(confirmDeleteId);

    setToast({
      id: confirmDeleteId,
      title: deletedChat.title,
      chat: deletedChat,
    });
    

    setConfirmDeleteId(null);

    setTimeout(() => setToast(null), 5000);
  };

  // 🔁 Undo delete (REAL)
  const undoDelete = async () => {
    console.log("TOAST:", toast);
  if (!toast?.chat?.id && !toast?.chat?._id) return;

  const id = toast.chat.id || toast.chat._id;

  await chat.handleRestoreChat(id);

  setToast(null);
};



  // ⭐ Pin toggle
  const togglePin = (id) => {
    setPinned((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 🔍 Filter + sort
  const filteredChats = Object.values(chats)
    .filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (pinned[b.id] ? 1 : 0) - (pinned[a.id] ? 1 : 0));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1f] via-[#0d1328] to-[#05070d] p-4 text-white">
      <section className="mx-auto flex h-[calc(100vh-2rem)] max-w-7xl gap-5 relative">

        {/* Mobile Menu */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 rounded-lg bg-white/10 p-2 md:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-40 h-full w-72 bg-[#0b1020] p-5 transition-transform duration-300 md:relative md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 right-4 md:hidden"
          >
            <X size={20} />
          </button>

          <h1 className="mb-6 text-xl font-bold">⚡ AI Chat</h1>

          <button
            onClick={chat.handleNewChat}
            className="w-full mb-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2"
          >
            <Plus size={18} /> New Chat
          </button>

          {/* Search */}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="flex-1 bg-[#161b2b] rounded-2xl my-2 px-3 py-2 text-white outline-none placeholder:text-white/40"
          />

          {/* Chat List */}
          <div className="space-y-2 overflow-y-auto max-h-[75vh]">
            {filteredChats.map((c) => (
              <div
                key={c.id}
                className={`flex items-center gap-2 p-2 rounded-xl transition ${
                  currentChatId === c.id
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                <button
                  onClick={() => openChat(c.id)}
                  className="flex-1 text-left"
                >
                  {c.title}
                </button>

                <Star
                  size={16}
                  onClick={() => togglePin(c.id)}
                  className={`cursor-pointer ${
                    pinned[c.id] ? "text-yellow-400" : "opacity-40"
                  }`}
                />

                <Trash2
                  size={16}
                  className="cursor-pointer text-red-400"
                  onClick={() => setConfirmDeleteId(c.id)}
                />
              </div>
            ))}
          </div>
        </aside>

        {/* Confirm Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-[#0b1020] p-6 rounded-xl">
              <p>Are you sure you want to delete?</p>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setConfirmDeleteId(null)} className="cursor-pointer">
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="text-red-500 cursor-pointer transform active:scale-90 transition duration-150 "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="fixed z-10 bottom-10 right-4 bg-black px-4 py-3 rounded-lg">
            Deleted "{toast.title}"
            <button
              onClick={undoDelete}
              className="ml-3 text-indigo-400 cursor-pointer transform active:scale-90 transition duration-150"
            >
              Undo
            </button>
          </div>
        )}

        {/* Overlay */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
          />
        )}

        {/* Chat Section */}
        <section className="flex flex-1 flex-col rounded-3xl bg-white/5 p-4 border border-white/10">

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto pb-32 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {chats[currentChatId]?.messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[75%] p-3 rounded-xl ${
                  m.role === "user"
                    ? "ml-auto bg-indigo-500"
                    : "bg-white/10"
                }`}
              >
                {m.role === "user" ? (
                  m.content
                ) : (
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmitMessage}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3"
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-black/30"
              placeholder="Ask anything..."
            />
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 font-medium disabled:opacity-40">
              <Send size={16} />
            </button>
          </form>
        </section>
      </section>
    </main>
  );
};

export default Dashboard;