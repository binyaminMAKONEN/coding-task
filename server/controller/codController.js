const model = require('../models/model')

//send request to http://localhost:8080/api/code to get all the code blocks from db
const getCods = async(req,res)=>{
    try {
        
        const data =await model.codes.find({})
       return res.status(200).json(data)
    } catch (error) {
        res.status(200).json(error)
    }
}

//send request to http://localhost:8080/api/code to create new code
const createNewCod =async(req,res)=>{
    try {
        
        const newCode = new model.codes({
            title:req.body.title,
            code:req.body.code,
            exercise:req.body.exercise,
            solution:req.body.solution
        })
        const code = await newCode.save();
       return res.status(200).json(code);
    } catch (error) {
        res.status(500).json(error);
    }
}
//send request to http://localhost:8080/api/code/:id to delete code
const deleteCodeBlock = async (req, res) => {
    try {
        
        const codeBlockId=req.params.id 
        await model.codes.findByIdAndDelete(codeBlockId)
        res.status(200).json('deleted code')
    } catch (error) {
        res.status(500).json(error)
    }
 
  }


module.exports = {
    getCods,
    createNewCod,
    deleteCodeBlock
}
