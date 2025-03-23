import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Article() {
  const { id } = useParams();
  const [content, setContent] = useState('');

  useEffect(() => {
    // HTML 파일을 fetch로 가져옴
    const fetchArticleContent = async () => {
      try {
        const response = await fetch(`/articles/${id}.html`);
        if (response.ok) {
          const htmlContent = await response.text();
          setContent(htmlContent);
        } else {
          setContent('<p>글을 찾을 수 없습니다.</p>');
        }
      } catch (error) {
        setContent('<p>오류가 발생했습니다.</p>');
      }
    };

    fetchArticleContent();
  }, [id]);

  return (
    <div className="articlepage-container">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

export default Article;
