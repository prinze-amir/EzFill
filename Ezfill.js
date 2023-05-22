//this script will Ez Fill forms on the truefiling website when filing lawsuits.  Save time on constantly adding the same information over an over with the just the click of a button.  The function below can be pasted in the consoleLog of browser dev toosl to invoke.  Will update code to work as a browser extension.
function myAutoFill(provider){

    //party section
    let entityName =  document.querySelector('[ng-model="party.entityName"]');
    let partyAddress =  document.querySelector('[ng-model="party.address"]');
    let partyCity =  document.querySelector('[ng-model="party.city"]');
    let partyState =  document.querySelector('[ng-model="party.state"]'); //set this value to "string:Michigan"
    let partyZip =  document.querySelector('[ng-model="party.zip"]');
    let hasAttorney =  document.querySelector('[ng-model="party.selfRepresented"]');//set this value to false
    
    const entity = [entityName, partyAddress, partyCity, partyZip, partyState, hasAttorney ]

    //attorney section
    let lastName =  document.querySelector('[ng-model="attorney.lastName"]');
    let firstName =  document.querySelector('[ng-model="attorney.firstName"]');
    let barNumber =  document.querySelector('[ng-model="attorney.number"]');
    let jurisdiction =  document.querySelector('[ng-model="attorney.jurisdiction"]');
    let email =  document.querySelector('[ng-model="attorney.email"]');
    let attorneyAddress =  document.querySelector('[ng-model="attorney.address"]');
    let attorneyCity =  document.querySelector('[ng-model="attorney.city"]');
    let attorneyState =  document.querySelector('[ng-model="attorney.state"]');
    let attorneyZip =  document.querySelector('[ng-model="attorney.zip"]');
    let attorneyPhone =  document.querySelector('[ng-model="attorney.phone"]');

    let claimAmount = document.querySelector('[ng-model="model.claimAmount"]');

    //Autofill party Information

    if (provider == 'medivan'){
        
        entityName.value = "Medivan LLC"
        partyAddress.value = "520 Beaver"
        partyCity.value = 'Royal Oak'
        partyState.value  = "string:Michigan"
        partyZip.value = '48073'
        hasAttorney.value = false

        let event = new Event('change')
        entity.forEach(element=>{
            element.classList.remove("ng-empty")
            element.classList.remove("ng-pristine")
            element.classList.remove("ng-untouched")
            element.classList.add("g-not-empty")
            element.classList.add("ng-dirty")
            element.classList.add("ng-valid-parse")
            element.classList.add("ng-touched")
            element.dispatchEvent(event);

        })

    }
    
    if (provider == 'labser'){

        entityName.value = "Labser LLC"
        partyAddress.value = "14501 Telegraph Road, Suite 201"
        partyCity.value = 'Redford'
        partyState.value  = "string:Michigan"
        partyState.classList.remove("ng-empty")
        partyState.classList.add("g-not-empty")
        partyZip.value = '48239'
        attorney.value = false
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
   attorneyState.classList.remove("ng-empty")
   attorneyState.classList.add("g-not-empty")
   attorneyZip.value = '48009'
   attorneyPhone.value = '(248) 210-8735'
 //  claimAmount.value = balance

}

document.addEventListener('DOMContentLoaded', function () {
    const fillButton = document.getElementById("autofill");
    
    fillButton.addEventListener('click', function () {
        myAutoFill('medivan')
    });

  });



