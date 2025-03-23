import React from 'react';
import { Link } from 'react-router-dom';
import "./Essay.css";

const essays = [
  { id: 1, date: '2016. 07. 29.', title: 'Finishing my internship in Myanmar', image: 'https://blog.kakaocdn.net/dn/caqng0/btsrNn8Ome8/3QciIGCFXXhlp1Oz5rzm4k/img.jpg'},
  { id: 2, date: '2018. 11. 26.', title: 'A Reflection on 29 Years of Life', image: 'https://blog.kakaocdn.net/dn/bgZs0f/btsrCShNoft/YThIGwgLeKNXwZFnRi3fj1/img.jpg' },
  { id: 3, date: '2023. 08. 21.', title: 'Why I Decided to Become a Developer (Feat. Data Analyst)', image: 'https://blog.kakaocdn.net/dn/bmEYdT/btsrRRuZHgJ/bKkNhk9QrTbHkMh1lltsjK/img.jpg' },
];

function Essay() {
  return (
    <div className="essaypage-container">
      <div className="essay-container">
        {[...essays].reverse().map((essay) => (
          <Link key={essay.id} to={`/article/${essay.id}`} className="essay-item">
            <div className="essay-content">
              <p className="essay-title">{essay.title}</p>
              <p className="essay-date">{essay.date}</p>
            </div>
            <img src={essay.image} alt="essay-image" className="essay-image" />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Essay;
