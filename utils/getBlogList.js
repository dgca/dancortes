import fs from "fs";
import process from "process";
import matter from "gray-matter";

export default function getBlogList() {
  const blogsList = fs
    .readdirSync(`${process.cwd()}/blog`)
    .sort((a, b) => (a.localeCompare(b) ? -1 : 1))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const date = fileName.match(/^\d+\-\d+\-\d+/)[0];
      const file = fs.readFileSync(`${process.cwd()}/blog/${fileName}`, {
        encoding: "utf-8",
      });
      const {
        content,
        data: { title, excerpt, ogImage },
      } = matter(file);
      return {
        slug,
        date,
        content,
        title,
        excerpt,
        ogImage,
      };
    });

  return blogsList;
}
