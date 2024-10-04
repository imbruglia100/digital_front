/** @format */
import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [isSent, setIsSent] = useState(false);

  const handleSend = (e) => {
    e.preventDefault()

    setIsSent(true)
  }
  return !isSent ? (
    <form className='contact-container'>
      <div className='form-item'>
        <label>Full Name<span className='required'>*</span></label>
        <input type='text' required />
      </div>

      <div className='form-item'>
        <label>Email<span className='required'>*</span></label>
        <input type='email' required />
      </div>

      <div className='form-item'>
        <label>Message<span className='required'>*</span></label>
        <textarea type='text' required />
      </div>

      <button className="primary-btn" onClick={handleSend}>Send</button>
    </form>
  ) : (
    <form>
      <h1>Message sent!</h1>
      <p>We will get back to you as soon as we can.</p>
    </form>
  );
};

export default Contact;
