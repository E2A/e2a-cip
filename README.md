# Codename Karaw
Ngalakh’s primary ingredient is araw (or Karaw), which is some sort of couscous prepared from millet.

We like pastries. A major target audience for this tool is in West Africa. Therefore, West African pastries. Kudos to Jon.

This project is for E2A's CIP evaluation tool.

# Get Started
1) Install [yarn](https://yarnpkg.com/lang/en/)
2) In the root of this directory run `yarn install` to install dependencies
3) Run `yarn serve` in the root dir to run a server on localhost
4) Go to `localhost:8080` to view the app
5) To package the app for desktop use run `yarn build:electron --windows` or `yarn build:electron --macos`
6) To package the app for deskop web use run `yarn build`

# Data Structure / ERD
- Activities
  - id (int)
  - Text (string)
  - Type (string) note: select from array of options
  - Youth Focused (bool)
  - Budget (int)
  - Assessments [{id: 1, text: "Multi sectoral inclusion", state: "Y"}, {id: 7, text: "Best practice 7", state: "M"}] * note "No" = implied, if not included it would not be viewed as having X best practice
  - Improvement {text: "Do things better", budget: 200000}
- Setup Info
  - Title (txt)
  - Currency (string)
  - Country (string)
  - Role (string) note: select from array of options

We are using [Vuex ORM](https://vuex-orm.github.io/vuex-orm/) for data management.

Edit ERD by going to draw.io and upload the E2A_ERD.xml file.

### ERD Diagram for Application
![ERD](E2A_ERD.png)
