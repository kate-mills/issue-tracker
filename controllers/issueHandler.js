function IssueHandler() {
  this.db = []

  this.getProject = function (title){
    return this.db[title] || [];
  };

  this.createIssue = function(title, issue){
    this.db[title] = this.getProject(title);
    this.db[title].unshift(issue);
    return this.db[title][0]
  };

  this.getFilteredIssues = function(issues, filters={}){
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

  this.updateIssue = function(title, attrs){
    let updateCount = 0;

    let issues = [...this.db[title]].map(issue=>{
      if (issue._id === attrs._id) {
        updateCount++;
        return {
          ...issue,
          ...attrs,
          updated_on: new Date().toISOString()
        }
      }
      return issue
    })

    // check if update was successful
    if(updateCount === 1){
      this.db[title] =  [...issues]
      return {
        result: 'successfully updated',
        _id: attrs._id,
      }
    }
    return {
      error: 'could not update',
      _id: attrs._id
    }
  };

  this.deleteIssue = function(title, id){
    let currentIssues = this.getProject(title);

    let issues = [...currentIssues].filter((issue) => {
      return issue._id !== id
    });

    if(issues.length + 1 === currentIssues.length){
      this.db[title] = [...issues];
      return {_id: id, result:'successfully deleted'}
    }
    return {_id: id, error:'could not delete'}
  };
}
module.exports = IssueHandler;
