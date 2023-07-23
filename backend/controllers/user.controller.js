const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = require('../models/user.model');
const sendResponse = require('../utils/sendResponse');
const generateToken = require('../utils/generateToken');
const sendMail = require('../utils/sendMail');
const axios = require('axios')
/**
 * POST
 * @param {username, email, password, id(for google auth), method} req 
 * @param {*} res 
 */
exports.getUser = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const user = await userSchema.findOne({ mailToken: token });
    if (user) {
        sendResponse(user, res, 200);
    }
    else
        sendResponse("Unauthorized", res, 401);
}

exports.signupUser = async (req, res) => {
    console.log(req.body);
    const { username, firstname, lastname, email, password,handles, id, method } = req.body;
    try {
        let userbymail = await userSchema.findOne({ email: email });
        let userbyname = await userSchema.findOne({ username: username });
        if (userbymail) {
            return sendResponse("User with email already exist!", res, 409);
        } else if (userbyname) {
            return sendResponse("User with this username already exist!", res, 409);
        }
        user = new userSchema({
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            handles: handles,
            active: method.toLowerCase() !== "local",
            method: method.toLowerCase()
        });
        if (method === "local") {
            if (!password) {
                sendResponse('Please provide password', res);
            }
            //encryting password
            const sault = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, sault);
        } else {
            user.googleId = id;
        }

        await user.save();
        // return sendResponse("User created successfully", res, 200);
        const jwtToken = generateToken(user);
        if (method === "local") {

            const encodedToken = Buffer.from(jwtToken).toString('base64url');

            await userSchema.findByIdAndUpdate(user._id, { mailToken: jwtToken });
            const url = process.env.CLIENT_HOST + "users/" + user.username + "/verifyemail/" + encodedToken;
            console.log(url + "\n" + jwtToken);
            try {

                sendMail(user.email, "Verify your email!", "confirm-email", user.username, url);
            }
            catch (error) {
                console.log(error + " here");
            }
            return sendResponse('Email successfully sent', res, 200);
        } else {

            const resObj = {
                token: jwtToken,
                userData: user,
                expiresIn: 86400,
            }
            return sendResponse(resObj, res, 200);

        }

    } catch (error) {
        // console.log(error + " eroro")
        return sendResponse(error, res, 500);
    }

}
/**
 * 
 * @param {email, password, id(in case of google auth)} req 
 * @param {*} res 
 */
exports.loginUser = async (req, res) => {

    const { username, email, password, method, id } = req.body;
    try {
        let user;
        if (!username) {
            user = await userSchema.findOne({ email });
        } else {
            user = await userSchema.findOne({ username });
        }
        if (!user) {
            return sendResponse('Authentication failed! No such user exist!', res, 404);
        }
        if (!user.active) {
            return sendResponse('Account email is not confirmed yet! Check Your Email Inbox', res, 401);
        }
        const jwtToken = generateToken(user);
        if (method.toLowerCase() === 'local') {
            const ok = await bcrypt.compare(password, user.password);
            if (ok) {
                const resObj = {
                    token: jwtToken,
                    userData: user,
                    expiresIn: 86400,
                }
                user.mailToken = jwtToken;
                user.save();
                return sendResponse(resObj, res, 200);
            } else {
                return sendResponse('Invalid Credentials!', res, 401);
            }
        } else {
            if (id == user.googleId) {
                const resObj = {
                    token: jwtToken,
                    userData: user,
                    expiresIn: 86400,
                }
                user.mailToken = jwtToken;
                user.save();
                return sendResponse(resObj, res, 200);
            } else {
                return sendResponse('Invalid Credentials!', res, 401);
            }
        }
    } catch (err) {
        return sendResponse(err, res, 500);
    }
}

/**
 * 
 * @param {token} req 
 * @param {*} res 
 */
exports.verifyEmail = async (req, res) => {
    const username = req.params.username;

    const getToken = req.body.token;
    const decodedToken = Buffer.from(getToken, 'base64url').toString();
    // console.log("old " + getToken + " new " + decodedToken);
    // console.log(getToken);
    try {
        const ok = jwt.verify(decodedToken, process.env.SECRETKEY);
        if (ok) {
            let user = await userSchema.findOne({ username: username });
            if (user.mailToken === decodedToken)
                if (user) {
                    user.mailToken = '';
                    user.active = true;
                    await user.save();
                    return sendResponse('Account Email Confirmed!', res);
                }
            return sendResponse('Account Activation Failed', res, 401);
        } else {
            return sendResponse('Invalid activation requested! Kindly follow url sent in mail!', res, 401);
        }
    } catch (err) {
        return sendResponse(err, res, 500);
    }

}

