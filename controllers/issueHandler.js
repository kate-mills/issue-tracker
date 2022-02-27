function IssueHandler() {
  this.db = []

  this.getProject = function (title){
    return this.db[title] || [];
  };

  this.filterIssues = function(issues, filters){
    let result = [];

    issues.forEach((issue) => {
      let meetsRequirements = true

      for (const [key, val] of Object.entries(filters)){
        let issueVal = "".concat(issue[key])
        let filterVal = "".concat(val)
        if(issueVal !== filterVal){
          meetsRequirements = false;
        }
      }
      if(meetsRequirements === true){
        result.push(issue)
      }
    });
    return result;
  };

  this.saveIssue = function(title, issue){
    this.db[title] = this.getProject(title);
    this.db[title].unshift(issue);
    return this.db[title][0]
  };

}
module.exports = IssueHandler;
