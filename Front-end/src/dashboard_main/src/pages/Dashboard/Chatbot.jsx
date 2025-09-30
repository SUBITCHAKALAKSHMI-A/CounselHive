import React, { useState } from 'react';

function Chatbot() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! How can I help you with college recommendations?' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setTimeout(() => {
            setMessages(msgs => [
                ...msgs,
                { sender: 'bot', text: "I'm a demo bot. Please ask your college questions!" }
            ]);
        }, 800);
        setInput('');
    };

    return (
        <div className="chatbot-container" style={{
            width: '100%',
            height: '100%',
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            background: '#fff',
            border: '1px solid #eee',
            borderRadius: '8px',
            padding: '16px',
            boxSizing: 'border-box'
        }}>
            <div className="chatbot-messages" style={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: '12px'
            }}>
                {messages.map((msg, idx) => (
                    <div key={idx} style={{
                        textAlign: msg.sender === 'user' ? 'right' : 'left',
                        margin: '6px 0'
                    }}>
                        <span style={{
                            display: 'inline-block',
                            background: msg.sender === 'user' ? '#00e0e0' : '#eee',
                            color: msg.sender === 'user' ? '#fff' : '#333',
                            borderRadius: '16px',
                            padding: '8px 12px',
                            maxWidth: '80%',
                            wordBreak: 'break-word'
                        }}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your question..."
                    style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid #ccc'
                    }}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                />
                <button onClick={handleSend} style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#00e0e0',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatbot;