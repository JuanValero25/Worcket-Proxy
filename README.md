# ⚡ Technical Test for Worcket

- Dependencies
    - [NodeJs](https://nodejs.org/en/)
    
    - [CacheImplementation](https://www.npmjs.com/package/axios-cache-adapter)

## Posible Logging  Description

for loggin i will used [Winston](https://www.npmjs.com/package/winston)
for AWS application is really usefull, we can make loging for specific logginGroups
also selection for loggin level 

## Posible Usage statistics
  Description depend alot what api management you are using but simple using is just a middleware
  in node.js to collect the data to statics or maybe inserting into aws athena ?
  
## Posible Usage strategy of deployment of the services
  first make a CI/CD from repo/to deployment Service , for dev/test services
  with integration depending of branch, this can be maded with jenkin jobs or aws codebuild/codePipeline
  and for flow to production depent alot how is the management from Development manager to Devops
  but simple worflow can be a Peer reviews/code review from each branch and with approvals to deployment on prudction 
  
  some team use git flow of release other internal releases depend alot what the team decide
