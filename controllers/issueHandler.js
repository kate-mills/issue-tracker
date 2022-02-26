function IssueHandler() {
  this.db = []

  this.saveIssue = function(project, fields) {
    let id = Array.from({length: 10})
      .reduce((acc) => acc+ Math.round(
        Math.random()*10
      ), "");

    let dateTime = new Date().toISOString();

    let issue = {
      ...fields,
      _id: id,
      open: true,
      created_on: dateTime,
      updated_on: dateTime
    };

    this.db[project] = this.db[project] || [];
    this.db[project].unshift({...issue});

    return ((this.db[project][0]._id === id) ? issue: {});
  };

}
module.exports = IssueHandler;
