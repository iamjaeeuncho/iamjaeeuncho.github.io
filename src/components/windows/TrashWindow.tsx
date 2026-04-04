import "./TrashWindow.css";

const trashItems = [
  { id: 1, src: "/trash/foodie.jpg", name: "foodie.jpg" },
  { id: 2, src: "/trash/revolutionist.jpg", name: "revolutionist.jpg" },
  { id: 3, src: "/trash/fashionista.jpg", name: "fashionista.jpg" },
  { id: 4, src: "/trash/now.jpg", name: "now.jpg" },
];

export default function TrashWindow() {
  return (
    <div className="trash-window">
      <div className="trash-grid">
        {trashItems.map((item, i) => (
          <div key={item.id} className={`trash-item tilt-${i}`}>
            <div className="trash-thumb">
              <img src={item.src} alt={item.name} />
            </div>
            <span className="trash-name">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}