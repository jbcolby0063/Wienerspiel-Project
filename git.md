## Branch Naming Conventions(following Gitflow)

### Naming Conventions
<b><center>Follow the the below naming conventions when creating branches(don't add the "[ ]"  when creating the branches)</center></b>

* main(this is the main/master branch): "main"
* develop: "develop"
* feature: "feature/[Feature-Creator]/[Name-of-feature]"
* Release: "Release/[Version-number]
* hotfix: "hotfix/[Person's-Name]/[Description-of-hotfix]"

### Way to Name version number
* [release-number].[hotfix-number]

### What is the develop branch
* This includes all current code that the developers are working on. you will pull from this branch to create the feature branches

### Creating A Feature
* When starting on a new feature, you must pull the current develop branch, then fork the current develop branch and then create your feature branch that you will be working on
* Any work that you do will be commited to the feature branch
* Once you have complete your task and any bug fixes have been tested, you will merge your code into the develop branch. After merging, test code again to check for any other issues

### Release Branches(only done by the project leader!!)
* Release branches are created by forking the develop branch
* After the release branch is created, NO FEATURE COMMITS CAN BE MADE TO IT
* The release branch is used to allow users to test the code and make and quick bug fixes if necessary
* after testing is completed, the release branch is merged with the develop branch and then merged with the main branch
    * Any small bug fixes can be continuously merged into the develop branch
* when merging release branch with the main branch, one must tag the main branch with the version number

### What are Hotfixes
* These are the minor fixes to a project
* Steps for Hotfixes
    * Fork the master branch and create the hotfix branch(use the naming convention showed above)
    * commit any changes to this branch
    * once complete, test code and then afterwards merge the code into the develop and the main branch
    * tag main with hotfix description and new version number(look above on how to create version numbers)
    * redeploy code so that users have the up to date application


###  Pull Requests
* Pull Requests are basically ways we can discuss proposed changes that we have made to the code before merging code
* when you are ready to merge code, you must create a pull request so that other developers can review your code and make any last minute changes to the code before merging
* What to do when you want to create a pull request
    * When pushing your code:
        * ```console
            ~$ git push origin <branch name>
            ```
    * Then on github, go and add a pull request. In the pull request, state the following:
        * Name of person creating the pull request
        * Type of fix
            * Minor Bug Fix
            * Feature addition
            * Hotfix
        * Detailed Description of the changes made to the code


## Issues and Commit Messages

