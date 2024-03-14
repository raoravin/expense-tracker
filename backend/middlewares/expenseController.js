const expenseModel = require("../models/expenseModel");


exports.addExpense = async(req,res) => {
    const {title, amount, category, description, date} = req.body;


    const expense = expenseModel({
        title,
        amount,
        category,
        description,
        date
    });


    try {
        if(!title || !category || !description || !date) {
            return res.status(400).json({
                message:"All fields are require",
                success: false
            });
        }
        if(amount<=0 || !amount =="number"){
            return res.status(400).json({
                message:"Amount must be a positive number",
                success: false
            });
        }

        await expense.save();
        res.status(200).json({
            message:"Expense Added",
            success: true
        });
    } catch (error) {
        res.status(500).send({
            message: "server error"
        });
    }
}


exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find().sort({createdAt: -1})
        res.status(200).json(expenses);
    } catch (error) {
        console.log(error);
      res.status(500).send({message:"server error"});
    }
}


exports.deleteExpense = async(req, res) => {
    const {id} = req.params;
    await expenseModel.findByIdAndDelete(id).then((expense) => {
        res.status(200).json({message: "Exepense Deleted"});
    })
    .catch((err) => {
        res.status(500).json({message:"server error"})
    })

}