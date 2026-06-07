const Problem = require("../models/problem");
const Submission = require("../models/submission");
const User = require("../models/user");
const {getLanguageById,submitBatch,submitToken,ensurePlainText,generateWrapperCode} = require("../utils/problemUtility");

const submitCode = async (req,res)=>{
   
    try{
      
       const userId = req.result._id;
       const problemId = req.params.id;

       let {code,language} = req.body;

      if(!userId||!code||!problemId||!language)
        return res.status(400).send("Some field missing");
      

      if(language==='cpp')
        language='c++'
      
      // Fetch the problem from database
       const problem =  await Problem.findById(problemId);
       if (!problem) return res.status(404).send("Problem not found");

    const submittedResult = await Submission.create({
          userId,
          problemId,
          code,
          language,
          status:'pending',
          testCasesTotal:problem.hiddenTestCases.length
     })

    const languageId = getLanguageById(language);

    // Wrap code
    const refSol = problem.referenceSolution.find(ref => ref.language.toLowerCase() === language.toLowerCase() || (language === 'c++' && ref.language.toLowerCase() === 'cpp'));
    const completeCode = refSol ? refSol.completeCode : '';
    const wrappedCode = generateWrapperCode(code, completeCode, language);
   
    const submissions = problem.hiddenTestCases.map((testcase)=>({
        source_code: wrappedCode,
        language_id: languageId,
        stdin: ensurePlainText(testcase.input),
        expected_output: ensurePlainText(testcase.output)
    }));

    // Detailed Logging
    console.log("=================== JUDGE0 SUBMIT LOG ===================");
    console.log("Problem Title:", problem.title);
    console.log("Original User Code:\n", code);
    console.log("Generated Wrapper Code:\n", wrappedCode);
    console.log("Language ID:", languageId);
    console.log("Payload sent to Judge0 (Submissions):", JSON.stringify(submissions, null, 2));

    let testResult;
    try {
        const submitResult = await submitBatch(submissions);
        const resultToken = submitResult.map((value)=> value.token);
        testResult = await submitToken(resultToken);
    } catch (executionErr) {
        submittedResult.status = 'error';
        submittedResult.errorMessage = executionErr.message || "Compilation/Execution timed out or failed";
        await submittedResult.save();
        console.error("Execution/Token Polling Error:", executionErr);
        throw executionErr;
    }

    // submittedResult ko update karo
    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = 'accepted';
    let errorMessage = null;

    for(const test of testResult){
        if(test.status_id === 3){
           testCasesPassed++;
           runtime = runtime + parseFloat(test.time || 0);
           memory = Math.max(memory, test.memory || 0);
        }else{
          if(test.status_id === 4){
            status = 'wrong';
            errorMessage = test.compile_output || test.stderr || test.message || "Wrong Answer";
          }
          else if(test.status_id === 5){
            status = 'error';
            errorMessage = "Time Limit Exceeded";
          }
          else if(test.status_id === 6){
            status = 'error';
            errorMessage = test.compile_output || "Compilation Error";
          }
          else {
            status = 'error';
            errorMessage = test.compile_output || test.stderr || test.message || `Runtime Error (Status ${test.status_id})`;
          }
        }
    }

    if (errorMessage) {
      console.log("Submission failure message:", errorMessage);
    }
    console.log("=========================================================");

    // Store the result in Database in Submission
    submittedResult.status   = status;
    submittedResult.testCasesPassed = testCasesPassed;
    submittedResult.errorMessage = errorMessage;
    submittedResult.runtime = runtime;
    submittedResult.memory = memory;

    await submittedResult.save();

    if(status === 'accepted' && !req.result.problemSolved.some(id => id.toString() === problemId)){
      req.result.problemSolved.push(problemId);
      await req.result.save();
    }
    
    const accepted = (status == 'accepted')
    res.status(201).json({
      accepted,
      totalTestCases: submittedResult.testCasesTotal,
      passedTestCases: testCasesPassed,
      runtime,
      memory,
      error: errorMessage
    });
       
    }
    catch(err){
      const msg = err.response?.data?.message || err.message || "Unknown error occurred";
      res.status(500).send(`Internal Server Error: ${msg}`);
    }
}


