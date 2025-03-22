import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Essay = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 프로젝트 내 posts 폴더에서 마크다운 파일 목록을 가져옵니다.
    const context = require.context("./articles", false, /\.md$/);
    const postList = context.keys().map((fileName) => ({
      name: fileName.replace("./", "").replace(".md", ""),
      content: context(fileName),
    }));
    setPosts(postList);
  }, []);

  return (
    <div>
      <h1>게시물 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.name}>
            <Link to={`/article/${post.name}`}>{post.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Essay;
