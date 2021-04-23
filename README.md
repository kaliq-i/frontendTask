
## 'How the App works:'

1.  Select two or more choices by inputting a choice name in the first form

    1. Choices are a unique string

2.  Select at least 1 attribute to compare each of your choices with

    1.  You must input the minimum value for this attribute and maximum value
    2.  You must insert a weighting for this attribute between 0-1
    3.  Each attribute name must be unique 

3.  Click next page and compare your choices

    1.  You can use a slider to manipulate individual weightings
    2.  You can use a slider to manipulate any attribute value 
    3.  Enjoy!

## 'Assumptions:'

-   No BigInt used
-   The attributes all have a numerical scale
-   The Minimum value on an attribute scale is 0

## 'Things I had in mind':

-   Responsive design
-   fairly strict typing 
-   Avoiding index as key for rendered components
-   Using helper functions to maintain readability
-   Thinking carefully about naming variables 
-   Avoiding state Mutation

## 'Things I never got round to'

-   Clearing inputs after submission of form 
-   Allowing for users to input the value in the attribute form 
-   Autofocus on forms using useRef
-   Finding an alternative to non-null assertions, any types in the few occasions used
-   Moving all non-live libraries to devDependencies 

## 'Things that I thought were interesting but didn't attempt'

-   Auto-positioning nodes using dagre library