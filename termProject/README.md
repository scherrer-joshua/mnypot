This is the README.txt file for Team MoneyPot's Final Project for 1.00-Spring 2017


HIGH-LEVEL OVERVIEW:

Our project idea was to design an interactive web service that allowed people to provide data about where they want their particular state of residence to spend its tax revenue. 

This project has 3 different web pages associated with it:

Page 1 is a drop-down menu where users can choose their state of residence

Page 2 has two different elements:
	-A pie chart which shows the breakdown of the chosen state's 2016 tax revenue, divided up into 5 main areas:
			-Property Taxes
			-Income Taxes
			-Sales Taxes
			-Licensing Taxes
			-Other Taxes 
	- A response form which allows the user to enter, from a 0-100 scale, what proportion of the pie should be spent across 11 different general areas:
			-Infrastructure
			-Education
			-Healthcare
			-Libraries
			-Public Transportation
			-Economic Development
			-Parks and Recreation
			-Pension/Health Benefits for Public Employees
			-Assistance to Low-Income Households
			-Corrections
			-Urban Housing

Page 3 is a final pie chart which shows the aggregated results of the user responses for the particular state that was chosen, along with a button that takes the user back to page 1, giving them the opportunity to record another response.


HOW TO INSTALL/RUN OUR PROJECT:

This project has 4 main files:
"app.js" is located within the main directory, named ""
"InitialDropDown.html", "UserSubForm.html", and "OurCollectedDataVis.html" are located within the "views" folder within the main directory

Our project code was written using a combo of HTML, CSS, and JavaScript. For our pie charts, we used Chart.js framework.

This project requires the following npm libraries:
-express
-mongoose
-mustache-express

Finally, this project uses mongoDB for our data-related needs. 
The code necessary to access the database is as follows:

mongod --dbpath data/db


Once all of the npm libraries are installed and mongoDB is running out database, the project can be run using node in the Terminal. 

node app.js

This command should return the string "Example app listening on port 3000!"
Once the server is up and running, enter "localhost:3000" in 
