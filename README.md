# Get Started / Installation
1) Install [yarn](https://yarnpkg.com/lang/en/)
2) In the root of this directory run `yarn install` to install dependencies

# To Develop Locally
1) Run `yarn serve` in the root dir to run a server on localhost
2) Go to `localhost:8080` to view the app
3) To run / debug electron app on MacOS run: `./dist_electron/mac/E2A-Analysis.app/Contents/MacOS/E2A-Analysis` and any `console.log()` and other electron errors will display in terminal.

# Package for distribution on your own server
1) Install the application
2) Package the app for hosting use run `yarn build` (the final files will be in the `/dist` folder)
- [Vue CLI documentation for deployment](https://cli.vuejs.org/guide/deployment.html#general-guidelines)
- [Article on deployment with NGINX as webserver on Digital Ocean](https://medium.com/@Web_Bailey/deploy-a-vuejs-app-with-digitalocean-fd6e7af07e40)

# Creating and distributing the desktop builds
After having gone through the get started steps:
1) Package the app for desktop use run `yarn build:electron --windows` or `yarn build:electron --macos` (the final files will be in the `/dist_electron` folder)
2) Zip the `.dmg` file for mac and name the file `mac-installer.zip`
3) Zip the `.exe` file for windows and name the file `windows-installer-portable.zip`
4) Zip the folder named `win-ia32-unpacked` and name the file `windows-installer.zip`
5) Clone the LFS respository `git lfs clone git@github.com:E2A/e2a-electron-builds.git`
6) Copy the files you just zipped from steps 2-4, and replace the cloned files in the repository found in step 5
7) If you prefer web-based uploading, go to the [git repository](https://github.com/E2A/e2a-electron-builds) and upload the files there.
8) If there were major changes in the file sizes, update the MBs listed in the current site content [here](https://github.com/E2A/e2a-cip/blob/master/src/locales/en.yaml)

# A note on adding country indicators
Country indicators need to be added to the [en.yaml file](https://github.com/E2A/e2a-cip/blob/master/src/locales/en.yaml) in the below format.

```
countryIndicators:
  indicator1:
    name: 'Percent of Youth in Country'
    description: 'calculated as population 15-24 / 15-49 as of 2015'
    # Do Not Translate
    sourceUrl: 'https://esa.un.org/unpd/wpp/DVD/Files/1_Indicators%20(Standard)/EXCEL_FILES/1_Population/WPP2017_POP_F15_1_ANNUAL_POPULATION_BY_AGE_BOTH_SEXES.xlsx'
    # Do Not Translate
    sourceCitation: 'United Nations, Department of Economic and Social Affairs, Population Division (2017). World Population Prospects: The 2017 Revision, DVD Edition.'
    # Do Not Translate
    fileName: 'percentYouth.csv'
    # Do Not Translate
    iso2codeHeader: 'ISO2'
    # Do Not Translate
    indicatorValueHeader: 'percentYouth.csv'
    indicatorValueUnit: '%'
    questions:
      1: Lorem ipsum dolor sit?
      2: Adipiscig elit consectetur?
```

### Other Considerations for country indicators
You will also need to upload the file as a CSV with UTF-8 character encoding into `public > uploads > country_indicators` - the file name is then added below. Note you **cannot** use excel xlsx or xls files, you will need to open them in excel and convert them to a CSV. Google drive allows you do this well and typically does a better job of ensuring UTF-8 encoding, so where possible, we suggest using google drive over MS Office.

For updating the UN Country population data you can use [this google sheet](https://docs.google.com/spreadsheets/d/1yN2Hig0MdTjzm5HyyYcJ6Nopc3X42qD8pNE0iXxAjVc/edit).

If you need to convert from other ISO formats to ISO2, you can use this [JSON file](https://github.com/E2A/e2a-cip/blob/master/src/authorities/country-conversion-table.json).

# Adding resources to a best practice 
You can add resources to a best pracitce by adding the following to a Best Practice area on the site:

```
resources:
        resource1:
          title: Resource Title
          teaser: |-
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aliquid scire se gaudeant? Laelius clamores sofòw ille so lebat Edere compellans gumias ex ordine nostros. Faceres tu quidem, Torquate, haec omnia; Hoc non est positum in nostra actione. Duo Reges: constructio interrete. Tu quidem reddes; Hoc sic expositum dissimile est superiori. Quicquid enim a sapientia proficiscitur, id continuo debet expletum esse omnibus suis partibus;
          # Do Not Translate
          url: /uploads/resources/bestpractice1.png
```
Note the file itself should be uploaded to `public/uploads/resources` you can find it [here](https://github.com/E2A/e2a-cip/tree/master/public/uploads/resources)

You should add an integer infront of each resource you add, ie `resource1:`, `resource2:` etc

# A note on lanuage
We are using LingoHub for translation.
You can also force an initial language to load by passing `?lang=en` or `fr` (for english and french respectively)
It will also look at the browser / OS language and default to that.

# Editing Content
To edit content you can click [here](https://github.com/E2A/e2a-cip/blob/master/src/locales/en.yaml)

It uses Markdown - you can test your text [here](http://miaolz123.github.io/vue-markdown/)

To add resources and other files you can upload them to `public/uploads` you can access it [here](https://github.com/E2A/e2a-cip/tree/master/public/uploads)

# Data Structure / ERD
We are using [Vuex ORM](https://vuex-orm.github.io/vuex-orm/) for data management.

Edit ERD by going to [draw.io](https://draw.io) and upload the [E2A_ERD.xml](/docs/E2A_ERD.xml) file.

### ERD Diagram for Application
![ERD](docs/E2A_ERD.png)

# Editing and generating icons
Icons are mainly handled through SVG sprites: they are compiled into `src/assets/images/spritemap.svg` and then placed in templates via the `BaseIcon` component. To edit or create new icons:

1. Save your new icon files into `src/assets/images/icons`.
2. Open your icons in a code editor and make sure that any `fill` attributes are set to `fill='currentColor'` (if there's a hex color there, it will override our CSS).
3. Run `yarn icons` in Terminal/Bash.

Best Practice icons are managed in the locale files, e.g. `en.yaml` in the `bestPractices` fields. Just changed the icon name in the `icon` field:

```yaml
bestPractice2:
  title: "Ensuring Access to the Full Range of Contraceptive Methods"
  # Do Not Translate
  icon: eip-contraceptives
```
