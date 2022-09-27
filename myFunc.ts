import {ComponentInternalInstance, getCurrentInstance} from "vue"


const ip = "localhost";
const port = "6324";
function getThis() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    return appContext.config.globalProperties
}
class food{
    id :number;
    name :string;
    acid :number;
    sweet :number;
    spicy :number;
    pepper :number;
    salt :number;
    supply_time :string;
    pic :any;
    description :string;
    constructor(id:number,name:string,acid:number,sweet:number,spicy:number,pepper:number,salt:number,supply_time:string
                ,pic:any,description :string) {
        this.id=id;
        this.name=name;
        this.acid=acid;
        this.sweet=sweet;
        this.spicy=spicy;
        this.pepper=pepper;
        this.salt=salt;
        this.supply_time=supply_time;
        this.pic=pic;
        this.description=description;
    }



}

class R
{
    code :number;
    message :string;
    data :object;
    constructor(receiveData :any)
    {
        this.code=receiveData.data.code;
        this.message=receiveData.data.message;
        this.data=receiveData.data.data;
    }

    success()
    {
        return this.code === 1;
    }
    getMessage()
    {
        return this.message;
    }


}

export {
    ip,port,getThis,R,food
}
