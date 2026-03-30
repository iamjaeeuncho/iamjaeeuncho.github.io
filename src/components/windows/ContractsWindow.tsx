import "./ContractsWindow.css";

export default function ContractsWindow() {
  return (
    <div className="window-content contracts-container">
      <div className="card-fit-box">
        <div className="pop-card horizontal">
          <div className="pop-stars">
            <span>✦</span>
            <span>✦</span>
          </div>

          <div className="pop-header-line" />
          <div className="pop-circle" />

          <div className="pop-content">
            <div className="pop-left">
              <div className="pop-copy">
                <h2 className="pop-title">Get In Touch</h2>
                <p className="pop-desc">Let&apos;s build something cool!<br />Or just say hi 👋</p>
              </div>
            </div>

            <div className="pop-right">
              <p className="pop-role">Software Developer</p>
              <h3 className="pop-name">JAEEUN CHO</h3>

              <div className="pop-links">
                <a
                  href="https://www.linkedin.com/in/jaeeuncho"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/jaeeuncho
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}