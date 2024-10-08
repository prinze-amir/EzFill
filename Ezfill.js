
//this function will insert the form fields based on provider
document.addEventListener('DOMContentLoaded', function () {
    const fillButton = document.getElementById("autofill");
    // const new37th = document.getElementById("newCase37th");
    // const new3rd = document.getElementById("newCase3rd");
    const providerList = document.getElementById('provider');
    const balanceField = document.getElementById('balance');
    const insurance = document.getElementById('insurance');
   // const balance  = balanceField.value;
    const addInfo = document.getElementById('attorneyinfo');
    let party = providerList.value;
    let defendant = insurance.value;

    balanceField.addEventListener('change', function (){
        balance = balanceField.value;
    });
    insurance.addEventListener('change', function (){
        defendant = insurance.value;
    });
    providerList.addEventListener('change', function(){
    party = providerList.value;
    console.log(party)
})

    addInfo.addEventListener('click', async function () {
        await chrome.scripting.executeScript({
          target: { tabId: await getCurrentTabId() },
          function: autoFillInfoUd10,
        });
      });

    fillButton.addEventListener('click', async function () {
      await chrome.scripting.executeScript({
        target: { tabId: await getCurrentTabId() },
        function: myAutoFill,
        args: [party,balance, defendant],
      });
    });

    // new37th.addEventListener('click', async function () {
    //   await chrome.scripting.executeScript({
    //     target: { tabId: await getCurrentTabId() },
    //     function: newCase,
    //     args: ["37th"],
    //   });
    // });

    // new3rd.addEventListener('click', async function () {
    //   await chrome.scripting.executeScript({
    //     target: { tabId: await getCurrentTabId() },
    //     function: newCase,
    //     args: ['3rd'],
    //   });
    // });



  });

  async function autoFillInfoUd10() {
    const latham = {
        firstName: 'Alan',
        lastName: 'Latham',
        barNumber: 'P77559',
        email: 'alatham@lathamlawgroup.com',
        address1: '346 Park Street',
        address2: 'Suite 130',
        city: 'Birmingham',
        state: 'MI',
        zip: '48009',
        phone: '(248) 210-8735',
    }
    console.log(latham)
    document.getElementById('ctl00_MainContent_txtBillFirstName').value = latham.firstName;
    document.getElementById('ctl00_MainContent_txtBillLastName').value = latham.lastName;
    document.getElementById('ctl00_MainContent_txtBillStreet1').value = latham.address1;
    document.getElementById('ctl00_MainContent_txtBillStreet2').value = latham.address2;
    document.getElementById('ctl00_MainContent_txtBillCity').value = latham.city;
    document.getElementById('ctl00_MainContent_txtBillZip').value = latham.zip;
    document.getElementById('ctl00_MainContent_lstBillState').value = latham.state;
    document.getElementById('ctl00_MainContent_txtBillPhone').value = latham.phone;
    document.getElementById('ctl00_MainContent_txtBillEmail').value = latham.email;
  }


async function getCurrentTabId() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id;
  }

