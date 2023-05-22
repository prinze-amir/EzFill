
//this function will insert the form fields based on provider
document.addEventListener('DOMContentLoaded', function () {
    const fillButton = document.getElementById("autofill");
    const providerList = document.getElementById('provider');     
    let party = providerList.value;
    const balanceField = document.getElementById('balance')
    let balance  = balanceField.value;

    balanceField.addEventListener('change', function (){
        balance = balanceField.value;
    });
    providerList.addEventListener('change', function(){
    party = providerList.value;
    console.log(party)
})
    fillButton.addEventListener('click', async function () {
      await chrome.scripting.executeScript({
        target: { tabId: await getCurrentTabId() },
        function: myAutoFill,
        args: [party,balance], 
      });
    });

    

  });
  
async function getCurrentTabId() {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    return tabs[0].id;
  }

function myAutoFill(provider, balance){

    const theFrame = document.querySelector("#formFrame")
     
    if (theFrame){

        const frameDocument = theFrame.contentWindow.document;
                //party section set form variabled
                let entityName =  frameDocument.querySelector('[ng-model="party.entityName"]');
                let partyAddress =  frameDocument.querySelector('[ng-model="party.address"]');
                let partyCity =  frameDocument.querySelector('[ng-model="party.city"]');
                let partyState =  frameDocument.querySelector('[ng-model="party.state"]'); //set this value to "string:Michigan"
                let partyZip =  frameDocument.querySelector('[ng-model="party.zip"]');
                let hasAttorney =  frameDocument.querySelector('[name="56"]');//set this value to false
                let isEntity =  frameDocument.querySelector('[name="34"]');//set this value to false
                
                const entity = [entityName, partyAddress, partyCity, partyZip, partyState, hasAttorney ]
                console.log(entityName);
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
                //Claim section
                let claimAmount = frameDocument.querySelector('[ng-model="model.claimAmount"]');
                
                let event = new Event('change') //create new change event to trigger form validation.

            //Autofill party Information
            
            switch (provider) {
                case 'Great Lakes Pharmacy':
                  console.log('Autofill logic for Great Lakes Pharmacy');
                  break;
                case 'Medivan':
                    entityName.value = "Medivan LLC"
                    partyAddress.value = "520 Beaver"
                    partyCity.value = 'Royal Oak'
                    partyState.value  = "string:Michigan"
                    partyZip.value = '48073'
                    hasAttorney.click()
                    isEntity.click();
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
                    hasAttorney.click()
                    isEntity.click();
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
                lastName.value = 'Rizzo'
                firstName.value = 'Ryanne'
                barNumber.value  = 'P83838'
            // jurisdiction.value  = 'string:Michigan';
                email.value = "rrizzo@lathamlawgroup.com"
                attorneyAddress.value = '346 Park Street, Suite 130'
                attorneyCity.value = 'Birmingham'
                attorneyState.value = 'string:Michigan'
                attorneyZip.value = '48009'
                attorneyPhone.value = '(248) 210-8735'
                attorney.forEach(element=>{
                    element.dispatchEvent(event);
                })    
                if (claimAmount){

                  claimAmount.value = balance;
                  claimAmount.dispatchEvent(event)

                }  
    }
        
}
      

    
    

