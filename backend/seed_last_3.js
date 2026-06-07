const mongoose = require('mongoose');
require('dotenv').config();
const Problem = require('./src/models/problem');
const User = require('./src/models/user');

const problems = [
  {
    "title": "Generate Parentheses",
    "description": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\nConstraints:\n- 1 <= n <= 8",
    "difficulty": "medium",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "3",
        "output": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
        "explanation": "Combinations for n = 3."
      },
      {
        "input": "1",
        "output": "[\"()\"]",
        "explanation": "Combinations for n = 1."
      }
    ],
    "hiddenTestCases": [
      { "input": "2", "output": "[\"(())\",\"()()\"]" },
      { "input": "4", "output": "14 combinations" },
      { "input": "5", "output": "42 combinations" },
      { "input": "6", "output": "132 combinations" },
      { "input": "7", "output": "429 combinations" }
    ],
    "startCode": [
      { "language": "cpp", "initialCode": "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};" },
      { "language": "java", "initialCode": "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}" },
      { "language": "python", "initialCode": "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        " }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <string>\n#include <iostream>\n#include <algorithm>\nusing namespace std;\nclass Solution {\n    void backtrack(vector<string>& ans, string cur, int open, int close, int max) {\n        if (cur.length() == max * 2) {\n            ans.push_back(cur);\n            return;\n        }\n        if (open < max) backtrack(ans, cur + \"(\", open + 1, close, max);\n        if (close < open) backtrack(ans, cur + \")\", open, close + 1, max);\n    }\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> ans;\n        backtrack(ans, \"\", 0, 0, n);\n        return ans;\n    }\n};\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution s;\n        vector<string> ans = s.generateParenthesis(n);\n        sort(ans.begin(), ans.end());\n        if (n >= 4) {\n            cout << ans.size() << \" combinations\" << endl;\n        } else {\n            cout << \"[\";\n            for (size_t i = 0; i < ans.size(); ++i) {\n                cout << \"\\\"\" << ans[i] << \"\\\"\";\n                if (i + 1 < ans.size()) cout << \",\";\n            }\n            cout << \"]\" << endl;\n        }\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\nclass Solution {\n    private void backtrack(List<String> ans, String cur, int open, int close, int max) {\n        if (cur.length() == max * 2) {\n            ans.add(cur);\n            return;\n        }\n        if (open < max) backtrack(ans, cur + \"(\", open + 1, close, max);\n        if (close < open) backtrack(ans, cur + \")\", open, close + 1, max);\n    }\n    public List<String> generateParenthesis(int n) {\n        List<String> ans = new ArrayList<>();\n        backtrack(ans, \"\", 0, 0, n);\n        return ans;\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        int n = Integer.parseInt(line.trim());\n        Solution s = new Solution();\n        List<String> ans = s.generateParenthesis(n);\n        Collections.sort(ans);\n        if (n >= 4) {\n            System.out.println(ans.size() + \" combinations\");\n        } else {\n            StringBuilder sb = new StringBuilder(\"[\");\n            for (int i = 0; i < ans.size(); i++) {\n                sb.append(\"\\\"\").append(ans.get(i)).append(\"\\\"\");\n                if (i + 1 < ans.size()) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            System.out.println(sb.toString());\n        }\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nclass Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        ans = []\n        def backtrack(S = [], left = 0, right = 0):\n            if len(S) == 2 * n:\n                ans.append(\"\".join(S))\n                return\n            if left < n:\n                S.append(\"(\")\n                backtrack(S, left+1, right)\n                S.pop()\n            if right < left:\n                S.append(\")\")\n                backtrack(S, left, right+1)\n                S.pop()\n        backtrack()\n        return ans\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        n = int(line)\n        s = Solution()\n        ans = s.generateParenthesis(n)\n        ans.sort()\n        if n >= 4:\n            print(f\"{len(ans)} combinations\")\n        else:\n            import json\n            print(json.dumps(ans).replace(\" \", \"\"))"
      }
    ]
  },
  {
    "title": "Word Ladder",
    "description": "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:\n- Every adjacent pair of words differs by a single letter.\n- Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.\n- sk == endWord\n\nGiven two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.\n\nConstraints:\n- 1 <= beginWord.length <= 10\n- endWord.length == beginWord.length\n- 1 <= wordList.length <= 5000\n- wordList[i].length == beginWord.length\n- beginWord, endWord, and wordList[i] consist of lowercase English letters.\n- beginWord != endWord\n- All words in wordList are unique.",
    "difficulty": "hard",
    "tags": "graph",
    "visibleTestCases": [
      {
        "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
        "output": "5",
        "explanation": "One shortest transformation sequence is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\", which is 5 words long."
      },
      {
        "input": "\"hit\"\n\"cog\"\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",
        "output": "0",
        "explanation": "The endWord \"cog\" is not in wordList, therefore there is no valid transformation sequence."
      }
    ],
    "hiddenTestCases": [
      { "input": "\"a\"\n\"c\"\n[\"a\",\"b\",\"c\"]", "output": "2" },
      { "input": "\"lost\"\n\"cost\"\n[\"most\",\"fist\",\"lost\",\"cost\"]", "output": "2" },
      { "input": "\"talk\"\n\"tail\"\n[\"talk\",\"tons\",\"fall\",\"tail\",\"task\"]", "output": "2" },
      { "input": "\"hot\"\n\"dog\"\n[\"hot\",\"dog\"]", "output": "0" },
      { "input": "\"sand\"\n\"acne\"\n[\"sens\",\"cone\",\"acne\",\"sand\",\"sane\",\"send\"]", "output": "0" }
    ],
    "startCode": [
      { "language": "cpp", "initialCode": "class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        \n    }\n};" },
      { "language": "java", "initialCode": "class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        \n    }\n}" },
      { "language": "python", "initialCode": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        " }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <string>\n#include <iostream>\n#include <sstream>\n#include <unordered_set>\n#include <queue>\n#include <algorithm>\nusing namespace std;\nclass Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        unordered_set<string> s(wordList.begin(), wordList.end());\n        if (!s.count(endWord)) return 0;\n        queue<string> q;\n        q.push(beginWord);\n        int level = 1;\n        while (!q.empty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; ++i) {\n                string word = q.front(); q.pop();\n                if (word == endWord) return level;\n                for (int j = 0; j < word.length(); ++j) {\n                    char original = word[j];\n                    for (char c = 'a'; c <= 'z'; ++c) {\n                        word[j] = c;\n                        if (s.count(word)) {\n                            q.push(word);\n                            s.erase(word);\n                        }\n                    }\n                    word[j] = original;\n                }\n            }\n            level++;\n        }\n        return 0;\n    }\n};\nint main() {\n    string beginWord, endWord, listLine;\n    if (getline(cin, beginWord) && getline(cin, endWord) && getline(cin, listLine)) {\n        if (beginWord.front() == '\"') beginWord = beginWord.substr(1, beginWord.length() - 2);\n        if (endWord.front() == '\"') endWord = endWord.substr(1, endWord.length() - 2);\n        if (listLine.front() == '[') listLine = listLine.substr(1);\n        if (listLine.back() == ']') listLine.pop_back();\n        vector<string> wordList;\n        stringstream ss(listLine);\n        string w;\n        while (getline(ss, w, ',')) {\n            if (w.front() == '\"') w = w.substr(1, w.length() - 2);\n            wordList.push_back(w);\n        }\n        Solution s;\n        cout << s.ladderLength(beginWord, endWord, wordList) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\nclass Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        Set<String> s = new HashSet<>(wordList);\n        if (!s.contains(endWord)) return 0;\n        Queue<String> q = new LinkedList<>();\n        q.add(beginWord);\n        int level = 1;\n        while (!q.isEmpty()) {\n            int sz = q.size();\n            for (int i = 0; i < sz; i++) {\n                String word = q.poll();\n                if (word.equals(endWord)) return level;\n                char[] arr = word.toCharArray();\n                for (int j = 0; j < arr.length; j++) {\n                    char original = arr[j];\n                    for (char c = 'a'; c <= 'z'; c++) {\n                        arr[j] = c;\n                        String next = new String(arr);\n                        if (s.contains(next)) {\n                            q.add(next);\n                            s.remove(next);\n                        }\n                    }\n                    arr[j] = original;\n                }\n            }\n            level++;\n        }\n        return 0;\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String beginWord = br.readLine();\n        String endWord = br.readLine();\n        String listLine = br.readLine();\n        if (beginWord == null || endWord == null || listLine == null) return;\n        beginWord = beginWord.trim().replace(\"\\\"\", \"\");\n        endWord = endWord.trim().replace(\"\\\"\", \"\");\n        listLine = listLine.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = listLine.split(\",\");\n        List<String> wordList = new ArrayList<>();\n        for (String part : parts) {\n            wordList.add(part.trim().replace(\"\\\"\", \"\"));\n        }\n        Solution s = new Solution();\n        System.out.println(s.ladderLength(beginWord, endWord, wordList));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys, json\nclass Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        s = set(wordList)\n        if endWord not in s: return 0\n        q = [beginWord]\n        level = 1\n        while q:\n            for _ in range(len(q)):\n                word = q.pop(0)\n                if word == endWord: return level\n                for j in range(len(word)):\n                    for c in 'abcdefghijklmnopqrstuvwxyz':\n                        next_word = word[:j] + c + word[j+1:]\n                        if next_word in s:\n                            q.append(next_word)\n                            s.remove(next_word)\n            level += 1\n        return 0\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 3:\n        beginWord = lines[0].strip().replace('\"', '')\n        endWord = lines[1].strip().replace('\"', '')\n        wordList = json.loads(lines[2])\n        s = Solution()\n        print(s.ladderLength(beginWord, endWord, wordList))"
      }
    ]
  },
  {
    "title": "Binary Tree Maximum Path Sum",
    "description": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\n\nThe path sum of a path is the sum of the node's values in the path.\n\nGiven the root of a binary tree, return the maximum path sum of any non-empty path.\n\nConstraints:\n- The number of nodes in the tree is in the range [1, 3 * 10^4].\n- -1000 <= Node.val <= 1000",
    "difficulty": "hard",
    "tags": "graph",
    "visibleTestCases": [
      {
        "input": "[1,2,3]",
        "output": "6",
        "explanation": "The optimal path is 2 -> 1 -> 3 with path sum = 2 + 1 + 3 = 6."
      },
      {
        "input": "[-10,9,20,null,null,15,7]",
        "output": "42",
        "explanation": "The optimal path is 15 -> 20 -> 7 with path sum = 15 + 20 + 7 = 42."
      }
    ],
    "hiddenTestCases": [
      { "input": "[2,-1]", "output": "2" },
      { "input": "[-3]", "output": "-3" },
      { "input": "[1,-2,3]", "output": "4" },
      { "input": "[5,4,8,11,null,13,4,7,2,null,null,null,1]", "output": "48" },
      { "input": "[-2,-1]", "output": "-1" }
    ],
    "startCode": [
      { "language": "cpp", "initialCode": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxPathSum(TreeNode* root) {\n        \n    }\n};" },
      { "language": "java", "initialCode": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public int maxPathSum(TreeNode root) {\n        \n    }\n}" },
      { "language": "python", "initialCode": "class Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        " }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <queue>\n#include <algorithm>\nusing namespace std;\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\nclass Solution {\n    int maxVal = -1e9;\n    int maxGain(TreeNode* node) {\n        if (!node) return 0;\n        int leftGain = max(maxGain(node->left), 0);\n        int rightGain = max(maxGain(node->right), 0);\n        int priceNewpath = node->val + leftGain + rightGain;\n        maxVal = max(maxVal, priceNewpath);\n        return node->val + max(leftGain, rightGain);\n    }\npublic:\n    int maxPathSum(TreeNode* root) {\n        maxGain(root);\n        return maxVal;\n    }\n};\nTreeNode* deserialize(string line) {\n    if (line.front() == '[') line = line.substr(1);\n    if (line.back() == ']') line.pop_back();\n    if (line.empty()) return nullptr;\n    stringstream ss(line);\n    string item;\n    vector<string> items;\n    while (getline(ss, item, ',')) items.push_back(item);\n    if (items.empty()) return nullptr;\n    TreeNode* root = new TreeNode(stoi(items[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < items.size()) {\n        TreeNode* curr = q.front(); q.pop();\n        if (i < items.size() && items[i] != \"null\" && !items[i].empty()) {\n            curr->left = new TreeNode(stoi(items[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < items.size() && items[i] != \"null\" && !items[i].empty()) {\n            curr->right = new TreeNode(stoi(items[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        TreeNode* root = deserialize(line);\n        Solution s;\n        cout << s.maxPathSum(root) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int x) { val = x; }\n}\nclass Solution {\n    private int maxVal = Integer.MIN_VALUE;\n    private int maxGain(TreeNode node) {\n        if (node == null) return 0;\n        int leftGain = Math.max(maxGain(node.left), 0);\n        int rightGain = Math.max(maxGain(node.right), 0);\n        int priceNewpath = node.val + leftGain + rightGain;\n        maxVal = Math.max(maxVal, priceNewpath);\n        return node.val + Math.max(leftGain, rightGain);\n    }\n    public int maxPathSum(TreeNode root) {\n        maxGain(root);\n        return maxVal;\n    }\n    private static TreeNode deserialize(String line) {\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) return null;\n        String[] parts = line.split(\",\");\n        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < parts.length) {\n            TreeNode curr = q.poll();\n            if (!parts[i].trim().equals(\"null\") && !parts[i].trim().isEmpty()) {\n                curr.left = new TreeNode(Integer.parseInt(parts[i].trim()));\n                q.add(curr.left);\n            }\n            i++;\n            if (i < parts.length && !parts[i].trim().equals(\"null\") && !parts[i].trim().isEmpty()) {\n                curr.right = new TreeNode(Integer.parseInt(parts[i].trim()));\n                q.add(curr.right);\n            }\n            i++;\n        }\n        return root;\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        TreeNode root = deserialize(line);\n        Solution s = new Solution();\n        System.out.println(s.maxPathSum(root));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys, json\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\nclass Solution:\n    def maxPathSum(self, root: TreeNode) -> int:\n        self.max_sum = float('-inf')\n        def max_gain(node):\n            if not node: return 0\n            left_gain = max(max_gain(node.left), 0)\n            right_gain = max(max_gain(node.right), 0)\n            price_newpath = node.val + left_gain + right_gain\n            self.max_sum = max(self.max_sum, price_newpath)\n            return node.val + max(left_gain, right_gain)\n        max_gain(root)\n        return self.max_sum\ndef deserialize(lst):\n    if not lst: return None\n    root = TreeNode(lst[0])\n    q = [root]\n    i = 1\n    while q and i < len(lst):\n        curr = q.pop(0)\n        if lst[i] is not None:\n            curr.left = TreeNode(lst[i])\n            q.append(curr.left)\n        i += 1\n        if i < len(lst) and lst[i] is not None:\n            curr.right = TreeNode(lst[i])\n            q.append(curr.right)\n        i += 1\n    return root\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        lst = json.loads(input_data)\n        root = deserialize(lst)\n        s = Solution()\n        print(s.maxPathSum(root))"
      }
    ]
  }
];

async function seed() {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("Connected to DB...");
        
        let creator = await User.findOne({ role: 'admin' });
        if (!creator) creator = await User.findOne({});
        if (!creator) {
            console.error("No user found in the database!");
            process.exit(1);
        }
        console.log(`Using user ${creator.emailId} (${creator._id}) as problemCreator`);
        
        const titles = problems.map(p => p.title);
        await Problem.deleteMany({ title: { $in: titles } });
        console.log("Cleaned up existing versions of these problems if any...");
        
        const problemsWithCreator = problems.map(p => ({
            ...p,
            problemCreator: creator._id
        }));
        
        const result = await Problem.insertMany(problemsWithCreator);
        console.log(`Successfully seeded ${result.length} problems!`);
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
}

seed();
