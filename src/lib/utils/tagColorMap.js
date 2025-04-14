// src/lib/utils/tagColorMap.js

import tagColorYaml from './tagColorMap.yaml?raw';
import yaml from 'js-yaml';

const parsed = yaml.load(tagColorYaml);

// YAMLファイル内の形式が `{ tags: [{ name: 'タグ名', class: 'tag--クラス名' }, ...] }` の場合
export const tagColorMap = {};
parsed.tags.forEach(tag => {
  tagColorMap[tag.name] = tag.class;
});
