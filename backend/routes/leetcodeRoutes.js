import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/leetcode", async (req, res) => {

  try {

    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `
        query {
          problemsetQuestionListV2(
            categorySlug: ""
            limit: 10
            skip: 0
          ) {
            questions {
              title
              titleSlug
              difficulty
            }
          }
        }
        `
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const problems =
      response.data.data.problemsetQuestionListV2.questions;

    res.json(problems);

  } catch (error) {

    console.log("LeetCode API Error:", error.response?.data || error);

    res.status(500).json({
      message: "Failed to fetch LeetCode problems"
    });

  }

});

export default router;