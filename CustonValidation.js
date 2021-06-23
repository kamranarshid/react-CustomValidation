/*
Common validation class
*****
Who it works
Call from component 
****
import GeneralValidation from "{path}/CustomValidation";
*****
const getValidation = GeneralValidation([
      ["email", "emailAddress", "kamranarshid@gmail.com"],
      ["boolean", "abc", "2"],
    ]); 
*****
for single field validation
const getEmailValidation = GeneralValidation([
      ["email", "emailAddress", "kamranarshid@gmail.com"],
    ]); 
*****
This get array and can handle validations, separate array elements and loo through selected case type

in above example
caseType: email
caseKey: emailAddress  - although it not used, for future use we add this here
caseValue: "kamranarshid@gmail.com
****
It returns true or false on which decision would be taken
New regex also can used as required, just copy new case and paste with new required regex
*/

export default function CustomValidation(validationParams) {
    let errorMessage = ["true"];
    let regex = "";
    let caseType = "";
    let caseKey = "";
    let caseValue = "";
    validationParams.map((elements) => {
      caseType = elements[0];
      caseKey = elements[1];
      caseValue = elements[2];
  
      if (caseType != "" || caseKey != "" || caseValue != "") {
        switch (caseType) {
          case "email":
            regex = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
            break;
          case "boolean": //0,1
            regex = /^[0-1()|&]+$/;
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
            break;
          case "alphaOnly":
            regex = /[^a-zA-Z]/;
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
            break;
          case "numericOnly":
            regex = /^[0-9\b]+$/;
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
            break;
          case "url": // complete url
            regex =
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
            break;
          case "absolutePath": //alpha with  /
            regex = /^\/([A-z0-9-_+]+\/)*([A-z0-9]+\.(txt|zip|png))$/;
            errorMessage = [...errorMessage, checkRegex(regex, caseValue)];
            break;
          case "date":
            break;
          case "valueLengthCheck":
            if (caseKey.length > caseValue) {
              errorMessage = [...errorMessage, "true"];
            }
            break;
          default:
              return "false";
            break;
        }
      } else {
        return "false";
      }
    });
  
    if (errorMessage.includes("false")) {
      return false;
    } else {
      return true;
    }
  }
  
  const checkRegex = (regex, caseValue) => {
    if (regex.test(caseValue)) {
      return "true";
    } else {
      return "false";
    }
  };
  