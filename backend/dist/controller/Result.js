import { Result } from "../models/Result.js";
export const setData = async (req, res) => {
    try {
        let { heading, data, user } = req.body;
        // More specific validation messages
        if (!heading) {
            return res.status(400).json({
                success: false,
                message: "Please enter a heading",
            });
        }
        if (!data) {
            return res.status(400).json({
                success: false,
                message: "Please enter the data",
            });
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please provide a user ID",
            });
        }
        data = data.replace(/\+/g, '\\+'); // Escape plus signs
        const result = await Result.create({
            heading,
            data,
            user,
        });
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "Error creating result:"
            });
        }
        res.status(200).json({
            success: true,
            message: "Result stored successfully",
        });
    }
    catch (error) {
        console.error("Error storing result:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const getData = async (req, res) => {
    try {
        const user = req.params.user;
        console.log(user);
        const results = await Result.find({ user });
        if (!results) {
            return res.status(400).json({
                success: false,
                message: "Result is not Found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Result is Found",
            results,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to get result",
        });
    }
};
export const getSingleData = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Result.findById(id);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: "result is not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "data is fond",
            result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error to get result",
        });
    }
};
