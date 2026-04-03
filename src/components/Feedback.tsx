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
                setStatus({ type: 'success', msg: 'Message sent successfully! ❤️' });
                setName('');
                setMessage('');
            } else {
                setStatus({ type: 'error', msg: 'Error sending message 😢' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Error sending message 😢' });
        } finally {
            setSending(false);
        }
    };

    return (
        <section id="feedback" className="sec-pad">
            <div className="sec-center">
                <div className="sec-label" data-reveal>Send Love</div>
                <h2 className="sec-title" data-reveal>Wishes & <em>Feedback</em></h2>
                <p className="sec-desc" data-reveal style={{ marginBottom: '40px' }}>
                    Leave a message for the couple. Your wishes mean the world to us!
                </p>

                <form id="feedbackForm" className="feedback-form" onSubmit={handleSubmit} data-reveal>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Your Name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            id="message" 
                            placeholder="Your Wishes or Feedback..." 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Message ❤️'}
                    </button>
                    
                    {status && (
                        <div className={`form-status ${status.type}`}>
                            {status.msg}
                        </div>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Feedback;
