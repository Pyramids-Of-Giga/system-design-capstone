// const express = require("express");

// const router = express.Router();

// const utils = require("../helpers/qanda-helpers");
// const path = require("path");

// let multer = require("multer");

// // Get Questions
// router.get("/questions", (req, res) => {
//   utils
//     .questionsFetcher(req.query.currProductId)
//     .then((questions) => {
//       res.status(200).send(questions.data);
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// // Get Answers
// router.get("/questions/:questionId/answers", (req, res) => {
//   utils
//     .answersFetcher(req.params.questionId)
//     .then((answers) => {
//       res.status(200).send(answers.data.results);
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// // Post Questions
// router.post("/questions", (req, res) => {
//   utils
//     .questionsPoster(req.body)
//     .then(() => {
//       res.status(201).send();
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../../client/dist/Images"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // Post Answers
// router.post(
//   "/questions/:questionId/answers",
//   upload.array("photos"),
//   (req, res) => {
//     utils
//       .answersPoster(req.params.questionId, req.body, req.files)
//       .then(() => {
//         res.status(200).send();
//       })
//       .catch(() => {
//         res.status(400).send();
//       });
//   }
// );

// // Mark Question Helpful
// router.put("/questions/:questionId/helpful", (req, res) => {
//   utils
//     .markQuestionHelpful(req.params.questionId)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// // Report Question
// router.put("/questions/:questionId/report", (req, res) => {
//   utils
//     .reportQuestion(req.params.questionId)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// // Mark Answer Helpful
// router.put("/answers/:answerId/helpful", (req, res) => {
//   utils
//     .markAnswerHelpful(req.params.answerId)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// // Report Answer
// router.put("/answers/:answerId/report", (req, res) => {
//   utils
//     .reportAnswer(req.params.answerId)
//     .then(() => {
//       res.status(204).send();
//     })
//     .catch(() => {
//       res.status(400).send();
//     });
// });

// module.exports = router;
