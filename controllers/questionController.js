// questionController.js
const dbPromise = require('../db');

exports.addQuestion = async (req, res) => {
    try {
        const db = await dbPromise;
        const { quiz_id, question, optionA, optionB, optionC, optionD, correctOption, explanation } = req.body;
        const [result] = await db.query(
            'INSERT INTO questions (quiz_id, question_text, option_a, option_b, option_c, option_d, correct_answer) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [quiz_id, question, optionA, optionB, optionC, optionD, correctOption]
        );
        const newQuestion = { id: result.insertId, quiz_id, question, optionA, optionB, optionC, optionD, correctOption };
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ message: 'Error adding question', error: error.message });
    }
};

exports.getFilteredQuestions = async (req, res) => {
    try {
        const db = await dbPromise;
        const [questions] = await db.query('SELECT * FROM questions');
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
};

// Get all questions for a specific quiz
exports.getQuestionsByQuizId = async (req, res) => {
    try {
        const db = await dbPromise;
        const quizId = req.params.quizId;
        const [questions] = await db.query('SELECT * FROM questions WHERE quiz_id = ?', [quizId]);
        // Transform to expected format
        const formatted = questions.map(q => {
            const options = [q.option_a, q.option_b, q.option_c, q.option_d];
            let correctIndex = ['A','B','C','D'].indexOf(q.correct_answer);
            return {
                id: q.id,
                question: q.question_text,
                options,
                correctAnswer: correctIndex
            };
        });
        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error: error.message });
    }
};