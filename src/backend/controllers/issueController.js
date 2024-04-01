const Issue = require( '../models/issueModel');
const { authenticate } = require("../config/passport");

exports.issue_list = [
    async (req,res)=>{
        try{
          const issues =await Issue.find({}).exec();
          res.status(200).json(issues||[]);
        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
];

exports.issue_detail = async (req,res)=>{
    try{
        const id = req.params.issueId;
        const issue = await Issue.findById(id).exec();
        if(issue !== null)
            return res.status(200).json(issue);
        else 
            return res.status(404).json({error:"Not found"});  

    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.issue_list_user = async (req,res)=>{
    try{
        const id = req.params.userId;
        const userIssues = await Issue.find({sender:id}).exec();
            return res.status(200).json(userIssues||[]);


    }catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.issue_create = [
    async (req,res)=>{
        try{
            const {
                sender,subject,description
              } = req.body;
              if(!sender||!subject||!description){
                return res.status(400).json({error:"Some of the required fields are empty"});
              }
              const issue= new Issue({
                 seen:false,
                 sender:sender,
                 description:description,
                 status:"open",
                 subject:subject,
                 replies:[]
              });
              issue.save();
              res.status(200).json(issue);

        }catch(error){
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
]