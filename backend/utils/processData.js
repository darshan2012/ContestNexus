const processCodeforcesData = async(result)=> {
    const problems = {};
    const tags = {};
    const levels = {};
    const ratings = {};
    const verdicts = {};
    const langs = {};
    const heatmap = {};
    let totalSub = 0;
    let years = 0;
  
    for (var i = result.length - 1; i >= 0; i--) {
      var sub = result[i];
      var rating = sub.problem.rating === undefined ? 0 : sub.problem.rating;
      var problemId = sub.problem.contestId + '-' + sub.problem.name + '-' + rating;
      var problemIdprev = sub.problem.contestId - 1 + '-' + sub.problem.name + '-' + rating;
      var problemIdnext = sub.problem.contestId + 1 + '-' + sub.problem.name + '-' + rating;
  
      if (problems[problemIdprev] !== undefined) {
        if (problems[problemIdprev].solved === 0) {
          problems[problemIdprev].attempts++;
        }
        problemId = problemIdprev;
      } else if (problems[problemIdnext] !== undefined) {
        if (problems[problemIdnext].solved === 0) {
          problems[problemIdnext].attempts++;
        }
        problemId = problemIdnext;
      } else if (problems[problemId] !== undefined) {
        if (problems[problemId].solved === 0) {
          problems[problemId].attempts++;
        }
      } else {
        problems[problemId] = {
          problemlink: sub.contestId + '-' + sub.problem.index,
          attempts: 1,
          solved: 0
        };
      }
  
      if (sub.verdict == 'OK') {
        problems[problemId].solved++;
      }
  
      if (problems[problemId].solved === 1 && sub.verdict == 'OK') {
        sub.problem.tags.forEach(function (t) {
          if (tags[t] === undefined) tags[t] = 1;
          else tags[t]++;
        });
  
        if (levels[sub.problem.index[0]] === undefined)
          levels[sub.problem.index[0]] = 1;
        else levels[sub.problem.index[0]]++;
  
        if (sub.problem.rating) {
          if (ratings[sub.problem.rating] === undefined) {
            ratings[sub.problem.rating] = 1;
          } else {
            ratings[sub.problem.rating]++;
          }
        }
      }
  
      if (verdicts[sub.verdict] === undefined) verdicts[sub.verdict] = 1;
      else verdicts[sub.verdict]++;
  
      if (langs[sub.programmingLanguage] === undefined)
        langs[sub.programmingLanguage] = 1;
      else langs[sub.programmingLanguage]++;
  
      var date = new Date(sub.creationTimeSeconds * 1000);
      date.setHours(0, 0, 0, 0);
      if (heatmap[date.valueOf()] === undefined) heatmap[date.valueOf()] = 1;
      else heatmap[date.valueOf()]++;
      totalSub = result.length;
  
      years =
        new Date(result[0].creationTimeSeconds * 1000).getYear() -
        new Date(result[result.length - 1].creationTimeSeconds * 1000).getYear();
      years = Math.abs(years) + 1;
    }
  
    // Return the processed data as an object
    return {
      problems,
      tags,
      levels,
      ratings,
      verdicts,
      langs,
      heatmap,
      totalSub,
      years,
    };
  }
  module.exports = {processCodeforcesData};