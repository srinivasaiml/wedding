import React, { useState } from 'react';

const RSVP: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        guests: '1 Guest',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowToast(true);
        setFormData({ name: '', email: '', guests: '1 Guest', message: '' });
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <section id="rsvp" className="rsvp-section">
            <div className="rsvp-container reveal">
                <h2 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>Kindly Reply By February 28</h2>
                <p style={{ marginBottom: '2rem' }}>Will You Join Us?</p>
                
                <form id="rsvpForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="form-control" 
                            required 
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="form-control" 
                            required 
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="guests">No. of Guests</label>
                        <select 
                            id="guests" 
                            className="form-control"
                            value={formData.guests}
                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        >
                            <option>1 Guest</option>
                            <option>2 Guests</option>
                            <option>3 Guests</option>
                            <option>4 Guests</option>
                            <option>5 Guests</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">A Message for the Couple</label>
                        <textarea 
                            id="message" 
                            rows={3} 
                            className="form-control" 
                            placeholder="Write your wishes here..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn-submit">Send My RSVP 💌</button>
                </form>
            </div>

            {/* Notification Toast */}
            <div id="toast" className={showToast ? 'show' : ''}>
                Message Sent! We can't wait to see you. 💌
            </div>
        </section>
    );
};

export default RSVP;
