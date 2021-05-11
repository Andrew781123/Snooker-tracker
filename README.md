# Snooker-tracker

## Learning Objectives
1. Basic React Native
2. Databse Aggregation Functions
3. Optimistic Update

## Demo
### Login & Registration 
**JWT authentication is used**

### Home Screen
- Combination of tabs navigator stacks navigator <br/>
<br/>
![image](https://user-images.githubusercontent.com/61986168/117746240-aae84f80-b23e-11eb-80be-969d86532250.png)

### Scoreboard
- One vs One snooker scoreboard
- Complete snooker rules are carefully implemented (eg. different foul situations)
<br/>

![image](https://user-images.githubusercontent.com/61986168/117746790-8d67b580-b23f-11eb-9a1b-ec9ad65fb4db.png)

### Goal 
**Set goals and complete them** <br/>
**Optimistic update is implemented**
- UI will react immediately after operation (eg. adding a goal)
- If the server failed to add/update/delete a goal due to failure of network connection, the operation will be done once internet is available
<br/>

![image](https://user-images.githubusercontent.com/61986168/117746561-3235c300-b23f-11eb-8fba-e317aab5877d.png)

### Player Stats
**MongoDB aggregate function is implemented to generate statistics** <br/>
<br/>
![image](https://user-images.githubusercontent.com/61986168/117746376-ef73eb00-b23e-11eb-86c7-9d7a5ac5f49a.png)
