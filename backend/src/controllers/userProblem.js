const {getLanguageById,submitBatch,submitToken,ensurePlainText} = require("../utils/problemUtility");
const Problem = require("../models/problem");
const User = require("../models/user");
const Submission = require("../models/submission");
const SolutionVideo = require("../models/solutionVideo")

const createProblem = async (req,res)=>{
   
  // API request to authenticate user:
    const {title,description,difficulty,tags,
        visibleTestCases,hiddenTestCases,startCode,
        referenceSolution, problemCreator
    } = req.body;


    try{
      const allSubmissions = [];
      const mapping = [];
      
      for(const {language,completeCode} of referenceSolution){
        const languageId = getLanguageById(language);
        visibleTestCases.forEach((testcase, index) => {
          allSubmissions.push({
            source_code: completeCode,
            language_id: languageId,
            stdin: ensurePlainText(testcase.input),
            expected_output: ensurePlainText(testcase.output)
          });
          mapping.push({ language, index });
        });
      }

      if (allSubmissions.length > 0) {
        const submitResult = await submitBatch(allSubmissions);
        const resultToken = submitResult.map((value)=> value.token);
        const testResult = await submitToken(resultToken);

        testResult.forEach((test, idx) => {
          if (test.status_id !== 3) {
            const errorDetail = test.compile_output || test.stderr || "Output did not match expected output.";
            const { language, index } = mapping[idx];
            throw new Error(`Validation Failed (${language}) on Test Case ${index + 1}: ${errorDetail}`);
          }
        });
      }

      // We can store it in our DB

    const userProblem =  await Problem.create({
        ...req.body,
        problemCreator: req.result._id
      });

      res.status(201).send("Problem Saved Successfully");
    }
    catch(err){
        res.status(400).send("Error: "+err.message);
    }
}

const updateProblem = async (req,res)=>{
    
  const {id} = req.params;
  const {title,description,difficulty,tags,
    visibleTestCases,hiddenTestCases,startCode,
    referenceSolution, problemCreator
   } = req.body;

  try{

     if(!id){
      return res.status(400).send("Missing ID Field");
     }

    const DsaProblem =  await Problem.findById(id);
    if(!DsaProblem)
    {
      return res.status(404).send("ID is not persent in server");
    }
      
    const allSubmissions = [];
    const mapping = [];
    
    for(const {language,completeCode} of referenceSolution){
      const languageId = getLanguageById(language);
      visibleTestCases.forEach((testcase, index) => {
        allSubmissions.push({
          source_code: completeCode,
          language_id: languageId,
          stdin: ensurePlainText(testcase.input),
          expected_output: ensurePlainText(testcase.output)
        });
        mapping.push({ language, index });
      });
    }

    if (allSubmissions.length > 0) {
      const submitResult = await submitBatch(allSubmissions);
      const resultToken = submitResult.map((value)=> value.token);
      const testResult = await submitToken(resultToken);

      testResult.forEach((test, idx) => {
        if (test.status_id !== 3) {
          const errorDetail = test.compile_output || test.stderr || "Output did not match expected output.";
          const { language, index } = mapping[idx];
          throw new Error(`Validation Failed (${language}) on Test Case ${index + 1}: ${errorDetail}`);
        }
      });
    }

    const newProblem = await Problem.findByIdAndUpdate(id , {...req.body}, {runValidators:true, new:true});
    res.status(200).send(newProblem);
  }
  catch(err){
      res.status(400).send("Error: "+err.message);
  }
}

const deleteProblem = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

   const deletedProblem = await Problem.findByIdAndDelete(id);

   if(!deletedProblem)
    return res.status(404).send("Problem is Missing");


   res.status(200).send("Successfully Deleted");
  }
  catch(err){
     
    res.status(500).send("Error: "+err);
  }
}


const getProblemById = async(req,res)=>{

  const {id} = req.params;
  try{
     
    if(!id)
      return res.status(400).send("ID is Missing");

    const getProblem = await Problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode referenceSolution ');
   
    // video ka jo bhi url wagera le aao

   if(!getProblem)
    return res.status(404).send("Problem is Missing");

   const videos = await SolutionVideo.findOne({problemId:id});

   if(videos){   
    
   const responseData = {
    ...getProblem.toObject(),
    secureUrl:videos.secureUrl,
    thumbnailUrl : videos.thumbnailUrl,
    duration : videos.duration,
   } 
  
   return res.status(200).send(responseData);
   }
    
   res.status(200).send(getProblem);

  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
}

const getAllProblem = async(req,res)=>{

  try{
     
    const getProblem = await Problem.find({}).select('_id title difficulty tags');

   if(getProblem.length==0)
    return res.status(404).send("Problem is Missing");


   res.status(200).send(getProblem);
  }
  catch(err){
    res.status(500).send("Error: "+err);
  }
}


const solvedAllProblembyUser =  async(req,res)=>{
   
    try{
       
      const userId = req.result._id;

      const user =  await User.findById(userId).populate({
        path:"problemSolved",
        select:"_id title difficulty tags"
      });
      
      res.status(200).send(user.problemSolved);

    }
    catch(err){
      res.status(500).send("Server Error");
    }
}

const submittedProblem = async(req,res)=>{

  try{
     
    const userId = req.result._id;
    const problemId = req.params.pid;

    const ans = await Submission.find({userId,problemId});
  
    return res.status(200).send(ans);
  }
  catch(err){
     res.status(500).send("Internal Server Error");
  }
}



module.exports = {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem,solvedAllProblembyUser,submittedProblem};


