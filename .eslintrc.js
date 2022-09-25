module.exports={
  root: true,
  env: {
    browser:true, 
    amd:true, 
    node:true, 
    es6:true
  },
  extends:[
    "eslint:recommended",
    "eslint:recommended",
    "next",
    "next/core-web-vitals"
  ],
  rules:{
    "semi": ["error", "always"]
  }
}