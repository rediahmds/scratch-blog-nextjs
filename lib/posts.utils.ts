// TODO: Create a function to get posts content, id (use file name), dt. Return sorted posts by date
// 1. Parse each markdown file (install gray matter) and get title, date,
//    and file name (which will be used as id for the post URL).
// 2. List the data on the index page, sorted by date.

import * as fs from 'fs';
import * as path from 'path';
import remarkHtml from 'remark-html';
import { remark } from 'remark';
const matter = require('gray-matter');

export interface PostsData {
  id: string;
  title: string;
  date: string;
}

const getPostsDirectory = () => path.join(process.cwd(), 'posts');

/**
 * @returns {Array<PostsData>} post data sorted by latest. Contains id, title, and date (all of them are strings).
 */
export default function getSortedPost() {
  const postsDirectory = getPostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory); // array of str (file names)

  // Create an array that contains objects of posts data, such is its id, date, and content
  const allPostsData: Array<PostsData> = fileNames.map(fileName => {
    const id = fileName.replace('.md', '');

    // to read md contents, use readFile
    const mdPath = path.join(postsDirectory, fileName); // determine which file to read
    const mdContent = fs.readFileSync(mdPath, 'utf-8'); // read the md file

    // to parse md content the right way, use gray matter
    const parsedMdContent = matter(mdContent);
    const postMetadata = parsedMdContent.data;

    return {
      id,
      ...postMetadata,
    };
  });

  return allPostsData.sort((a: PostsData, b: PostsData) =>
    a.date < b.date ? 1 : -1
  );
}

export function getAllPostIDs() {
  const postsDirectory = getPostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory);

  const postIDs = fileNames.map(fileName => {
    const id = fileName.replace('.md', '');

    // The return value structure must be like this
    return {
      params: { id },
    };
  });

  // Pass the value to getStaticPath so that Next.js
  // will statically pre-render all the paths specified.
  // The id property is the endpoint.
  // The property naming is also important.
  return postIDs;
}

export async function getPostByID(id: string) {
  const postFullPath = path.join(getPostsDirectory(), `${id}.md`);
  const mdFile = fs.readFileSync(postFullPath, 'utf-8');

  // read md file content with gray-matter
  const parsedMd = matter(mdFile);
  const blogMetadata = parsedMd.data; // such as date and title

  const parsedMdContent = parsedMd.content; // anything in md file but the front matter
  const content = (
    await remark().use(remarkHtml).process(parsedMdContent)
  ).toString();

  return {
    id,
    ...blogMetadata,
    content,
  };
}
