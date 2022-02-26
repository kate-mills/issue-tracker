'use strict';

const IssueHandler = require('../controllers/issueHandler.js');

module.exports = function (app) {
  let issueHandler = new IssueHandler();

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      res.json([])
    })
    
    .post(function (req, res){
      let project = req.params.project;

      let  { issue_title, issue_text, created_by} = req.body;

      if (!issue_title || !issue_text || !created_by) {
        return res.json({error: 'required field(s) missing'});
      }
      let fields = {
        issue_title,
        issue_text,
        created_by,
        assigned_to: req.body.assigned_to || "",
        status_text: req.body.status_text || ""
      };
      let result = issueHandler.saveIssue(
        project, fields
      );
      res.json(result)
    })
    
    .put(function (req, res){
      let project = req.params.project;
      res.json([])
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      res.json([]) 
    });
    
};
