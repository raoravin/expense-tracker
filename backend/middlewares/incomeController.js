const incomeModel = require("../models/incomeModel");


exports.addIncome = async(req,res) => {
    const {title, amount, category, description, date} = req.body;

    const income = incomeModel({
        title,
        amount,
        category,
        description,
        date
    })

    try {
        if(!title || !category || !description || !date) {
            return res.status(400).json({
                message:"All fields are require",
                success: false
            })
        }
        if(amount <= 0 || typeof amount !== "number") {
            return res.status(400).json({
                message: "Amount must be a positive number",
                success: false
            });
        }
        await income.save();
        res.status(200).json({
            message:"Income Added",
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "server error"
        })
    }
}


exports.getIncomes = async (req, res) => {
    try {
        const incomes = await incomeModel.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        console.log(error);
      res.status(500).send({message:"server error"})  
    }
}


exports.deleteIncome = async(req, res) => {
    const {id} = req.params;
    await incomeModel.findByIdAndDelete(id).then((income) => {
        res.status(200).json({message: "Income Deleted"})
    })
    .catch((err) => {
        res.status(500).json({message:"server error"})
    })

}