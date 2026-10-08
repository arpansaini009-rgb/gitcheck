import { useEffect, useMemo, useRef, useState } from 'react';
import { galleryItems } from '../gallery.js';

const ALL = 'All';
const CATEGORIES = [ALL, ...new Set(galleryItems.map((i) => i.category))];

function Lightbox({ items, index, onClose, onMove }) {
  const ref = useRef(null);
  const item = items[index];

  // Native modal dialog: traps focus, closes on Escape, and returns focus when closed.
  useEffect(() => {
    const dialog = ref.current;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') onMove(1);
    if (e.key === 'ArrowLeft') onMove(-1);
  };

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={item.title}
      // A close event can arrive after the dialog was reopened (StrictMode remount); ignore it then.
      onClose={() => !ref.current?.open && onClose()}
      onKeyDown={onKeyDown}
      // The dialog has no padding, so a click whose target is the dialog itself landed on the backdrop.
      onClick={(e) => e.target === ref.current && onClose()}
    >
      <div className="lightbox-body">
        <figure>
          <img src={item.src} alt={item.title} />
          <figcaption>
            <span>{item.title}</span>
            <span className="muted">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </figure>
        <div className="lightbox-controls">
          <button className="btn" onClick={() => onMove(-1)} aria-label="Previous image">
            ‹ Prev
          </button>
          <button className="btn" onClick={() => onMove(1)} aria-label="Next image">
            Next ›
          </button>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default function GalleryPage() {
  const [category, setCategory] = useState(ALL);
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () => (category === ALL ? galleryItems : galleryItems.filter((i) => i.category === category)),
    [category]
  );

  // Wrap around at either end.
  const move = (step) => setOpen((i) => (i + step + items.length) % items.length);

  return (
    <main className="page" id="gallery">
      <div className="topbar">
        <h1>Gallery</h1>
        <div className="segmented" role="group" aria-label="Category">
          {CATEGORIES.map((c) => (
            <button key={c} className={c === category ? 'active' : ''} aria-pressed={c === category} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="gallery-grid">
        {items.map((item, i) => (
          <li key={item.id}>
            <button className="gallery-item" onClick={() => setOpen(i)} aria-label={`View ${item.title}`}>
              <img src={item.src} alt="" loading="lazy" />
              <span className="gallery-caption">
                <span>{item.title}</span>
                <span className="muted">{item.category}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open !== null && <Lightbox items={items} index={open} onClose={() => setOpen(null)} onMove={move} />}
    </main>
  );
}