exports.forgotPassword = async (req, res) => {
    const usermail = req.body.email;
    try {
        let user = await userSchema.findOne({ email: usermail });
        if (!user) {
            return sendResponse("Invalid email, User not found!", res, 404);
        } else {
            const token = generateToken(user);
            user.mailToken = token;
            await user.save();
            const url = "url-goes-here+email_key" + token;
            sendMail(usermail, 'Password help has arrived', 'forgot-password-email', user.username, url);
            return sendResponse("Email sent successfully!", res, 200);
        }
    } catch (err) {
        return sendResponse(err, res, 500);
    }
}


exports.resetPassword = async (req, res) => {
    const { newpass, usrToken } = req.body;
    try {
        const ok = jwt.verify(usrToken, process.env.SECRETKEY);
        if (!ok) {
            return sendResponse("Invalid token or token expired!", res, 401);
        }

        let user = await userSchema.findOne({ mailToken: usrToken });
        if (!user) {
            return sendResponse('Incorrect Token!', res, 400);
        }

        //encryting password
        const sault = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, sault);
        user.mailToken = '';
        await user.save();
        // return sendMail() send mail that password reset!
        return sendResponse("Password updated successfully!", res);

    } catch (err) {
        return sendResponse(err, res, 500);
    }
}


exports.updateUser = async (req, res) => {
    try {
        let user = await userSchema.findOne({ username: req.params.username });
        const { firstname, lastname, bio,handles } = req.body;
        if (!user) {
            return sendResponse("User with this username does not exist!", res, 404);
        }
        user.firstname = firstname;
        user.lastname = lastname;
        user.bio = bio;
        user.handles = handles;
        await user.save();
        return sendResponse(user, res);
    } catch (err) {
        return sendResponse(err, res, 500);
    }
}

exports.getUserInfo = async (req, res) => {
    const username = req.params.username;
    // console.log(username);
    try {
        let user = await userSchema.findOne({ username: username });
        if (!user) {
            return sendResponse("User with this username does not exist!", res, 404);
        }
        var data = {
            'fullName': user.fullName,
            'bio': user.bio,
            'email': user.email
        };
        JSON.parse(JSON.stringify(user));
        return sendResponse(user, res);
    } catch (err) {
        return sendResponse(err, res, 500);
    }
}
exports.getAllUsernames = async (req, res) => {
    let userMap = {};
    let users = await userSchema.find({});

    users.forEach((user) => {
        userMap[user._id] = {
            username: user.username,
            email: user.email
        };
    });

    sendResponse(userMap, res);
}

exports.getLeetcodeData = async (req, res) => {
    const username = req.params.username;
    const user = await userSchema.findOne({ username: username });
    if (user) {
        
        var handle = user.handles.leetcodeHandle; // Replace with the desired Codeforces username
        // console.log(handle)
        if (handle) {
            try {
                // Fetch user's Codeforces data
                const query = `
                {
                  matchedUser(username: "${handle}") {
                    username
                    submitStats: submitStatsGlobal {
                      acSubmissionNum {
                        difficulty
                        count
                        submissions
                      }
                    }
                  }
                }
              `;

                const response = await axios.post('https://leetcode.com/graphql', { query });
                const leetCodeData = response.data.data.matchedUser.submitStats.acSubmissionNum;

                sendResponse(leetCodeData, res, 200);
            } catch (error) {
                console.error(error);
                sendResponse('An error occurred while fetching data from LeetCode API', res, 500);
            }
        }
        else
            sendResponse('handle does not exist', res, 404);
    }
    else
        sendResponse('user does not exist', res, 404);

}

exports.getCodeforcesData = async (req, res) => {
    const username = req.params.username;
    const user = await userSchema.findOne({ username: username });
    if (user) {
        const handle = user.handles.codeforcesHandle; // Replace with the desired Codeforces username
        if (handle) {
            try{
                const response = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}`);
                const codeforcesData = processData(response.data.result);
                codeforcesData.handle = handle;

                sendResponse(codeforcesData ,res,200);

            }
            catch(error)
            {
                console.error(error.message);
                sendResponse('An error occurred while fetching data from Codeforces API', res, error.status);
            }
        }
        else
            sendResponse('handle does not exist', res, 404);
    }
    else
        sendResponse('user does not exist', res, 404);
};

exports.saveCode = async (req, res) => {

}

exports.deleteCode = async (req, res) => {

}

exports.saveConfig = async (req, res) => {

}
function processData(result) {
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
  