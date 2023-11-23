export default class paraData{
    constructor(component) {
        this.component = component;
        this.data ={};
        this.id =0;
    }
     getComponent() {
        return this.component;
    }

    setData(chapter, text)
    {
        this.data = {chapter,text};
    }

    getData(){
        return this.data;
    }
}