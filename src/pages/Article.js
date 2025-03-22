import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Article = () => {
  const { id } = useParams(); // URL 파라미터에서 게시물 id를 가져옵니다.
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    // 게시물의 Markdown 파일을 정적으로 import합니다.
    const post = require(`./articles/${id}.md`);
    setPostContent(post);
  }, [id]);

  return (
    <div>
      <h1>게시물 상세</h1>
      <ReactMarkdown>{postContent}</ReactMarkdown>
    </div>
  );
};

export default Article;