function myAutoFill(provider, balance, defendant){

    const theFrame = document.querySelector("#formFrame")

    if (theFrame){

        const frameDocument = theFrame.contentWindow.document;
                //party section set form variabled
                let entityName =  frameDocument.querySelector('[ng-model="party.entityName"]');
                let partyAddress =  frameDocument.querySelector('[ng-model="party.address"]');
                let partyCity =  frameDocument.querySelector('[ng-model="party.city"]');
                let partyState =  frameDocument.querySelector('[ng-model="party.state"]'); //set this value to "string:Michigan"
                let partyZip =  frameDocument.querySelector('[ng-model="party.zip"]');
                let hasAttorney =  frameDocument.querySelector('[name="56"]');
                let isEntity =  frameDocument.querySelector('[name="34"]');
                const entity = [entityName, partyAddress, partyCity, partyZip, partyState, hasAttorney ]

                //attorney section set attorney form variables
                let lastName =  frameDocument.querySelector('[ng-model="attorney.lastName"]');
                let firstName =  frameDocument.querySelector('[ng-model="attorney.firstName"]');
                let barNumber =  frameDocument.querySelector('[ng-model="attorney.number"]');
                let jurisdiction =  frameDocument.querySelector('[ng-model="attorney.jurisdiction"]');
                let email =  frameDocument.querySelector('[ng-model="attorney.email"]');
                let attorneyAddress =  frameDocument.querySelector('[ng-model="attorney.address"]');
                let attorneyCity =  frameDocument.querySelector('[ng-model="attorney.city"]');
                let attorneyState =  frameDocument.querySelector('[ng-model="attorney.state"]');
                let attorneyZip =  frameDocument.querySelector('[ng-model="attorney.zip"]');
                let attorneyPhone =  frameDocument.querySelector('[ng-model="attorney.phone"]');
                const attorney = [lastName, firstName, barNumber, email, attorneyAddress, attorneyCity, attorneyState, attorneyZip, attorneyPhone ];

                //defendant section
                let isInsurance = frameDocument.querySelector('[name="170"]');//changed from 171 to 160
                let defendantName =  frameDocument.querySelectorAll('[ng-model="party.entityName"]')[1];


                //Claim section
                let claimAmount = frameDocument.querySelector('[ng-model="model.claimAmount"]');

                let event = new Event('change') //create new change event to trigger form validation.

            //Autofill party Information

                    hasAttorney.click()
                    isEntity.click()
                    isInsurance.click()
            switch (provider) {
                case 'GreatLakesPharmacy':
                  console.log('Autofill logic for Great Lakes Pharmacy');
                  break;
                case 'Medivan':
                    entityName.value = "Medivan LLC"
                    partyAddress.value = "520 Beaver"
                    partyCity.value = 'Royal Oak'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48073'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                  break;
                case 'C&C Medical':
                    entityName.value = "C&C Medical Equipment LLC"
                    partyAddress.value = "318 Chippewa"
                    partyCity.value = 'Clawson'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48017'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'Labser':
                    entityName.value = "Labser LLC"
                    partyAddress.value = "14501 Telegraph Road, Suite 201"
                    partyCity.value = 'Redford'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48239'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'Aquatics':
                    entityName.value = "Labser LLC"
                    partyAddress.value = "25591 Coolidge Hwy"
                    partyCity.value = 'Oak Park'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48237'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;

                case 'Discount':
                    entityName.value = "Discount Drugs LLC"
                    partyAddress.value = "19145 Allen Road, Suite 105"
                    partyCity.value = 'Brownstown'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48183'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'BiddlePharmacy':
                    entityName.value = "Biddle Pharmacy"
                    partyAddress.value = "19145 Allen Road, Suite 105"
                    partyCity.value = 'Brownstown'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48183'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'NorthlandRadiology':
                    entityName.value = "Northland Radiology"
                    partyAddress.value = "19145 Allen Road, Suite 105"
                    partyCity.value = 'Brownstown'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48183'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'USRehab':
                    entityName.value = "US Rehabilitation & Health Services"
                    partyAddress.value = "13439 E. 14 Mile Road"
                    partyCity.value = 'Sterling Heights'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48312'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'AuroRehab':
                    entityName.value = "Auro Rehab Services LLC"
                    partyAddress.value = "31904 Ryan Road"
                    partyCity.value = 'Warren'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48092'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                case 'AccidentVictims':
                    entityName.value = "Accident Victims Advocates, Inc."
                    partyAddress.value = "5747 Kilbrennan Road"
                    partyCity.value = 'Bloomfield Hills'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48301'

                    entity.forEach(element=>{
                        element.dispatchEvent(event);

                    });
                    break;
                // Add cases for other providers
                default:
                  console.log('No autofill logic defined for the selected provider');
                  alert('Please select provider!').
                  break;
              }


            //Autofill Attorney Section
                lastName.value = 'Alan'
                firstName.value = 'Latham'
                barNumber.value  = 'P77559'
            // jurisdiction.value  = 'string:Michigan';
                email.value = "alatham@lathamlawgroup.com"
                attorneyAddress.value = '346 Park Street, Suite 130'
                attorneyCity.value = 'Birmingham'
                attorneyState.value = 'string:Michigan'
                attorneyZip.value = '48009'
                attorneyPhone.value = '(248) 210-8735'
                attorney.forEach(element=>{
                    element.dispatchEvent(event);
                })

                //autofill defendant section
                defendantName.value = defendant;
                defendantName.dispatchEvent(event);

                  claimAmount.value = balance;
                  claimAmount.dispatchEvent(event)

    }

}

function newCase(court) {

  const newLink  = document.getElementsByClassName('classic-link')[0];
  newLink.click();
  const selectCourt = document.getElementById('court_select_dropdown');
  selectCourt.click();
  document.getElementsByClassName('dropdown-list-group-header')[1].click()



  //document.querySelector("#court_select_dropdown").value =


}



