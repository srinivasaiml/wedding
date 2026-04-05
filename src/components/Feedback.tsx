import React, { useState } from 'react';

const Feedback: React.FC = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);

        const botToken = "8770771434:AAHt3Sa4IhZGPIMvJkvkp531nVDsEJ5A300";
        const chatId = "5688248897"; 

        const text = `📬 New Wish for Uma & Vasu! ❤️\n\n👤 From: ${name}\n✨ Message: ${message}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text
                })
            });

            if (response.ok) {
                setStatus({ type: 'success', msg: 'Your love has been sent! ❤️' });
                setName('');
                setMessage('');
            } else {
                setStatus({ type: 'error', msg: 'Something went wrong. Try again? 😢' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Connection error. Please try later. 😢' });
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="feedback" className="heart-feedback-section">
            <div className="reveal-up" style={{ marginBottom: '60px' }}>
                <span className="section-eyebrow">Send Love</span>
                <h2 className="section-title">Wishes & <em>Feedback</em></h2>
                <p className="section-desc">
                    Your blessings are our greatest gift. Leave a message in our heart.
                </p>
            </div>

            <div className="heart-container reveal-up">
                {/* SVG Heart Background */}
                <svg className="heart-svg-bg" viewBox="0 0 500 450" preserveAspectRatio="xMidYMid meet">
                    <path d="M250,420 c-10,-5 -220,-110 -220,-240 c0,-70 50,-120 115,-120 c40,0 80,30 105,70 c25,-40 65,-70 105,-70 c65,0 115,50 115,120 c0,130 -210,235 -220,240Z" />
                </svg>

                <div className="heart-content">
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <div className="heart-form-group">
                            <input 
                                type="text" 
                                className="heart-input" 
                                placeholder="Your Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="heart-form-group">
                            <textarea 
                                className="heart-input heart-textarea" 
                                placeholder="Your Message..." 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="heart-submit-btn" disabled={sending}>
                            {sending ? 'Sending...' : 'Send ❤️'}
                        </button>
                        
                        {status && (
                            <div className={`heart-status ${status.type}`}>
                                {status.msg}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Feedback;
