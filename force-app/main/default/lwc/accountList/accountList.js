import { LightningElement,wire,api} from 'lwc';
import getAccounts from '@salesforce/apex/accountClass.getAccounts';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';

export default class AccountList extends LightningElement {
  
    @wire(getAccounts)
    accounts;
  
    accName;
    accId;
    // delAccount;
    
    @api isModalOpen = false;
    handleModal(event) {
        console.log("Hello",event.currentTarget.dataset.id);
        this.isModalOpen = true;
        this.accName = event.currentTarget.dataset.name;
        this.accId = event.currentTarget.dataset.id;
    }
    closeModal() {
        
        this.isModalOpen = false;
    }
    deleteAccount(event) {
       
        this.isModalOpen = false;
        console.log("Account Id",this.accId);
        deleteRecord(this.accId)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Record deleted successfully',
                    variant: 'success'
                })
                
            );
            return refreshApex(this.accounts);
            
        })
        .catch(error => {
            console.log(error);
            alert("Cannot delete this account"); 
        });
    }
    
   
}