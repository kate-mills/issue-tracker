function IssueHandler() {
  this.db = []

  this.getProject = function (title){
    return this.db[title] || [];
  };

  this.saveIssue = function(title, issue){
    this.db[title] = this.getProject(title);
    this.db[title].unshift(issue);
    return this.db[title][0]
  };

}
module.exports = IssueHandler;
