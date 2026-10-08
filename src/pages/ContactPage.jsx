import { useState } from 'react';

const TOPICS = ['General question', 'Orders & billing', 'Technical issue', 'Feedback'];
const EMPTY = { name: '', email: '', topic: TOPICS[0], message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter your name.';
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address.';
  if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
    // Clear a field's error as soon as the user edits it.
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    // No backend yet: replace this with a POST to your contact endpoint.
    setSent(true);
    setForm(EMPTY);
  };

  const inputProps = (key) => ({
    id: key,
    value: form[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
  });

  return (
    <main className="page" id="contact">
      <div className="topbar">
        <h1>Contact us</h1>
      </div>

      <div className="contact-grid">
        <div className="card">
          {sent ? (
            <div className="contact-sent" role="status">
              <h2>Thanks — your message was sent.</h2>
              <p className="muted">We usually reply within one business day.</p>
              <button className="btn" onClick={() => setSent(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={onSubmit} noValidate>
              <div className="field-row">
                <Field id="name" label="Name" error={errors.name}>
                  <input type="text" autoComplete="name" {...inputProps('name')} />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input type="email" autoComplete="email" {...inputProps('email')} />
                </Field>
              </div>
              <Field id="topic" label="Topic">
                <select {...inputProps('topic')}>
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="message" label="Message" error={errors.message}>
                <textarea rows={6} {...inputProps('message')} />
              </Field>
              <div>
                <button type="submit" className="btn">
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="card contact-info">
          <h2>Other ways to reach us</h2>
          <dl>
            <dt>Email</dt>
            <dd>
              <a href="mailto:support@example.com">support@example.com</a>
            </dd>
            <dt>Hours</dt>
            <dd>Monday – Friday, 9am – 6pm</dd>
            <dt>Response time</dt>
            <dd>Within one business day</dd>
          </dl>
        </aside>
      </div>
    </main>
  );
}
