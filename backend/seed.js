const mongoose = require('mongoose');
require('dotenv').config();
const Problem = require('./src/models/problem');
const User = require('./src/models/user');

const problems = [
  {
    "title": "Two Sum",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nConstraints:\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9\n- -10^9 <= target <= 10^9\n- Only one valid answer exists.",
    "difficulty": "easy",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[2,7,11,15]\n9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "[3,2,4]\n6",
        "output": "[1,2]",
        "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[3,3]\n6",
        "output": "[0,1]"
      },
      {
        "input": "[1,5,8,12,14]\n20",
        "output": "[2,3]"
      },
      {
        "input": "[-1,-2,-3,-4,-5]\n-8",
        "output": "[2,4]"
      },
      {
        "input": "[10,20,30,40,50]\n90",
        "output": "[3,4]"
      },
      {
        "input": "[0,4,3,0]\n0",
        "output": "[0,3]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <unordered_map>\n#include <iostream>\n#include <sstream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> m;\n        for (int i = 0; i < nums.size(); ++i) {\n            int complement = target - nums[i];\n            if (m.count(complement)) {\n                return {m[complement], i};\n            }\n            m[nums[i]] = i;\n        }\n        return {};\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        int target;\n        cin >> target;\n        Solution s;\n        vector<int> ans = s.twoSum(nums, target);\n        cout << \"[\" << ans[0] << \",\" << ans[1] << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.util.*;\nimport java.io.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new java.io.BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        int target = Integer.parseInt(br.readLine().trim());\n        Solution s = new Solution();\n        int[] ans = s.twoSum(nums, target);\n        System.out.println(\"[\" + ans[0] + \",\" + ans[1] + \"]\");\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in seen:\n                return [seen[complement], i]\n            seen[num] = i\n        return []\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if lines:\n        nums = json.loads(lines[0])\n        target = int(lines[1])\n        s = Solution()\n        ans = s.twoSum(nums, target)\n        print(json.dumps(ans))"
      }
    ]
  },
  {
    "title": "Reverse Linked List",
    "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\nConstraints:\n- The number of nodes in the list is the range [0, 5000].\n- -5000 <= Node.val <= 5000",
    "difficulty": "easy",
    "tags": "linkedList",
    "visibleTestCases": [
      {
        "input": "[1,2,3,4,5]",
        "output": "[5,4,3,2,1]",
        "explanation": "Reversing list [1,2,3,4,5] yields [5,4,3,2,1]."
      },
      {
        "input": "[1,2]",
        "output": "[2,1]",
        "explanation": "Reversing list [1,2] yields [2,1]."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[]",
        "output": "[]"
      },
      {
        "input": "[7]",
        "output": "[7]"
      },
      {
        "input": "[1,3,5,7,9]",
        "output": "[9,7,5,3,1]"
      },
      {
        "input": "[2,4,6,8,10,12]",
        "output": "[12,10,8,6,4,2]"
      },
      {
        "input": "[-5,2,-10,4]",
        "output": "[4,-10,2,-5]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* curr = head;\n        while (curr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        if (line.empty()) {\n            cout << \"[]\" << endl;\n            return 0;\n        }\n        stringstream ss(line);\n        string val;\n        ListNode* dummy = new ListNode(0);\n        ListNode* curr = dummy;\n        while (getline(ss, val, ',')) {\n            curr->next = new ListNode(stoi(val));\n            curr = curr->next;\n        }\n        Solution s;\n        ListNode* rev = s.reverseList(dummy->next);\n        cout << \"[\";\n        while (rev) {\n            cout << rev->val;\n            if (rev->next) cout << \",\";\n            rev = rev->next;\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode curr = head;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        return prev;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) {\n            System.out.println(\"[]\");\n            return;\n        }\n        String[] parts = line.split(\",\");\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String part : parts) {\n            curr.next = new ListNode(Integer.parseInt(part.trim()));\n            curr = curr.next;\n        }\n        Solution s = new Solution();\n        ListNode rev = s.reverseList(dummy.next);\n        StringBuilder sb = new StringBuilder(\"[\");\n        while (rev != null) {\n            sb.append(rev.val);\n            if (rev.next != null) sb.append(\",\");\n            rev = rev.next;\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def reverseList(self, head: ListNode) -> ListNode:\n        prev = None\n        curr = head\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n        return prev\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        print(\"[]\")\n        sys.exit(0)\n    try:\n        lst = json.loads(input_data)\n    except:\n        print(\"[]\")\n        sys.exit(0)\n    if not lst:\n        print(\"[]\")\n        sys.exit(0)\n    dummy = ListNode(0)\n    curr = dummy\n    for val in lst:\n        curr.next = ListNode(val)\n        curr = curr.next\n    s = Solution()\n    rev = s.reverseList(dummy.next)\n    res = []\n    while rev:\n        res.append(rev.val)\n        rev = rev.next\n    print(json.dumps(res))"
      }
    ]
  },
  {
    "title": "Merge Two Sorted Lists",
    "description": "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\nConstraints:\n- The number of nodes in both lists is in the range [0, 50].\n- -100 <= Node.val <= 100\n- Both list1 and list2 are sorted in non-decreasing order.",
    "difficulty": "easy",
    "tags": "linkedList",
    "visibleTestCases": [
      {
        "input": "[1,2,4]\n[1,3,4]",
        "output": "[1,1,2,3,4,4]",
        "explanation": "Merging lists yields [1,1,2,3,4,4]."
      },
      {
        "input": "[]\n[]",
        "output": "[]",
        "explanation": "Merging two empty lists yields an empty list."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[]\n[0]",
        "output": "[0]"
      },
      {
        "input": "[5,10,15]\n[2,3,20]",
        "output": "[2,3,5,10,15,20]"
      },
      {
        "input": "[1,1,1]\n[1,1]",
        "output": "[1,1,1,1,1]"
      },
      {
        "input": "[-10,-5,0]\n[-3,2,4]",
        "output": "[-10,-5,-3,0,2,4]"
      },
      {
        "input": "[1,2,3,4,5]\n[6,7,8]",
        "output": "[1,2,3,4,5,6,7,8]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        ListNode dummy(0);\n        ListNode* tail = &dummy;\n        while (list1 && list2) {\n            if (list1->val < list2->val) {\n                tail->next = list1;\n                list1 = list1->next;\n            } else {\n                tail->next = list2;\n                list2 = list2->next;\n            }\n            tail = tail->next;\n        }\n        tail->next = list1 ? list1 : list2;\n        return dummy.next;\n    }\n};\n\nListNode* parseList(string line) {\n    if (line.front() == '[') line = line.substr(1);\n    if (line.back() == ']') line.pop_back();\n    if (line.empty()) return nullptr;\n    stringstream ss(line);\n    string val;\n    ListNode* dummy = new ListNode(0);\n    ListNode* curr = dummy;\n    while (getline(ss, val, ',')) {\n        curr->next = new ListNode(stoi(val));\n        curr = curr->next;\n    }\n    return dummy->next;\n}\n\nint main() {\n    string line1, line2;\n    if (getline(cin, line1) && getline(cin, line2)) {\n        ListNode* l1 = parseList(line1);\n        ListNode* l2 = parseList(line2);\n        Solution s;\n        ListNode* merged = s.mergeTwoLists(l1, l2);\n        cout << \"[\";\n        while (merged) {\n            cout << merged->val;\n            if (merged->next) cout << \",\";\n            merged = merged->next;\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        ListNode dummy = new ListNode(0);\n        ListNode tail = dummy;\n        while (list1 != null && list2 != null) {\n            if (list1.val < list2.val) {\n                tail.next = list1;\n                list1 = list1.next;\n            } else {\n                tail.next = list2;\n                list2 = list2.next;\n            }\n            tail = tail.next;\n        }\n        tail.next = (list1 != null) ? list1 : list2;\n        return dummy.next;\n    }\n\n    private static ListNode parseList(String line) {\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) return null;\n        String[] parts = line.split(\",\");\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String part : parts) {\n            curr.next = new ListNode(Integer.parseInt(part.trim()));\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        String line2 = br.readLine();\n        if (line1 == null || line2 == null) return;\n        ListNode l1 = parseList(line1);\n        ListNode l2 = parseList(line2);\n        Solution s = new Solution();\n        ListNode merged = s.mergeTwoLists(l1, l2);\n        StringBuilder sb = new StringBuilder(\"[\");\n        while (merged != null) {\n            sb.append(merged.val);\n            if (merged.next != null) sb.append(\",\");\n            merged = merged.next;\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:\n        dummy = ListNode(0)\n        tail = dummy\n        while list1 and list2:\n            if list1.val < list2.val:\n                tail.next = list1\n                list1 = list1.next\n            else:\n                tail.next = list2\n                list2 = list2.next\n            tail = tail.next\n        tail.next = list1 or list2\n        return dummy.next\n\ndef build_list(lst):\n    if not lst: return None\n    dummy = ListNode(0)\n    curr = dummy\n    for v in lst:\n        curr.next = ListNode(v)\n        curr = curr.next\n    return dummy.next\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        l1 = build_list(json.loads(lines[0]))\n        l2 = build_list(json.loads(lines[1]))\n        s = Solution()\n        merged = s.mergeTwoLists(l1, l2)\n        res = []\n        while merged:\n            res.append(merged.val)\n            merged = merged.next\n        print(json.dumps(res))"
      }
    ]
  },
  {
    "title": "Maximum Subarray",
    "description": "Given an integer array nums, find the subarray with the largest sum, and return its sum.\n\nConstraints:\n- 1 <= nums.length <= 10^5\n- -10^4 <= nums[i] <= 10^4",
    "difficulty": "easy",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[-2,1,-3,4,-1,2,1,-5,4]",
        "output": "6",
        "explanation": "The subarray [4,-1,2,1] has the largest sum = 6."
      },
      {
        "input": "[1]",
        "output": "1",
        "explanation": "The subarray [1] has the largest sum = 1."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[5,4,-1,7,8]",
        "output": "23"
      },
      {
        "input": "[-1]",
        "output": "-1"
      },
      {
        "input": "[-2,-1]",
        "output": "-1"
      },
      {
        "input": "[10,2,-2,-20,10]",
        "output": "55"
      },
      {
        "input": "[1,2,3,-10,4,5]",
        "output": "9"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        for (size_t i = 1; i < nums.size(); ++i) {\n            currentSum = max(nums[i], currentSum + nums[i]);\n            maxSum = max(maxSum, currentSum);\n        }\n        return maxSum;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        Solution s;\n        cout << s.maxSubArray(nums) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int maxSubArray(int[] nums) {\n        int maxSum = nums[0];\n        int currentSum = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            currentSum = Math.max(nums[i], currentSum + nums[i]);\n            maxSum = Math.max(maxSum, currentSum);\n        }\n        return maxSum;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        Solution s = new Solution();\n        System.out.println(s.maxSubArray(nums));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        max_sum = nums[0]\n        current_sum = nums[0]\n        for num in nums[1:]:\n            current_sum = max(num, current_sum + num)\n            max_sum = max(max_sum, current_sum)\n        return max_sum\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        nums = json.loads(input_data)\n        s = Solution()\n        print(s.maxSubArray(nums))"
      }
    ]
  },
  {
    "title": "Climbing Stairs",
    "description": "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nConstraints:\n- 1 <= n <= 45",
    "difficulty": "easy",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "2",
        "output": "2",
        "explanation": "There are two ways to climb to the top: 1 step + 1 step, or 2 steps."
      },
      {
        "input": "3",
        "output": "3",
        "explanation": "There are three ways to climb to the top: 1 step + 1 step + 1 step, 1 step + 2 steps, or 2 steps + 1 step."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "1",
        "output": "1"
      },
      {
        "input": "5",
        "output": "8"
      },
      {
        "input": "10",
        "output": "89"
      },
      {
        "input": "20",
        "output": "10946"
      },
      {
        "input": "35",
        "output": "14930352"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) return n;\n        int first = 1, second = 2;\n        for (int i = 3; i <= n; ++i) {\n            int third = first + second;\n            first = second;\n            second = third;\n        }\n        return second;\n    }\n};\n\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution s;\n        cout << s.climbStairs(n) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\n\nclass Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) return n;\n        int first = 1, second = 2;\n        for (int i = 3; i <= n; i++) {\n            int third = first + second;\n            first = second;\n            second = third;\n        }\n        return second;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        int n = Integer.parseInt(line.trim());\n        Solution s = new Solution();\n        System.out.println(s.climbStairs(n));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\n\nclass Solution:\n    def climbStairs(self, n: int) -> int:\n        if n <= 2: return n\n        first, second = 1, 2\n        for _ in range(3, n + 1):\n            first, second = second, first + second\n            \n        return second\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        s = Solution()\n        print(s.climbStairs(int(line)))"
      }
    ]
  },
  {
    "title": "Fibonacci Number",
    "description": "The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.\n\nF(0) = 0, F(1) = 1\nF(n) = F(n - 1) + F(n - 2), for n > 1.\nGiven n, calculate F(n).\n\nConstraints:\n- 0 <= n <= 30",
    "difficulty": "easy",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "2",
        "output": "1",
        "explanation": "F(2) = F(1) + F(0) = 1 + 0 = 1."
      },
      {
        "input": "3",
        "output": "2",
        "explanation": "F(3) = F(2) + F(1) = 1 + 1 = 2."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "0",
        "output": "0"
      },
      {
        "input": "4",
        "output": "3"
      },
      {
        "input": "10",
        "output": "55"
      },
      {
        "input": "20",
        "output": "6765"
      },
      {
        "input": "30",
        "output": "832040"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int fib(int n) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int fib(int n) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def fib(self, n: int) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int fib(int n) {\n        if (n <= 1) return n;\n        int prev2 = 0, prev1 = 1;\n        for (int i = 2; i <= n; ++i) {\n            int curr = prev2 + prev1;\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n};\n\nint main() {\n    int n;\n    if (cin >> n) {\n        Solution s;\n        cout << s.fib(n) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\n\nclass Solution {\n    public int fib(int n) {\n        if (n <= 1) return n;\n        int prev2 = 0, prev1 = 1;\n        for (int i = 2; i <= n; i++) {\n            int curr = prev2 + prev1;\n            prev2 = prev1;\n            prev1 = curr;\n        }\n        return prev1;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        int n = Integer.parseInt(line.trim());\n        Solution s = new Solution();\n        System.out.println(s.fib(n));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\n\nclass Solution:\n    def fib(self, n: int) -> int:\n        if n <= 1: return n\n        prev2, prev1 = 0, 1\n        for _ in range(2, n + 1):\n            prev2, prev1 = prev1, prev2 + prev1\n        return prev1\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        s = Solution()\n        print(s.fib(int(line)))"
      }
    ]
  },
  {
    "title": "Palindrome Linked List",
    "description": "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.\n\nConstraints:\n- The number of nodes in the list is in the range [1, 10^5].\n- 0 <= Node.val <= 9",
    "difficulty": "easy",
    "tags": "linkedList",
    "visibleTestCases": [
      {
        "input": "[1,2,2,1]",
        "output": "true",
        "explanation": "The list reads [1,2,2,1] from left to right and [1,2,2,1] from right to left."
      },
      {
        "input": "[1,2]",
        "output": "false",
        "explanation": "The list reads [1,2] from left to right, and [2,1] from right to left, which is not equal."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1]",
        "output": "true"
      },
      {
        "input": "[1,2,3,2,1]",
        "output": "true"
      },
      {
        "input": "[1,2,3,3,2,1]",
        "output": "true"
      },
      {
        "input": "[1,2,3,4,2,1]",
        "output": "false"
      },
      {
        "input": "[1,1,2,1]",
        "output": "false"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {} \n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public boolean isPalindrome(ListNode head) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        if (!head || !head->next) return true;\n        ListNode* slow = head;\n        ListNode* fast = head;\n        while (fast->next && fast->next->next) {\n            slow = slow->next;\n            fast = fast->next->next;\n        }\n        ListNode* prev = nullptr;\n        ListNode* curr = slow->next;\n        while (curr) {\n            ListNode* nextTemp = curr->next;\n            curr->next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        ListNode* p1 = head;\n        ListNode* p2 = prev;\n        while (p2) {\n            if (p1->val != p2->val) return false;\n            p1 = p1->next;\n            p2 = p2->next;\n        }\n        return true;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        if (line.empty()) {\n            cout << \"true\" << endl;\n            return 0;\n        }\n        stringstream ss(line);\n        string val;\n        ListNode* dummy = new ListNode(0);\n        ListNode* curr = dummy;\n        while (getline(ss, val, ',')) {\n            curr->next = new ListNode(stoi(val));\n            curr = curr->next;\n        }\n        Solution s;\n        cout << (s.isPalindrome(dummy->next) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public boolean isPalindrome(ListNode head) {\n        if (head == null || head.next == null) return true;\n        ListNode slow = head;\n        ListNode fast = head;\n        while (fast.next != null && fast.next.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n        }\n        ListNode prev = null;\n        ListNode curr = slow.next;\n        while (curr != null) {\n            ListNode nextTemp = curr.next;\n            curr.next = prev;\n            prev = curr;\n            curr = nextTemp;\n        }\n        ListNode p1 = head;\n        ListNode p2 = prev;\n        while (p2 != null) {\n            if (p1.val != p2.val) return false;\n            p1 = p1.next;\n            p2 = p2.next;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) {\n            System.out.println(\"true\");\n            return;\n        }\n        String[] parts = line.split(\",\");\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String part : parts) {\n            curr.next = new ListNode(Integer.parseInt(part.trim()));\n            curr = curr.next;\n        }\n        Solution s = new Solution();\n        System.out.println(s.isPalindrome(dummy.next) ? \"true\" : \"false\");\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def isPalindrome(self, head: ListNode) -> bool:\n        if not head or not head.next:\n            return True\n        slow, fast = head, head\n        while fast.next and fast.next.next:\n            slow = slow.next\n            fast = fast.next.next\n        \n        prev = None\n        curr = slow.next\n        while curr:\n            nxt = curr.next\n            curr.next = prev\n            prev = curr\n            curr = nxt\n            \n        p1, p2 = head, prev\n        while p2:\n            if p1.val != p2.val:\n                return False\n            p1 = p1.next\n            p2 = p2.next\n        return True\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        print(\"true\")\n        sys.exit(0)\n    try:\n        lst = json.loads(input_data)\n    except:\n        print(\"true\")\n        sys.exit(0)\n    if not lst:\n        print(\"true\")\n        sys.exit(0)\n    dummy = ListNode(0)\n    curr = dummy\n    for val in lst:\n        curr.next = ListNode(val)\n        curr = curr.next\n    s = Solution()\n    print(\"true\" if s.isPalindrome(dummy.next) else \"false\")"
      }
    ]
  },
  {
    "title": "Find Peak Element",
    "description": "A peak element is an element that is strictly greater than its neighbors.\n\nGiven a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\n\nYou may imagine that nums[-1] = nums[n] = -infinity. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.\n\nYou must write an algorithm that runs in O(log n) time.\n\nConstraints:\n- 1 <= nums.length <= 1000\n- -2^31 <= nums[i] <= 2^31 - 1\n- nums[i] != nums[i + 1] for all valid i.",
    "difficulty": "easy",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[1,2,3,1]",
        "output": "2",
        "explanation": "3 is a peak element and your function should return the index number 2."
      },
      {
        "input": "[1,2,1,3,5,6,4]",
        "output": "5",
        "explanation": "Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1]",
        "output": "0"
      },
      {
        "input": "[1,2]",
        "output": "1"
      },
      {
        "input": "[2,1]",
        "output": "0"
      },
      {
        "input": "[1,3,2,4,5,2]",
        "output": "4"
      },
      {
        "input": "[1,5,10,20,15,12,5,2]",
        "output": "3"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int findPeakElement(int[] nums) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def findPeakElement(self, nums: List[int]) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        int left = 0, right = nums.size() - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[mid + 1]) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        Solution s;\n        cout << s.findPeakElement(nums) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int findPeakElement(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] > nums[mid + 1]) {\n                right = mid;\n            } else {\n                left = mid + 1;\n            }\n        }\n        return left;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        Solution s = new Solution();\n        System.out.println(s.findPeakElement(nums));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def findPeakElement(self, nums: list[int]) -> int:\n        left, right = 0, len(nums) - 1\n        while left < right:\n            mid = (left + right) // 2\n            if nums[mid] > nums[mid + 1]:\n                right = mid\n            else:\n                left = mid + 1\n        return left\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        nums = json.loads(input_data)\n        s = Solution()\n        print(s.findPeakElement(nums))"
      }
    ]
  },
  {
    "title": "Path Sum",
    "description": "Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.\n\nA leaf is a node with no children. (To represent the tree input, we use standard level-order BFS array serialization, e.g. [5,4,8,11,null,13,4] where null represents missing nodes).\n\nConstraints:\n- The number of nodes in the tree is in the range [0, 5000].\n- -1000 <= Node.val <= 1000\n- -1000 <= targetSum <= 1000",
    "difficulty": "easy",
    "tags": "graph",
    "visibleTestCases": [
      {
        "input": "[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22",
        "output": "true",
        "explanation": "The root-to-leaf path 5 -> 4 -> 11 -> 2 sums to 22."
      },
      {
        "input": "[1,2,3]\n5",
        "output": "false",
        "explanation": "No root-to-leaf path sums to 5."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[]\n0",
        "output": "false"
      },
      {
        "input": "[1,2]\n3",
        "output": "true"
      },
      {
        "input": "[1,2]\n1",
        "output": "false"
      },
      {
        "input": "[1,null,3]\n4",
        "output": "true"
      },
      {
        "input": "[-2,null,-3]\n-5",
        "output": "true"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int targetSum) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n#include <queue>\n\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    bool hasPathSum(TreeNode* root, int targetSum) {\n        if (!root) return false;\n        if (!root->left && !root->right) return targetSum == root->val;\n        return hasPathSum(root->left, targetSum - root->val) || hasPathSum(root->right, targetSum - root->val);\n    }\n};\n\nTreeNode* deserialize(string line) {\n    if (line.front() == '[') line = line.substr(1);\n    if (line.back() == ']') line.pop_back();\n    if (line.empty()) return nullptr;\n    stringstream ss(line);\n    string item;\n    vector<string> items;\n    while (getline(ss, item, ',')) {\n        items.push_back(item);\n    }\n    if (items.empty()) return nullptr;\n    TreeNode* root = new TreeNode(stoi(items[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (!q.empty() && i < items.size()) {\n        TreeNode* curr = q.front();\n        q.pop();\n        if (items[i] != \"null\" && items[i] != \"\") {\n            curr->left = new TreeNode(stoi(items[i]));\n            q.push(curr->left);\n        }\n        i++;\n        if (i < items.size() && items[i] != \"null\" && items[i] != \"\") {\n            curr->right = new TreeNode(stoi(items[i]));\n            q.push(curr->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        TreeNode* root = deserialize(line);\n        int targetSum;\n        cin >> targetSum;\n        Solution s;\n        cout << (s.hasPathSum(root, targetSum) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left, right;\n    TreeNode(int x) { val = x; }\n}\n\nclass Solution {\n    public boolean hasPathSum(TreeNode root, int targetSum) {\n        if (root == null) return false;\n        if (root.left == null && root.right == null) return targetSum == root.val;\n        return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);\n    }\n\n    private static TreeNode deserialize(String line) {\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) return null;\n        String[] parts = line.split(\",\");\n        TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < parts.length) {\n            TreeNode curr = q.poll();\n            if (!parts[i].trim().equals(\"null\") && !parts[i].trim().isEmpty()) {\n                curr.left = new TreeNode(Integer.parseInt(parts[i].trim()));\n                q.add(curr.left);\n            }\n            i++;\n            if (i < parts.length && !parts[i].trim().equals(\"null\") && !parts[i].trim().isEmpty()) {\n                curr.right = new TreeNode(Integer.parseInt(parts[i].trim()));\n                q.add(curr.right);\n            }\n            i++;\n        }\n        return root;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        String targetLine = br.readLine();\n        if (line == null || targetLine == null) return;\n        TreeNode root = deserialize(line);\n        int targetSum = Integer.parseInt(targetLine.trim());\n        Solution s = new Solution();\n        System.out.println(s.hasPathSum(root, targetSum) ? \"true\" : \"false\");\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nclass Solution:\n    def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:\n        if not root:\n            return False\n        if not root.left and not root.right:\n            return targetSum == root.val\n        return self.hasPathSum(root.left, targetSum - root.val) or self.hasPathSum(root.right, targetSum - root.val)\n\ndef deserialize(lst):\n    if not lst: return None\n    root = TreeNode(lst[0])\n    q = [root]\n    i = 1\n    while q and i < len(lst):\n        curr = q.pop(0)\n        if lst[i] is not None:\n            curr.left = TreeNode(lst[i])\n            q.append(curr.left)\n        i += 1\n        if i < len(lst) and lst[i] is not None:\n            curr.right = TreeNode(lst[i])\n            q.append(curr.right)\n        i += 1\n    return root\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        root = deserialize(json.loads(lines[0]))\n        targetSum = int(lines[1])\n        s = Solution()\n        print(\"true\" if s.hasPathSum(root, targetSum) else \"false\")"
      }
    ]
  },
  {
    "title": "Valid Parentheses",
    "description": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.\n\nConstraints:\n- 1 <= s.length <= 10^4\n- s consists of parentheses only '()[]{}'.",
    "difficulty": "easy",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "\"()\"",
        "output": "true",
        "explanation": "The parentheses match perfectly."
      },
      {
        "input": "\"()[]{}\"",
        "output": "true",
        "explanation": "All bracket types open and close correctly."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "\"(]\"",
        "output": "false"
      },
      {
        "input": "\"([)]\"",
        "output": "false"
      },
      {
        "input": "\"{[]}\"",
        "output": "true"
      },
      {
        "input": "\"[\"",
        "output": "false"
      },
      {
        "input": "\"]\"",
        "output": "false"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def isValid(self, s: str) -> bool:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <string>\n#include <stack>\n#include <iostream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        for (char c : s) {\n            if (c == '(' || c == '{' || c == '[') {\n                st.push(c);\n            } else {\n                if (st.empty()) return false;\n                if (c == ')' && st.top() != '(') return false;\n                if (c == '}' && st.top() != '{') return false;\n                if (c == ']' && st.top() != '[') return false;\n                st.pop();\n            }\n        }\n        return st.empty();\n    }\n};\n\nint main() {\n    string s;\n    if (cin >> s) {\n        if (s.front() == '\"') s = s.substr(1);\n        if (s.back() == '\"') s.pop_back();\n        Solution solver;\n        cout << (solver.isValid(s) ? \"true\" : \"false\") << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(' || c == '{' || c == '[') {\n                stack.push(c);\n            } else {\n                if (stack.isEmpty()) return false;\n                if (c == ')' && stack.peek() != '(') return false;\n                if (c == '}' && stack.peek() != '{') return false;\n                if (c == ']' && stack.peek() != '[') return false;\n                stack.pop();\n            }\n        }\n        return stack.isEmpty();\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"\\\"\", \"\");\n        Solution s = new Solution();\n        System.out.println(s.isValid(line) ? \"true\" : \"false\");\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\n\nclass Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {\")\": \"(\", \"}\": \"{\", \"]\": \"[\"}\n        for char in s:\n            if char in mapping:\n                top_element = stack.pop() if stack else '#'\n                if mapping[char] != top_element:\n                    return False\n            else:\n                stack.append(char)\n        return not stack\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        line = line.replace('\"', '')\n        s = Solution()\n        print(\"true\" if s.isValid(line) else \"false\")"
      }
    ]
  },
  {
    "title": "Container With Most Water",
    "description": "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.\n\nConstraints:\n- n == height.length\n- 2 <= n <= 10^5\n- 0 <= height[i] <= 10^4",
    "difficulty": "medium",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[1,8,6,2,5,4,8,3,7]",
        "output": "49",
        "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49."
      },
      {
        "input": "[1,1]",
        "output": "1",
        "explanation": "Max area is min(1, 1) * 1 = 1."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[4,3,2,1,4]",
        "output": "16"
      },
      {
        "input": "[1,2,1]",
        "output": "2"
      },
      {
        "input": "[2,3,4,5,18,17,6]",
        "output": "17"
      },
      {
        "input": "[1,10,9,1,1,1,10,1,1]",
        "output": "50"
      },
      {
        "input": "[10,9,8,7,6,5,4,3,2,1]",
        "output": "25"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int maxVal = 0;\n        int left = 0, right = height.size() - 1;\n        while (left < right) {\n            int h = min(height[left], height[right]);\n            maxVal = max(maxVal, h * (right - left));\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxVal;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> height;\n        while (getline(ss, val, ',')) {\n            height.push_back(stoi(val));\n        }\n        Solution s;\n        cout << s.maxArea(height) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int maxArea(int[] height) {\n        int maxVal = 0;\n        int left = 0, right = height.length - 1;\n        while (left < right) {\n            int h = Math.min(height[left], height[right]);\n            maxVal = Math.max(maxVal, h * (right - left));\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        return maxVal;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] height = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            height[i] = Integer.parseInt(parts[i].trim());\n        }\n        Solution s = new Solution();\n        System.out.println(s.maxArea(height));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def maxArea(self, height: list[int]) -> int:\n        max_val = 0\n        left, right = 0, len(height) - 1\n        while left < right:\n            h = min(height[left], height[right])\n            max_val = max(max_val, h * (right - left))\n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        return max_val\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        height = json.loads(input_data)\n        s = Solution()\n        print(s.maxArea(height))"
      }
    ]
  },
  {
    "title": "3Sum",
    "description": "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\nConstraints:\n- 3 <= nums.length <= 3000\n- -10^5 <= nums[i] <= 10^5",
    "difficulty": "medium",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[-1,0,1,2,-1,-4]",
        "output": "[[-1,-1,2],[-1,0,1]]",
        "explanation": "Out of the given integers, the unique triplets that sum to 0 are [-1,-1,2] and [-1,0,1]."
      },
      {
        "input": "[0,1,1]",
        "output": "[]",
        "explanation": "The only possible triplet does not sum up to 0."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[0,0,0]",
        "output": "[[0,0,0]]"
      },
      {
        "input": "[1,2,-2,-1]",
        "output": "[]"
      },
      {
        "input": "[-2,0,0,2,2]",
        "output": "[[-2,0,2]]"
      },
      {
        "input": "[-1,0,1,2,-1,-4,2,-2]",
        "output": "[[-2,0,2],[-2,1,1],[-1,-1,2],[-1,0,1]]"
      },
      {
        "input": "[-5,1,1,1,2,3]",
        "output": "[[-5,2,3]]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        vector<vector<int>> res;\n        sort(nums.begin(), nums.end());\n        for (int i = 0; i < (int)nums.size() - 2; ++i) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int left = i + 1, right = nums.size() - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    res.push_back({nums[i], nums[left], nums[right]});\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        Solution s;\n        vector<vector<int>> res = s.threeSum(nums);\n        cout << \"[\";\n        for (size_t i = 0; i < res.size(); ++i) {\n            cout << \"[\" << res[i][0] << \",\" << res[i][1] << \",\" << res[i][2] << \"]\";\n            if (i < res.size() - 1) cout << \",\";\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        Arrays.sort(nums);\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int left = i + 1, right = nums.length - 1;\n            while (left < right) {\n                int sum = nums[i] + nums[left] + nums[right];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    while (left < right && nums[left] == nums[left + 1]) left++;\n                    while (left < right && nums[right] == nums[right - 1]) right--;\n                    left++;\n                    right--;\n                } else if (sum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        return res;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        Solution s = new Solution();\n        List<List<Integer>> res = s.threeSum(nums);\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int i = 0; i < res.size(); i++) {\n            sb.append(\"[\").append(res.get(i).get(0)).append(\",\").append(res.get(i).get(1)).append(\",\").append(res.get(i).get(2)).append(\"]\");\n            if (i < res.size() - 1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        res = []\n        nums.sort()\n        for i in range(len(nums) - 2):\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            left, right = i + 1, len(nums) - 1\n            while left < right:\n                s = nums[i] + nums[left] + nums[right]\n                if s == 0:\n                    res.append([nums[i], nums[left], nums[right]])\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    left += 1\n                    right -= 1\n                elif s < 0:\n                    left += 1\n                else:\n                    right -= 1\n        return res\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        nums = json.loads(input_data)\n        s = Solution()\n        print(json.dumps(s.threeSum(nums)))"
      }
    ]
  },
  {
    "title": "Longest Palindromic Substring",
    "description": "Given a string s, return the longest palindromic substring in s.\n\nConstraints:\n- 1 <= s.length <= 1000\n- s consists of only digits and English letters.",
    "difficulty": "medium",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "\"babad\"",
        "output": "\"bab\"",
        "explanation": "\"aba\" is also a valid answer."
      },
      {
        "input": "\"cbbd\"",
        "output": "\"bb\"",
        "explanation": "The longest palindromic substring is \"bb\"."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "\"a\"",
        "output": "\"a\""
      },
      {
        "input": "\"ac\"",
        "output": "\"a\""
      },
      {
        "input": "\"racecar\"",
        "output": "\"racecar\""
      },
      {
        "input": "\"forgeeksskeegfor\"",
        "output": "\"geeksskeeg\""
      },
      {
        "input": "\"abacdfgfeek\"",
        "output": "\"effe\""
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <string>\n#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        if (s.empty()) return \"\";\n        int start = 0, maxLen = 1;\n        auto expand = [&](int l, int r) {\n            while (l >= 0 && r < s.length() && s[l] == s[r]) {\n                int len = r - l + 1;\n                if (len > maxLen) {\n                    maxLen = len;\n                    start = l;\n                }\n                l--;\n                r++;\n            }\n        };\n        for (int i = 0; i < s.length(); ++i) {\n            expand(i, i);\n            expand(i, i + 1);\n        }\n        return s.substr(start, maxLen);\n    }\n};\n\nint main() {\n    string s;\n    if (cin >> s) {\n        if (s.front() == '\"') s = s.substr(1);\n        if (s.back() == '\"') s.pop_back();\n        Solution solver;\n        cout << \"\\\"\" << solver.longestPalindrome(s) << \"\\\"\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\n\nclass Solution {\n    public String longestPalindrome(String s) {\n        if (s == null || s.length() < 1) return \"\";\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int len1 = expandAroundCenter(s, i, i);\n            int len2 = expandAroundCenter(s, i, i + 1);\n            int len = Math.max(len1, len2);\n            if (len > end - start) {\n                start = i - (len - 1) / 2;\n                end = i + len / 2;\n            }\n        }\n        return s.substring(start, end + 1);\n    }\n\n    private int expandAroundCenter(String s, int left, int right) {\n        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {\n            left--;\n            right++;\n        }\n        return right - left - 1;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"\\\"\", \"\");\n        Solution s = new Solution();\n        System.out.println(\"\\\"\" + s.longestPalindrome(line) + \"\\\"\");\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\n\nclass Solution:\n    def longestPalindrome(self, s: str) -> str:\n        if not s: return \"\"\n        start, end = 0, 0\n        for i in range(len(s)):\n            len1 = self.expandAroundCenter(s, i, i)\n            len2 = self.expandAroundCenter(s, i, i + 1)\n            l = max(len1, len2)\n            if l > end - start:\n                start = i - (l - 1) // 2\n                end = i + l // 2\n        return s[start:end + 1]\n        \n    def expandAroundCenter(self, s: str, left: int, right: int) -> int:\n        while left >= 0 and right < len(s) and s[left] == s[right]:\n            left -= 1\n            right += 1\n        return right - left - 1\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if line:\n        line = line.replace('\"', '')\n        s = Solution()\n        print(f'\"{s.longestPalindrome(line)}\"')"
      }
    ]
  },
  {
    "title": "Unique Paths",
    "description": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nGiven the two integers m and n, return the number of possible unique paths that the robot can take to reach the bottom-right corner.\n\nConstraints:\n- 1 <= m, n <= 100",
    "difficulty": "medium",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "3\n7",
        "output": "28",
        "explanation": "From the top-left corner, there are a total of 28 unique paths to the bottom-right corner."
      },
      {
        "input": "3\n2",
        "output": "3",
        "explanation": "From the top-left corner, there are a total of 3 unique paths (Right -> Down -> Down, Down -> Down -> Right, Down -> Right -> Down)."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "1\n1",
        "output": "1"
      },
      {
        "input": "10\n10",
        "output": "48620"
      },
      {
        "input": "5\n5",
        "output": "70"
      },
      {
        "input": "12\n4",
        "output": "364"
      },
      {
        "input": "23\n12",
        "output": "193536720"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        vector<int> row(n, 1);\n        for (int i = 1; i < m; ++i) {\n            for (int j = 1; j < n; ++j) {\n                row[j] += row[j - 1];\n            }\n        }\n        return row[n - 1];\n    }\n};\n\nint main() {\n    int m, n;\n    if (cin >> m >> n) {\n        Solution s;\n        cout << s.uniquePaths(m, n) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\n\nclass Solution {\n    public int uniquePaths(int m, int n) {\n        int[] row = new int[n];\n        java.util.Arrays.fill(row, 1);\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                row[j] += row[j - 1];\n            }\n        }\n        return row[n - 1];\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String mLine = br.readLine();\n        String nLine = br.readLine();\n        if (mLine == null || nLine == null) return;\n        int m = Integer.parseInt(mLine.trim());\n        int n = Integer.parseInt(nLine.trim());\n        Solution s = new Solution();\n        System.out.println(s.uniquePaths(m, n));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\n\nclass Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        row = [1] * n\n        for i in range(1, m):\n            for j in range(1, n):\n                row[j] += row[j - 1]\n        return row[-1]\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        m = int(lines[0])\n        n = int(lines[1])\n        s = Solution()\n        print(s.uniquePaths(m, n))"
      }
    ]
  },
  {
    "title": "Add Two Numbers",
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.\n\nConstraints:\n- The number of nodes in each linked list is in the range [1, 100].\n- 0 <= Node.val <= 9\n- It is guaranteed that the list represents a number that does not have leading zeros.",
    "difficulty": "medium",
    "tags": "linkedList",
    "visibleTestCases": [
      {
        "input": "[2,4,3]\n[5,6,4]",
        "output": "[7,0,8]",
        "explanation": "342 + 465 = 807."
      },
      {
        "input": "[0]\n[0]",
        "output": "[0]",
        "explanation": "0 + 0 = 0."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[9,9,9,9,9,9,9]\n[9,9,9,9]",
        "output": "[8,9,9,9,0,0,0,1]"
      },
      {
        "input": "[1]\n[9,9]",
        "output": "[0,0,1]"
      },
      {
        "input": "[5]\n[5]",
        "output": "[0,1]"
      },
      {
        "input": "[2,4]\n[5,6]",
        "output": "[7,0,1]"
      },
      {
        "input": "[0,1]\n[0,2]",
        "output": "[0,3]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* curr = &dummy;\n        int carry = 0;\n        while (l1 || l2 || carry) {\n            int sum = carry;\n            if (l1) {\n                sum += l1->val;\n                l1 = l1->next;\n            }\n            if (l2) {\n                sum += l2->val;\n                l2 = l2->next;\n            }\n            carry = sum / 10;\n            curr->next = new ListNode(sum % 10);\n            curr = curr->next;\n        }\n        return dummy.next;\n    }\n};\n\nListNode* parseList(string line) {\n    if (line.front() == '[') line = line.substr(1);\n    if (line.back() == ']') line.pop_back();\n    if (line.empty()) return nullptr;\n    stringstream ss(line);\n    string val;\n    ListNode* dummy = new ListNode(0);\n    ListNode* curr = dummy;\n    while (getline(ss, val, ',')) {\n        curr->next = new ListNode(stoi(val));\n        curr = curr->next;\n    }\n    return dummy->next;\n}\n\nint main() {\n    string line1, line2;\n    if (getline(cin, line1) && getline(cin, line2)) {\n        ListNode* l1 = parseList(line1);\n        ListNode* l2 = parseList(line2);\n        Solution s;\n        ListNode* sum = s.addTwoNumbers(l1, l2);\n        cout << \"[\";\n        while (sum) {\n            cout << sum->val;\n            if (sum->next) cout << \",\";\n            sum = sum->next;\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        int carry = 0;\n        while (l1 != null || l2 != null || carry != 0) {\n            int sum = carry;\n            if (l1 != null) {\n                sum += l1.val;\n                l1 = l1.next;\n            }\n            if (l2 != null) {\n                sum += l2.val;\n                l2 = l2.next;\n            }\n            carry = sum / 10;\n            curr.next = new ListNode(sum % 10);\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n\n    private static ListNode parseList(String line) {\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) return null;\n        String[] parts = line.split(\",\");\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String part : parts) {\n            curr.next = new ListNode(Integer.parseInt(part.trim()));\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        String line2 = br.readLine();\n        if (line1 == null || line2 == null) return;\n        ListNode l1 = parseList(line1);\n        ListNode l2 = parseList(line2);\n        Solution s = new Solution();\n        ListNode sum = s.addTwoNumbers(l1, l2);\n        StringBuilder sb = new StringBuilder(\"[\");\n        while (sum != null) {\n            sb.append(sum.val);\n            if (sum.next != null) sb.append(\",\");\n            sum = sum.next;\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\n        dummy = ListNode(0)\n        curr = dummy\n        carry = 0\n        while l1 or l2 or carry:\n            s = carry\n            if l1:\n                s += l1.val\n                l1 = l1.next\n            if l2:\n                s += l2.val\n                l2 = l2.next\n            carry = s // 10\n            curr.next = ListNode(s % 10)\n            curr = curr.next\n        return dummy.next\n\ndef build_list(lst):\n    if not lst: return None\n    dummy = ListNode(0)\n    curr = dummy\n    for v in lst:\n        curr.next = ListNode(v)\n        curr = curr.next\n    return dummy.next\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        l1 = build_list(json.loads(lines[0]))\n        l2 = build_list(json.loads(lines[1]))\n        s = Solution()\n        res_list = s.addTwoNumbers(l1, l2)\n        res = []\n        while res_list:\n            res.append(res_list.val)\n            res = res_list.next\n        print(json.dumps(res))"
      }
    ]
  },
  {
    "title": "Clone Graph",
    "description": "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.\n\nEach node in the graph contains a value (int) and a list (List[Node]) of its neighbors.\n\n(For test serialization, the input graph is serialized as an adjacency list representation: e.g. [[2,4],[1,3],[2,4],[1,3]]).\n\nConstraints:\n- The number of nodes in the graph is in the range [0, 100].\n- 1 <= Node.val <= 100\n- Node.val is unique for each node.\n- There are no repeated edges and no self-loops in the graph.\n- The Graph is connected and all nodes can be visited starting from the first node.",
    "difficulty": "medium",
    "tags": "graph",
    "visibleTestCases": [
      {
        "input": "[[2,4],[1,3],[2,4],[1,3]]",
        "output": "[[2,4],[1,3],[2,4],[1,3]]",
        "explanation": "There are 4 nodes in the graph."
      },
      {
        "input": "[[]]",
        "output": "[[]]",
        "explanation": "Graph with one single node."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[]",
        "output": "[]"
      },
      {
        "input": "[[2],[1]]",
        "output": "[[2],[1]]"
      },
      {
        "input": "[[2,3],[1,3],[1,2]]",
        "output": "[[2,3],[1,3],[1,2]]"
      },
      {
        "input": "[[2,3,4],[1,3,4],[1,2,4],[1,2,3]]",
        "output": "[[2,3,4],[1,3,4],[1,2,4],[1,2,3]]"
      },
      {
        "input": "[[2,5],[1,3],[2,4],[3,5],[1,4]]",
        "output": "[[2,5],[1,3],[2,4],[3,5],[1,4]]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/*\n// Definition for a Node.\nclass Node {\npublic:\n    int val;\n    vector<Node*> neighbors;\n    Node() {\n        val = 0;\n        neighbors = vector<Node*>();\n    }\n    Node(int _val) {\n        val = _val;\n        neighbors = vector<Node*>();\n    }\n    Node(int _val, vector<Node*> _neighbors) {\n        val = _val;\n        neighbors = _neighbors;\n    }\n};\n*/\n\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/*\n// Definition for a Node.\nclass Node {\n    public int val;\n    public List<Node> neighbors;\n    public Node() {\n        val = 0;\n        neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val) {\n        val = _val;\n        neighbors = new ArrayList<Node>();\n    }\n    public Node(int _val, ArrayList<Node> _neighbors) {\n        val = _val;\n        neighbors = _neighbors;\n    }\n}\n*/\n\nclass Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "\"\"\"\n# Definition for a Node.\nclass Node:\n    def __init__(self, val = 0, neighbors = None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\n\"\"\"\n\nclass Solution:\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <string>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Node {\npublic:\n    int val;\n    vector<Node*> neighbors;\n    Node(int _val) : val(_val) {}\n};\n\nclass Solution {\npublic:\n    unordered_map<Node*, Node*> clones;\n    Node* cloneGraph(Node* node) {\n        if (!node) return nullptr;\n        if (clones.count(node)) return clones[node];\n        Node* copy = new Node(node->val);\n        clones[node] = copy;\n        for (Node* neighbor : node->neighbors) {\n            copy->neighbors.push_back(cloneGraph(neighbor));\n        }\n        return copy;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line == \"[]\") {\n            cout << \"[]\" << endl;\n            return 0;\n        }\n        line.erase(remove(line.begin(), line.end(), ' '), line.end());\n        // Basic parser for nested arrays\n        vector<vector<int>> adj;\n        int i = 1;\n        while (i < line.size() - 1) {\n            if (line[i] == '[') {\n                i++;\n                vector<int> curr;\n                string val = \"\";\n                while (line[i] != ']') {\n                    if (line[i] == ',') {\n                        if (!val.empty()) curr.push_back(stoi(val));\n                        val = \"\";\n                    } else {\n                        val += line[i];\n                    }\n                    i++;\n                }\n                if (!val.empty()) curr.push_back(stoi(val));\n                adj.push_back(curr);\n            }\n            i++;\n        }\n        int n = adj.size();\n        vector<Node*> nodes(n + 1, nullptr);\n        for (int j = 1; j <= n; ++j) nodes[j] = new Node(j);\n        for (int j = 0; j < n; ++j) {\n            for (int neigh : adj[j]) {\n                nodes[j + 1]->neighbors.push_back(nodes[neigh]);\n            }\n        }\n        Solution s;\n        Node* cloned = s.cloneGraph(nodes[1]);\n        // Serialize back\n        cout << \"[\";\n        for (int j = 1; j <= n; ++j) {\n            cout << \"[\";\n            for (size_t k = 0; k < nodes[j]->neighbors.size(); ++k) {\n                cout << nodes[j]->neighbors[k]->val;\n                if (k < nodes[j]->neighbors.size() - 1) cout << \",\";\n            }\n            cout << \"]\";\n            if (j < n) cout << \",\";\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Node {\n    public int val;\n    public List<Node> neighbors;\n    public Node(int _val) {\n        val = _val;\n        neighbors = new ArrayList<>();\n    }\n}\n\nclass Solution {\n    private Map<Node, Node> clones = new HashMap<>();\n    public Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (clones.containsKey(node)) return clones.get(node);\n        Node copy = new Node(node.val);\n        clones.put(node, copy);\n        for (Node neighbor : node.neighbors) {\n            copy.neighbors.add(cloneGraph(neighbor));\n        }\n        return copy;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\" \", \"\");\n        if (line.equals(\"[]\")) {\n            System.out.println(\"[]\");\n            return;\n        }\n        List<List<Integer>> adj = new ArrayList<>();\n        int i = 1;\n        while (i < line.length() - 1) {\n            if (line.charAt(i) == '[') {\n                i++;\n                List<Integer> curr = new ArrayList<>();\n                StringBuilder val = new StringBuilder();\n                while (line.charAt(i) != ']') {\n                    if (line.charAt(i) == ',') {\n                        if (val.length() > 0) curr.add(Integer.parseInt(val.toString()));\n                        val = new StringBuilder();\n                    } else {\n                        val.append(line.charAt(i));\n                    }\n                    i++;\n                }\n                if (val.length() > 0) curr.add(Integer.parseInt(val.toString()));\n                adj.add(curr);\n            }\n            i++;\n        }\n        int n = adj.size();\n        Node[] nodes = new Node[n + 1];\n        for (int j = 1; j <= n; j++) nodes[j] = new Node(j);\n        for (int j = 0; j < n; j++) {\n            for (int neigh : adj.get(j)) {\n                nodes[j + 1].neighbors.add(nodes[neigh]);\n            }\n        }\n        Solution s = new Solution();\n        Node cloned = s.cloneGraph(nodes[1]);\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int j = 1; j <= n; j++) {\n            sb.append(\"[\");\n            for (int k = 0; k < nodes[j].neighbors.size(); k++) {\n                sb.append(nodes[j].neighbors.get(k).val);\n                if (k < nodes[j].neighbors.size() - 1) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            if (j < n) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Node:\n    def __init__(self, val = 0, neighbors = None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\n\nclass Solution:\n    def __init__(self):\n        self.clones = {}\n    def cloneGraph(self, node: 'Node') -> 'Node':\n        if not node: return None\n        if node in self.clones:\n            return self.clones[node]\n        copy = Node(node.val)\n        self.clones[node] = copy\n        for neighbor in node.neighbors:\n            copy.neighbors.append(self.cloneGraph(neighbor))\n        return copy\n\nif __name__ == '__main__':\n    line = sys.stdin.read().strip()\n    if not line or line == \"[]\":\n        print(\"[]\")\n        sys.exit(0)\n    adj = json.loads(line)\n    n = len(adj)\n    nodes = [None] + [Node(i) for i in range(1, n + 1)]\n    for i in range(n):\n        for neigh in adj[i]:\n            nodes[i + 1].neighbors.append(nodes[neigh])\n    s = Solution()\n    cloned = s.cloneGraph(nodes[1])\n    res = []\n    for i in range(1, n + 1):\n        res.append([neigh.val for neigh in nodes[i].neighbors])\n    print(json.dumps(res))"
      }
    ]
  },
  {
    "title": "Course Schedule",
    "description": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.\n\nFor example, the pair [0, 1], indicates that to take course 0 you must first take course 1.\nReturn true if you can finish all courses. Otherwise, return false.\n\nConstraints:\n- 1 <= numCourses <= 2000\n- 0 <= prerequisites.length <= 5000\n- prerequisites[i].length == 2\n- 0 <= ai, bi < numCourses\n- All the pairs prerequisites[i] are unique.",
    "difficulty": "medium",
    "tags": "graph",
    "visibleTestCases": [
      {
        "input": "2\n[[1,0]]",
        "output": "true",
        "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible."
      },
      {
        "input": "2\n[[1,0],[0,1]]",
        "output": "false",
        "explanation": "There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "1\n[]",
        "output": "true"
      },
      {
        "input": "3\n[[1,0],[2,1]]",
        "output": "true"
      },
      {
        "input": "4\n[[1,0],[2,1],[3,2],[1,3]]",
        "output": "false"
      },
      {
        "input": "5\n[[1,4],[2,4],[3,1],[3,2]]",
        "output": "true"
      },
      {
        "input": "8\n[[1,0],[2,6],[1,7],[6,4],[7,0],[0,5]]",
        "output": "true"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <queue>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        vector<vector<int>> adj(numCourses);\n        vector<int> indegree(numCourses, 0);\n        for (auto& pre : prerequisites) {\n            adj[pre[1]].push_back(pre[0]);\n            indegree[pre[0]]++;\n        }\n        queue<int> q;\n        for (int i = 0; i < numCourses; ++i) {\n            if (indegree[i] == 0) q.push(i);\n        }\n        int count = 0;\n        while (!q.empty()) {\n            int curr = q.front();\n            q.pop();\n            count++;\n            for (int neighbor : adj[curr]) {\n                indegree[neighbor]--;\n                if (indegree[neighbor] == 0) q.push(neighbor);\n            }\n        }\n        return count == numCourses;\n    }\n};\n\nint main() {\n    int numCourses;\n    if (cin >> numCourses) {\n        string line;\n        cin.ignore();\n        if (getline(cin, line)) {\n            line.erase(remove(line.begin(), line.end(), ' '), line.end());\n            vector<vector<int>> prerequisites;\n            if (line != \"[]\") {\n                int i = 1;\n                while (i < line.size() - 1) {\n                    if (line[i] == '[') {\n                        i++;\n                        string val1 = \"\", val2 = \"\";\n                        while (line[i] != ',') {\n                            val1 += line[i++];\n                        }\n                        i++;\n                        while (line[i] != ']') {\n                            val2 += line[i++];\n                        }\n                        prerequisites.push_back({stoi(val1), stoi(val2)});\n                    }\n                    i++;\n                }\n            }\n            Solution s;\n            cout << (s.canFinish(numCourses, prerequisites) ? \"true\" : \"false\") << endl;\n        }\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        int[] indegree = new int[numCourses];\n        for (int[] pre : prerequisites) {\n            adj.get(pre[1]).add(pre[0]);\n            indegree[pre[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) {\n            if (indegree[i] == 0) q.add(i);\n        }\n        int count = 0;\n        while (!q.isEmpty()) {\n            int curr = q.poll();\n            count++;\n            for (int neighbor : adj.get(curr)) {\n                indegree[neighbor]--;\n                if (indegree[neighbor] == 0) q.add(neighbor);\n            }\n        }\n        return count == numCourses;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String coursesLine = br.readLine();\n        String preLine = br.readLine();\n        if (coursesLine == null || preLine == null) return;\n        int numCourses = Integer.parseInt(coursesLine.trim());\n        preLine = preLine.trim().replace(\" \", \"\");\n        List<int[]> list = new ArrayList<>();\n        if (!preLine.equals(\"[]\")) {\n            int i = 1;\n            while (i < preLine.length() - 1) {\n                if (preLine.charAt(i) == '[') {\n                    i++;\n                    StringBuilder val1 = new StringBuilder();\n                    while (preLine.charAt(i) != ',') {\n                        val1.append(preLine.charAt(i++));\n                    }\n                    i++;\n                    StringBuilder val2 = new StringBuilder();\n                    while (preLine.charAt(i) != ']') {\n                        val2.append(preLine.charAt(i++));\n                    }\n                    list.add(new int[]{Integer.parseInt(val1.toString()), Integer.parseInt(val2.toString())});\n                }\n                i++;\n            }\n        }\n        int[][] prerequisites = list.toArray(new int[0][]);\n        Solution s = new Solution();\n        System.out.println(s.canFinish(numCourses, prerequisites) ? \"true\" : \"false\");\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\nfrom collections import deque\n\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        adj = [[] for _ in range(numCourses)]\n        indegree = [0] * numCourses\n        for dest, src in prerequisites:\n            adj[src].append(dest)\n            indegree[dest] += 1\n        q = deque([i for i in range(numCourses) if indegree[i] == 0])\n        count = 0\n        while q:\n            curr = q.popleft()\n            count += 1\n            for neighbor in adj[curr]:\n                indegree[neighbor] -= 1\n                if indegree[neighbor] == 0:\n                    q.append(neighbor)\n        return count == numCourses\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        numCourses = int(lines[0])\n        prerequisites = json.loads(lines[1])\n        s = Solution()\n        print(\"true\" if s.canFinish(numCourses, prerequisites) else \"false\")"
      }
    ]
  },
  {
    "title": "Coin Change",
    "description": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.\n\nConstraints:\n- 1 <= coins.length <= 12\n- 1 <= coins[i] <= 2^31 - 1\n- 0 <= amount <= 10^4",
    "difficulty": "medium",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "[1,2,5]\n11",
        "output": "3",
        "explanation": "11 = 5 + 5 + 1 (3 coins)."
      },
      {
        "input": "[2]\n3",
        "output": "-1",
        "explanation": "Amount 3 cannot be made with denomination 2."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1]\n0",
        "output": "0"
      },
      {
        "input": "[1,2,5]\n100",
        "output": "20"
      },
      {
        "input": "[186,419,83,408]\n6249",
        "output": "20"
      },
      {
        "input": "[3,5]\n7",
        "output": "-1"
      },
      {
        "input": "[10,20,50]\n80",
        "output": "3"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        vector<int> dp(amount + 1, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; ++i) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> coins;\n        while (getline(ss, val, ',')) {\n            coins.push_back(stoi(val));\n        }\n        int amount;\n        cin >> amount;\n        Solution s;\n        cout << s.coinChange(coins, amount) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] coins = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            coins[i] = Integer.parseInt(parts[i].trim());\n        }\n        int amount = Integer.parseInt(br.readLine().trim());\n        Solution s = new Solution();\n        System.out.println(s.coinChange(coins, amount));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        dp = [amount + 1] * (amount + 1)\n        dp[0] = 0\n        for i in range(1, amount + 1):\n            for coin in coins:\n                if coin <= i:\n                    dp[i] = min(dp[i], dp[i - coin] + 1)\n        return dp[amount] if dp[amount] <= amount else -1\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        coins = json.loads(lines[0])\n        amount = int(lines[1])\n        s = Solution()\n        print(s.coinChange(coins, amount))"
      }
    ]
  },
  {
    "title": "Reverse Nodes in k-Group",
    "description": "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.\n\nk is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.\n\nYou may not alter the values in the list's nodes, only nodes themselves may be changed.\n\nConstraints:\n- The number of nodes in the list is n.\n- 1 <= k <= n <= 5000\n- 0 <= Node.val <= 1000",
    "difficulty": "hard",
    "tags": "linkedList",
    "visibleTestCases": [
      {
        "input": "[1,2,3,4,5]\n2",
        "output": "[2,1,4,3,5]",
        "explanation": "Reversing every 2 nodes yields [2,1,4,3,5]."
      },
      {
        "input": "[1,2,3,4,5]\n3",
        "output": "[3,2,1,4,5]",
        "explanation": "Reversing every 3 nodes (leaving remaining end nodes unmodified) yields [3,2,1,4,5]."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1,2,3,4,5]\n1",
        "output": "[1,2,3,4,5]"
      },
      {
        "input": "[1,2,3,4,5,6]\n3",
        "output": "[3,2,1,6,5,4]"
      },
      {
        "input": "[1,2]\n2",
        "output": "[2,1]"
      },
      {
        "input": "[1,2,3,4,5,6,7,8]\n4",
        "output": "[4,3,2,1,8,7,6,5]"
      },
      {
        "input": "[10]\n1",
        "output": "[10]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        ListNode* curr = head;\n        int count = 0;\n        while (curr && count < k) {\n            curr = curr->next;\n            count++;\n        }\n        if (count == k) {\n            curr = reverseKGroup(curr, k);\n            while (count > 0) {\n                ListNode* tmp = head->next;\n                head->next = curr;\n                curr = head;\n                head = tmp;\n                count--;\n            }\n            head = curr;\n        }\n        return head;\n    }\n};\n\nListNode* parseList(string line) {\n    if (line.front() == '[') line = line.substr(1);\n    if (line.back() == ']') line.pop_back();\n    if (line.empty()) return nullptr;\n    stringstream ss(line);\n    string val;\n    ListNode* dummy = new ListNode(0);\n    ListNode* curr = dummy;\n    while (getline(ss, val, ',')) {\n        curr->next = new ListNode(stoi(val));\n        curr = curr->next;\n    }\n    return dummy->next;\n}\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        ListNode* l = parseList(line);\n        int k;\n        cin >> k;\n        Solution s;\n        ListNode* res = s.reverseKGroup(l, k);\n        cout << \"[\";\n        while (res) {\n            cout << res->val;\n            if (res->next) cout << \",\";\n            res = res->next;\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        ListNode curr = head;\n        int count = 0;\n        while (curr != null && count < k) {\n            curr = curr.next;\n            count++;\n        }\n        if (count == k) {\n            curr = reverseKGroup(curr, k);\n            while (count > 0) {\n                ListNode tmp = head.next;\n                head.next = curr;\n                curr = head;\n                head = tmp;\n                count--;\n            }\n            head = curr;\n        }\n        return head;\n    }\n\n    private static ListNode parseList(String line) {\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) return null;\n        String[] parts = line.split(\",\");\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String part : parts) {\n            curr.next = new ListNode(Integer.parseInt(part.trim()));\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String listLine = br.readLine();\n        String kLine = br.readLine();\n        if (listLine == null || kLine == null) return;\n        ListNode l = parseList(listLine);\n        int k = Integer.parseInt(kLine.trim());\n        Solution s = new Solution();\n        ListNode res = s.reverseKGroup(l, k);\n        StringBuilder sb = new StringBuilder(\"[\");\n        while (res != null) {\n            sb.append(res.val);\n            if (res.next != null) sb.append(\",\");\n            res = res.next;\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def reverseKGroup(self, head: ListNode, k: int) -> ListNode:\n        curr = head\n        count = 0\n        while curr and count < k:\n            curr = curr.next\n            count += 1\n        if count == k:\n            curr = self.reverseKGroup(curr, k)\n            while count > 0:\n                tmp = head.next\n                head.next = curr\n                curr = head\n                head = tmp\n                count -= 1\n            head = curr\n        return head\n\ndef build_list(lst):\n    if not lst: return None\n    dummy = ListNode(0)\n    curr = dummy\n    for v in lst:\n        curr.next = ListNode(v)\n        curr = curr.next\n    return dummy.next\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        l1 = build_list(json.loads(lines[0]))\n        k = int(lines[1])\n        s = Solution()\n        res_list = s.reverseKGroup(l1, k)\n        res = []\n        while res_list:\n            res.append(res_list.val)\n            res = res_list.next\n        print(json.dumps(res))"
      }
    ]
  },
  {
    "title": "Edit Distance",
    "description": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character\n\nConstraints:\n- 0 <= word1.length, word2.length <= 500\n- word1 and word2 consist of lowercase English letters.",
    "difficulty": "hard",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "\"horse\"\n\"ros\"",
        "output": "3",
        "explanation": "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e')"
      },
      {
        "input": "\"intention\"\n\"execution\"",
        "output": "5",
        "explanation": "intention -> entention (replace 'i' with 'e') -> extention (replace 'n' with 'x') -> exection (replace 't' with 'c') -> execution (replace 'n' with 'u')"
      }
    ],
    "hiddenTestCases": [
      {
        "input": "\"\"\n\"\"",
        "output": "0"
      },
      {
        "input": "\"a\"\n\"\"",
        "output": "1"
      },
      {
        "input": "\"\"\n\"b\"",
        "output": "1"
      },
      {
        "input": "\"abc\"\n\"yabyc\"",
        "output": "2"
      },
      {
        "input": "\"zoologicoarchaeologist\"\n\"zoogeologist\"",
        "output": "10"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <string>\n#include <vector>\n#include <iostream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m = word1.length(), n = word2.length();\n        vector<int> dp(n + 1);\n        for (int j = 0; j <= n; ++j) dp[j] = j;\n        for (int i = 1; i <= m; ++i) {\n            int pre = dp[0];\n            dp[0] = i;\n            for (int j = 1; j <= n; ++j) {\n                int temp = dp[j];\n                if (word1[i - 1] == word2[j - 1]) {\n                    dp[j] = pre;\n                } else {\n                    dp[j] = min({dp[j] + 1, dp[j - 1] + 1, pre + 1});\n                }\n                pre = temp;\n            }\n        }\n        return dp[n];\n    }\n};\n\nint main() {\n    string s1, s2;\n    if (getline(cin, s1) && getline(cin, s2)) {\n        if (s1.front() == '\"') s1 = s1.substr(1);\n        if (s1.back() == '\"') s1.pop_back();\n        if (s2.front() == '\"') s2 = s2.substr(1);\n        if (s2.back() == '\"') s2.pop_back();\n        Solution solver;\n        cout << solver.minDistance(s1, s2) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\n\nclass Solution {\n    public int minDistance(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        int[] dp = new int[n + 1];\n        for (int j = 0; j <= n; j++) dp[j] = j;\n        for (int i = 1; i <= m; i++) {\n            int pre = dp[0];\n            dp[0] = i;\n            for (int j = 1; j <= n; j++) {\n                int temp = dp[j];\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {\n                    dp[j] = pre;\n                } else {\n                    dp[j] = Math.min(Math.min(dp[j] + 1, dp[j - 1] + 1), pre + 1);\n                }\n                pre = temp;\n            }\n        }\n        return dp[n];\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s1 = br.readLine();\n        String s2 = br.readLine();\n        if (s1 == null || s2 == null) return;\n        s1 = s1.trim().replace(\"\\\"\", \"\");\n        s2 = s2.trim().replace(\"\\\"\", \"\");\n        Solution s = new Solution();\n        System.out.println(s.minDistance(s1, s2));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\n\nclass Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        m, n = len(word1), len(word2)\n        dp = list(range(n + 1))\n        for i in range(1, m + 1):\n            pre = dp[0]\n            dp[0] = i\n            for j in range(1, n + 1):\n                temp = dp[j]\n                if word1[i - 1] == word2[j - 1]:\n                    dp[j] = pre\n                else:\n                    dp[j] = min(dp[j] + 1, dp[j - 1] + 1, pre + 1)\n                pre = temp\n        return dp[n]\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        w1 = lines[0].replace('\"', '')\n        w2 = lines[1].replace('\"', '')\n        s = Solution()\n        print(s.minDistance(w1, w2))"
      }
    ]
  },
  {
    "title": "Subarrays with K Different Integers",
    "description": "Given an integer array nums and an integer k, return the number of good subarrays of nums.\n\nA good array is an array where the number of different integers in that array is exactly k.\n- For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.\nA subarray is a contiguous part of an array.\n\nConstraints:\n- 1 <= nums.length <= 2 * 10^4\n- 1 <= nums[i], k <= nums.length",
    "difficulty": "hard",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[1,2,1,2,3]\n2",
        "output": "7",
        "explanation": "Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]."
      },
      {
        "input": "[1,2,1,3,4]\n3",
        "output": "3",
        "explanation": "Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4]."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1,1,1,1]\n1",
        "output": "10"
      },
      {
        "input": "[1,2]\n1",
        "output": "2"
      },
      {
        "input": "[2,1,1,1,2]\n1",
        "output": "8"
      },
      {
        "input": "[1,2,1,2,1,2]\n2",
        "output": "15"
      },
      {
        "input": "[5,4,3,2,1]\n5",
        "output": "1"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int subarraysWithKDistinct(vector<int>& nums, int k) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int subarraysWithKDistinct(int[] nums, int k) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <unordered_map>\n#include <iostream>\n#include <sstream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int atMostK(vector<int>& nums, int k) {\n        int left = 0, res = 0;\n        unordered_map<int, int> count;\n        for (int right = 0; right < nums.size(); ++right) {\n            if (count[nums[right]]++ == 0) k--;\n            while (k < 0) {\n                if (--count[nums[left]] == 0) k++;\n                left++;\n            }\n            res += right - left + 1;\n        }\n        return res;\n    }\n    int subarraysWithKDistinct(vector<int>& nums, int k) {\n        return atMostK(nums, k) - atMostK(nums, k - 1);\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        int k;\n        cin >> k;\n        Solution s;\n        cout << s.subarraysWithKDistinct(nums, k) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    private int atMostK(int[] nums, int k) {\n        int left = 0, res = 0;\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int right = 0; right < nums.length; ++right) {\n            count.put(nums[right], count.getOrDefault(nums[right], 0) + 1);\n            if (count.get(nums[right]) == 1) k--;\n            while (k < 0) {\n                count.put(nums[left], count.get(nums[left]) - 1);\n                if (count.get(nums[left]) == 0) k++;\n                left++;\n            }\n            res += right - left + 1;\n        }\n        return res;\n    }\n    public int subarraysWithKDistinct(int[] nums, int k) {\n        return atMostK(nums, k) - atMostK(nums, k - 1);\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        int k = Integer.parseInt(br.readLine().trim());\n        Solution s = new Solution();\n        System.out.println(s.subarraysWithKDistinct(nums, k));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:\n        return self.atMostK(nums, k) - self.atMostK(nums, k - 1)\n        \n    def atMostK(self, nums: list[int], k: int) -> int:\n        left = 0\n        res = 0\n        count = {}\n        for right in range(len(nums)):\n            count[nums[right]] = count.get(nums[right], 0) + 1\n            if count[nums[right]] == 1:\n                k -= 1\n            while k < 0:\n                count[nums[left]] -= 1\n                if count[nums[left]] == 0:\n                    k += 1\n                left += 1\n            res += right - left + 1\n        return res\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        nums = json.loads(lines[0])\n        k = int(lines[1])\n        s = Solution()\n        print(s.subarraysWithKDistinct(nums, k))"
      }
    ]
  },
  {
    "title": "Longest Increasing Subsequence",
    "description": "Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\nConstraints:\n- 1 <= nums.length <= 2500\n- -10^4 <= nums[i] <= 10^4",
    "difficulty": "medium",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "[10,9,2,5,3,7,101,18]",
        "output": "4",
        "explanation": "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
      },
      {
        "input": "[0,1,0,3,2,3]",
        "output": "4",
        "explanation": "The longest increasing subsequence is [0,1,2,3], therefore the length is 4."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[7,7,7,7,7,7,7]",
        "output": "1"
      },
      {
        "input": "[1,3,6,7,9,4,10,5,6]",
        "output": "6"
      },
      {
        "input": "[10,5,8,3,9,4,12,6,15]",
        "output": "5"
      },
      {
        "input": "[-1,-2,-3,-4]",
        "output": "1"
      },
      {
        "input": "[10,22,9,33,21,50,41,60,80]",
        "output": "6"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        vector<int> sub;\n        for (int num : nums) {\n            auto it = lower_bound(sub.begin(), sub.end(), num);\n            if (it == sub.end()) {\n                sub.push_back(num);\n            } else {\n                *it = num;\n            }\n        }\n        return sub.size();\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        Solution s;\n        cout << s.lengthOfLIS(nums) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        if (nums == null || nums.length == 0) return 0;\n        List<Integer> sub = new ArrayList<>();\n        for (int num : nums) {\n            int idx = Collections.binarySearch(sub, num);\n            if (idx < 0) idx = -(idx + 1);\n            if (idx == sub.size()) {\n                sub.add(num);\n            } else {\n                sub.set(idx, num);\n            }\n        }\n        return sub.size();\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        Solution s = new Solution();\n        System.out.println(s.lengthOfLIS(nums));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\nimport bisect\n\nclass Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        sub = []\n        for num in nums:\n            idx = bisect.bisect_left(sub, num)\n            if idx == len(sub):\n                sub.append(num)\n            else:\n                sub[idx] = num\n        return len(sub)\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        nums = json.loads(input_data)\n        s = Solution()\n        print(s.lengthOfLIS(nums))"
      }
    ]
  },
  {
    "title": "House Robber",
    "description": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.\n\nConstraints:\n- 1 <= nums.length <= 100\n- 0 <= nums[i] <= 400",
    "difficulty": "easy",
    "tags": "dp",
    "visibleTestCases": [
      {
        "input": "[1,2,3,1]",
        "output": "4",
        "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount you can rob = 1 + 3 = 4."
      },
      {
        "input": "[2,7,9,3,1]",
        "output": "12",
        "explanation": "Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1). Total amount you can rob = 2 + 9 + 1 = 12."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[0]",
        "output": "0"
      },
      {
        "input": "[5,1]",
        "output": "5"
      },
      {
        "input": "[1,10,1]",
        "output": "10"
      },
      {
        "input": "[10,2,3,4,8]",
        "output": "21"
      },
      {
        "input": "[1,3,1,3,100]",
        "output": "106"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def rob(self, nums: List[int]) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        if (nums.empty()) return 0;\n        int prevMax = 0;\n        int currMax = 0;\n        for (int x : nums) {\n            int temp = currMax;\n            currMax = max(prevMax + x, currMax);\n            prevMax = temp;\n        }\n        return currMax;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        Solution s;\n        cout << s.rob(nums) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int rob(int[] nums) {\n        if (nums == null || nums.length == 0) return 0;\n        int prevMax = 0;\n        int currMax = 0;\n        for (int x : nums) {\n            int temp = currMax;\n            currMax = Math.max(prevMax + x, currMax);\n            prevMax = temp;\n        }\n        return currMax;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        Solution s = new Solution();\n        System.out.println(s.rob(nums));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def rob(self, nums: list[int]) -> int:\n        prev_max = 0\n        curr_max = 0\n        for x in nums:\n            temp = curr_max\n            curr_max = max(prev_max + x, curr_max)\n            prev_max = temp\n        return curr_max\n\nif __name__ == '__main__':\n    input_data = sys.stdin.read().strip()\n    if input_data:\n        nums = json.loads(input_data)\n        s = Solution()\n        print(s.rob(nums))"
      }
    ]
  },
  {
    "title": "Remove Nth Node From End of List",
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head.\n\nConstraints:\n- The number of nodes in the list is sz.\n- 1 <= sz <= 30\n- 0 <= Node.val <= 100\n- 1 <= n <= sz",
    "difficulty": "medium",
    "tags": "linkedList",
    "visibleTestCases": [
      {
        "input": "[1,2,3,4,5]\n2",
        "output": "[1,2,3,5]",
        "explanation": "Removing the 2nd node from the end yields [1,2,3,5]."
      },
      {
        "input": "[1]\n1",
        "output": "[]",
        "explanation": "Removing the 1st node from the end yields an empty list."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1,2]\n1",
        "output": "[1]"
      },
      {
        "input": "[1,2]\n2",
        "output": "[2]"
      },
      {
        "input": "[1,2,3]\n3",
        "output": "[2,3]"
      },
      {
        "input": "[1,2,3,4]\n1",
        "output": "[1,2,3]"
      },
      {
        "input": "[5,10,15,20,25]\n3",
        "output": "[5,10,20,25]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <iostream>\n#include <sstream>\n#include <vector>\n#include <string>\n\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        ListNode dummy(0);\n        dummy.next = head;\n        ListNode* first = &dummy;\n        ListNode* second = &dummy;\n        for (int i = 0; i <= n; ++i) {\n            first = first->next;\n        }\n        while (first) {\n            first = first->next;\n            second = second->next;\n        }\n        ListNode* toDelete = second->next;\n        second->next = second->next->next;\n        delete toDelete;\n        return dummy.next;\n    }\n};\n\nListNode* parseList(string line) {\n    if (line.front() == '[') line = line.substr(1);\n    if (line.back() == ']') line.pop_back();\n    if (line.empty()) return nullptr;\n    stringstream ss(line);\n    string val;\n    ListNode* dummy = new ListNode(0);\n    ListNode* curr = dummy;\n    while (getline(ss, val, ',')) {\n        curr->next = new ListNode(stoi(val));\n        curr = curr->next;\n    }\n    return dummy->next;\n}\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        ListNode* l = parseList(line);\n        int n;\n        cin >> n;\n        Solution s;\n        ListNode* res = s.removeNthFromEnd(l, n);\n        cout << \"[\";\n        while (res) {\n            cout << res->val;\n            if (res->next) cout << \",\";\n            res = res->next;\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; }\n}\n\nclass Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode first = dummy;\n        ListNode second = dummy;\n        for (int i = 0; i <= n; i++) {\n            first = first.next;\n        }\n        while (first != null) {\n            first = first.next;\n            second = second.next;\n        }\n        second.next = second.next.next;\n        return dummy.next;\n    }\n\n    private static ListNode parseList(String line) {\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        if (line.isEmpty()) return null;\n        String[] parts = line.split(\",\");\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        for (String part : parts) {\n            curr.next = new ListNode(Integer.parseInt(part.trim()));\n            curr = curr.next;\n        }\n        return dummy.next;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String listLine = br.readLine();\n        String nLine = br.readLine();\n        if (listLine == null || nLine == null) return;\n        ListNode l = parseList(listLine);\n        int n = Integer.parseInt(nLine.trim());\n        Solution s = new Solution();\n        ListNode res = s.removeNthFromEnd(l, n);\n        StringBuilder sb = new StringBuilder(\"[\");\n        while (res != null) {\n            sb.append(res.val);\n            if (res.next != null) sb.append(\",\");\n            res = res.next;\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\nclass Solution:\n    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:\n        dummy = ListNode(0)\n        dummy.next = head\n        first = dummy\n        second = dummy\n        for _ in range(n + 1):\n            first = first.next\n        while first:\n            first = first.next\n            second = second.next\n        second.next = second.next.next\n        return dummy.next\n\ndef build_list(lst):\n    if not lst: return None\n    dummy = ListNode(0)\n    curr = dummy\n    for v in lst:\n        curr.next = ListNode(v)\n        curr = curr.next\n    return dummy.next\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        l1 = build_list(json.loads(lines[0]))\n        n = int(lines[1])\n        s = Solution()\n        res_list = s.removeNthFromEnd(l1, n)\n        res = []\n        while res_list:\n            res.append(res_list.val)\n            res = res_list.next\n        print(json.dumps(res))"
      }
    ]
  },
  {
    "title": "Subarray Sum Equals K",
    "description": "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.\n\nA subarray is a contiguous non-empty sequence of elements within an array.\n\nConstraints:\n- 1 <= nums.length <= 2 * 10^4\n- -1000 <= nums[i] <= 1000\n- -10^7 <= k <= 10^7",
    "difficulty": "medium",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[1,1,1]\n2",
        "output": "2",
        "explanation": "The subarrays [1,1] at index (0,1) and index (1,2) sum to 2."
      },
      {
        "input": "[1,2,3]\n3",
        "output": "2",
        "explanation": "Subarrays [1,2] and [3] sum to 3."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[1]\n0",
        "output": "0"
      },
      {
        "input": "[1,-1,0]\n0",
        "output": "3"
      },
      {
        "input": "[3,4,7,2,-3,1,4,2]\n7",
        "output": "4"
      },
      {
        "input": "[10,2,-2,-20,10]\n-10",
        "output": "3"
      },
      {
        "input": "[0,0,0,0,0]\n0",
        "output": "15"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class Solution {\n    public int subarraySum(int[] nums, int k) {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class Solution:\n    def subarraySum(self, nums: List[int], k: int) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <vector>\n#include <unordered_map>\n#include <iostream>\n#include <sstream>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        int count = 0, sum = 0;\n        unordered_map<int, int> prevSum;\n        prevSum[0] = 1;\n        for (int num : nums) {\n            sum += num;\n            if (prevSum.count(sum - k)) {\n                count += prevSum[sum - k];\n            }\n            prevSum[sum]++;\n        }\n        return count;\n    }\n};\n\nint main() {\n    string line;\n    if (getline(cin, line)) {\n        if (line.front() == '[') line = line.substr(1);\n        if (line.back() == ']') line.pop_back();\n        stringstream ss(line);\n        string val;\n        vector<int> nums;\n        while (getline(ss, val, ',')) {\n            nums.push_back(stoi(val));\n        }\n        int k;\n        cin >> k;\n        Solution s;\n        cout << s.subarraySum(nums, k) << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass Solution {\n    public int subarraySum(int[] nums, int k) {\n        int count = 0, sum = 0;\n        Map<Integer, Integer> prevSum = new HashMap<>();\n        prevSum.put(0, 1);\n        for (int num : nums) {\n            sum += num;\n            if (prevSum.containsKey(sum - k)) {\n                count += prevSum.get(sum - k);\n            }\n            prevSum.put(sum, prevSum.getOrDefault(sum, 0) + 1);\n        }\n        return count;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine();\n        if (line == null) return;\n        line = line.trim().replace(\"[\", \"\").replace(\"]\", \"\");\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            nums[i] = Integer.parseInt(parts[i].trim());\n        }\n        int k = Integer.parseInt(br.readLine().trim());\n        Solution s = new Solution();\n        System.out.println(s.subarraySum(nums, k));\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass Solution:\n    def subarraySum(self, nums: list[int], k: int) -> int:\n        count = 0\n        s = 0\n        prev_sum = {0: 1}\n        for num in nums:\n            s += num\n            if s - k in prev_sum:\n                count += prev_sum[s - k]\n            prev_sum[s] = prev_sum.get(s, 0) + 1\n        return count\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        nums = json.loads(lines[0])\n        k = int(lines[1])\n        s = Solution()\n        print(s.subarraySum(nums, k))"
      }
    ]
  },
  {
    "title": "Min Stack",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the MinStack class:\n- MinStack() initializes the stack object.\n- void push(val) pushes the element val onto the stack.\n- void pop() removes the element on the top of the stack.\n- int top() gets the top element of the stack.\n- int getMin() retrieves the minimum element in the stack.\n\nYou must implement a solution with O(1) time complexity for each function.\n(For test serialization, the input is represented as a sequence of method calls: e.g. [\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"] on line 1, followed by their arguments on line 2, e.g. [[],[-2],[0],[-3],[],[],[],[]]. The output is a serialized list of returned values, e.g. [null,null,null,null,-3,null,0,-2].)\n\nConstraints:\n- -2^31 <= val <= 2^31 - 1\n- Methods pop, top and getMin will always be called on non-empty stacks.\n- At most 3 * 10^4 calls will be made to push, pop, top, and getMin.",
    "difficulty": "medium",
    "tags": "array",
    "visibleTestCases": [
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
        "output": "[null,null,null,null,-3,null,0,-2]",
        "explanation": "MinStack minStack = new MinStack();\nminStack.push(-2);\nminStack.push(0);\nminStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2"
      },
      {
        "input": "[\"MinStack\",\"push\",\"getMin\"]\n[[],[5],[]]",
        "output": "[null,null,5]",
        "explanation": "Stack initialized, 5 pushed, min element is 5."
      }
    ],
    "hiddenTestCases": [
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"getMin\",\"pop\",\"getMin\"]\n[[],[1],[2],[],[],[]]",
        "output": "[null,null,null,1,null,1]"
      },
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"getMin\"]\n[[],[2],[1],[3],[],[],[]]",
        "output": "[null,null,null,null,1,null,1]"
      },
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-10],[14],[],[],[],[]]",
        "output": "[null,null,null,-10,null,14,-10]"
      },
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"pop\",\"getMin\"]\n[[],[0],[1],[],[]]",
        "output": "[null,null,null,null,0]"
      },
      {
        "input": "[\"MinStack\",\"push\",\"push\",\"push\",\"pop\",\"top\",\"getMin\"]\n[[],[5],[10],[3],[],[],[]]",
        "output": "[null,null,null,null,null,10,5]"
      }
    ],
    "startCode": [
      {
        "language": "cpp",
        "initialCode": "class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int val) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        \n    }\n    \n    int getMin() {\n        \n    }\n};"
      },
      {
        "language": "java",
        "initialCode": "class MinStack {\n    public MinStack() {\n        \n    }\n    \n    public void push(int val) {\n        \n    }\n    \n    public void pop() {\n        \n    }\n    \n    public int top() {\n        \n    }\n    \n    public int getMin() {\n        \n    }\n}"
      },
      {
        "language": "python",
        "initialCode": "class MinStack:\n    def __init__(self):\n        \n    def push(self, val: int) -> None:\n        \n    def pop(self) -> None:\n        \n    def top(self) -> int:\n        \n    def getMin(self) -> int:\n        "
      }
    ],
    "referenceSolution": [
      {
        "language": "cpp",
        "completeCode": "#include <stack>\n#include <vector>\n#include <string>\n#include <iostream>\n#include <sstream>\n#include <algorithm>\n\nusing namespace std;\n\nclass MinStack {\n    stack<int> s;\n    stack<int> min_s;\npublic:\n    MinStack() {}\n    \n    void push(int val) {\n        s.push(val);\n        if (min_s.empty() || val <= min_s.top()) {\n            min_s.push(val);\n        } else {\n            min_s.push(min_s.top());\n        }\n    }\n    \n    void pop() {\n        s.pop();\n        min_s.pop();\n    }\n    \n    int top() {\n        return s.top();\n    }\n    \n    int getMin() {\n        return min_s.top();\n    }\n};\n\nint main() {\n    string line1, line2;\n    if (getline(cin, line1) && getline(cin, line2)) {\n        // Minimal custom parser for arrays of strings & arguments\n        line1.erase(remove(line1.begin(), line1.end(), ' '), line1.end());\n        line2.erase(remove(line2.begin(), line2.end(), ' '), line2.end());\n        vector<string> ops;\n        int i = 1;\n        while (i < line1.size() - 1) {\n            if (line1[i] == '\"') {\n                i++;\n                string curr = \"\";\n                while (line1[i] != '\"') curr += line1[i++];\n                ops.push_back(curr);\n            }\n            i++;\n        }\n        vector<vector<int>> args;\n        i = 1;\n        while (i < line2.size() - 1) {\n            if (line2[i] == '[') {\n                i++;\n                vector<int> curr;\n                string val = \"\";\n                while (line2[i] != ']') {\n                    val += line2[i++];\n                }\n                if (!val.empty()) curr.push_back(stoi(val));\n                args.push_back(curr);\n            }\n            i++;\n        }\n        MinStack* obj = nullptr;\n        cout << \"[\";\n        for (size_t k = 0; k < ops.size(); ++k) {\n            if (ops[k] == \"MinStack\") {\n                obj = new MinStack();\n                cout << \"null\";\n            } else if (ops[k] == \"push\") {\n                obj->push(args[k][0]);\n                cout << \"null\";\n            } else if (ops[k] == \"pop\") {\n                obj->pop();\n                cout << \"null\";\n            } else if (ops[k] == \"top\") {\n                cout << obj->top();\n            } else if (ops[k] == \"getMin\") {\n                cout << obj->getMin();\n            }\n            if (k < ops.size() - 1) cout << \",\";\n        }\n        cout << \"]\" << endl;\n    }\n    return 0;\n}"
      },
      {
        "language": "java",
        "completeCode": "import java.io.*;\nimport java.util.*;\n\nclass MinStack {\n    private Stack<Integer> s = new Stack<>();\n    private Stack<Integer> min_s = new Stack<>();\n\n    public MinStack() {}\n    \n    public void push(int val) {\n        s.push(val);\n        if (min_s.isEmpty() || val <= min_s.peek()) {\n            min_s.push(val);\n        } else {\n            min_s.push(min_s.peek());\n        }\n    }\n    \n    public void pop() {\n        s.pop();\n        min_s.pop();\n    }\n    \n    public int top() {\n        return s.peek();\n    }\n    \n    public int getMin() {\n        return min_s.peek();\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        String line2 = br.readLine();\n        if (line1 == null || line2 == null) return;\n        line1 = line1.trim().replace(\" \", \"\");\n        line2 = line2.trim().replace(\" \", \"\");\n        \n        List<String> ops = new ArrayList<>();\n        int i = 1;\n        while (i < line1.length() - 1) {\n            if (line1.charAt(i) == '\"') {\n                i++;\n                StringBuilder curr = new StringBuilder();\n                while (line1.charAt(i) != '\"') curr.append(line1.charAt(i++));\n                ops.add(curr.toString());\n            }\n            i++;\n        }\n        List<List<Integer>> argsList = new ArrayList<>();\n        i = 1;\n        while (i < line2.length() - 1) {\n            if (line2.charAt(i) == '[') {\n                i++;\n                List<Integer> curr = new ArrayList<>();\n                StringBuilder val = new StringBuilder();\n                while (line2.charAt(i) != ']') {\n                    val.append(line2.charAt(i++));\n                }\n                if (val.length() > 0) curr.add(Integer.parseInt(val.toString()));\n                argsList.add(curr);\n            }\n            i++;\n        }\n        MinStack obj = null;\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int k = 0; k < ops.size(); k++) {\n            if (ops.get(k).equals(\"MinStack\")) {\n                obj = new MinStack();\n                sb.append(\"null\");\n            } else if (ops.get(k).equals(\"push\")) {\n                obj.push(argsList.get(k).get(0));\n                sb.append(\"null\");\n            } else if (ops.get(k).equals(\"pop\")) {\n                obj.pop();\n                sb.append(\"null\");\n            } else if (ops.get(k).equals(\"top\")) {\n                sb.append(obj.top());\n            } else if (ops.get(k).equals(\"getMin\")) {\n                sb.append(obj.getMin());\n            }\n            if (k < ops.size() - 1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      {
        "language": "python",
        "completeCode": "import sys\nimport json\n\nclass MinStack:\n    def __init__(self):\n        self.s = []\n        self.min_s = []\n        \n    def push(self, val: int) -> None:\n        self.s.append(val)\n        if not self.min_s or val <= self.min_s[-1]:\n            self.min_s.append(val)\n        else:\n            self.min_s.append(self.min_s[-1])\n        \n    def pop(self) -> None:\n        self.s.pop()\n        self.min_s.pop()\n        \n    def top(self) -> int:\n        return self.s[-1]\n        \n    def getMin(self) -> int:\n        return self.min_s[-1]\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        ops = json.loads(lines[0])\n        args = json.loads(lines[1])\n        obj = None\n        res = []\n        for k in range(len(ops)):\n            if ops[k] == \"MinStack\":\n                obj = MinStack()\n                res.append(None)\n            elif ops[k] == \"push\":\n                obj.push(args[k][0])\n                res.append(None)\n            elif ops[k] == \"pop\":\n                obj.pop()\n                res.append(None)\n            elif ops[k] == \"top\":\n                res.append(obj.top())\n            elif ops[k] == \"getMin\":\n                res.append(obj.getMin())\n        print(json.dumps(res).replace(\" \", \"\").replace(\"None\", \"null\"))"
      }
    ]
  }
];

async function seed() {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("Connected to DB...");
        
        let creator = await User.findOne({ role: 'admin' });
        if (!creator) {
            creator = await User.findOne({});
        }
        if (!creator) {
            console.error("No user found in the database! Please register a user first so they can be set as the problemCreator.");
            process.exit(1);
        }
        
        console.log(`Using user ${creator.emailId} (${creator._id}) as problemCreator`);
        
        // Remove existing problems with the same titles to avoid duplicates
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
