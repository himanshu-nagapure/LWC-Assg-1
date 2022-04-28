public with sharing class accountClass {
    public accountClass() {

    }
    @AuraEnabled(cacheable = true)
    public static list<account> getAccounts(){
        
            return[select id,name,phone from Account where phone=NULL limit 7];
       
    }
}
