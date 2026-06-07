const axios = require('axios');


const getLanguageById = (lang)=>{

    const language = {
        "c++":54,
        "cpp":54,
        "java":62,
        "python":71
    }


    return language[lang.toLowerCase()];
}


const submitBatch = async (submissions)=>{

// Transparently Base64 encode the payloads to bypass Judge0 UTF-8 errors
const encodedSubmissions = submissions.map(s => ({
    ...s,
    source_code: s.source_code ? Buffer.from(s.source_code, 'utf8').toString('base64') : null,
    stdin: s.stdin ? Buffer.from(s.stdin, 'utf8').toString('base64') : null,
    expected_output: s.expected_output ? Buffer.from(s.expected_output, 'utf8').toString('base64') : null
}));

const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'true'
  },
  headers: {
    'x-rapidapi-key': process.env.JUDGE0_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions: encodedSubmissions
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error("Batch Creation Error:", error.response?.data || error.message);
        throw error;
	}
}

 return await fetchData();

}


const waiting = (timer) => {
  return new Promise(resolve => setTimeout(resolve, timer));
}

// ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]

const submitToken = async(resultToken)=>{

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'true',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': process.env.JUDGE0_KEY,
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error("Token Fetch Error:", error.response?.data || error.message);
        throw error;
	}
}


  let retries = 0;
  const maxRetries = 25;
  while(retries < maxRetries){

    const result =  await fetchData();

    if(!result || !result.submissions) {
        retries++;
        await waiting(1000);
        continue;
    }

    const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);

    if(IsResultObtained) {
      // Transparently decode Base64 back to utf-8 strings for controllers
      return result.submissions.map(s => ({
          ...s,
          stdin: s.stdin ? Buffer.from(s.stdin, 'base64').toString('utf8') : null,
          expected_output: s.expected_output ? Buffer.from(s.expected_output, 'base64').toString('utf8') : null,
          stdout: s.stdout ? Buffer.from(s.stdout, 'base64').toString('utf8') : null,
          stderr: s.stderr ? Buffer.from(s.stderr, 'base64').toString('utf8') : null,
          compile_output: s.compile_output ? Buffer.from(s.compile_output, 'base64').toString('utf8') : null,
          message: s.message ? Buffer.from(s.message, 'base64').toString('utf8') : null
      }));
    }

    retries++;
    await waiting(1000);
  }
  throw new Error("Compilation/Execution timed out on code judge.");

}

function isBase64(str) {
  if (!str || typeof str !== 'string') return false;
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!base64Regex.test(str.trim())) return false;
  try {
    const decoded = Buffer.from(str, 'base64').toString('utf8');
    return /^[\x09\x0A\x0D\x20-\x7E]*$/.test(decoded);
  } catch (err) {
    return false;
  }
}

function ensurePlainText(str) {
  if (isBase64(str)) {
    return Buffer.from(str, 'base64').toString('utf8');
  }
  return str;
}

function generateWrapperCode(userCode, completeCode, language) {
  if (!completeCode) return userCode;
  
  const lang = language.toLowerCase();
  
  if (lang === 'cpp' || lang === 'c++') {
    let prepended = "#include <bits/stdc++.h>\nusing namespace std;\n\n";
    const startIdx = completeCode.indexOf("class Solution");
    if (startIdx === -1) {
      return prepended + userCode + "\n" + completeCode;
    }
    
    const openBraceIdx = completeCode.indexOf('{', startIdx + 14);
    if (openBraceIdx === -1) {
      return prepended + userCode + "\n" + completeCode;
    }
    
    let braceCount = 1;
    let currentIdx = openBraceIdx + 1;
    while (currentIdx < completeCode.length && braceCount > 0) {
      const char = completeCode[currentIdx];
      if (char === '{') braceCount++;
      else if (char === '}') braceCount--;
      currentIdx++;
    }
    
    if (currentIdx < completeCode.length && completeCode[currentIdx] === ';') {
      currentIdx++;
    }
    
    const headers = completeCode.substring(0, startIdx);
    const driver = completeCode.substring(currentIdx);
    
    return prepended + headers + "\n" + userCode + "\n" + driver;
  }
  
  if (lang === 'java') {
    const lines = completeCode.split('\n');
    const imports = lines.filter(line => line.trim().startsWith('import ')).join('\n');
    
    const mainStartIdx = completeCode.indexOf("public static void main");
    if (mainStartIdx === -1) {
      return imports + "\n" + userCode + "\n" + completeCode;
    }
    
    const openBraceIdx = completeCode.indexOf('{', mainStartIdx);
    if (openBraceIdx === -1) {
      return imports + "\n" + userCode + "\n" + completeCode;
    }
    
    let braceCount = 1;
    let currentIdx = openBraceIdx + 1;
    while (currentIdx < completeCode.length && braceCount > 0) {
      const char = completeCode[currentIdx];
      if (char === '{') braceCount++;
      else if (char === '}') braceCount--;
      currentIdx++;
    }
    
    const mainMethodCode = completeCode.substring(mainStartIdx, currentIdx);
    const lastBraceIdx = userCode.lastIndexOf('}');
    if (lastBraceIdx === -1) {
      return imports + "\n" + userCode + "\n" + mainMethodCode;
    }
    
    const userClassContent = userCode.substring(0, lastBraceIdx);
    const userClassEnd = userCode.substring(lastBraceIdx);
    
    return imports + "\n" + userClassContent + "\n" + mainMethodCode + "\n" + userClassEnd;
  }
  
  if (lang === 'python' || lang === 'python3') {
    const mainPattern = "if __name__";
    const mainIdx = completeCode.indexOf(mainPattern);
    if (mainIdx === -1) {
      return "import sys\nimport json\nfrom typing import *\n\n" + userCode + "\n\n" + completeCode;
    }
    
    const lines = completeCode.split('\n');
    const mainLineIdx = lines.findIndex(line => line.includes(mainPattern));
    const driverCode = lines.slice(mainLineIdx).join('\n');
    
    return "import sys\nimport json\nfrom typing import *\n\n" + userCode + "\n\n" + driverCode;
  }
  
  return userCode;
}

module.exports = {getLanguageById,submitBatch,submitToken,ensurePlainText,generateWrapperCode};
