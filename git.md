## Branch Naming Conventions(following Gitflow)

### Naming Conventions
<b><center>Follow the the below naming conventions when creating branches(don't add the "[ ]"  when creating the branches)</center></b>

* main(this is the main/master branch): "main"
* Develop: "Develop"
* Feature: "Feature/[Feature-Creator]/[Name-of-feature]"
* Release: "Release/[Version-number]
* Hotfix: "Hotfix/[Person's-Name]/[Description-of-hotfix]"

### Way to Name version number
* ```console 
    <version-number>.<hotfix-number>
    ```

### How to switch branches
* to add a branch use the following code:
    * ``` console
        ~$ git branch <enter name of branch>
        ```
* To switch branches:
    * ``` console
        ~$ git checkout <name of branch>
        ```

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
    * First push your code:
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

### Commit Naming Conventions
* how to do commits in git
    * ```console
        ~$ git commit -m "<enter message here>"
        ```
* When commiting a piece of code, one must provide a detailed explanation of the changes they made and what issues they addressed, if any

### Issue Naming Conventions
* Conventions when creating issues within the repository
    * Make sure to add labels(look below to know what labels to use)
    * Provde a good description of the issue, question, or request that you are having
    * Make sure to provide code if the issue is specfic to a particular piece of code within the program
    * use mentions when specifically asking another developer a specific question or alerting a specific develop about an issue

* Labels used when creating a new Issue:
    * <b>Bug</b>: When stating that there is an error in the part of the code
    * <b>Help wanted</b>: When help is needed from another developer on a particular task
    * <b>Duplicate</b>: When the issue is already present
    * <b>Question</b>: Further clarification is required on a particular task or if a particalar piece of code is confusing
    * <b>Enhancement</b>: New Feature Request
    * <b>Documentation</b>: Resquesting additions or changes to markdown files or code documentation
    * <b>React</b>: Use this label if the issue is regarding something with React
    * <b>Flask</b>: Use this label if the issue is regarding something with Flask database
    * <b>Styling</b>: Use this label if the issue is regarding with the styling of the application
    * <b>Firebase</b>: Use this label if the issue is regarding something with Firebase.



