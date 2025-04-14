import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { execSync } from 'child_process';

const contentDir = 'content';

export function getGitDates(filePath) {
  const relPath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');
  try {
    const created = execSync(`git log --diff-filter=A --follow --format=%aI -1 -- "${relPath}"`).toString().trim();
    const updated = execSync(`git log -1 --format=%aI -- "${relPath}"`).toString().trim();
    return { created, updated };
  } catch {
    return { created: '', updated: '' };
  }
}

export async function getArticles() {
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));

  return files.map((file) => {
    const fullPath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContent);
    const { created, updated } = getGitDates(fullPath);

    return {
      ...data,
      slug: file.replace(/\.md$/, ''),
      content,
      createdAt: created,
      updatedAt: updated
    };
  });
}
