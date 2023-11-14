class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children[word[i]]) {
        node.children[word[i]] = new TrieNode();
      }
      node = node.children[word[i]];
    }
    node.isWord = true;
  }

  suggestHelper(root, list, curr) {
    if (root.isWord) {
      list.push(curr);
    }
    if (!Object.keys(root.children).length) {
      return;
    }
    for (let child in root.children) {
      this.suggestHelper(root.children[child], list, curr + child);
    }
  }

  suggest(prefix) {
    let node = this.root;
    let curr = "";
    for (let i = 0; i < prefix.length; i++) {
      if (!node.children[prefix[i]]) {
        return [];
      }
      node = node.children[prefix[i]];
      curr += prefix[i];
    }
    let list = [];
    this.suggestHelper(node, list, curr);
    return list;
  }
}

let Keywords = [
  "ADD",
  "ALL",
  "ALTER",
  "AND",
  "AS",
  "ASC",
  "AVG",
  "BETWEEN",
  "BEGIN",
  "CASE",
  "COMMIT",
  "CONSTRAINT",
  "COUNT",
  "CROSS JOIN",
  "CREATE",
  "DATABASE",
  "DELETE",
  "DESC",
  "DISTINCT",
  "DROP",
  "ELSE",
  "END",
  "EXISTS",
  "FETCH",
  "FIRST",
  "FOREIGN KEY",
  "FROM",
  "FULL JOIN",
  "GROUP BY",
  "HAVING",
  "IF",
  "IN",
  "INDEX",
  "INNER JOIN",
  "INSERT INTO",
  "IS",
  "JOIN",
  "LAST",
  "LEFT JOIN",
  "LIKE",
  "LIMIT",
  "LOWER",
  "MAX",
  "MIN",
  "MODIFY",
  "NOT",
  "NULL",
  "ON",
  "OR",
  "ORDER",
  "ORDER BY",
  "PRIMARY KEY",
  "ROLLBACK",
  "RIGHT JOIN",
  "SELECT",
  "SET",
  "SUM",
  "TABLE",
  "THEN",
  "TRUNCATE",
  "UNION",
  "UPDATE",
  "UPPER",
  "USE",
  "VALUES",
  "WHERE",
];
let trie = new Trie();
Keywords = Keywords.map((k) => k.concat(" "));
// console.log(Keywords);
Keywords.forEach((keyword) => trie.insert(keyword));
export default trie;