const runCode = async(req,res)=>{
    
     try{
      const userId = req.result._id;
      const problemId = req.params.id;

      let {code,language} = req.body;

     if(!userId||!code||!problemId||!language)
       return res.status(400).send("Some field missing");

      const problem =  await Problem.findById(problemId);
      if (!problem) return res.status(404).send("Problem not found");
      if(language==='cpp')
        language='c++'

   const languageId = getLanguageById(language);

   // Wrap code
   const refSol = problem.referenceSolution.find(ref => ref.language.toLowerCase() === language.toLowerCase() || (language === 'c++' && ref.language.toLowerCase() === 'cpp'));
   const completeCode = refSol ? refSol.completeCode : '';
   const wrappedCode = generateWrapperCode(code, completeCode, language);

   const submissions = problem.visibleTestCases.map((testcase)=>({
       source_code: wrappedCode,
       language_id: languageId,
       stdin: ensurePlainText(testcase.input),
       expected_output: ensurePlainText(testcase.output)
   }));

   // Detailed Logging
   console.log("=================== JUDGE0 RUN LOG ===================");
   console.log("Problem Title:", problem.title);
   console.log("Original User Code:\n", code);
   console.log("Generated Wrapper Code:\n", wrappedCode);
   console.log("Language ID:", languageId);
   console.log("Payload sent to Judge0 (Submissions):", JSON.stringify(submissions, null, 2));

   const submitResult = await submitBatch(submissions);
   const resultToken = submitResult.map((value)=> value.token);
   const testResult = await submitToken(resultToken);

    let testCasesPassed = 0;
    let runtime = 0;
    let memory = 0;
    let status = true;
    let errorMessage = null;

    for(const test of testResult){
        if(test.status_id === 3){
           testCasesPassed++;
           runtime = runtime + parseFloat(test.time || 0);
           memory = Math.max(memory, test.memory || 0);
        }else{
          status = false;
          if (test.status_id === 4) {
            errorMessage = test.compile_output || test.stderr || test.message || "Wrong Answer";
          } else if (test.status_id === 5) {
            errorMessage = "Time Limit Exceeded";
          } else if (test.status_id === 6) {
            errorMessage = test.compile_output || "Compilation Error";
          } else {
            errorMessage = test.compile_output || test.stderr || test.message || `Runtime Error (Status ${test.status_id})`;
          }
        }
    }

    if (errorMessage) {
      console.log("Run failure message:", errorMessage);
    }
    console.log("======================================================");
  
   res.status(201).json({
    success:status,
    testCases: testResult,
    runtime,
    memory,
    error: errorMessage
   });
      
   }
   catch(err){
     const msg = err.response?.data?.message || err.message || "Unknown error occurred";
     res.status(500).send(`Internal Server Error: ${msg}`);
   }
}

const getUserSubmissions = async (req, res) => {
  try {
    const userId = req.result._id;
    const submissions = await Submission.find({ userId })
      .select('createdAt status problemId')
      .lean();
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).send("Internal Server Error: " + err.message);
  }
};

module.exports = {submitCode,runCode,getUserSubmissions};



//     language_id: 54,
//     stdin: '2 3',
//     expected_output: '5',
//     stdout: '5',
//     status_id: 3,
//     created_at: '2025-05-12T16:47:37.239Z',
//     finished_at: '2025-05-12T16:47:37.695Z',
//     time: '0.002',
//     memory: 904,
//     stderr: null,
//     token: '611405fa-4f31-44a6-99c8-6f407bc14e73',


// User.findByIdUpdate({
// })

//const user =  User.findById(id)
// user.firstName = "Mohit";
// await user.save();