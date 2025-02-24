# Voting System
## Index OF Content
1. About the code/Algorithm that been used
2. How to scale / Better Optmization that can be Done
___

### Part 1  

In his Ranking/Voting system I Maintain a Few Entities are   
1. Voter
2. Participant
3. System Management / leaderBoard    

Q1 ***How I manage votes by the same Voter ?***  
->  so In my system Management we introduce the interface or main Entity that is executing all the function    
in that we have **Unique ID**  for all Voter and Participants. When Voter votes it check if it is already voted or not.  
1. #### Case 1 - Already Voted    
        Then in this case I get the prev voted participant and score value and remove from it so the prev voted participant score decrease.

2. #### Case 2 - Not Voted
        Then in this case it simplly add the score.

   
Q2 ***How I get all Ranks and Deliver Real time ? ***   
->  For Now I just use sorting on the List and return all the ranks **We can Improve this discuss in  PART2**  
      For Real time updates We can use simple Websocket connection all user that are present in our   
      site they connect with our server and using that we deliver real time updates !**This can also be improve discuss in next part**


___
___
### PART2 - SCALING AND OPTIMIZATION
``` 
#### Problems to Discuss
1. If We have thousand of Participants How I handle ranking system is sorting is Efficent?
2. How we Handle Real time or manage connection is there any other method?
3. Other Scaling for non-functional
```
## Problem 1
 if we have Large trafic and we have expose an api which give all the rank of all participants  
 so **Now Sorting Cause Problem** so what should we do 
 1. Introduction of Top K api
        Sometime people only need to see only top people so for this calling all rank api   
        leads to wastage of resources. so we introduce a api which return TOP participant   
        Now How we get TOP K Participants.  
        ```
        1. Approch 1   
        we can use Priority Queue(IN RAM) to store all participants and we can get the TOP K.
        *** Another Issue : Adding Thousands of users in Queue Cause Issue *** so what
        should we do about it .
        We Can Distribute our Queue into Multiple server and use a aggerator to aggreate the result 
        We can partation Queue by rank.
        ### MAJOR ISSUE How we Address the **Staleness** so we again lead to reconstruct the queue for some time 
        this might work but if our system need to scale more it is not good solution .    

        2. Approch 2 Use Redis Sorted List
        But Here We Tackle Problem  that we can not partation it so if we require **api that provide the near me then cause problem**

    
    ### How We Can Solve this
      We can use Hydrid approch with Both But to get all ranks we need to query it. 
      For this We Can ADD Pagination to get our data.
___
## Problem 2 :How to Mangage RealTime 
``` Now if we Have thousand of users taking real time connection cause heavy load 
    before we need to tranfer large data all ranks now we try we show first top k
    or tell the rank of participant to it which is less data so it can manage.
    But we scale it we distrubite it using any technique like redis pub-sub or suscribing to 
    paricular id.
```
### Now If we see Do we Really Need to Handle Web-Socket?
    -> we can use pooling to get the top K and participant Rank which help in remove load or sse events;
___

## FEW MORE QUESTION
1. How We ensure votes is Persistent and should not loose - > we can use event streaming like kafka ,kensis etc
2. How to Reduce Load If we Use Database -> We can also use Batching :But depend on use cases Eventually or full consistency.


## I think there might be more bottleneck but on itteration we can improve this. 






