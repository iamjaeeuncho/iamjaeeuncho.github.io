import { useState } from "react";
import "./BlogWindow.css";
import { essays } from "../../data/essays";

type Essay = (typeof essays)[number];

export default function BlogWindow() {
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);

  if (selectedEssay) {
    return (
      <div className="blog-window">
        <div className="essay-detail">
          <button
            className="essay-back-button"
            onClick={() => setSelectedEssay(null)}
          >
            ← Back to Essays
          </button>

          <p className="essay-detail-date">{selectedEssay.date}</p>
          <h1 className="essay-detail-title">{selectedEssay.title}</h1>

          <div className="essay-detail-image-wrap">
            <img
              className="essay-detail-image"
              src={selectedEssay.image}
              alt={selectedEssay.title}
            />
          </div>

          <div className="essay-detail-content">
            {selectedEssay.content.split("\n\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-window">
      <section className="blog-hero">
        <h1 className="blog-title">Essays</h1>
        <p className="blog-description">
          Thoughts on growth, curiosity, work, and the experiences that shaped me.
        </p>
      </section>

      <div className="essay-list">
        {essays.map((essay) => (
          <article
            className="essay-card"
            key={essay.id}
            onClick={() => setSelectedEssay(essay)}
          >
            <div className="essay-image-wrap">
              <img className="essay-image" src={essay.image} alt={essay.title} />
            </div>

            <div className="essay-content">
              <p className="essay-date">{essay.date}</p>
              <h2 className="essay-card-title">{essay.title}</h2>
              <p className="essay-preview">{essay.content}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}