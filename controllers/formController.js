const { verifyToken } = require("../common/token");
const FormData = require("../models/formSchema");

const handleFormData = async (req, res) => {
  const { name, phone, linkedin, address, website, email, briefintro } =
    req.body;

  const user = req.user;
  const userId = user.userId;
  let version = 1;
  let portfolioData = {};
  //education

  const degree = req.body["degree[]"];
  const start = req.body["start[]"];
  const end = req.body["end[]"];
  const uni = req.body["uni[]"];
  const expert = req.body["expert[]"];

  //() becaus eit is returning an oject , we do this to return object without using keyword return
  educationDetails = Array.isArray(degree)
    ? degree.map((deg, index) => ({
        degree: deg,
        start: start[index],
        end: end[index],
        uni: uni[index],
      }))
    : [
        {
          degree,
          start,
          end,
          uni,
        },
      ];

  //language

  const lanname = req.body["lanname[]"];
  const lanper = req.body["lanper[]"];
  languageDetails = Array.isArray(lanname)
    ? lanname.map((lan, index) => ({
        lanname: lan,
        lanper: lanper[index],
      }))
    : [
        {
          lanname,
          lanper: lanper,
        },
      ];

  //experience

  const expStart = req.body["ex-start[]"];
  const expEnd = req.body["ex-end[]"];
  const companyName = req.body["cname[]"];
  const jobRole = req.body["job-role[]"];
  const jobDes = req.body["job-des[]"];

  // :[{}] .. even if there is only one record in experience we still treat it as array of objects hence [{}]
  ExpDetails = Array.isArray(companyName)
    ? companyName.map((company, index) => ({
        companyName: company,
        expStart: expStart[index],
        expEnd: expEnd[index],
        jobRole: jobRole[index],
        jobDes: jobDes[index],
      }))
    : [
        {
          companyName,
          expStart,
          expEnd,
          jobRole,
          jobDes,
        },
      ];

  //skill details
  // Using req.body["skill-name[]"] explicitly tells JavaScript to look for the property with the exact string key "skill-name[]".
  //if skillName was there => req.body.skillName could be used

  const skillName = req.body["skill-name[]"];
  const skillPer = req.body["skill-per[]"];

  skillDetails = Array.isArray(skillName)
    ? skillName.map((name, index) => ({
        skillName: name,
        skillPer: skillPer[index],
      }))
    : [
        {
          skillName,
          skillPer,
        },
      ];

  const existingFormData = await FormData.findOne({
    userId: userId,
    active: true,
    archieve: false,
  });
  if (existingFormData) {
    version = existingFormData.version;
    version++;
    const updateData = await FormData.updateOne(
      { userId: userId },
      { $set: { archieve: true } }
    );
  }

  const formData = await FormData.create({
    userId: userId,
    name: name,
    email: email,
    address: address,
    website: website,
    linkedin: linkedin,
    contact: phone,
    briefIntro: briefintro,
    expert: expert,
    education: educationDetails,
    experience: ExpDetails,
    langugae: languageDetails,
    skills: skillDetails,
    interests: ["Reading", "writing"],
    version: version,
    archieve: false,
    active: true,
  });

  console.log(formData);
  portfolioData = {
    name,
    phone,
    linkedin,
    address,
    website,
    email,
    briefintro,
    educationDetails,
    ExpDetails,
    skillDetails,
    languageDetails,
    expert,
  };
  console.log(portfolioData);
  console.log(expert);
  res.render("dashboard");
};

const handelGetData = async (req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    const userId = user.userId;
    const templateName = req.params.template;
    console.log(userId);
    const userFormData = await FormData.findOne({
      userId: userId,
      archieve: false,
    });

    if (!userFormData) {
      res.render("./form/index", {
        message: "You need to fill form first",
      });
    } else {
      res.locals.portfolioData = userFormData;
      res.render(`./${templateName}/index`, userFormData);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "Error" });
  }
};

module.exports = { handleFormData, handelGetData };
