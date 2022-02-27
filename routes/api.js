'use strict';

const IssueHandler = require('../controllers/issueHandler.js');

module.exports = function (app) {
  let issueHandler = new IssueHandler();

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let issues = issueHandler.getProject(project);
      res.json(issues)
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let  { issue_title, issue_text, created_by} = req.body

      if (!issue_title || !issue_text || !created_by) {
        return res.json({error: 'required field(s) missing'});
      }
      let optional = {
        assigned_to: req.body.assigned_to || "",
        status_text: req.body.status_text || "",
      };
      let defaults = {
        _id: Array.from({length: 10}).reduce((acc)=>acc+Math.round(Math.random()*10),""),
        open: true,
        created_on: new Date().toISOString(),
        updated_on: new Date().toISOString()
      };
      let issue = {
        issue_title,
        issue_text,
        created_by,
        ...optional,
        ...defaults
      }
      issue = issueHandler.saveIssue(project, issue);
      res.json({...issue})
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
