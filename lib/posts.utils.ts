// TODO: Create a function to get posts content, id (use file name), dt. Return sorted posts by date
// 1. Parse each markdown file (install gray matter) and get title, date,
//    and file name (which will be used as id for the post URL).
// 2. List the data on the index page, sorted by date.

import * as fs from 'fs';
import * as path from 'path';
const matter = require('gray-matter');

interface postData {
  id: string;
  title: string;
  date: string;
}

/**
 * @returns {Array<postData>} post data sorted by latest. Contains id, title, and date (all of them are strings).
 */
export default function getSortedPost(): Array<postData> {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(postsDirectory); // array of str (file names)

  // Create an array that contains objects of posts data, such is its id, date, and content
  const allPostsData: Array<postData> = fileNames.map(fileName => {
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

  return allPostsData.sort((a: postData, b: postData) =>
    a.date < b.date ? 1 : -1
  );
}
