import "./MessagesWindow.css";

type Message = {
  type: "question" | "answer";
  text: string;
};

export default function MessagesWindow() {
  const messages: Message[] = [
    {
      type: "question",
      text: "What made you start coding?",
    },
    {
      type: "answer",
      text: "I wanted to be a creator, not just an executor.",
    },
    {
      type: "question",
      text: "When do you enjoy development the most?",
    },
    {
      type: "answer",
      text: "When an idea in my head becomes something real and actually works.",
    },
    {
      type: "question",
      text: "What is your biggest strength?",
    },
    {
      type: "answer",
      text: "I understand business, data, and development, which helps me see the bigger picture.",
    },
    {
      type: "question",
      text: "What is your goal as a developer?",
    },
    {
      type: "answer",
      text: "To grow beyond building features and become a developer who creates great products.",
    },
  ];

  return (
    <div className="window-content messages-container">
      <div className="chat">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`bubble-row ${
              msg.type === "answer" ? "right" : "left"
            }`}
          >
            <div className={`bubble ${msg.type}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}